<script setup lang="ts">
import { computed, useRoute } from "#imports";
import { MainVisual, VFHeader, VFFooter } from "#components";
import { useAnimationStore } from "~/stores/animation";

defineSlots<{ default: () => unknown }>();

const [animation] = useAnimationStore();

const route = useRoute();
const isRoot = computed(() => ["/", "/en"].includes(route.path));
</script>

<template>
  <MainVisual
    :title-tag="isRoot ? 'h1' : 'div'"
    :animation
    class="main-visual"
  />

  <div v-if="isRoot" style="height: 100svh" />

  <div class="content">
    <VFHeader class="header" />
    <slot />
    <VFFooter />
  </div>

  <div v-if="isRoot" style="height: 100svh" />
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.main-visual {
  position: fixed;
  z-index: -1;
}

.content {
  margin: 0 auto;
  padding: 0.5rem;
  background-color: transparent;
  display: flex;
  row-gap: 1.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 700px;

  @media (--mobile) {
    row-gap: 1rem;
    padding: 0.25rem;
    max-width: none;
    width: 100%;
  }
}

.header {
  position: sticky;
  top: 0;
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  @media (--mobile) {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }
}
</style>
