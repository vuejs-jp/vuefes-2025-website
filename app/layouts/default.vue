<script setup lang="ts">
import { computed, useBreakpoint, useRoute } from "#imports";
import { MainVisual, VFHeader, VFFooter } from "#components";

defineSlots<{
  default: () => unknown;
}>();

const bp = useBreakpoint();

const route = useRoute();

const isRoot = computed(() => ["/", "/en"].includes(route.path));
</script>

<template>
  <MainVisual :title-tag="isRoot ? 'h1' : 'div'" class="main-visual" />

  <div v-if="isRoot" style="height: 100vh" />

  <div class="content">
    <VFHeader class="header" />
    <slot />
    <VFFooter />
  </div>

  <div v-if="isRoot && bp === 'pc'" style="height: 100vh" />
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.main-visual {
  position: fixed;
  z-index: -1;
}

.content {
  margin: 0 auto;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 700px;

  @media (--mobile) {
    max-width: none;
    width: 100%;
    padding: 0.25rem;
  }
}

.header {
  position: sticky;
  top: 0;
  width: 100%;
  margin: 0.5rem;
}
</style>
