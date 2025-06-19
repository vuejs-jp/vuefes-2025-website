<script setup lang="ts">
import XIcon from "~icons/icons/ic_x";
import GithubIcon from "~icons/icons/ic_github";
import BlueskyIcon from "~icons/icons/ic_bluesky";
import { useI18n } from "#imports";

const { t } = useI18n();

defineProps<{
  speaker: {
    name: string;
    avatarUrl: string;
    affiliation?: string;
    title?: string;
    socialUrls?: {
      github?: string;
      x?: string;
      bluesky?: string;
    };
  };
}>();
</script>

<template>
  <li class="speaker">
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
    </div>
  </li>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.speaker {
  width: 100%;

  .speaker-image {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 10px;
    object-fit: cover;
    border: 1px solid var(--color-divider-light);
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
</style>
