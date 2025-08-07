<script setup lang="ts">
import { useLocaleRoute, useRoute } from "@typed-router";
import { SESSION_SPEAKERS as enSessionSpeakers, LT_SPEAKERS as enLT_Speakers, PANEL_DISCUSSION_SPEAKERS as enPanelSpeakers } from "../../../../i18n/en/speakers";
import { SESSION_SPEAKERS as jaSessionSpeakers, LT_SPEAKERS as jaLT_Speakers, PANEL_DISCUSSION_SPEAKERS as jaPanelSpeakers } from "../../../../i18n/ja/speakers";
import XIcon from "~icons/icons/ic_x";
import GithubIcon from "~icons/icons/ic_github";
import BlueskyIcon from "~icons/icons/ic_bluesky";
import {
  computed,
  defineOgImage,
  definePageMeta,
  useI18n,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useHead,
  useSeoMeta,
} from "#imports";
import { VFSection } from "#components";

definePageMeta({ prerender: true });

const route = useRoute("speaker-speakerId");
const { t, locale } = useI18n();
const localeRoute = useLocaleRoute();

const speakers = computed(() =>
  locale.value === "ja"
    ? [
        ...jaSessionSpeakers.map(it => ({ ...it, type: "session" as const })),
        ...jaLT_Speakers.map(it => ({ ...it, type: "lt" as const })),
        ...jaPanelSpeakers.map(it => ({ ...it, type: "panel" as const })),
      ]
    : [
        ...enSessionSpeakers.map(it => ({ ...it, type: "session" as const })),
        ...enLT_Speakers.map(it => ({ ...it, type: "lt" as const })),
        ...enPanelSpeakers.map(it => ({ ...it, type: "panel" as const })),
      ],
);

const currentSpeaker = computed(() =>
  speakers.value.find(speaker => speaker.id === route.params.speakerId),
);

useSeoMeta({
  title: () => `${currentSpeaker.value?.name || t("speakers.title")}`,
  ogTitle: () => `Vue Fes Japan 2025 - ${currentSpeaker.value?.name || t("speakers.title")}`,
  description: () => currentSpeaker.value?.talkTitle,
  ogDescription: () => currentSpeaker.value?.talkTitle,
});

defineOgImage({
  component: "OgSpeaker",
  props: {
    name: () => currentSpeaker.value?.name,
    avatarUrl: () => currentSpeaker.value?.avatarUrl,
    speakerTitle: () => currentSpeaker.value?.title,
    affiliation: () => currentSpeaker.value?.affiliation,
    color: () => currentSpeaker.value?.color || "default",
  },
});
</script>

<template>
  <div v-if="currentSpeaker" id="pages-speaker-detail">
    <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
    <h1>Speaker</h1>

    <VFSection :title="currentSpeaker?.type === 'session' ? t('speakers.sessions.information') : t('speakers.lightningTalks.information')">
      <!-- TODO: track name -->
      <!-- TODO: time -->

      <div class="speaker-information">
        <div class="speaker-avatar">
          <img :src="currentSpeaker.avatarUrl" :alt="currentSpeaker.name">
        </div>
        <div class="speaker-details">
          <h3 class="session-title">
            {{ currentSpeaker.talkTitle || "TBD" }}
          </h3>

          <p v-if="currentSpeaker.talkOverview" class="session-overview">
            <template v-for="(paragraph, idx) in currentSpeaker.talkOverview?.split('\n')" :key="idx">
              <template v-if="paragraph">
                <p :style="paragraph.startsWith('・') ? 'text-indent: -1em; padding-left: 1em;' : ''">
                  {{ paragraph }}
                </p>
              </template>
              <template v-else>
                <span class="session-overview-spacer"></span>
              </template>
            </template>
          </p>

          <div class="speaker-meta">
            <p v-if="currentSpeaker.title" class="speaker-title">
              {{ currentSpeaker.title }}
            </p>
            <p v-if="currentSpeaker.affiliation" class="speaker-affiliation">
              {{ currentSpeaker.affiliation }}
            </p>
          </div>

          <h3 class="speaker-name">
            {{ currentSpeaker.name }}
          </h3>

          <div v-if="currentSpeaker.socialUrls" class="speaker-social">
            <a
              v-if="currentSpeaker.socialUrls.github"
              :href="currentSpeaker.socialUrls.github"
              target="_blank"
              aria-label="GitHub"
            >
              <GithubIcon width="1.5rem" height="1.5rem" />
            </a>
            <a
              v-if="currentSpeaker.socialUrls.x"
              :href="currentSpeaker.socialUrls.x"
              target="_blank"
              aria-label="X (Twitter)"
            >
              <XIcon width="1.5rem" height="1.5rem" />
            </a>
            <a
              v-if="currentSpeaker.socialUrls.bluesky"
              :href="currentSpeaker.socialUrls.bluesky"
              target="_blank"
              aria-label="Bluesky"
            >
              <BlueskyIcon width="1.5rem" height="1.5rem" />
            </a>
          </div>
        </div>

        <!-- Mobile layout -->
        <div class="speaker-meta-mobile">
          <p v-if="currentSpeaker.title" class="speaker-title">
            {{ currentSpeaker.title }}
          </p>
          <p v-if="currentSpeaker.affiliation" class="speaker-affiliation">
            {{ currentSpeaker.affiliation }}
          </p>

          <h3 class="speaker-name">
            {{ currentSpeaker.name }}
          </h3>

          <div v-if="currentSpeaker.socialUrls" class="speaker-social">
            <a
              v-if="currentSpeaker.socialUrls.github"
              :href="currentSpeaker.socialUrls.github"
              target="_blank"
              aria-label="GitHub"
            >
              <GithubIcon width="1.5rem" height="1.5rem" />
            </a>
            <a
              v-if="currentSpeaker.socialUrls.x"
              :href="currentSpeaker.socialUrls.x"
              target="_blank"
              aria-label="X (Twitter)"
            >
              <XIcon width="1.5rem" height="1.5rem" />
            </a>
            <a
              v-if="currentSpeaker.socialUrls.bluesky"
              :href="currentSpeaker.socialUrls.bluesky"
              target="_blank"
              aria-label="Bluesky"
            >
              <BlueskyIcon width="1.5rem" height="1.5rem" />
            </a>
          </div>
        </div>

        <h3 class="session-title-mobile">
          {{ currentSpeaker.talkTitle || "TBD" }}
        </h3>

        <p v-if="currentSpeaker.talkOverview" class="session-overview-mobile">
          <template v-for="(paragraph, idx) in currentSpeaker.talkOverview?.split('\n')" :key="idx">
            <template v-if="paragraph">
              <p :style="paragraph.startsWith('・') ? 'text-indent: -1em; padding-left: 1em;' : ''">
                {{ paragraph }}
              </p>
            </template>
            <template v-else>
              <span class="session-overview-spacer"></span>
            </template>
          </template>
        </p>
      </div>

      <div class="back-to-speakers">
        <VFButton outlined :link="localeRoute({ name: 'speaker' })">
          {{ t("back") }}
        </VFButton>
      </div>
    </VFSection>
  </div>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

