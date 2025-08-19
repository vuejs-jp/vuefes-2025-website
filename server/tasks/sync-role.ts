import { defineTask } from "nitropack/runtime";
import { eq } from "drizzle-orm";
import { db } from "../db/orm";
import { attendees } from "../db/schema";

import { usePeatixApi } from "../peatix-api/usePeatixApi";
import { TicketName } from "../peatix-api/constant";
import { useRuntimeConfig } from "#imports";

export default defineTask({
  meta: {
    name: "sync-role",
    description: "Synchronize database attendee.role",
  },
  async run() {
    try {
      const attendeesData = await db.select({
        userId: attendees.userId,
        receiptId: attendees.receiptId,
        role: attendees.role,
      }).from(attendees).all();

      const { peatixEventId } = useRuntimeConfig();
      const { client } = usePeatixApi();
      const sales = await client.GET("/event/{eventId}/list_sales", {
        params: {
          path: { eventId: peatixEventId },
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

      return { result: "ok" };
    } catch (e) {
      console.error(`[Task: db:sync-role] Failed to synchronize attendee roles:`, e);
      return { result: "err" };
    }
  },
});
