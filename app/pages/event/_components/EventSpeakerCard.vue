<script setup lang="ts">
defineProps<{
  speaker: {
    name: string;
    avatarUrl: string;
    affiliation?: string;
    title?: string;
  };
}>();
</script>

<template>
  <li class="speaker">
    <img :src="speaker.avatarUrl" alt="" class="speaker-image" />
    <p class="speaker-affiliation">
      {{ speaker.affiliation }}<br v-if="speaker.affiliation && speaker.title" />
      {{ speaker.title }}
    </p>
    <h3 class="speaker-name">
      {{ speaker.name }}
    </h3>
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
    font-size: 0.6875rem;
    line-height: 1.5;

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

}
</style>
