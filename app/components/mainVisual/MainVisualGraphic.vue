<script setup lang="ts">
const { appearance = "webgl", animation: _animation = true } = defineProps<{
  appearance?: "webgl" | "png";

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
      src="/images/main-visual.png"
      :alt="
        // TODO:
        $t('mainVisual.webglAlt')
      "
    />
  </template>

  <template v-else-if="appearance === 'png'">
    <img src="/images/main-visual.png" :alt="$t('mainVisual.imageAlt')" />
  </template>
</template>
