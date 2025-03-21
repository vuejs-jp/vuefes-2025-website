<script setup lang="ts">
import { ref, onMounted } from "vue";
import MainVisualWebGL from "./MainVisualWebGL.vue";

const { appearance = "webgl", animation: _animation = true } = defineProps<{
  appearance?: "webgl" | "svg" | "png";
  animation?: boolean;
}>();

const showFallback = ref(true);
const webGLLoaded = ref(false);

const handleWebGLInitialized = () => {
  webGLLoaded.value = true;
  setTimeout(() => {
    showFallback.value = false;
  }, 100);
};
</script>

<template>
  <div class="main-visual-graphic-wrapper">
    <template v-if="appearance === 'webgl'">
      <MainVisualWebGL
        :animation="_animation"
        :style="{
          opacity: webGLLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-out',
        }"
        @initialized="handleWebGLInitialized"
      />
      <img
        v-if="showFallback"
        :style="{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: webGLLoaded ? 0 : 1,
          transition: 'opacity 0.3s ease-out',
        }"
        src="/images/main-visual.png"
        :alt="$t('mainVisual.imageAlt')"
      />
    </template>

    <template v-else-if="appearance === 'png'">
      <img src="/images/main-visual.png" :alt="$t('mainVisual.imageAlt')" />
    </template>
  </div>
</template>

<style scoped>
.main-visual-graphic-wrapper {
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 650 / 320;
}

.main-visual-graphic-wrapper :deep(canvas),
.main-visual-graphic-wrapper img {
  width: 100%;
  height: auto;
  max-width: 640px;
  min-width: 1px;
  min-height: 160px;
  object-fit: contain;
}
</style>
