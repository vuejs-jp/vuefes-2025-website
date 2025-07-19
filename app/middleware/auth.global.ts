import { navigateTo, useLocaleRoute } from "@typed-router";
import { defineNuxtRouteMiddleware, useAuth } from "#imports";

export default defineNuxtRouteMiddleware(async (to) => {
  const { status } = useAuth();
  const localeRoute = useLocaleRoute();
  const AUTHENTICATED_ONLY = [localeRoute({ name: "ticket-userId-edit", params: { userId: ":userId" } })];

  if (status.value !== "authenticated") {
    for (const route of AUTHENTICATED_ONLY) {
      if (to.name === route?.name) {
        return await navigateTo(localeRoute("/ticket"));
      }
    };
  }
});
