<script setup lang="ts">
import "~/assets/styles/main.css";
import type { MessageSchema } from "~~/i18n/message-schema";

import {
  useI18n,

  // NOTE: import useHead to avoid `useHead is not defined` error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useHead,
  useSeoMeta,
} from "#imports";
import { NuxtPage, NuxtRouteAnnouncer } from "#components";
import { useAutoThemeChanger } from "./stores/animation";

const { t } = useI18n<{ message: MessageSchema }>();

useSeoMeta({
  ogImage: "/og-image-noised.png",
  titleTemplate: (s) => `${t("nuxtSiteConfig.name")}${s ? ` – ${s}` : ""}`,
});

useAutoThemeChanger();
</script>
<template>
  <NuxtRouteAnnouncer />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