#pages-speaker-detail{
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

  .back-to-speakers {
    display: grid;
    place-items: center;
    margin-top: 2rem;

    @media (--mobile) {
      margin-top: 1.5rem;
    }
  }
}

.speaker-information {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 2rem;

  @media (--mobile) {
    grid-template-columns: auto 1fr;
    column-gap: 1.5rem;
  }

  .speaker-avatar {
    width: 11.25rem;
    height: 11.25rem;

    @media (--mobile) {
      width: 9.75rem;
      height: 9.75rem;
    }

    img {
      width: 100%;
      aspect-ratio: 1 / 1;
      border-radius: .625rem;
      object-fit: cover;
      border: .0625rem solid var(--color-divider-light);
    }
  }

  .speaker-details {
    @media (--mobile) {
      display: none;
    }

    h3.session-title {
      font-size: 1.125rem;
      line-height: 1.5;
      margin: 0 0 2rem 0;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      word-break: normal;
      line-break: strict;
    }

    .session-overview {
      margin-bottom: 2.5rem;
      white-space: pre-wrap;
    }

    .speaker-meta {
      .speaker-title,
      .speaker-affiliation {
        font-size: .6875rem;
        line-height: 1.0313rem;
        margin: 0;
      }
    }

    h3.speaker-name {
      margin: 0.25rem 0;
      font-size: 1.125rem;
      line-height: 1.6875rem;
    }

    .speaker-social {
      display: flex;
      gap: 0.25rem;
      a {
        width: 1.5rem;
        height: 1.5rem;
        display: inline-flex;
      }
    }
  }

  .speaker-meta-mobile {
    display: none;

    @media (--mobile) {
      display: grid;
      align-content: start;
      padding-top: 0.25rem;
    }

    .speaker-title,
    .speaker-affiliation {
      font-size: .625rem;
      line-height: .9375rem;
      margin: 0;
    }

    .speaker-name {
      margin: 0.25rem 0;
      font-size: 1rem;
      line-height: 1.5rem;
    }

    .speaker-social {
      display: flex;
      gap: 0.25rem;
      a {
        width: 1.5rem;
        height: 1.5rem;
        display: inline-flex;
      }
    }

  }

  .session-title-mobile {
    display: none;
    font-size: 1rem;
    line-height: 1.5rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    word-break: normal;
    line-break: strict;

    @media (--mobile) {
      display: block;
      grid-column: 1 / -1;
    }
  }

  .session-overview-mobile {
    display: none;
    margin-bottom: 1rem;
    white-space: pre-wrap;

    @media (--mobile) {
      display: block;
      grid-column: 1 / -1;
      margin-bottom: 0;
    }
  }

  .session-overview-spacer {
    display: block;
    height: 1.25em;
  }
}
</style>
