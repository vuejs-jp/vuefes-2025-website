import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import { and, eq } from "drizzle-orm";
import dotenv from "dotenv";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { db } from "../../../server/db/orm";
import { attendees, users } from "../../../server/db/schema";

dotenv.config();

// Initialize S3 client for Cloudflare R2
const R2_ENDPOINT = `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`;
const R2_BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME!;

const S3 = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS!,
  },
});

await (async function main() {
  const { default: data } = await import("./input/data");

  // Add default values to input data
  const dataWithDefaultValues = data.map(it => ({
    userId: generateDefaultUserId(),
    email: generateDefaultEmail(),
    action: "create" as const,
    ...it,
  }));

  // Main processing
  const registered = await Promise.allSettled(
    dataWithDefaultValues.map(async (it) => {
      switch (it.action) {
        case "delete":
          return processDelete(it);
        case "update":
          return processUpdate(it);
        case "create":
        default:
          return processCreate(it);
      }
    }),
  );

  // Display results
  console.log("Registration Result:\n");

  let successCount = 0;
  let errorCount = 0;

  registered.forEach((result, index) => {
    if (result.status === "fulfilled" && result.value) {
      successCount++;
      const { name, action } = result.value;

      switch (action) {
        case "deleted":
          console.log(`✓ ${name}: Deleted successfully\n`);
          break;
        case "updated":
          console.log(`✓ ${name}: Updated successfully\n  ${result.value.shareUrl}\n`);
          break;
        case "created":
          console.log(`✓ ${name}: Created successfully\n  ${result.value.shareUrl}\n`);
          break;
      }
    } else {
      errorCount++;
      console.error(`✗ Entry ${index + 1}: Error - ${result.status === "rejected" ? result.reason : "Unknown error"}`);
    }
  });

  console.log(`\n=== Summary ===`);
  console.log(`Total processed: ${registered.length}`);
  console.log(`Successful: ${successCount}`);
  console.log(`Failed: ${errorCount}`);

  return;

  // Helper functions
  function generateDefaultUserId() {
    return randomUUID();
  }

  function generateDefaultEmail() {
    return `vuefes-${randomUUID()}@gmail.com`;
  }

  function isImageFormatSupported(filename: string): boolean {
    return filename.endsWith(".png") || filename.endsWith(".jpg") || filename.endsWith(".jpeg");
  }

  function getMimeType(filename: string): string {
    return filename.endsWith(".png") ? "image/png" : "image/jpeg";
  }

  function extractObjectKeyFromUrl(url: string): string | null {
    const urlParts = url.split("/");
    const objectKey = urlParts[urlParts.length - 1];
    return objectKey || null;
  }

  // Helper functions for R2 operations
  async function deleteFromR2(avatarUrl: string | null): Promise<void> {
    if (!avatarUrl) return;

    const objectKey = extractObjectKeyFromUrl(avatarUrl);
    if (!objectKey) return;

    const deleteCommand = new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: decodeURIComponent(objectKey),
    });
    await S3.send(deleteCommand);
  }

  async function uploadToR2(localPath: string, filename: string): Promise<string> {
    const mimeType = getMimeType(filename);
    const objectName = `${randomUUID()}-${filename}`;

    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: encodeURIComponent(objectName),
      ContentType: mimeType,
      Body: await fs.readFile(localPath),
    });
    await S3.send(command);

    return encodeURI(`${R2_ENDPOINT}/${R2_BUCKET_NAME}/${objectName}`);
  }

  // Process functions for each action
  async function processCreate(it: typeof dataWithDefaultValues[0]) {
    const [existingUser] = (await db
      .select({
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
        attendee: {
          userId: attendees.userId,
          avatarUrl: attendees.avatarUrl,
          imageFileName: attendees.imageFileName,
          displayName: attendees.displayName,
          role: attendees.role,
          lang: attendees.lang,
        },
      })
      .from(users)
      .where(eq(users.name, it.name))
      .rightJoin(attendees, eq(users.id, attendees.userId))
    );

    if (existingUser) {
      console.warn(`[Warn] User with name "${it.name}" already exists. Skipping...`);
      return;
    }

    if (!it.localAvatarImagePath) {
      console.error(`[Error] localAvatarImagePath is required for create action`);
      return;
    }

    const filename = it.localAvatarImagePath.split("/").pop()!;
    if (!filename) {
      console.error(`[Error] Invalid image path: ${it.localAvatarImagePath}`);
      return;
    }
    if (!isImageFormatSupported(filename)) {
      console.error(`[Error] Unsupported image format: ${filename}`);
      return;
    }

    // Create User
    await db.insert(users).values({
      id: it.userId,
      name: it.name,
      email: it.email,
    }).execute();

    // Register image to R2
    const avatarUrl = await uploadToR2(it.localAvatarImagePath, filename);

    // Create Attendee Data
    await db
      .insert(attendees)
      .values({
        userId: it.userId,
        email: it.email,
        avatarUrl,
        imageFileName: filename,
        displayName: it.name,
        role: it.role,
        lang: it.role === "Staff" && "lang" in it ? it.lang : undefined,
        receiptId: "N/A",
      });

    return {
      name: it.name,
      role: it.role,
      shareUrl: `https://vuefes.jp/2025/ticket/${it.userId}/`,
      action: "created" as const,
    };
  }

  async function processUpdate(it: typeof dataWithDefaultValues[0]) {
    const whereConditions = [
      eq(users.name, it.name),
      eq(attendees.role, it.role),
    ];

    // For Staff role, also match lang field
    if (it.role === "Staff" && "lang" in it) {
      whereConditions.push(eq(attendees.lang, it.lang));
    }

    const [existingUser] = await db
      .select({
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
        attendee: {
          userId: attendees.userId,
          avatarUrl: attendees.avatarUrl,
          imageFileName: attendees.imageFileName,
          displayName: attendees.displayName,
          role: attendees.role,
          lang: attendees.lang,
        },
      })
      .from(users)
      .innerJoin(attendees, eq(users.id, attendees.userId))
      .where(and(...whereConditions));

    if (!existingUser) {
      const roleDesc = it.role === "Staff" && "lang" in it ? `${it.role} (${it.lang})` : it.role;
      console.warn(`[Warn] User with name "${it.name}" and role "${roleDesc}" not found. Skipping update...`);
      return;
    }

    // Update user if needed
    await db.update(users).set({
      email: it.email || existingUser.user.email,
    }).where(eq(users.id, existingUser.user.id)).catch((err) => {
      console.error(`[Error] Failed to update user: ${err.message}`);
    });

    let avatarUrl = existingUser.attendee.avatarUrl;
    let imageFileName = existingUser.attendee.imageFileName;

    // Update avatar if provided
    if (it.localAvatarImagePath) {
      const filename = it.localAvatarImagePath.split("/").pop()!;
      if (!filename) {
        console.error(`[Error] Invalid image path: ${it.localAvatarImagePath}`);
        return;
      }
      if (!isImageFormatSupported(filename)) {
        console.error(`[Error] Unsupported image format: ${filename}`);
        return;
      }

      // Delete old avatar from R2
      await deleteFromR2(existingUser.attendee.avatarUrl).catch((err) => {
        console.error(`[Error] Failed to delete old avatar from R2: ${err.message}`);
      });

      // Upload new avatar
      avatarUrl = await uploadToR2(it.localAvatarImagePath, filename).catch((err) => {
        console.error(`[Error] Failed to upload new avatar to R2: ${err.message}`);
        return existingUser.attendee.avatarUrl; // Fallback to old avatar URL
      });
      imageFileName = filename;
    }

    // Update attendee
    await db.update(attendees).set({
      avatarUrl,
      imageFileName,
      displayName: it.name,
      role: it.role,
      lang: it.role === "Staff" && "lang" in it ? it.lang : undefined,
    }).where(eq(attendees.userId, existingUser.user.id));

    return {
      name: it.name,
      role: it.role,
      shareUrl: `https://vuefes.jp/2025/ticket/${existingUser.user.id}/`,
      action: "updated" as const,
    };
  }

  async function processDelete(it: typeof dataWithDefaultValues[0]) {
    const whereConditions = [
      eq(users.name, it.name),
      eq(attendees.role, it.role),
    ];

    // For Staff role, also match lang field
    if (it.role === "Staff" && "lang" in it) {
      whereConditions.push(eq(attendees.lang, it.lang));
    }

    const [existingUser] = await db
      .select({
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
        attendee: {
          userId: attendees.userId,
          avatarUrl: attendees.avatarUrl,
          imageFileName: attendees.imageFileName,
          displayName: attendees.displayName,
          role: attendees.role,
          lang: attendees.lang,
        },
      })
      .from(users)
      .innerJoin(attendees, eq(users.id, attendees.userId))
      .where(and(...whereConditions));

    if (!existingUser) {
      const roleDesc = it.role === "Staff" && "lang" in it ? `${it.role} (${it.lang})` : it.role;
      console.warn(`[Warn] User with name "${it.name}" and role "${roleDesc}" not found. Skipping deletion...`);
      return;
    }

    // Delete from R2 if avatar exists
    await deleteFromR2(existingUser.attendee.avatarUrl).catch((err) => {
      console.error(`[Error] Failed to delete avatar from R2: ${err.message}`);
    });

    // Delete attendee and user
    await db.delete(attendees).where(eq(attendees.userId, existingUser.user.id)).catch((err) => {
      console.error(`[Error] Failed to delete attendee: ${err.message}`);
    });
    await db.delete(users).where(eq(users.id, existingUser.user.id)).catch((err) => {
      console.error(`[Error] Failed to delete user: ${err.message}`);
    });

    return {
      name: it.name,
      role: existingUser.attendee.role,
      action: "deleted" as const,
    };
  }
})();
