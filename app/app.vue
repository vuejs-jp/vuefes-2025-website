<script setup lang="ts">
import "~/assets/styles/main.css";
import type { MessageSchema } from "~~/i18n/message-schema";

// NOTE: import useHead to avoid `useHead is not defined` error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useHead, useI18n, useSeoMeta } from "#imports";
import { NuxtPage, NuxtRouteAnnouncer } from "#components";

const { t } = useI18n<{ message: MessageSchema }>();

useSeoMeta({
  ogImage: "/og-image.png",
  titleTemplate: (s) => `${t("nuxtSiteConfig.name")}${s ? ` - ${s}` : ""}`,
});
</script>

<template>
  <NuxtRouteAnnouncer />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
