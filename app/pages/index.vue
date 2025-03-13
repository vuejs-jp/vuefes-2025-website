<script setup lang="ts">
import { ContentRenderer, LanguageSwitcher } from "#components";
import {
  defineRouteRules,
  queryCollection,
  useI18n,
  useLazyAsyncData,
} from "#imports";

defineRouteRules({ prerender: true });

const { t, locale } = useI18n();

const { data: message } = await useLazyAsyncData(locale.value, () =>
  queryCollection("i18n").path(`/${locale.value}/message`).first(),
);
</script>

<template>
  <LanguageSwitcher />
  <h1>{{ t("message") }}</h1>
  <ContentRenderer v-if="message" :value="message" />
</template>
