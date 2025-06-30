<script setup lang="ts">
import { HOME_HEADING_ID } from "~/constant";
import { useBreakpoint, useI18n, useWithBase } from "#imports";
import { VFButton, VFSection, JaVolunteer, EnVolunteer } from "#components";

const bp = useBreakpoint();
const withBase = useWithBase();
const { locale, t } = useI18n();
</script>

<template>
  <VFSection
    :id="HOME_HEADING_ID.volunteer"
    :title="t('volunteer.title')"
    :cover-image="{
      src: bp === 'pc'
        ? withBase('/images/top/cover/volunteer-pc.svg')
        : withBase('/images/top/cover/volunteer-sp.svg'),
      alt: t('volunteer.coverImageAlt'),
    }"
  >
    <component :is="locale === 'ja' ? JaVolunteer : EnVolunteer" />
    <VFButton :link="t('volunteer.applyLink')" external class="volunteer-apply-button">
      {{ t('volunteer.applyButton') }}
    </VFButton>
  </VFSection>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.volunteer-apply-button {
  display: block;
  margin: 0 auto;
  margin-top: 2rem;
  width: fit-content;

  @media (--mobile) {
    margin-top: 1.5rem;
  }
}
</style>
