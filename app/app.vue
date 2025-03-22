<script setup lang="ts">
import "~/assets/styles/main.css";
import type { MessageSchema } from "~~/i18n/message-schema";

import {
  onMounted,
  useI18n,

  // NOTE: import useHead to avoid `useHead is not defined` error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useHead,
  useSeoMeta,
} from "#imports";
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
      // 順番に次のテーマに切り替え
      currentTheme = (currentTheme + 1) % THEMES.length;
      body.classList.add(THEMES[currentTheme]!);
    },
    15000, // 15秒間隔
  );
});
</script>
<template>
  <NuxtRouteAnnouncer />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
