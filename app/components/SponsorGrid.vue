<script setup lang="ts">
import { useLocaleRoute } from "@typed-router";
import type { Sponsor } from "~~/i18n/sponsor";

const {
  imageOnly = false,
  columns = 3,
  gap = "1rem",
} = defineProps<{
  sponsors: Array<Sponsor>;
  imageOnly?: boolean;
  columns?: number;
  gap?: string;
  gapSp?: string;
  linkPath?: string;
}>();

const localeRoute = useLocaleRoute();
</script>

<template>
  <div
    class="sponsor-grid"
    :style="{
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap,
    }"
  >
    <div
      v-for="sponsor in sponsors"
      :key="sponsor.id"
      class="sponsor-grid-item"
    >
      <NuxtLink
        :to="localeRoute({
          name: 'sponsors-sponsorId',
          params: { sponsorId: sponsor.id },
        })"
        class="sponsor-link"
      >
        <slot :item="sponsor">
          <img :src="sponsor.logoImageUrl" :alt="sponsor.logoImageAlt" loading="lazy" />
        </slot>
      </NuxtLink>
      <h3 v-if="sponsor.name && !imageOnly" class="sponsor-name">
        {{ sponsor.name }}
      </h3>
    </div>
  </div>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.sponsor-grid {
  width: 100%;
  display: grid;
}

.sponsor-grid-item {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.sponsor-name{
  margin: 0;
  font-size: 0.875rem;
}

.sponsor-link,
.sponsor-item {
  display: block;
  width: 100%;
  text-decoration: none;
}

.sponsor-link img,
.sponsor-item img {
  width: 100%;
  height: auto;
  object-fit: contain;
}
</style>
