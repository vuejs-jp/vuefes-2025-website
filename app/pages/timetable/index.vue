<script setup lang="ts">
import TimetableHead from "./_components/TimetableHead.vue";
import TimetableCell from "./_components/TimetableCell.vue";
import TimetableCard from "./_components/TimetableCard.vue";
import { VFSection } from "#components";
import {
  defineOgImage,
  defineRouteRules,
  nextTick,
  onBeforeRouteLeave,
  onBeforeUnmount,
  onMounted,
  useBreakpoint,
  useFetch,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useHead,
  useI18n,
  useRuntimeConfig,
  useSeoMeta,
  useState,
} from "#imports";

defineRouteRules({ prerender: true });

const runtimeConfig = useRuntimeConfig();
const { t, locale } = useI18n();
const bp = useBreakpoint();

const { data: timetable } = await useFetch("/api/timetable", { query: { locale: locale.value } });

const timetableScrollPosition = useState<number>("timetableScrollPosition", () => 0);

onBeforeRouteLeave(() => {
  timetableScrollPosition.value = window.scrollY;
});

onMounted(() => {
  if (timetableScrollPosition.value > 0) {
    nextTick(() => {
      window.scrollTo({
        top: timetableScrollPosition.value,
        behavior: "instant",
      });
    });
  }
});

if (import.meta.client) {
  function savePosition() {
    timetableScrollPosition.value = window.scrollY;
  }

  window.addEventListener("pagehide", savePosition);

  onBeforeUnmount(() => {
    window.removeEventListener("pagehide", savePosition);
  });
}

defineOgImage({
  url: `${runtimeConfig.public.siteUrl}images/og/timetable.png`,
});

useSeoMeta({
  title: () => `Vue Fes Japan 2025 - ${t("timetable.title")}`,
  ogTitle: () => `Vue Fes Japan 2025 - ${t("timetable.title")}`,
  description: () => t("timetable.description"),
  ogDescription: () => t("timetable.description"),
});
</script>

<template>
  <div id="pages-timetable">
    <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
    <h1>Timetable</h1>
    <VFSection :title="t('timetable.title')">
      <template v-if="timetable">
        <table v-if="bp === 'pc'" class="timetable-content">
          <thead>
            <tr>
              <TimetableHead color="primary" :title="t('timetable.track.hacomono')" />
              <TimetableHead color="purple" :title="t('timetable.track.mates')" />
              <TimetableHead color="orange" :title="t('timetable.track.feature')" />
              <TimetableHead color="navy" :title="t('timetable.track.cyberAgent')" />
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in timetable.rows" :key="row.id">
              <TimetableCell
                v-for="cell in row.cells"
                :key="cell.id"
                v-bind="cell"
                :class="`cell-${cell.type}`"
              />
            </tr>
          </tbody>
        </table>

        <div v-else class="timetable-mobile">
          <template v-for="row in timetable.rows" :key="row.id">
            <div v-if="row.time" class="row-time">
              {{ row.time }}
            </div>
            <template v-if="row.cells.length > 0">
              <template v-for="cell in row.cells">
                <TimetableCard
                  v-if="!cell.isPcOnly"
                  :key="cell.id"
                  v-bind="cell"
                />
              </template>
            </template>
          </template>
        </div>
      </template>
    </VFSection>

    <VFSection :title="t('venueMap.title')" class="venue-map-section">
      <a
        :href="locale === 'ja' ? '/images/venue-map/map_jp@2x.png': '/images/venue-map/map_en@2x.png'"
        target="_blank"
      >
        <span class="visually-hidden">{{ t('venueMap.openInNewTab') }}</span>
        <img
          :src="locale === 'ja' ? '/images/venue-map/map_jp.png': '/images/venue-map/map_en.png'"
          :alt="t('venueMap.alt')"
          loading="lazy"
        >
      </a>
    </VFSection>
  </div>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

#pages-timetable{
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
}

.timetable-content{
  width: 100%;
  border-spacing:8px;
  table-layout: fixed;

  thead {
    position: sticky;
    top: 108px;
  }
}

.timetable-mobile{
  display: grid;
  gap: 8px 0;
}

.row-time{
  display: grid;
  place-items: center;
  height: 56px;
  border: solid 1px var(--color-divider);
  border-radius: 8px;
  background-color: #fff;
  font-size: 16px;
  font-family: JetBrainsMono-Medium;
}

.venue-map-section {
  img {
    width: 100%;
  }
  .visually-hidden {
    clip: rect(0 0 0 0);
    width: 1px;
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
  }
}
</style>
