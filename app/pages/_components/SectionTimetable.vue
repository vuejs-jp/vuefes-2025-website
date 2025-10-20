<script setup lang="ts">
import { useLocaleRoute } from "@typed-router";
import { useBreakpoint, useI18n, useWithBase } from "#imports";

const bp = useBreakpoint();
const withBase = useWithBase();
const { t } = useI18n();
const localeRoute = useLocaleRoute();
</script>

<template>
  <VFSection
    :cover-image="{
      src: bp === 'pc'
        ? withBase('/images/top/cover/timetable-pc.svg')
        : withBase('/images/top/cover/timetable-sp.svg'),
      alt: t('timetable.coverImageAlt'),
    }"
  >
    <div class="button-container">
      <VFButton :link="localeRoute('/timetable')">
        {{ t('timetable.view') }}
      </VFButton>
    </div>
  </VFSection>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.button-container {
  text-align: center;

  margin-top: -32px;
  @media (--mobile) {
    margin-top: -24px;
  }
}
</style>
