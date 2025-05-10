<script setup lang="ts">
import { useBreakpoint, useI18n, useWithBase } from "#imports";
import { VFSection, JaMessage, EnMessage } from "#components";

const bp = useBreakpoint();
const withBase = useWithBase();
const { locale, t } = useI18n();
</script>

<template>
  <VFSection
    :title="t('message')"
    :cover-image="{
      src: bp === 'pc'
        ? withBase('/images/top/cover/message-pc.png')
        : withBase('/images/top/cover/message-sp.png'),
      alt: t('messageCoverImageAlt'),
    }"
  >
    <component :is="locale === 'ja' ? JaMessage : EnMessage" />
  </VFSection>
</template>
