<script setup lang="ts">
import { VFButton } from "#components";

const { actionButton, isBg = true } = defineProps<{
  actionButton?: {
    label: string;
    link: string;
    external?: true;
  };
  isBg?: boolean;
}>();
</script>

<template>
  <div class="cta-content" :class="{ 'cta-bg': isBg }">
    <slot />

    <VFButton
      v-if="actionButton"
      :link="actionButton.link"
      :external="actionButton.external"
      class="action-button"
    >
      {{ actionButton.label }}
    </VFButton>
  </div>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.cta-content {
  max-width: 240px;
  width: 100%;
  padding: 1.5rem 1rem;
  margin: 0;
  text-align: center;

  &.cta-bg {
    background: var(--color-white);
    border-radius: 20px;
    border: 1px solid var(--color-divider-light);
  }

  .action-button {
    margin-top: 1.5rem;
  }

  :deep(div) {
    h2 {
      font-size: 1.25rem;
      line-height: 1.7;
      font-family: IBMPlexSansJP-Bold;
      color: var(--color-base);
      margin: 0;
    }

    img {
      margin-left: auto;
      margin-right: auto;
      max-width: 174px;
    }

    p {
      font-size: 0.813rem;
      line-height: 1.5;
      color: var(--color-base);
    }
  }
}
</style>
