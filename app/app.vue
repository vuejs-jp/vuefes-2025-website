<script setup lang="ts">
import "~/assets/styles/main.css";
import { useAutoThemeChanger } from "./stores/animation";
import type { MessageSchema } from "~~/i18n/message-schema";

import { useI18n, useHead, useSeoMeta } from "#imports";
import { NuxtPage, NuxtRouteAnnouncer } from "#components";

const { t } = useI18n<{ message: MessageSchema }>();

// NOTE: use getter to handle locale changes
const title = () => `${t("nuxtSiteConfig.name")} %separator %s`;
const description = () => t("nuxtSiteConfig.description");
const ogImage = "https://vuefes.jp/2025/og-image.png";

useHead({ templateParams: { separator: "-" } });
useSeoMeta({
  titleTemplate: title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage,
  twitterImage: ogImage,
});

useAutoThemeChanger();
</script>

<template>
  <NuxtRouteAnnouncer />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
