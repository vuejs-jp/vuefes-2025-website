import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import { eq } from "drizzle-orm";
import dotenv from "dotenv";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { db } from "../../../server/db/orm";
import { attendees, users } from "../../../server/db/schema";

const { default: data } = await import("./input/data");

dotenv.config();

const dataWithDefaultValues = data.map(it => ({
  userId: randomUUID(),
  email: `vuefes-${randomUUID()}@gmail.com`,
  ...it,
}));

const registered = await Promise.allSettled(
  dataWithDefaultValues.map(async (it) => {
    // search existing user by name
    // if already exists, show warning and skip
    const existingUser = await db.select().from(users).where(eq(users.name, it.name));
    if (existingUser.length > 0) {
      console.warn(`[Warn] User with name "${it.name}" already exists. Skipping...`);
      return;
    }

    /*
     * Create User
     * ------------------------------------------------ */

    await db.insert(users).values({
      id: it.userId,
      name: it.name,
      email: it.email,
    }).execute();

    /*
     * Register image to R2
     * ------------------------------------------------ */
    const filename = it.localAvatarImagePath.split("/").pop()!;

    if (!filename) {
      console.error(`[Error] Invalid image path: ${it.localAvatarImagePath}`);
      return;
    }
    if (!(filename.endsWith(".png") || filename.endsWith(".jpg") || filename.endsWith(".jpeg"))) {
      console.error(`[Error] Unsupported image format: ${filename}`);
      return;
    }

    const mimeType = filename.endsWith(".png") ? "image/png" : "image/jpeg";

    const objectName = `${randomUUID()}-${filename}`;

    const r2Endpoint = `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`;
    const S3 = new S3Client({
      region: "auto",
      endpoint: r2Endpoint,
      credentials: {
        accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS!,
      },
    });
    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
      Key: encodeURIComponent(objectName),
      ContentType: mimeType,
      Body: (await fs.readFile(it.localAvatarImagePath)),
    });
    await S3.send(command);

    /*
     * Create Attendee Data
     * ------------------------------------------------ */
    const data = {
      email: it.email,
      avatarUrl: encodeURI(`${r2Endpoint}/${process.env.CLOUDFLARE_R2_BUCKET_NAME}/${objectName}`),
      imageFileName: filename,
      displayName: it.name,
      role: it.role,
      receiptId: "N/A",
    };
    await db
      .insert(attendees)
      .values({ userId: it.userId, ...data })
      .onConflictDoUpdate({ target: [attendees.userId], set: { ...data } });

    return {
      name: it.name,
      role: it.role,
      shareUrl: `https://vuefes.jp/2025/ticket/${it.userId}/`,
    };
  }),
);

// print result
console.log("Registration Result:\n");
registered.forEach((result, index) => {
  if (result.status === "fulfilled") {
    if (result.value) {
      console.log(`${result.value?.name}:\n${result.value?.shareUrl}\n`);
    }
  } else {
    console.error(`- ${index + 1}: Error - ${result.reason}`);
  }
});
console.log(`\nTotal: ${registered.length} entries processed.`);
