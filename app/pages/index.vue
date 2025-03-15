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
  <h1 class="site-title">Vue Fes Japan 2025</h1>

  <LanguageSwitcher />
  <h2>{{ t("message") }}</h2>
  <ContentRenderer v-if="message" :value="message" />

  <h1>h1</h1>
  <h2>h2</h2>
  <h3>h3</h3>
  <p>body-1</p>
  <p class="text-body-2">body-2</p>
  <p class="text-body-3">body-3</p>
  <p class="text-caption">caption</p>
</template>

<style scoped>
.site-title {
  font-family: ClashDisplay-SemiBold;
  font-size: 4rem;
  padding: 2rem;
}
</style>
