import { defineEventHandler } from "h3";
import { eq } from "drizzle-orm/sql";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { attendees } from "../../db/schema";
import { db } from "../../db/orm";

import { getServerSession } from "#auth";

import { createError, useRuntimeConfig } from "#imports";
import { usePeatixApi } from "~~/server/peatix-api/usePeatixApi";

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

  const { peatixEventId } = useRuntimeConfig();
  const { client } = usePeatixApi();

  if (nameBadgeData?.receiptId && !nameBadgeData?.role) {
    const sale = await client.GET("/event/{eventId}/list_sales/{salesId}", {
      params: {
        path: {
          eventId: peatixEventId,
          salesId: nameBadgeData.receiptId,
        },
      },
    }).then(response => response.data);

    if (sale) {
      const role = (() => {
        switch (sale.ticketName) {
          case "【早割】一般チケット／[Early Bird] General Ticket":
          case "一般チケット／General Ticket":
            return "Attendee";
          case "【早割】一般＋アフターパーティーチケット／[Early Bird] General + After Party Ticket":
          case "一般＋アフターパーティーチケット／General + After Party Ticket":
            return "Attendee+Party";
          default:
            return null;
        }
      })();

      if (role) {
        await db.update(attendees).set({ role }).where(eq(attendees.userId, session.userId)).execute();
      }
    }
  }

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
        lang: nameBadgeData.lang,

        /**
           * Authorized private data
           */
        salesId: nameBadgeData.receiptId,
        avatarImageFileName: nameBadgeData.imageFileName,
      }
    : null;
});
