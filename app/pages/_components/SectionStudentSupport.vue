<script setup lang="ts">
import { useI18n } from "#imports";
import { VFSection, JaStudentSupportClosed, EnStudentSupportClosed } from "#components";
import { HOME_HEADING_ID } from "~/constant";

const { locale, t } = useI18n();
</script>

<template>
  <VFSection
    :id="HOME_HEADING_ID.studentSupport"
    :title="t('student.title')"
  >
    <component :is="locale === 'ja' ? JaStudentSupportClosed : EnStudentSupportClosed" />
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
