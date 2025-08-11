<script setup lang="ts">
import { useI18n } from "#imports";
import { VFSection, JaStudentSupport, EnStudentSupport, VFButton } from "#components";
import { HOME_HEADING_ID } from "~/constant";

const { locale, t } = useI18n();
</script>

<template>
  <VFSection
    :id="HOME_HEADING_ID.studentSupport"
    :title="t('student.title')"
  >
    <component :is="locale === 'ja' ? JaStudentSupport : EnStudentSupport" />

    <div class="button-container">
      <VFButton
        link="https://esa-pages.io/p/sharing/6906/posts/1210/765e5b76cdf415899e3f.html"
        external
        outlined
      >
        {{ t('student.guideline') }}
      </VFButton>
      <VFButton
        link="https://docs.google.com/forms/d/e/1FAIpQLSfwu4K1fSRY3tIr_E0L3WK7xrv8ANarv_JAhVkdR1mZjgQRsg/viewform?usp=dialog"
        external
      >
        {{ t('student.apply') }}
      </VFButton>
    </div>
  </VFSection>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.button-container {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 2rem;

  @media (--mobile) {
    display: grid;
    place-items: center;
  }
}
</style>
