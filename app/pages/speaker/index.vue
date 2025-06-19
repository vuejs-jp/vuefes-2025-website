<script setup lang="ts">
import { SESSION_SPEAKERS as enSessionSpeakers, PANEL_DISCUSSION_SPEAKERS as enPanelSpeakers } from "../../../i18n/en/speakers";
import { SESSION_SPEAKERS as jaSessionSpeakers, PANEL_DISCUSSION_SPEAKERS as jaPanelSpeakers } from "../../../i18n/ja/speakers";
import SpeakerCard from "./_components/SpeakerCard.vue";
import { VFSection, JaSpeaker, EnSpeaker, JaPanelDiscussion, EnPanelDiscussion } from "#components";
import { computed, useI18n } from "#imports";

const { t, locale } = useI18n();

const sessionSpeakers = computed(() => locale.value === "en" ? enSessionSpeakers : jaSessionSpeakers);
const panelSpeakers = computed(() => locale.value === "en" ? enPanelSpeakers : jaPanelSpeakers);
</script>

<template>
  <div id="pages-speakers">
    <h1>{{ t("speakers.title") }}</h1>

    <VFSection :title="t('speakers.sessions.title')" wide>
      <component :is="locale === 'ja' ? JaSpeaker : EnSpeaker" class="description" />

      <ul class="speakers">
        <SpeakerCard v-for="speaker in sessionSpeakers" :key="speaker.name" :speaker="speaker" />
      </ul>
    </VFSection>

    <VFSection :title="t('speakers.panel.title')" wide>
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
