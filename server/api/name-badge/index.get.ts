import { defineEventHandler } from "h3";
import { eq } from "drizzle-orm/sql";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { attendees } from "../../db/schema";
import { db } from "../../db/orm";

import { getServerSession } from "#auth";

import { createError, useRuntimeConfig } from "#imports";

export default defineEventHandler(async (event) => {
  const { __FEATURE_TICKET_NAME_BADGE__ } = useRuntimeConfig();
  if (!__FEATURE_TICKET_NAME_BADGE__) return;

  // Authorization
  const session = await getServerSession(event);
  if (!session || !session.user || !session.userId || !session.user.email) {
    throw createError({
      message: "Unauthenticated",
      statusCode: 403,
    });
  }

  // image registration
  const nameBadgeData = await db.select().from(attendees).where(eq(attendees.userId, session.userId)).get();

  const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS!,
    },
  });

  return nameBadgeData
    ? {
        name: nameBadgeData.displayName,
        avatarUrl: await getSignedUrl(
          S3,
          new GetObjectCommand({
            Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
            Key: nameBadgeData.avatarUrl
              ? new URL(nameBadgeData.avatarUrl).pathname.split("/").pop() ?? undefined
              : undefined,
          }),
          { expiresIn: 3600 },
        ),
        role: nameBadgeData.role,

        /**
           * Authorized private data
           */
        salesId: nameBadgeData.receiptId,
        avatarImageFileName: nameBadgeData.imageFileName,
      }
    : null;
});
