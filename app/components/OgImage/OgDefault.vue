<script setup lang="ts">
import { useRuntimeConfig, computed } from "#imports";

defineProps<{
  titleJa: string;
  titleEn: string;
}>();

const runtimeConfig = useRuntimeConfig();
const baseImageUrl = computed(() => `${runtimeConfig.siteUrl}images/og/default.png`);
const noiseImageUrl = computed(() => `${runtimeConfig.siteUrl}images/og/noise.png`);
</script>

<template>
  <div :style="{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden' }">
    <img
      :src="baseImageUrl"
      alt=""
      :style="{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      }"
    >
    <div
      :style="{
        position: 'absolute',
        top: '40px',
        left: '40px',
        right: 0,
        bottom: 0,
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        color: '#007f62',
        fontFamily: 'ClashDisplay-Medium, IBMPlexSansJP-SemiBold',
      }"
    >
      <div
        :style="{
          fontSize: '64px',
        }"
      >
        {{ titleJa }}
      </div>
      <div
        :style="{
          fontSize: '140px',
        }"
      >
        {{ titleEn }}
      </div>
    </div>

    <img
      :src="noiseImageUrl"
      alt=""
      :style="{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        mixBlendMode: 'overlay',
        opacity: 0.075,
      }"
    />
  </div>
</template>
