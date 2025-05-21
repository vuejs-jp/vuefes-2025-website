<script setup lang="ts">
import { SESSION_SPEAKERS as enSessionSpeakers } from "../../../i18n/en/speakers";
import { SESSION_SPEAKERS as jaSessionSpeakers } from "../../../i18n/ja/speakers";
import { VFSection } from "#components";
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
      <ul class="speakers">
        <li v-for="speaker in sessionSpeakers" :key="speaker.name" class="speaker">
          <img :src="speaker.avatarUrl" :alt="''" class="speaker-image" />
          <p class="speaker-affiliation text-caption">
            {{ speaker.affiliation }}
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
    font-size: 3rem;
    padding: 7.5rem 0.5rem;
    margin: 0.5rem 0;

    @media (--mobile) {
      padding: 2.5rem 1rem;
    }
  }

  .speakers {
    --size: 180px;

    @media (--mobile) {
      --size: 156px;
    }

    display: grid;
    justify-items: center;
    grid-template-columns: repeat(auto-fill, minmax(var(--size), 1fr));
    row-gap: 32px;

    @media (--mobile) {
      row-gap: 24px;
    }

    .speaker {
      width: var(--size);
      height: fit-content;

      .speaker-image {
        width: 100%;
        height: var(--size);
        border-radius: var(--radius-m);
        object-fit: cover;

      }

      .speaker-affiliation {
        margin-top: 0.5rem;
      }

      .speaker-name {
        margin-top: 0.5rem;
      }

      .speaker-socials {
        display: flex;

        gap: 0.5rem;
        margin-top: 0.5rem;

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
