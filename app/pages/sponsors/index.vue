<script setup lang="ts">
import SponsorGrid from "../../components/SponsorGrid.vue";
import { SPONSORS as JaSponsors } from "~~/i18n/ja/sponsors";
import { SPONSORS as EnSponsors } from "~~/i18n/en/sponsors";

import {
  definePageMeta,
  useBreakpoint,
  useI18n,
  useRuntimeConfig,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useHead,
  useSeoMeta,
} from "#imports";
import { VFSection } from "#components";

definePageMeta({ prerender: true });

const runtimeConfig = useRuntimeConfig();
const { t, locale } = useI18n();
const bp = useBreakpoint();
useSeoMeta({
  title: t("sponsors.title"),
  ogTitle: t("sponsors.title"),
  ogImage: `${runtimeConfig.public.siteUrl}images/og/sponsors.png`,
});
</script>

<template>
  <div id="pages-sponsors">
    <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
    <h1>Sponsor</h1>

    <VFSection :title="t('sponsors.platinaSponsor')">
      <SponsorGrid
        :sponsors="locale === 'ja' ? JaSponsors.PLATINA : EnSponsors.PLATINA"
        :columns="bp === 'mobile' ? 1 : 2"
        :gap="bp === 'mobile' ? '24px' : '32px'"
      />
    </VFSection>

    <VFSection :title="t('sponsors.goldSponsor')">
      <SponsorGrid
        :sponsors="locale === 'ja' ? JaSponsors.GOLD : EnSponsors.GOLD"
        :columns="bp === 'mobile' ? 2 : 3"
        :gap="bp === 'mobile' ? '24px' : '32px'"
      />
    </VFSection>

    <VFSection :title="t('sponsors.silverSponsor')">
      <SponsorGrid
        :sponsors="locale === 'ja' ? JaSponsors.SILVER : EnSponsors.SILVER"
        :columns="bp === 'mobile' ? 2 : 4"
        :gap="bp === 'mobile' ? '24px' : '32px'"
      />
    </VFSection>

    <VFSection :title="t('sponsors.bronzeSponsor')">
      <SponsorGrid
        :sponsors="locale === 'ja' ? JaSponsors.BRONZE : EnSponsors.BRONZE"
        :columns="bp === 'mobile' ? 2 : 4"
        :gap="bp === 'mobile' ? '24px' : '32px'"
      />
    </VFSection>

    <!-- <VFSection :title="t('sponsors.optionSponsor')">
      <SponsorGrid
        :items="locale === 'ja' ? JaSponsors.OPTION : EnSponsors.OPTION"
        :columns="bp === 'mobile' ? 2 : 4"
        :gap="bp === 'mobile' ? '24px' : '32px'"
      />
    </VFSection> -->
  </div>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

#pages-sponsors{
  display: grid;
  row-gap: 1.5rem;
  @media (--mobile) {
    row-gap: 1rem;
  }

  h1 {
    font-family: "ClashDisplay-Semibold";
    font-size: 3rem;
    padding: 7.5rem 0;
    margin: 0;

    @media (--mobile) {
      padding: 2.5rem 0.75rem;
    }
  }

}
</style>
