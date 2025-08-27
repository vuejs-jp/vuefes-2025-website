<script setup lang="ts">
import { useLocaleRoute } from "@typed-router";
import { SESSION_SPEAKERS as enSessionSpeakers, LT_SPEAKERS as enLTSpeakers, PANEL_DISCUSSION_SPEAKERS as enPanelSpeakers } from "../../../i18n/en/speakers";
import { SESSION_SPEAKERS as jaSessionSpeakers, LT_SPEAKERS as jaLTSpeakers, PANEL_DISCUSSION_SPEAKERS as jaPanelSpeakers } from "../../../i18n/ja/speakers";
import SpeakerCard from "./_components/SpeakerCard.vue";
import { VFSection, JaSpeaker, EnSpeaker, JaPanelDiscussion, EnPanelDiscussion } from "#components";
import {
  computed,
  defineRouteRules,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useHead,
  useSeoMeta,
  useI18n,
  useRuntimeConfig,
  defineOgImage,
  useQueryHashSync,
  useRoute,
} from "#imports";

// To differentiate OGP based on query params
defineRouteRules({ prerender: false });

const runtimeConfig = useRuntimeConfig();
const { t, locale } = useI18n();
const localeRoute = useLocaleRoute();

const sessionSpeakers = computed(() => locale.value === "en" ? enSessionSpeakers : jaSessionSpeakers);
const ltSpeakers = computed(() => locale.value === "en" ? enLTSpeakers : jaLTSpeakers);
const panelSpeakers = computed(() => locale.value === "en" ? enPanelSpeakers : jaPanelSpeakers);

const SectionId = {
  Sessions: "sessions",
  LightningTalks: "lightning-talks",
  PanelDiscussion: "panel-discussion",
} as const;

const route = useRoute();

useQueryHashSync({ queryKey: "section" });

defineOgImage({
  url: route.query.section === SectionId.PanelDiscussion
    ? `${runtimeConfig.public.siteUrl}images/og/panel-discussion.png`
    : `${runtimeConfig.public.siteUrl}images/og/speaker.png`,
});
useSeoMeta({
  title: () =>
    route.query.section === SectionId.PanelDiscussion
      ? t("event.panel.talkTitle")
      : t("speakers.title"),
  ogTitle: () =>
    route.query.section === SectionId.PanelDiscussion
      ? t("event.panel.talkTitle")
      : t("speakers.title"),
  description: () =>
    route.query.section === SectionId.PanelDiscussion
      ? t("event.panel.talkDescription")
      : t("speakers.description"),
  ogDescription: () =>
    route.query.section === SectionId.PanelDiscussion
      ? t("event.panel.talkDescription")
      : t("speakers.description"),
});
</script>

<template>
  <div id="pages-speakers">
    <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
    <h1>Speaker</h1>

    <VFSection :id="SectionId.Sessions" :title="t('speakers.sessions.title')" wide>
      <component :is="locale === 'ja' ? JaSpeaker : EnSpeaker" class="description" />

      <ul class="speakers">
        <SpeakerCard
          v-for="speaker in sessionSpeakers"
          :key="speaker.id"
          :to="localeRoute({ name: 'speaker-speakerId', params: { speakerId: speaker.id } })"
          class="speaker-card-link" :speaker="speaker"
        />
      </ul>
    </VFSection>

    <VFSection :id="SectionId.LightningTalks" :title="t('speakers.lightningTalks.title')" wide>
      <!-- <component :is="locale === 'ja' ? JaSpeaker : EnSpeaker" class="description" /> -->
      <ul class="speakers">
        <SpeakerCard
          v-for="speaker in ltSpeakers"
          :key="speaker.id"
          :speaker="speaker"
          :to="localeRoute({ name: 'speaker-speakerId', params: { speakerId: speaker.id } })"
        />
      </ul>
    </VFSection>

    <VFSection :id="SectionId.PanelDiscussion" :title="t('speakers.panel.title')" wide>
      <component :is="locale === 'ja' ? JaPanelDiscussion : EnPanelDiscussion" class="description" />

      <ul class="speakers">
        <SpeakerCard v-for="speaker in panelSpeakers" :key="speaker.name" :speaker="speaker" />
      </ul>
    </VFSection>
  </div>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

#pages-speakers {
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

  .description {
    margin-bottom: 2rem;

    @media (--mobile) {
      margin-bottom: 1.5rem;
    }
  }

  .speakers {
    --size: 180px;
    margin: 0;

    @media (--mobile) {
      --size: 146px;
    }

    display: grid;
    justify-items: center;
    grid-template-columns: repeat(auto-fill, minmax(var(--size), 1fr));
    row-gap: 32px;
    column-gap: 4.4%;

    @media (--mobile) {
      row-gap: 24px;
      column-gap: 24px;
    }
  }
}
</style>
