<script setup lang="ts">
import SponsorGrid from "../../components/SponsorGrid.vue";
import { SPONSORS as JaSponsors } from "~~/i18n/ja/sponsors";
import { SPONSORS as EnSponsors } from "~~/i18n/en/sponsors";

import { definePageMeta, useBreakpoint, useI18n } from "#imports";
import { VFSection } from "#components";

definePageMeta({ prerender: true });

const { t, locale } = useI18n();
const bp = useBreakpoint();
</script>

<template>
  <div id="pages-sponsors">
    <h1>{{ t("sponsors.title") }}</h1>

    <VFSection :title="t('sponsors.platinaSponsor')">
      <SponsorGrid
        :sponsors="locale === 'ja' ? JaSponsors.PLATINA : EnSponsors.PLATINA"
        :columns="2"
        gap="2rem"
      />
    </VFSection>

    <VFSection :title="t('sponsors.goldSponsor')">
      <SponsorGrid
        :sponsors="locale === 'ja' ? JaSponsors.GOLD : EnSponsors.GOLD"
        :columns="bp === 'mobile' ? 2 : 3"
      />
    </VFSection>

    <VFSection :title="t('sponsors.silverSponsor')">
      <SponsorGrid
        :sponsors="locale === 'ja' ? JaSponsors.SILVER : EnSponsors.SILVER"
        :columns="bp === 'mobile' ? 2 : 4"
        gap="2rem"
      />
    </VFSection>

    <VFSection :title="t('sponsors.bronzeSponsor')">
      <SponsorGrid
        :sponsors="locale === 'ja' ? JaSponsors.BRONZE : EnSponsors.BRONZE"
        :columns="bp === 'mobile' ? 2 : 4"
        gap="2rem"
      />
    </VFSection>

    <!-- <VFSection :title="t('sponsors.optionSponsor')">
      <SponsorGrid
        :items="locale === 'ja' ? JaSponsors.OPTION : EnSponsors.OPTION"
        :columns="bp === 'mobile' ? 2 : 4"
        gap="2rem"
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
