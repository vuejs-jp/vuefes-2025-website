<script setup lang="ts">
import { useBreakpoint, useI18n, useWithBase } from "#imports";
import { VFButton, VFSection, JaCfpWanted, EnCfpWanted } from "#components";

const bp = useBreakpoint();
const withBase = useWithBase();
const { locale, t } = useI18n();
</script>

<template>
  <VFSection
    :title="t('cfpWanted')"
    :cover-image="{
      src: bp === 'pc'
        ? withBase('/images/top/cover/cfp-wanted-pc.svg')
        : withBase('/images/top/cover/cfp-wanted-sp.svg'),
      alt: t('cfpWantedCoverImageAlt'),
    }"
  >
    <component :is="locale === 'ja' ? JaCfpWanted : EnCfpWanted" />
    <VFButton class="cfp-apply-button">
      {{ t('cfpApplyButton') }}
    </VFButton>
  </VFSection>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.cfp-apply-button {
  display: block;
  margin: 0 auto;
  margin-top: 2rem;
  @media (--mobile) {
    margin-top: 1.5rem;
  }
}
</style>
