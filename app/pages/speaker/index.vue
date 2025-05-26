<script setup lang="ts">
import { SESSION_SPEAKERS as enSessionSpeakers } from "../../../i18n/en/speakers";
import { SESSION_SPEAKERS as jaSessionSpeakers } from "../../../i18n/ja/speakers";
import { VFSection, JaSpeaker, EnSpeaker } from "#components";
import { computed, useI18n } from "#imports";

import XIcon from "~icons/icons/ic_x";
import GithubIcon from "~icons/icons/ic_github";
import BlueskyIcon from "~icons/icons/ic_bluesky";

const { t, locale } = useI18n();

const sessionSpeakers = computed(() => locale.value === "en" ? enSessionSpeakers : jaSessionSpeakers);
</script>

<template>
  <div id="pages-speakers">
    <h1>{{ t("speakers.title") }}</h1>

    <VFSection :title="t('speakers.sessions.title')" wide>
      <component :is="locale === 'ja' ? JaSpeaker : EnSpeaker" class="description" />

      <ul class="speakers">
        <li v-for="speaker in sessionSpeakers" :key="speaker.name" class="speaker">
          <img :src="speaker.avatarUrl" :alt="''" class="speaker-image" />
          <p class="speaker-affiliation text-caption">
            {{ speaker.affiliation }}<br v-if="speaker.affiliation && speaker.title" />
            {{ speaker.title }}
          </p>
          <h3 class="speaker-name">
            {{ speaker.name }}
          </h3>

          <div class="speaker-socials">
            <NuxtLink v-if="speaker.socialUrls?.github" :to="speaker.socialUrls.github" target="_blank">
              <GithubIcon :aria-label="t('snsIconImageAlt.github')" role="img" />
            </NuxtLink>

            <NuxtLink v-if="speaker.socialUrls?.x" :to="speaker.socialUrls.x" target="_blank">
              <XIcon :aria-label="t('snsIconImageAlt.x')" role="img" />
            </NuxtLink>

            <NuxtLink v-if="speaker.socialUrls?.bluesky" :to="speaker.socialUrls.bluesky" target="_blank">
              <BlueskyIcon :aria-label="t('snsIconImageAlt.bluesky')" role="img" />
            </NuxtLink>
            <!-- TODO: mastodon -->
          </div>
        </li>
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

    .speaker {
      width: 100%;
      /* height: fit-content; */

      .speaker-image {
        width: 100%;
        aspect-ratio: 1 / 1;
        border-radius: 10px;
        object-fit: cover;

      }

      .speaker-affiliation {
        margin: 1rem 0 0;
        @media (--mobile) {
          margin: 0.75rem 0 0;
        }
      }

      .speaker-name {
        font-size: 18px;
        line-height: 1.5;
        margin: 0.25rem 0 0;
        @media (--mobile) {
          font-size: 16px;
        }

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

          &:hover {
            transform: scale(1.1);
          }
        }
      }
    }
  }
}
</style>
