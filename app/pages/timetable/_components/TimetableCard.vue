<script setup lang="ts">
import { computed } from "vue";
import { useI18n, useLocaleRoute } from "#imports";
import type { TimetableCell } from "~~/i18n/timetable";
import SliderIcon from "~icons/icons/timetable-slider.svg";

const {
  type,
  title,
  startTime,
  endTime,
  speakers,
  slide,
  track,
  link,
} = defineProps <TimetableCell>();
const { t } = useI18n();
const localeRoute = useLocaleRoute();

const accentColorName = computed(() => {
  switch (track) {
    case "hacomono":
      return "primary";
    case "mates":
      return "purple";
    case "feature":
      return "orange";
    case "cyberAgent":
      return "navy";
    case "blank":
      return "blank";
    default:
      return "primary";
  }
});

const backgroundColor = computed(() => `var(--color-${accentColorName.value}-sub)`);
const color = computed(() => `var(--color-${accentColorName.value}-base)`);
const hoverColor = computed(() => `var(--color-${accentColorName.value}-accent-hover)`);
</script>

<template>
  <div class="cell">
    <div class="cell-inner">
      <template v-if="track && track != 'blank'">
        <div class="track">
          {{ t(`timetable.track.${track}`) }}
        </div>
      </template>
      <div v-if="startTime" class="time">
        <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
        {{ startTime }} - {{ endTime }}
      </div>
      <template v-if="type === 'schedule'">
        <div class="schedule-title">
          {{ title }}
        </div>
      </template>

      <template v-else>
        <div v-if="type === 'event' && link " class="title">
          <NuxtLink
            :to="{
              path: '/event',
              query: { session: link },
              hash: `#${link}`,
            }"
          >
            {{ title }}
          </NuxtLink>
        </div>
        <div v-else class="title">
          {{ title }}
        </div>
        <div v-if="speakers" class="speakers" :style="{ '--speaker-gap': type ==='lightningTalk' ? '24px' : undefined }">
          <template v-for="speaker in speakers" :key="speaker.id">
            <div :class="{ 'event-speaker': type === 'event' }">
              <div v-if="speaker.talkTitle" class="title">
                <NuxtLink
                  :to="localeRoute(
                    speaker.sponsorId === undefined
                      ? { name: 'speaker-speakerId', params: { speakerId: speaker.id } }
                      : { name: 'sponsors-sponsorId', params: { sponsorId: speaker.sponsorId }, hash: `#${speaker.id}` },
                  ) || (speaker.sponsorId === undefined ? '/speakers' : '/sponsors')"
                >
                  {{ speaker.talkTitle }}
                </NuxtLink>
              </div>

              <div class="speaker-item">
                <div v-if="speaker.avatarUrl" class="avatar">
                  <img :src="speaker.avatarUrl" :alt="speaker.name">
                </div>
                <div class="speaker-info">
                  <p v-if="speaker.affiliation" class="affiliation">
                    {{ speaker.affiliation }}
                  </p>
                  <p v-if="speaker.title" class="job-title">
                    {{ speaker.title }}
                  </p>
                  <p class="name">
                    {{ speaker.name }}
                  </p>
                </div>
              </div>
            </div>
          </template>
        </div>
        <!-- eslint-disable-next-line vuejs-accessibility/anchor-has-content -->
        <a v-if="slide" :href="slide" class="slide" target="_blank">
          <SliderIcon :aria-label="t('timetable.slider')" role="img" />
        </a>
      </template>
    </div>
  </div>
</template>

<style scoped>
.cell {
  --color-blank-sub: rgba(239, 239, 239, 1);
  padding: 16px;
  border-radius: 8px;
  vertical-align: top;
  color: v-bind(color);
  background-color: v-bind(backgroundColor);

  a {
    /* color: inherit; */
    &:hover {
      color: v-bind(hoverColor);
    }
    &:has(.name) {
      color: var(--color-text-default);
    }
  }
}

.track {
  width: fit-content;
  margin-bottom: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  color: v-bind(backgroundColor);
  background-color: v-bind(color);
  font-size: 12px;
  font-family: IBMPlexSansJP-Bold;

}

.time {
  display: grid;
  place-items: center;
  width: fit-content;
  height: 25px;
  margin-bottom: 8px;
  padding: 0 16px;
  font-family: JetBrainsMono-Medium;
  font-size: 12px;
  border: 1px solid v-bind(color);
  border-radius: 100px;
  background-color: #fff;
}

.title {
  color: v-bind(color);
  font-family: IBMPlexSansJP-Bold;
  font-size: 16px;
  text-align: left;
  white-space: pre-wrap;

  a {
    font-family: IBMPlexSansJP-Bold;
    color: v-bind(color);
    cursor: pointer;

    @media (any-hover: hover) {
      &:hover {
        color: v-bind(hoverColor);
      }
    }
  }

}
.schedule-title {
  font-family: IBMPlexSansJP-Bold;
  font-size: 16px;
  text-align: center;
  color: var(--color-text-default);
  white-space: pre-wrap;
}

.speakers {
  --speaker-gap: 16px;
  display: flex;
  flex-direction: column;
  gap: var(--speaker-gap) 0;
  margin-top: 8px;
}

.speaker-item {
  display: flex;
  align-items: flex-start;
  gap: 0 8px;
  margin-top: 8px;

  .avatar {
    width: 48px;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 8px;
    background-color: #fff;
  }

  .speaker-info {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .affiliation {
    font-size: 11px;
    color: var(--color-text-default);
    line-height: 1;
    margin-bottom: 0.25rem;
  }

  .job-title {
    font-size: 11px;
    color: var(--color-text-default);
    line-height: 1;
    margin-bottom: 0.25rem;
  }

  .name {
    font-size: 14px;
    color: var(--color-text-default);
    line-height: 1.2;
  }
}

.slide {
  margin-top: 8px;

  svg {
    --color-base: v-bind(color);
  }
}

.event-speaker {
  &:has(a) {
    margin-top: 8px;
  }
}
</style>
