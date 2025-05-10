<script setup lang="ts">
import { VFHeading } from "#components";

const { title, heading = 2, coverImage, id } = defineProps<{
  title: string;

  /** @default 2 */
  heading?: 1 | 2 | 3 | 4 | 5 | 6;

  coverImage?: {
    src: string;
    alt: string;
  };

  id?: string;
}>();

defineSlots<{
  default: () => void;
}>();
</script>

<template>
  <section class="vf-section">
    <div v-if="coverImage" class="section-cover-wrapper">
      <img
        :src="coverImage.src"
        :alt="coverImage.alt"
      />
    </div>
    <div class="section-content">
      <VFHeading :id="id" :level="heading">
        {{ title }}
      </VFHeading>
      <div class="section-content-inner">
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.vf-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-m);
  background-color: var(--color-white);
  border: 1px solid var(--color-divider-light);
  width: 100%;
  max-width: 700px;

  .section-cover-wrapper {
    /* for preventing CLS */
    aspect-ratio: 682 / 383.867;
    width: 100%;

    img {
      border-radius: var(--radius-m) var(--radius-m) 0 0;
      width: 100%;
      height: auto;
      @media (--mobile) {
        max-width: none;
        width: 100%;
      }
    }
  }

  .section-content {
    padding: 2.5rem 3.5rem 3rem;
    width: 100%;

    @media (--mobile) {
      padding: 2rem 1.5rem 3rem;
    }

    :deep(h3) {
      color: var(--color-text-default);
    }
  }

  .section-content-inner {
    margin-top: 2rem;

    @media (--mobile) {
      margin-top: 1.5rem;
    }
  }
}
</style>
