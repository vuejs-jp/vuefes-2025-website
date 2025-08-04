import { eq } from "drizzle-orm";
import createClient from "openapi-fetch";
import dotenv from "dotenv";

import type { paths } from "../server/peatix-api/schema";
import { TicketName } from "../server/peatix-api/constant";
import { db } from "../server/db/orm";
import { attendees } from "../server/db/schema";

dotenv.config();

try {
  const attendeesData = await db.select({
    userId: attendees.userId,
    receiptId: attendees.receiptId,
    role: attendees.role,
  }).from(attendees).all();

  const client = createClient<paths>({
    baseUrl: process.env.PEATIX_API_ORIGIN!,
    headers: {
      Authorization: `Bearer ${process.env.PEATIX_API_SECRET!}`,
    },
  });

  const sales = await client.GET("/event/{eventId}/list_sales", {
    params: {
      path: { eventId: process.env.PEATIX_EVENT_ID! },
    },
  }).then(response => response.data?.sales);

  await Promise.allSettled(
    attendeesData.map(async (attendee) => {
      const sale = sales?.find(sale => sale.salesId === attendee.receiptId);
      if (!sale) return;

      const role = (() => {
        switch (sale.ticketName) {
          case TicketName.EarlyBirdGeneral:
          case TicketName.General:
            return "Attendee";
          case TicketName.EarlyBirdGeneralParty:
          case TicketName.GeneralParty:
            return "Attendee+Party";
          default:
            return null;
        }
      })();

      if (role) {
        await db.update(attendees).set({ role }).where(eq(attendees.userId, attendee.userId)).execute();
      }
    }),
  );
} catch (e) {
  console.error(`[Task: db:sync-role] Failed to synchronize attendee roles:`, e);
}
