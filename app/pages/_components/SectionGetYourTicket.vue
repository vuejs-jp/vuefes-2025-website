<script setup lang="ts">
import { useLocaleRoute } from "@typed-router";
import { HOME_HEADING_ID } from "~/constant";
import { useBreakpoint, useI18n, useWithBase } from "#imports";
import { VFSection, JaGetYourTicket, EnGetYourTicket } from "#components";

const bp = useBreakpoint();
const withBase = useWithBase();
const { locale, t } = useI18n();
const localeRoute = useLocaleRoute();
</script>

<template>
  <VFSection
    :id="HOME_HEADING_ID.ticket"
    :title="t('ticket.title')"
    :cover-image="{
      src: bp === 'pc'
        ? withBase('/images/top/cover/get-your-ticket-pc.png')
        : withBase('/images/top/cover/get-your-ticket-sp.png'),
      alt: t('ticket.coverImageAlt'),
    }"
  >
    <component :is="locale === 'ja' ? JaGetYourTicket : EnGetYourTicket" />
    <div class="button-container">
      <VFButton :link="localeRoute('/ticket')">
        {{ t('ticket.viewTicketDetails') }}
      </VFButton>
    </div>
  </VFSection>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.button-container {
  text-align: center;

  margin-top: 32px;
  @media (--mobile) {
    margin-top: 24px;
  }
}
</style>
