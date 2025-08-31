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
  colspan,
  rowspan,
  track,
  link,
} = defineProps<TimetableCell>();
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

const backgroundColor = `var(--color-${accentColorName.value}-sub)`;
const color = `var(--color-${accentColorName.value}-base)`;
const hoverColor = `var(--color-${accentColorName.value}-accent-hover)`;
</script>

<template>
  <td class="cell" :colspan="colspan" :rowspan="rowspan" :class="{ 'cell--schedule': type === 'schedule' }">
    <div class="cell-inner">
      <div v-if="startTime && type !== 'schedule'" class="time">
        <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
        {{ startTime }} - {{ endTime }}
      </div>

      <template v-if="type === 'schedule'">
        <div class="schedule-content">
          <div v-if="startTime" class="time">
            <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
            {{ startTime }} - {{ endTime }}
          </div>
          <div class="schedule-title">
            {{ title }}
          </div>
        </div>
      </template>

      <template v-else>
        <NuxtLink
          v-if="type === 'event' && link"
          :to="{
            path: '/event',
            query: { session: link },
            hash: `#${link}`,
          }"
          class="title"
        >
          {{ title }}
        </NuxtLink>

        <div v-else class="title">
          {{ title }}
        </div>

        <div v-if="speakers" class="speakers" :style="{ '--speaker-gap': type ==='lightningTalk' ? '32px' : undefined }">
          <template v-for="speaker in speakers" :key="speaker.id">
            <div>
              <NuxtLink :to="localeRoute({ name: 'speaker-speakerId', params: { speakerId: speaker.id } }) || ''" class="title">
                {{ speaker.talkTitle }}
              </NuxtLink>
              <div class="speaker-item">
                <div v-if="speaker.avatarUrl" class="avatar">
                  <img :src="speaker.avatarUrl" :alt="speaker.name">
                </div>
                <p class="name">
                  {{ speaker.name }}
                </p>
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
  </td>
</template>

<style scoped>
.cell {
  --color-blank-sub: rgba(239, 239, 239, 1);
  padding: 16px;
  border-radius: 8px;
  vertical-align: top;
  color: v-bind(color);
  background-color: v-bind(backgroundColor);

  &.cell--schedule {
    vertical-align: middle;
  }

  a {
    color: inherit;
    @media (any-hover: hover) {
      &:hover {
        color: v-bind(hoverColor);
      }
    }
  }
}

.cell--schedule .cell-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.schedule-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.time {
  display: grid;
  place-items: center;
  width: fit-content;
  height: 28px;
  margin-bottom: 8px;
  padding: 0 16px;
  font-family: JetBrainsMono-Medium;
  font-size: 14px;
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
    all: inherit;
    cursor: pointer;
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
  --speaker-gap: 8px;
  display: flex;
  flex-direction: column;
  gap: var(--speaker-gap) 0;
  margin-top: 8px;
}

.speaker-item {
  display: flex;
  align-items: center;
  gap: 0 8px;
  margin-top: 8px;
  .avatar{
    width: 32px;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 8px;
    background-color: #fff;
  }
  .name{
    font-size: 14px;
    color: var(--color-text-default);
  }
}

.slide {
  margin-top: 8px;
    svg{
    --color-base:v-bind(color) ;
  }
}
</style>
