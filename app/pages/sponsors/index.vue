<script setup lang="ts">
import SponsorGrid from "../../components/SponsorGrid.vue";
import { SPONSORS as JaSponsors } from "~~/i18n/ja/sponsors";
import { SPONSORS as EnSponsors } from "~~/i18n/en/sponsors";
import type { OptionSponsor } from "~~/i18n/sponsor";

import {
  definePageMeta,
  useBreakpoint,
  useI18n,
  useRuntimeConfig,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useHead,
  useSeoMeta,
  defineOgImage,
} from "#imports";
import { VFSection } from "#components";

definePageMeta({ prerender: true });

const runtimeConfig = useRuntimeConfig();
const { t, locale } = useI18n();
const bp = useBreakpoint();
defineOgImage({
  component: "root",
  url: `${runtimeConfig.public.siteUrl}images/og/sponsors.png`,
});
useSeoMeta({
  title: t("sponsors.title"),
  ogTitle: t("sponsors.title"),
});
</script>

<template>
  <div id="pages-sponsors">
    <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
    <h1>Sponsor</h1>

    <VFSection id="platina-sponsor" :title="t('sponsors.platinaSponsor')">
      <SponsorGrid
        :sponsors="locale === 'ja' ? JaSponsors.PLATINA : EnSponsors.PLATINA"
        :columns="bp === 'mobile' ? 1 : 2"
        :gap="bp === 'mobile' ? '24px' : '32px'"
      />
    </VFSection>

    <VFSection id="gold-sponsor" :title="t('sponsors.goldSponsor')">
      <SponsorGrid
        :sponsors="locale === 'ja' ? JaSponsors.GOLD : EnSponsors.GOLD"
        :columns="bp === 'mobile' ? 2 : 3"
        :gap="bp === 'mobile' ? '24px' : '32px'"
      />
    </VFSection>

    <VFSection id="silver-sponsor" :title="t('sponsors.silverSponsor')">
      <SponsorGrid
        :sponsors="locale === 'ja' ? JaSponsors.SILVER : EnSponsors.SILVER"
        :columns="bp === 'mobile' ? 2 : 4"
        :gap="bp === 'mobile' ? '24px' : '32px'"
      />
    </VFSection>

    <VFSection id="bronze-sponsor" :title="t('sponsors.bronzeSponsor')">
      <SponsorGrid
        :sponsors="locale === 'ja' ? JaSponsors.BRONZE : EnSponsors.BRONZE"
        :columns="bp === 'mobile' ? 2 : 4"
        :gap="bp === 'mobile' ? '24px' : '32px'"
      />
    </VFSection>

    <VFSection id="option-sponsor" :title="t('sponsors.optionSponsor')">
      <div
        v-for="option in (locale === 'ja' ? JaSponsors.OPTION : EnSponsors.OPTION) as OptionSponsor[]"
        :key="option.title"
      >
        <div
          v-if="option.data.length > 0"
          class="sponsor-option-container"
        >
          <h2 class="sponsor-option-title">
            {{ t(`sponsors.${option.title}`) }}
          </h2>
          <SponsorGrid
            :sponsors="option.data"
            :columns="bp === 'mobile' ? 2 : 4"
            gap="24px"
          />
        </div>
      </div>
    </VFSection>

    <VFSection id="creative-sponsor" :title="t('sponsors.creativeSponsor')">
      <SponsorGrid
        :sponsors="locale === 'ja' ? JaSponsors.CREATIVE : EnSponsors.CREATIVE"
        :columns="bp === 'mobile' ? 2 : 3"
        :gap="bp === 'mobile' ? '24px' : '32px'"
      />
    </VFSection>
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

.sponsor-option-container {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  margin-top: 40px;

  @media (--mobile) {
    margin-top: 32px;
  }
}

.sponsor-option-title {
  display: flex;
  align-items: center;
  column-gap: 8px;
  margin: 0;
  color: var(--color-text-default);
}
</style>
