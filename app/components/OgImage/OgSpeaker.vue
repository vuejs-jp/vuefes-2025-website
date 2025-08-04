<script setup lang="ts">
import { computed, useRuntimeConfig } from "#imports";

const { avatarUrl, color, speakerTitle, affiliation } = defineProps<{
  name: string;
  avatarUrl: string;
  color: "default" | "purple" | "orange" | "navy";
  speakerTitle?: string;
  affiliation?: string;
}>();

const runtimeConfig = useRuntimeConfig();
const avatarImageFullUrl = computed(() => `${runtimeConfig.siteUrl}${avatarUrl.startsWith("/") ? avatarUrl.slice(1) : avatarUrl}`);
const description = computed(() => speakerTitle || affiliation);

const variants = computed(() => {
  switch (color) {
    case "purple":
      return {
        baseImageUrl: `${runtimeConfig.siteUrl}images/og/speaker-or-sponsor/purple.png`,
        baseColor: "#8314d3",
        subColor: "#d0edf2",
      };
    case "orange":
      return {
        baseImageUrl: `${runtimeConfig.siteUrl}images/og/speaker-or-sponsor/orange.png`,
        baseColor: "#f66c21",
        subColor: "#def7d1",
      };
    case "navy":
      return {
        baseImageUrl: `${runtimeConfig.siteUrl}images/og/speaker-or-sponsor/navy.png`,
        baseColor: "#385FCC",
        subColor: "#ffdaff",
      };
    case "default":
    default:
      return {
        baseImageUrl: `${runtimeConfig.siteUrl}images/og/speaker-or-sponsor/default.png`,
        baseColor: "#007f62",
        subColor: "#fae8e4",
      };
  }
});
</script>

<template>
  <div :style="{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden' }">
    <img
      :src="variants.baseImageUrl"
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
    />

    <img
      :src="avatarImageFullUrl"
      alt=""
      :style="{
        position: 'absolute',
        width: '50%',
        top: '50%',
        left: '75%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
      }"
    />

    <div
      :style="{
        position: 'absolute',
        top: 0,
        right: 0,
        fontSize: '30px',
        backgroundColor: variants.baseColor,
        color: variants.subColor,
        fontFamily: 'JetBrainsMono-Regular, IBMPlexSansJP-Regular',
        padding: '20px',
      }"
    >
      <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
      {{ "Speaker" }}
    </div>

    <div
      :style="{
        position: 'absolute',
        top: '70%',
        left: '50%',
        fontSize: '40px',
        backgroundColor: variants.subColor,
        color: variants.baseColor,
        fontFamily: 'JetBrainsMono-Regular, IBMPlexSansJP-Regular',
        padding: '25px 45px',
        borderRadius: '125px',
      }"
    >
      <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
      {{ name }}
    </div>

    <div
      :style="{
        position: 'absolute',
        bottom: '0',
        right: '0',
        textAlign: 'right',
        padding: '20px',
        boxSizing: 'border-box',
        color: variants.subColor,
        backgroundColor: variants.baseColor,
        fontSize: '22px',
        fontWeight: 'bold',
      }"
    >
      <div
        :style="{
          margin: '0 auto',
          fontFamily: 'IBMPlexSansJP-Regular, JetBrainsMono-Regular',
        }"
      >
        {{ description }}
      </div>
    </div>
  </div>
</template>
