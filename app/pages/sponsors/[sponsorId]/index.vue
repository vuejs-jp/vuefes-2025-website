<script setup lang="ts">
import { useLocaleRoute, useRoute } from "@typed-router";
import SponsorTag from "../_components/SponsorTag.vue";
import XIcon from "~icons/icons/ic_x";
import GithubIcon from "~icons/icons/ic_github";
import BlueskyIcon from "~icons/icons/ic_bluesky";
import { SPONSORS as JaSponsors } from "~~/i18n/ja/sponsors";
import { SPONSORS as EnSponsors } from "~~/i18n/en/sponsors";
import type { Sponsor } from "~~/i18n/sponsor";
import {
  computed,
  defineOgImage,
  definePageMeta,
  useI18n,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useHead,
  useSeoMeta,
  nextTick,
  onMounted,
} from "#imports";
import { VFSection } from "#components";

type TalkTrack = "hacomono" | "mates" | "feature" | "cyberAgent";
type TrackColor = "primary" | "purple" | "orange" | "navy";

definePageMeta({ prerender: true });

const route = useRoute("sponsors-sponsorId");
const { t, locale } = useI18n();
const localeRoute = useLocaleRoute();

type SponsorWithPlan = Omit<Sponsor, "plan"> & { plan: string };

const sponsors = computed((): SponsorWithPlan[] => {
  const sponsorData = locale.value === "ja" ? JaSponsors : EnSponsors;
  return Object.entries(sponsorData)
    .filter(([plan]) => plan !== "OPTION") // OPTIONプロパティを除外
    .flatMap(([plan, planSponsors]) =>
      (planSponsors as Sponsor[]).map(sponsor => ({ ...sponsor, plan })),
    ) as SponsorWithPlan[];
});

const currentSponsor = computed((): SponsorWithPlan | undefined =>
  sponsors.value.find(sponsor => sponsor.id === route.params.sponsorId),
);

useSeoMeta({
  title: () => `${currentSponsor.value?.name || t("sponsors.title")}`,
  ogTitle: () => `Vue Fes Japan 2025 - ${currentSponsor.value?.name || t("sponsors.title")}`,
});

defineOgImage({
  component: "OgSponsor",

  props: {
    name: () => currentSponsor.value?.name,
    logoImageUrl: () => currentSponsor.value?.logoImageUrl,
    plan: () => currentSponsor.value?.plan,
  },
});

const accentColorName = (talkTrack: TalkTrack): TrackColor => {
  switch (talkTrack) {
    case "hacomono":
      return "primary";
    case "mates":
      return "purple";
    case "feature":
      return "orange";
    case "cyberAgent":
      return "navy";
    default:
      return "primary";
  }
};

const trackStyles = (talkTrack: TalkTrack) => ({
  "--base-color": `var(--color-${accentColorName(talkTrack)}-base)`,
  "--sub-color": `var(--color-${accentColorName(talkTrack)}-sub)`,
});

onMounted(async () => {
  if (!route.hash) return;
  const targetElement = document.getElementById(route.hash.substring(1));

  if (targetElement === null) return;
  await nextTick();
  requestAnimationFrame(() => targetElement.scrollIntoView());
});
</script>

<template>
  <div v-if="currentSponsor" id="pages-sponsor-detail">
    <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
    <h1>Sponsor</h1>

    <VFSection :title="t('sponsors.details')">
      <div class="sponsor-images">
        <div class="image">
          <NuxtLink :to="currentSponsor.linkUrl" external target="_blank">
            <img :src="currentSponsor.logoImageUrl" :alt="currentSponsor.logoImageAlt">
          </NuxtLink>
        </div>
        <NuxtLink :to="currentSponsor.linkUrl" external target="_blank" style="text-decoration: none;">
          <h2 class="name">
            {{ currentSponsor.name }}
          </h2>
        </NuxtLink>
      </div>
      <ul class="sponsor-tags">
        <li v-if="currentSponsor.plan !== 'OPTION_ONLY'">
          <SponsorTag :plan="currentSponsor.plan" />
        </li>
        <li v-for="option in currentSponsor.option" :key="option">
          <SponsorTag :plan="option" />
        </li>
      </ul>
      <div class="sponsor-description">
        {{ currentSponsor.description }}
      </div>

      <div v-if="currentSponsor.session" class="sponsor-session">
        <hr />

        <div v-for="session in currentSponsor.session" :key="session.speaker.id" class="sponsor-speaker-item">
          <div v-if="session.speaker.talkTrack" class="session-track" :style="trackStyles(session.speaker.talkTrack)">
            <div class="speaker-track">
              {{ t(`timetable.track.${session.speaker.talkTrack}`) }}
            </div>
            <div class="speaker-time">
              {{ session.speaker.talkSchedule }}
            </div>
          </div>

          <div class="session-speaker-image">
            <img :src="session.speaker.avatarUrl" :alt="session.speaker.name" loading="lazy" />
          </div>

          <div class="session-detail">
            <h4 :id="session.speaker.id" class="sponsor-speaker-title">
              {{ session.title }}
            </h4>
            <p v-if="session.overview" class="sponsor-speaker-overview">
              <template v-for="(paragraph, idx) in session.overview?.split('\n')" :key="idx">
                <template v-if="paragraph">
                  <p :style="paragraph.startsWith('・') ? 'text-indent: -1em; padding-left: 1em;' : ''">
                    {{ paragraph }}
                  </p>
                </template>
                <template v-else>
                  <span class="sponsor-speaker-overview-spacer"></span>
                </template>
              </template>
            </p>
          </div>

          <div class="speaker">
            <p class="speaker-affiliation">
              {{ session.speaker.affiliation }}<br v-if="session.speaker.affiliation && session.speaker.title" />
              {{ session.speaker.title }}
            </p>

            <div class="speaker-name">
              {{ session.speaker.name }}
            </div>

            <div class="speaker-socials">
              <NuxtLink
                v-if="session.speaker.socialUrls?.github"
                :to="session.speaker.socialUrls.github"
                external
                target="_blank"
              >
                <GithubIcon :aria-label="t('snsIconImageAlt.github')" role="img" />
              </NuxtLink>

              <NuxtLink
                v-if="session.speaker.socialUrls?.x"
                :to="session.speaker.socialUrls.x"
                external
                target="_blank"
              >
                <XIcon :aria-label="t('snsIconImageAlt.x')" role="img" />
              </NuxtLink>

              <NuxtLink
                v-if="session.speaker.socialUrls?.bluesky"
                :to="session.speaker.socialUrls.bluesky"
                external
                target="_blank"
              >
                <BlueskyIcon :aria-label="t('snsIconImageAlt.bluesky')" role="img" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div class="view-all-sponsors">
        <VFButton outlined :link="localeRoute({ name: 'sponsors' })">
          {{ t("back") }}
        </VFButton>
      </div>
    </VFSection>
  </div>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

