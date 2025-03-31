import type { RouterConfig } from "@nuxt/schema";
import { useNuxtApp } from "#app";

function stripLocalePath(path: string) {
  return path === "/en" ? "/" : path.startsWith(`/en`) ? path.slice(3) : path;
}

export default <RouterConfig>{
  async scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();

    if (
      nuxtApp.$i18n
      && stripLocalePath(to.path?.toString() ?? "")
      === stripLocalePath(from.path?.toString() ?? "")
    ) {
      await nuxtApp.$i18n.waitForPendingLocaleChange();
      return savedPosition;
    }

    return { top: 0 };
  },
};
