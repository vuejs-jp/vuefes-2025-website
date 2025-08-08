<script setup lang="ts">
import { computed, useRuntimeConfig } from "#imports";

const { logoImageUrl, plan = "OPTION_ONLY" } = defineProps<{
  name: string;
  logoImageUrl: string;
  plan?: "PLATINA" | "GOLD" | "SILVER" | "BRONZE" | "OPTION_ONLY" | "CREATIVE";
}>();

const planName = computed(() => {
  return plan === "OPTION_ONLY" ? "OPTION" : plan;
});

const runtimeConfig = useRuntimeConfig();
const logoImageFullUrl = computed(() => `${runtimeConfig.siteUrl}${logoImageUrl.startsWith("/") ? logoImageUrl.slice(1) : logoImageUrl}`);

const SPONSOR_TAG_STYLE_BASE = {
  alignItems: "center",
  padding: "15px 25px",
};

const variants = computed(() => {
  switch (planName.value) {
    case "PLATINA":
      return {
        baseImageUrl: `${runtimeConfig.siteUrl}images/og/speaker-or-sponsor/purple.png`,
        baseColor: "#8314d3",
        subColor: "#d0edf2",
        sponsorTagStyle: {
          ...SPONSOR_TAG_STYLE_BASE,
          background: "linear-gradient(270deg, #EEEEEE 0%, #C6C6C6 25%, #EEEEEE 50%, #EEEEEE 75%, #C6C6C6 100%)",
        },
      };
    case "GOLD":
      return {
        baseImageUrl: `${runtimeConfig.siteUrl}images/og/speaker-or-sponsor/default.png`,
        baseColor: "#007f62",
        subColor: "#fae8e4",
        sponsorTagStyle: {
          ...SPONSOR_TAG_STYLE_BASE,
          background: "#DBD69A",
        },
      };
    case "SILVER":
      return {
        baseImageUrl: `${runtimeConfig.siteUrl}images/og/speaker-or-sponsor/orange.png`,
        baseColor: "#f66c21",
        subColor: "#def7d1",
        sponsorTagStyle: {
          ...SPONSOR_TAG_STYLE_BASE,
          background: "#E2E4EC",
        },
      };
    case "BRONZE":
    default:
      return {
        baseImageUrl: `${runtimeConfig.siteUrl}images/og/speaker-or-sponsor/navy.png`,
        baseColor: "#385FCC",
        subColor: "#ffdaff",
        sponsorTagStyle: {
          ...SPONSOR_TAG_STYLE_BASE,
          background: "#DDA25B",
        },
      };
    case "OPTION":
      return {
        baseImageUrl: `${runtimeConfig.siteUrl}images/og/speaker-or-sponsor/orange.png`,
        baseColor: "#f66c21",
        subColor: "#def7d1",
        sponsorTagStyle: {
          ...SPONSOR_TAG_STYLE_BASE,
          background: "#E2E4EC",
        },
      };
    case "CREATIVE":
      return {
        baseImageUrl: `${runtimeConfig.siteUrl}images/og/speaker-or-sponsor/default.png`,
        baseColor: "#007f62",
        subColor: "#fae8e4",
        sponsorTagStyle: {
          ...SPONSOR_TAG_STYLE_BASE,
          background: "#DBD69A",
        },
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
        zIndex: -1,
      }"
    />

    <!-- right background -->
    <div
      :style="{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        width: '50%',
        backgroundColor: 'white',
        zIndex: 1,
      }"
    />

    <img
      :src="logoImageFullUrl"
      alt="Sponsor Logo"
      :style="{
        position: 'absolute',
        width: '50%',
        top: '50%',
        left: '75%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
      }"
    />

    <div
      :style="{
        position: 'absolute',
        bottom: '0',
        right: '0',
        width: '50%',
        padding: '20px',
        textAlign: 'center',
        boxSizing: 'border-box',
        color: variants.subColor,
        backgroundColor: variants.baseColor,
        fontSize: '32px',
        fontWeight: 'bold',
        zIndex: 3,
      }"
    >
      <div
        :style="{
          margin: '0 auto',
          fontFamily: 'JetBrainsMono-Regular, IBMPlexSansJP-Regular',
        }"
      >
        {{ name }}
      </div>
    </div>

    <!-- tag -->
    <div
      :style="{
        position: 'absolute',
        top: '0',
        right: '0',
        color: '#3c576f',
        fontWeight: 'bold',
        fontSize: '30px',
        zIndex: 4,
        fontFamily: 'JetBrainsMono-Regular, IBMPlexSansJP-Regular',
        ...variants.sponsorTagStyle,
      }"
    >
      <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
      {{ planName.charAt(0).toUpperCase() + planName.slice(1).toLowerCase() }} Sponsor
    </div>
  </div>
</template>
