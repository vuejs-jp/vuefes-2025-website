<script setup lang="ts">
import "~/assets/styles/main.css";
import type { MessageSchema } from "~~/i18n/message-schema";

import { useI18n, useHead, useSeoMeta } from "#imports";
import { NuxtPage, NuxtRouteAnnouncer } from "#components";
import { useAutoThemeChanger } from "./stores/animation";

const { t } = useI18n<{ message: MessageSchema }>();

useHead({ templateParams: { separator: "-" } });
useSeoMeta({
  titleTemplate: `${t("nuxtSiteConfig.name")} %separator %s`,
  ogTitle: `${t("nuxtSiteConfig.name")} %separator %s`,
  ogImage: "https://vuefes.jp/2025/og-image.png",
});

useAutoThemeChanger();
</script>
<template>
  <NuxtRouteAnnouncer />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
