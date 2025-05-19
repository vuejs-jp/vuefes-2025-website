import { onClickOutside } from "@vueuse/core";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.directive("click-outside", {
    mounted(el, binding) {
      onClickOutside(el, () => binding.value(false));
    },
  });
});
