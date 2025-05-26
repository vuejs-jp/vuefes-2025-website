<script setup lang="ts">
import { HOME_HEADING_ID } from "~/constant";
import { useBreakpoint, useI18n, useWithBase } from "#imports";
import { VFSection, JaSponsorWanted, EnSponsorWanted } from "#components";

const bp = useBreakpoint();
const withBase = useWithBase();
const { locale, t } = useI18n();
</script>

<template>
  <VFSection
    :id="HOME_HEADING_ID.sponsorWanted"
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
