import { defineEventHandler } from "h3";
import { users } from "../db/schema";
import { db } from "../db/orm";
import { useRuntimeConfig } from "#imports";

export default defineEventHandler(async () => {
  const { __FEATURE_TICKET_NAME_BADGE__ } = useRuntimeConfig();
  if (!__FEATURE_TICKET_NAME_BADGE__) return;

  const result = await db.select().from(users).all();
  return result;
});
