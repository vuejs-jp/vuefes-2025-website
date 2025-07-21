import { defineEventHandler, getRouterParam } from "h3";
import { eq } from "drizzle-orm/sql";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { db } from "../../../db/orm";
import { attendees } from "../../../db/schema";

import { createError, useRuntimeConfig } from "#imports";

export default defineEventHandler(async (event) => {
  const { __FEATURE_TICKET_NAMECARD__ } = useRuntimeConfig();
  if (!__FEATURE_TICKET_NAMECARD__) return;

  const userId = getRouterParam(event, "userId");

  // Authorization
  // everyone can read for sharing
  // WARNING: Must be respond only public data

  // image registration
  const nameCardData = await db.select().from(attendees).where(eq(attendees.userId, String(userId))).get();

  if (!nameCardData) {
    throw createError({
      message: "Namecard not found",
      statusCode: 404,
    });
  }

  const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS!,
    },
  });

  return {
    name: nameCardData.displayName,
    avatarUrl: await getSignedUrl(
      S3,
      new GetObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
        Key: new URL(nameCardData.avatarUrl ?? "").pathname.split("/").pop() ?? undefined,
      }),
      { expiresIn: 3600 },
    ),
  };
});
