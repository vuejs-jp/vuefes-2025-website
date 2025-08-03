import { defineEventHandler, getRouterParam } from "h3";
import { eq } from "drizzle-orm/sql";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { db } from "../../../db/orm";
import { attendees } from "../../../db/schema";

import { getServerSession } from "#auth";
import { createError, useRuntimeConfig } from "#imports";
import { usePeatixApi } from "~~/server/peatix-api/usePeatixApi";
import { TicketName } from "~~/server/peatix-api/constant";

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "userId");

  // Authorization
  // everyone can read for sharing
  // WARNING: Must be respond only public data

  // image registration
  const nameBadgeData = await db.select().from(attendees).where(eq(attendees.userId, String(userId))).get();

  if (!nameBadgeData) {
    throw createError({
      message: "Name Badge not found",
      statusCode: 404,
    });
  }

  // try update role authorized and same user
  try {
    const session = await getServerSession(event);
    if (session && session.user && session.userId && session.user.email && session.userId === userId) {
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
              case TicketName.EaryBirdGeneral:
              case TicketName.General:
                return "Attendee";
              case TicketName.EaryBirdGeneralParty:
              case TicketName.GeneralParty:
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
    }
  } catch (error) {
    console.error("Failed to update role:", error);
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
    name: nameBadgeData.displayName,
    role: nameBadgeData.role,
    lang: nameBadgeData.lang,
    avatarUrl: await getSignedUrl(
      S3,
      new GetObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
        Key: new URL(nameBadgeData.avatarUrl ?? "").pathname.split("/").pop() ?? undefined,
      }),
      { expiresIn: 3600 },
    ),
  };
});
