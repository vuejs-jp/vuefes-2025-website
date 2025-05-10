<script setup lang="ts">
import { useBreakpoint, useI18n, useWithBase } from "#imports";
import { VFSection, JaSponsorWanted, EnSponsorWanted } from "#components";

const bp = useBreakpoint();
const withBase = useWithBase();
const { locale, t } = useI18n();
</script>

<template>
  <VFSection
    :title="t('sponsorWanted')"
    :cover-image="{
      src: bp === 'pc'
        ? withBase('/images/top/cover/sponsor-wanted-pc.svg')
        : withBase('/images/top/cover/sponsor-wanted-sp.svg'),
      alt: t('sponsorWantedCoverImageAlt'),
    }"
  >
    <component :is="locale === 'ja' ? JaSponsorWanted : EnSponsorWanted" />
  </VFSection>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.sponsor-apply-button {
  display: block;
  margin: 0 auto;
  margin-top: 2rem;
  @media (--mobile) {
    margin-top: 1.5rem;
  }
}
</style>
