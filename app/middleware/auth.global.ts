import { defineNuxtRouteMiddleware, navigateTo, useAuth, useLocaleRoute } from "#imports";

const AUTHENTICATED_ONLY = ["namecard-userId-edit"];

export default defineNuxtRouteMiddleware((to) => {
  const { status, data } = useAuth();
  const localeRoute = useLocaleRoute();

  if (status.value === "authenticated") {
    if (to.name === localeRoute("namecard")?.name && data.value?.userId) {
      return navigateTo(`/namecard/${data.value.userId}/`);
    };

    return;
  } else {
    AUTHENTICATED_ONLY.forEach((route) => {
      if (to.name === route) {
        navigateTo(localeRoute("/namecard"));
      }
    });
  }
});
