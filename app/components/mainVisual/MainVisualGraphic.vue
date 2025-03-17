<script setup lang="ts">
const { appearance = "webgl", animation: _animation = true } = defineProps<{
  appearance?: "webgl" | "svg";

  /**
   * only used when `appearance` is `webgl`
   */
  animation?: boolean;
}>();
</script>

<template>
  <template v-if="appearance === 'webgl'">
    <!-- TODO: -->
    <img
      src="/images/main-visual.svg"
      :alt="
        // TODO:
        $t('mainVisual.webglAlt')
      "
    />
  </template>

  <template v-else-if="appearance === 'svg'">
    <img src="/images/main-visual.svg" :alt="$t('mainVisual.imageAlt')" />
  </template>
</template>
