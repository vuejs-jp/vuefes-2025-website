<script setup lang="ts">
import {
  RELATED_EVENTS as enRelatedEvents,
} from "../../../i18n/en/related-events";

import {
  RELATED_EVENTS as jaRelatedEvents,
} from "../../../i18n/ja/related-events";

import {
  VFSection,
  VFButton,
} from "#components";

import {
  computed,
  defineOgImage,
  useI18n,
  useRuntimeConfig,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useHead,
  useSeoMeta,
} from "#imports";

const runtimeConfig = useRuntimeConfig();
const { t, locale } = useI18n();

const relatedEvents = computed(() => locale.value === "en" ? enRelatedEvents : jaRelatedEvents);

const dateOption = computed(() => locale.value === "en"
  ? {
      year: "numeric" as const,
      month: "long" as const,
      day: "numeric" as const,
      weekday: "short" as const,
    }
  : {
      year: "numeric" as const,
      month: "short" as const,
      day: "numeric" as const,
      weekday: "short" as const,
    });

defineOgImage({
  url: `${runtimeConfig.public.siteUrl}images/og/related-events.png`,
});

useSeoMeta({
  title: t("relatedEvents.sectionTitle"),
  ogTitle: t("relatedEvents.sectionTitle"),
});
</script>

<template>
  <div id="pages-related-events">
    <h1>{{ $t('relatedEvents.title') }}</h1>
  </div>

  <VFSection :title="t('relatedEvents.sectionTitle')" class="vf-section discussion-event">
    <ul class="event-card">
      <li v-for="event in relatedEvents" :key="event.id" class="event-card-item">
        <img :src="event.coverUrl" :alt="event.coverAlt" width="400" height="164" class="event-card-image">
        <div class="event-card-content">
          <div>
            <h2 class="event-card-title">
              {{ event.title }}
            </h2>
            <time :datetime="event.date" class="event-card-date">
              {{ new Date(event.date).toLocaleDateString(locale, dateOption) }}
            </time>
            <template v-for="(paragraph, index) in event.description?.split('\n')" :key="index">
              <p>
                {{ paragraph }}
              </p>
            </template>
          </div>
          <VFButton :link="event.linkUrl" external outlined>
            {{ t("relatedEvents.linkText") }}
          </VFButton>
        </div>
      </li>
    </ul>
  </VFSection>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

#pages-related-events {
  display: grid;
  row-gap: 1.5rem;

  @media (--mobile) {
    row-gap: 1rem;
  }

  h1 {
    font-family: "ClashDisplay-Semibold";
    font-size: 3rem;
    padding: 7rem 0 8rem;
    margin: 0;
    line-height: 1;

    @media (--mobile) {
      padding: 2rem 0.75rem 3rem;
    }
  }
}

.event-card {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 32px;
}

.event-card-image {
  width: 100%;
  height: auto;
}

.event-card-item {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--color-white);
}

.event-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  gap: 32px;
  padding: 24px;

  @media (--mobile) {
    gap: 24px;
    padding: 16px;
  }
}

.event-card-title {
  margin: 0 0 8px;

  @media (--mobile) {
    margin: 0 0 6px;
  }
}

.event-card-date {
  display: block;
  margin-bottom: 24px;
  font-size: 0.8125rem;
  line-height: 1.5;
  text-align: end;

  @media (--mobile) {
    margin-bottom: 16px;
    font-size: 0.75rem;
  }
}
</style>
