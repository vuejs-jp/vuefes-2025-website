<script lang="ts">
import { computed } from "vue";

export type StaffItemProps = {
  name: string;
  avatarUrl: string;
  socialUrls?: {
    x?: string;
    github?: string;
  };
};
</script>

<script setup lang="ts">
const {
  name,
  avatarUrl,
  socialUrls,
  gridMode,
} = defineProps<StaffItemProps & { gridMode: "leader" | "core" | "volunteer" }>();

const gridItemClass = computed(() => `staff-link-${gridMode}`);

const linkComp = computed(() => socialUrls?.x ? socialUrls.x : socialUrls?.github);
</script>

<template>
  <NuxtLink
    v-if="linkComp"
    :to="linkComp"
    external
    target="_blank"
    class="staff"
    :class="gridItemClass"
  >
    <img :src="avatarUrl" :alt="name" />
    <p class="font-bold">{{ name }}</p>
  </NuxtLink>

  <div v-else class="staff" :class="gridItemClass">
    <img v-if="avatarUrl" :src="avatarUrl" :alt="name" loading="lazy" />
    <p class="font-bold">
      {{ name }}
    </p>
  </div>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.staff {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #444;
  margin-bottom: 1rem;

  p {
    width: 100%;
    text-align: left;
    overflow-wrap: break-word;
    color: var(--color-text-default);
    margin-top: 1rem;

    @media (--mobile) {
      margin-top: 0.75rem;
    }
  }

  &.staff-link-leader,
  &.staff-link-core {
    p {
      font-size: 18px;
      font-family: IBMPlexSansJP-Bold;

      @media (--mobile) {
        font-size: 16px;
      }
    }

    img {
      width: 100%;
      height: auto;
      border-radius: 8%;
      border: 0.5px solid #ddd;
    }
  }

  &.staff-link-volunteer {
    margin-bottom: 0;

    p {
      margin: 0.3rem 0.6rem;
      text-align: left;

      @media (--mobile) {
        font-size: 14px;
        margin: 0 0.6rem;
      }
    }
  }
}
</style>
