<script setup lang="ts">
import { HOME_HEADING_ID } from "~/constant";
import { useI18n } from "#imports";
import { VFSection, JaAccess, EnAccess } from "#components";

const { locale, t } = useI18n();
</script>

<template>
  <VFSection
    :id="HOME_HEADING_ID.access"
    :title="t('access.title')"
    class="section-access"
  >
    <component :is="locale === 'ja' ? JaAccess : EnAccess" />
    <div class="access-button-container">
      <VFButton link="https://maps.app.goo.gl/fdVEfMK5KcY33QiXA">
        {{ t('access.googleMapLink') }}
      </VFButton>
    </div>
    <div class="access-images-container">
      <img
        src="/images/top/access1.jpg"
        :alt="t('access.alt1')"
        loading="lazy"
      >
      <img
        src="/images/top/access2.jpg"
        :alt="t('access.alt2')"
        loading="lazy"
      >
    </div>
  </VFSection>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.section-access {
  overflow: hidden;
  container-type: inline-size;
}

.access-button-container {
  text-align: center;

  margin-top: 32px;
  @media (--mobile) {
    margin-top: 24px;
  }
}
.access-images-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 32px;
  margin-bottom: -48px;
  width: 100cqw;
  margin-inline: calc(50% - calc(100cqw/2));

  @media (--mobile) {
    margin-top: 24px;
  }
  img {
    width: 100%;
  }
}
</style>
