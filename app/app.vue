<script setup lang="ts">
import "~/assets/styles/main.css";
import { NuxtPage, NuxtRouteAnnouncer } from "#components";
import { computed, useI18n } from "#imports";

type Lang = "ja" | "en";
type LangClass = `lang-${Lang}`;

const { locale } = useI18n();
const langClass = computed<LangClass>(() => `lang-${locale.value}`);
</script>

<template>
  <div :class="langClass">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
