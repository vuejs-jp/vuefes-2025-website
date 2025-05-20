<script setup lang="ts">
import Carousel from "primevue/carousel";
import enSpeakers from "../../../i18n/en/attended-speakers";
import jaSpeakers from "../../../i18n/ja/attended-speakers";
import { computed, useI18n } from "#imports";
import { EnSpeakers, JaSpeakers, VFButton } from "#components";
import type { AttendedSpeaker } from "~~/i18n/speaker";

const { t, locale } = useI18n();

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

type CarouselSpeaker = AttendedSpeaker & {
  id: string;
  color: ColorSet;
};

const speakers = computed<CarouselSpeaker[]>(() => {
  const colorSetIter = new ColorSetIter();

  const _speakers = (locale.value === "en" ? enSpeakers : jaSpeakers).map(it => ({
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
  <VFSection :title="t('speakers.title')" class="section-speakers">
    <component :is="locale === 'ja' ? JaSpeakers : EnSpeakers" />

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
      <VFButton link="/speakers">
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
        bottom: -72px;
        color: var(--color-base);
        border: 1px solid var(--color-base);
        border-radius: 50%;
        width: 50px;
        height: 50px;

        @media (--mobile) {
          width: 48px;
          height: 48px;
        }

        /* reset */
        &:hover {
          color: var(--color-base);
          border: 1px solid var(--color-base);
        }
      }

      [data-pc-name=pcprevbutton] {
        transform: translateX(-50%);
        left: 46%;
      }

      [data-pc-name=pcnextbutton] {
        transform: translateX(50%);
        right: 46%;
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
    color: var(--color-base);
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .speaker-card {
    position: relative;
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    height: 341px;
    overflow: hidden;
    border: 1px solid var(--color-divider-light);
    margin-inline: 0.5rem;

    .speaker-affiliation {
      width: fit-content;
      position: absolute;
      right: 0;
      font-size: 0.75rem;
      padding: 0 0.5rem;
      font-family: JetBrainsMono-Regular;
    }

    .speaker-name {
      width: fit-content;
      position: absolute;
      left: 0;
      bottom: 0;
      font-size: 1.6rem;
      font-family: IBMPlexSansJP-Regular;
      padding: 0.65rem 1.1rem;

    }
  }

  .view-all-speakers {
    display: grid;
    place-items: center;
  }
}

.carousel {
  width: 110cqw;
  margin: 0 calc(50% - 55cqw) 7rem;

  @media (--mobile) {
    width: 160cqw;
    margin: 0 calc(50% - 80cqw) 7rem;
  }
}
</style>
