<script setup lang="ts">
import { HOME_HEADING_ID } from "~/constant";
import { useBreakpoint, useI18n, useWithBase } from "#imports";
import { VFSection, JaSponsorClosed, EnSponsorClosed } from "#components";

const bp = useBreakpoint();
const withBase = useWithBase();
const { locale, t } = useI18n();
</script>

<template>
  <VFSection
    :id="HOME_HEADING_ID.sponsorClosed"
    :title="t('sponsorClosed')"
    :cover-image="{
      src: bp === 'pc'
        ? withBase('/images/top/cover/sponsor-wanted-pc.svg') // TODO: 画像差し替え
        : withBase('/images/top/cover/sponsor-wanted-sp.svg'),
      alt: t('sponsorWantedCoverImageAlt'),
    }"
  >
    <component :is="locale === 'ja' ? JaSponsorClosed : EnSponsorClosed" />
  </VFSection>
</template>
