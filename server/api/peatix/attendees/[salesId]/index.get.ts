import { defineEventHandler, getQuery, getRouterParam } from "h3";
import { usePeatixApi } from "../../../../peatix-api/usePeatixApi";
import { useRuntimeConfig } from "#imports";

export default defineEventHandler(async (event) => {
  const { __FEATURE_TICKET_NAMECARD__ } = useRuntimeConfig();
  if (!__FEATURE_TICKET_NAMECARD__) return;

  const { peatixEventId } = useRuntimeConfig();

  const { client } = usePeatixApi();

  const salesId = getRouterParam(event, "salesId")!;
  const { fresh } = getQuery(event);

  const data = await client.GET("/event/{eventId}/list_sales/{salesId}", {
    params: {
      path: {
        eventId: peatixEventId,
        salesId,
      },
      query: { fresh: fresh as string | undefined },
    },
  }).then(response => response.data);

  return data;
});