#pages-sponsor-detail{
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

  hr{
    margin: 0;
    border: solid 1px  var(--color-divider);
  }
}

.sponsor-images {
  display: grid;
  width: fit-content;
  max-width: 400px;
  margin: 0 auto;

  img {
    aspect-ratio: 399.983 / 224.792;
  }

  .name {
    margin-top: 1rem;
  }
}

.sponsor-tags{
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 2rem;

  @media (--mobile){
    margin-top: 1.5rem;
  }
}
.sponsor-description{
  margin: 2rem 0;

  @media (--mobile){
    margin: 1.5rem 0;
  }
}

/* sponsor session */

.sponsor-session{
  display: grid;
  gap: 2rem 0;
  margin-top: 2rem;

}

.sponsor-speaker-item{
  display: grid;
  grid-template-columns: calc(180 / 832 * 100%) 1fr;
  grid-template-rows: repeat(3,auto);
  grid-template-areas: "track track" "image session" "image speaker";
  gap: 1rem 2rem;
  @media (--mobile){
    grid-template-columns: repeat(2,calc(50% - 0.75rem));
    grid-template-areas: "track track" "image speaker" "session session";
    gap: 1.5rem;
  }
}

.sponsor-speaker-overview {
  margin-bottom: 2.5rem;
  white-space: pre-wrap;
  @media (--mobile){
    margin-bottom: 2.25rem;
  }
}

.sponsor-speaker-overview-spacer {
  display: block;
  height: 1.25em;
  @media (--mobile){
    height: 1rem;
  }
}

.session-detail{
  grid-area: session;
  h4{
    margin: 0 0 1.5rem;
    font-size: var(--typography-h2-size);
    line-height: var(--typography-h2-line-height);
    font-family: IBMPlexSansJP-Bold;
    scroll-margin-top: 102px;
    @media (--mobile){
      margin-bottom: 0.5rem;
      scroll-margin-top: 74px;
    }
  }
  p{
    margin-top: 8px;
  }
}
.session-speaker-image{
  grid-area: image;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  overflow: hidden;
  img{
    width: 100%;
  }
}

.speaker{
  grid-area: speaker;
}
.speaker-affiliation{
  margin: 0;
  font-size: var(--typography-caption-size);
  line-height: var(--typography-caption-line-height);
}
.speaker-name{
  margin-top: 4px;
  font-size: var(--typography-h2-size);
  line-height: var(--typography-h2-line-height);
}

.speaker-socials {
  display: flex;
  gap: 0.25rem;
  margin-top: 0.25rem;

  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--color-text-default);
    transition: transform 0.2s;

    @media (any-hover: hover) {
      &:hover {
        transform: scale(1.1);
      }
    }
  }
}

.view-all-sponsors{
  display: grid;
  place-items: center;
  margin-top: 2rem;
  @media (--mobile){
    margin-bottom: 1.5rem;
  }
}

.session-track {
  grid-area: track;
}

.speaker-track{
  display: grid;
  place-items: center;
  width: fit-content;
  height: 32px;
  padding: 0 8px;
  border-radius: 4px;
  background-color: var(--base-color);
  color: var(--sub-color);
    @media (--mobile) {
      height: 29px;
      font-size: 14px;
    }
}
.speaker-time{
  display: grid;
  place-items: center;
  width: fit-content;
  height: 28px;
  margin-top: 8px;
  margin-bottom: 16px;
  padding: 0 16px;
  font-family: JetBrainsMono-Medium;
  font-size: 14px;
  border: 1px solid var(--base-color);
  border-radius: 100px;
  background-color: #fff;
  color: var(--base-color);
  @media (--mobile) {
    height: 25px;
    margin-bottom: 0;
    font-size: 12px;
  }
}
</style>
