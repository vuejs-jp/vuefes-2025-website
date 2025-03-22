<script setup lang="ts">
import "~/assets/styles/main.css";
import type { MessageSchema } from "~~/i18n/message-schema";

// NOTE: import useHead to avoid `useHead is not defined` error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { onMounted, useHead, useI18n, useSeoMeta } from "#imports";
import { NuxtPage, NuxtRouteAnnouncer } from "#components";

const { t } = useI18n<{ message: MessageSchema }>();

useSeoMeta({
  ogImage: "/og-image-noised.png",
  titleTemplate: (s) => `${t("nuxtSiteConfig.name")}${s ? ` – ${s}` : ""}`,
});

onMounted(() => {
  let currentTheme = 0;

  const THEMES = [
    "theme-primary",
    "theme-purple",
    "theme-orange",
    "theme-navy",
  ];

  const body = document.querySelector("body")!;
  body.classList.add(THEMES[currentTheme]!);

  window.setInterval(
    () => {
      body.classList.remove(THEMES[currentTheme]!);
      // random theme but must not be the same as the current theme
      const _currentTheme = currentTheme;
      do {
        currentTheme = Math.floor(Math.random() * THEMES.length);
      } while (currentTheme === _currentTheme);

      body.classList.add(THEMES[currentTheme]!);
    },
    // random time 8000 ~ 15000
    Math.floor(Math.random() * 7000) + 8000,
  );
});
</script>
<template>
  <NuxtRouteAnnouncer />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
