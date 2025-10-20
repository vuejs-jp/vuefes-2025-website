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
        ? withBase('/images/top/cover/event-pc.png')
        : withBase('/images/top/cover/event-sp.png'),
      alt: t('event.coverImageAlt'),
    }"
  >
    <div class="button-container">
      <VFButton :link="localeRoute('/event')">
        {{ t('event.view') }}
      </VFButton>
      <VFButton :link="localeRoute('/store')">
        {{ t('store.view') }}
      </VFButton>
    </div>
  </VFSection>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.button-container {
  margin-top: -32px;
  display: flex;
  justify-content: center;
  column-gap: 32px;
  text-align: center;

  @media (--mobile) {
    margin-top: -24px;
    flex-direction: column;
    align-items: center;
    row-gap: 24px;
  }

  a {
    width: fit-content;
  }
}
</style>
