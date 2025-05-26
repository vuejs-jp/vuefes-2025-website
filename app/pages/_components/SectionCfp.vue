<script setup lang="ts">
import { HOME_HEADING_ID } from "~/constant";
import { useBreakpoint, useI18n, useWithBase } from "#imports";
import { VFButton, VFSection, JaCfp, EnCfp } from "#components";

const bp = useBreakpoint();
const withBase = useWithBase();
const { locale, t } = useI18n();
</script>

<template>
  <VFSection
    :id="HOME_HEADING_ID.cfp"
    :title="t('cfp.title')"
    :cover-image="{
      src: bp === 'pc'
        ? withBase('/images/top/cover/cfp-pc.svg')
        : withBase('/images/top/cover/cfp-sp.svg'),
      alt: t('cfp.coverImageAlt'),
    }"
  >
    <component :is="locale === 'ja' ? JaCfp : EnCfp" />
    <VFButton class="cfp-apply-button" :link="t('cfp.applyLink')" external>
      {{ t('cfp.applyButton') }}
    </VFButton>
  </VFSection>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.cfp-apply-button {
  display: block;
  margin: 0 auto;
  margin-top: 2rem;
  width: fit-content;

  @media (--mobile) {
    margin-top: 1.5rem;
  }
}
</style>
