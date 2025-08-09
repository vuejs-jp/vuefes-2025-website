<script setup lang="ts">
import { useLocaleRoute } from "@typed-router";
import { HOME_HEADING_ID } from "~/constant";
import { useBreakpoint, useI18n, useWithBase } from "#imports";
import { VFSection, SponsorGrid } from "#components";
import { SPONSORS as JaSponsors } from "~~/i18n/ja/sponsors";
import { SPONSORS as EnSponsors } from "~~/i18n/en/sponsors";
import type { OptionSponsor } from "~~/i18n/sponsor";

const bp = useBreakpoint();
const withBase = useWithBase();
const { t, locale } = useI18n();
const localeRoute = useLocaleRoute();
</script>

<template>
  <VFSection
    :id="HOME_HEADING_ID.sponsorWanted"
    :cover-image="{
      src: bp === 'pc'
        ? withBase('/images/top/cover/sponsors-pc.svg')
        : withBase('/images/top/cover/sponsors-sp.svg'),
      alt: t('sponsors.coverImageAlt'),
    }"
  >
    <div class="sponsor-list">
      <VFHeading>{{ t('sponsors.platinaSponsor') }}</VFHeading>
      <div class="sponsor-grid-container">
        <SponsorGrid
          :sponsors="locale === 'ja' ? JaSponsors.PLATINA : EnSponsors.PLATINA"
          :columns="bp === 'mobile' ? 1 : 2"
          gap="24px"
          image-only
        />
      </div>
    </div>

    <div class="sponsor-list">
      <VFHeading>{{ t('sponsors.goldSponsor') }}</VFHeading>
      <div class="sponsor-grid-container">
        <SponsorGrid
          :sponsors="locale === 'ja' ? JaSponsors.GOLD : EnSponsors.GOLD"
          :columns="bp === 'mobile' ? 2 : 3"
          gap="24px"
          image-only
        />
      </div>
    </div>

    <div class="sponsor-list">
      <VFHeading>{{ t('sponsors.silverSponsor') }}</VFHeading>
      <div class="sponsor-grid-container">
        <SponsorGrid
          :sponsors="locale === 'ja' ? JaSponsors.SILVER : EnSponsors.SILVER"
          :columns="bp === 'mobile' ? 2 : 4"
          gap="24px"
          image-only
        />
      </div>
    </div>

    <div class="sponsor-list">
      <VFHeading>{{ t('sponsors.bronzeSponsor') }}</VFHeading>
      <div class="sponsor-grid-container">
        <SponsorGrid
          :sponsors="locale === 'ja' ? JaSponsors.BRONZE : EnSponsors.BRONZE"
          :columns="bp === 'mobile' ? 2 : 4"
          gap="24px"
          image-only
        />
      </div>
    </div>

    <div class="sponsor-list">
      <VFHeading>{{ t('sponsors.optionSponsor') }}</VFHeading>
      <div
        v-for="option in (locale === 'ja' ? JaSponsors.OPTION : EnSponsors.OPTION) as OptionSponsor[]"
        :key="option.title"
      >
        <div
          v-if="option.data.length > 0"
          class="sponsor-option-container"
        >
          <h3>{{ t(`sponsors.${option.title}`) }}</h3>
          <SponsorGrid
            :sponsors="option.data"
            :columns="bp === 'mobile' ? 2 : 4"
            gap="24px"
            image-only
          />
        </div>
      </div>
    </div>

    <div class="sponsor-list">
      <VFHeading>{{ t('sponsors.creativeSponsor') }}</VFHeading>
      <div class="sponsor-grid-container">
        <SponsorGrid
          :sponsors="locale === 'ja' ? JaSponsors.CREATIVE : EnSponsors.CREATIVE"
          :columns="bp === 'mobile' ? 2 : 3"
          gap="24px"
          image-only
        />
      </div>
    </div>

    <div class="view-all-sponsors">
      <VFButton :link="localeRoute({ name: 'sponsors' })">
        {{ t('sponsors.viewAll') }}
      </VFButton>
    </div>
  </VFSection>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.sponsor-list:first-child{
  margin-top: -2rem;
}
.sponsor-list:not(:first-child){
  margin-top: 2rem;
}

.view-all-sponsors{
  display: grid;
  place-items: center;
  margin-top: 32px;
}

.sponsor-grid-container {
  margin-top: 32px;
  margin-bottom: 40px;

  @media (--mobile) {
    margin-top: 24px;
    margin-bottom: 24px;
  }
}

.sponsor-option-container {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}
</style>
