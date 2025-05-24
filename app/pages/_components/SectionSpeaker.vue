<script setup lang="ts">
import Carousel from "primevue/carousel";
import { useLocaleRoute } from "@typed-router";
import { SESSION_SPEAKERS as enSpeakers } from "../../../i18n/en/speakers";
import { SESSION_SPEAKERS as jaSpeakers } from "../../../i18n/ja/speakers";
import { computed, useI18n } from "#imports";
import { EnSpeaker, JaSpeaker, VFButton } from "#components";
import type { Speaker } from "~~/i18n/speaker";
import { HOME_HEADING_ID } from "~/constant";

const { t, locale } = useI18n();
const localeRoute = useLocaleRoute();

interface ColorSet {
  base: string;
  sub: string;
}

class ColorSetIter {
  static THEMES = ["primary", "orange", "navy", "purple"];
  private index = -1;

  public next(): ColorSet {
    this.index = (this.index + 1) % ColorSetIter.THEMES.length;
    const theme = ColorSetIter.THEMES[this.index];
    return {
      base: `var(--color-${theme}-base)`,
      sub: `var(--color-${theme}-sub)`,
    };
  }
}

type CarouselSpeaker = Speaker & {
  id: string;
  color: ColorSet;
};

const speakers = computed<CarouselSpeaker[]>(() => {
  const colorSetIter = new ColorSetIter();

  const _speakers
    = (locale.value === "en" ? enSpeakers : jaSpeakers)
      .filter(it => it.attended)
      .map(it => ({
        ...it,
        id: it.name,
        color: colorSetIter.next(),
      }));

  return [
    { ..._speakers[_speakers.length - 1]! },
    ..._speakers,
    { ..._speakers[0]! },
  ];
});
</script>

<template>
  <VFSection
    :id="HOME_HEADING_ID.speaker"
    :title="t('speakers.title')"
    class="section-speakers"
  >
    <component :is="locale === 'ja' ? JaSpeaker : EnSpeaker" />

    <h3 class="featured-speaker-heading">
      {{ t('speakers.featured') }}
    </h3>

    <div class="carousel">
      <Carousel :value="speakers" circular :num-visible="3" :num-scroll="1">
        <template #item="{ data: speaker }">
          <div
            class="speaker-card"
            :style="{
              backgroundImage: `url(${speaker.avatarUrl}) `,
            }"
          >
            <p
              v-if="speaker.affiliation"
              :style="{
                color: speaker.color.base,
                backgroundColor: speaker.color.sub,
              }"
              class="speaker-affiliation"
            >
              {{ speaker.affiliation }}
            </p>

            <div
              class="speaker-name"
              :style="{
                color: speaker.color.sub,
                backgroundColor: speaker.color.base,
              }"
            >
              {{ speaker.name }}
            </div>
          </div>
        </template>
      </Carousel>
    </div>

    <div class="view-all-speakers">
      <VFButton :link="localeRoute({ name: 'speaker' })">
        {{ t('speakers.viewAll') }}
      </VFButton>
    </div>
  </VFSection>
</template>

<style>
@import "~/assets/styles/custom-media-query.css";

.section-speakers {
  container-type: inline-size;
  /* overrides primevue carousel styles */
  .p-carousel {
    position: relative;

    .p-carousel-content {
      [data-pc-name=pcnextbutton],
      [data-pc-name=pcprevbutton] {
        position: absolute;
        bottom: -64px; /* button size (48px) + margin (16px)  */
        color: var(--color-base);
        border: 1px solid var(--color-base);
        border-radius: 50%;
        width: 48px;
        height: 48px;

        /* reset */
        &:hover {
          color: var(--color-base);
          border: 1px solid var(--color-base);
        }
      }

      [data-pc-name=pcprevbutton] {
        left: calc(50% - 48px - 4px); /* 50% - button size (48px) - gap (8px / 2 = 4px) */
      }

      [data-pc-name=pcnextbutton] {
        right: calc(50% - 48px - 4px); /* 50% - button size (48px) - gap (8px / 2 = 4px) */
      }

      .p-carousel-viewport {
        .p-items-hidden .p-carousel-item {
          visibility: visible;
        }
      }
    }
  }
}
</style>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.section-speakers {
  overflow: hidden;
  h3.featured-speaker-heading {
    margin-bottom: 1rem;
    color: var(--color-base);
    text-align: center;
    font-size: 18px;

    @media (--mobile) {
      margin-top: 1.5rem;
      font-size: 16px;
    }
  }

  .speaker-card {
    position: relative;
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    height: 341px;
    overflow: hidden;
    margin-inline: 0.55rem;

    .speaker-affiliation {
      position: absolute;
      right: 0;
      padding: 0.4rem 0.53rem;
      font-size: 0.75rem;
      font-family: JetBrainsMono-Regular;
      line-height: 1.2;
      letter-spacing: -0.015em;
      text-align: right;
    }

    .speaker-name {
      width: fit-content;
      position: absolute;
      left: 0;
      bottom: 0;
      font-size: 1.53rem;
      font-family: IBMPlexSansJP-Regular;
      padding: 0.667rem 1.067rem 0.533rem 1.067rem;
      line-height: 1;
      letter-spacing: -0.031em;
    }
  }

  .view-all-speakers {
    display: grid;
    place-items: center;
  }
}

.carousel {
  width: 120cqw;
  margin: 0 calc(50% - 60cqw) calc(32px + 16px + 48px);

  @media (--carousel) {
    width: 214cqw;
    margin: 0 calc(50% - 107cqw) calc(24px + 16px + 48px);
  }
}
</style>
