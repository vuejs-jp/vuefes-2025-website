<script setup lang="ts">
import { computed, useRuntimeConfig } from "#imports";

const { name, userRole, avatarImageUrl } = defineProps<{
  name?: string;
  userRole?: "Attendee" | "Attendee+Party" | "Sponsor" | "Speaker" | "Staff";
  avatarImageUrl?: string;
  lang?: string;
}>();

const runtimeConfig = useRuntimeConfig();

const variants = computed(() => {
  switch (userRole) {
    case "Attendee+Party":
      return {
        color: "#007f62",
        baseImageUrl: `${runtimeConfig.siteUrl}images/og/name-badge/party.png`,
        nameBadgeBaseImageUrl: `${runtimeConfig.siteUrl}images/name-badge/party.png`,
      };
    case "Sponsor":
      return {
        color: "#f66c21",
        baseImageUrl: `${runtimeConfig.siteUrl}images/og/name-badge/sponsor.png`,
        nameBadgeBaseImageUrl: `${runtimeConfig.siteUrl}images/name-badge/sponsor.png`,
      };
    case "Speaker":
      return {
        color: "#8314d3",
        baseImageUrl: `${runtimeConfig.siteUrl}images/og/name-badge/speaker.png`,
        nameBadgeBaseImageUrl: `${runtimeConfig.siteUrl}images/name-badge/speaker.png`,
      };
    case "Staff":
      return {
        color: "#ffffff",
        baseImageUrl: `${runtimeConfig.siteUrl}images/og/name-badge/staff.png`,
        nameBadgeBaseImageUrl: `${runtimeConfig.siteUrl}images/name-badge/staff.png`,
      };
    case "Attendee":
    default:
      return {
        color: "#385FCC",
        baseImageUrl: `${runtimeConfig.siteUrl}images/og/name-badge/default.png`,
        nameBadgeBaseImageUrl: `${runtimeConfig.siteUrl}images/name-badge/default.png`,
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

    <div
      :style="{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: '8.33333%',
        width: '33.3333%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }"
    >
      <img
        :src="variants.nameBadgeBaseImageUrl"
        alt=""
        :style="{
          width: '100%',
          objectFit: 'contain',
        }"
      />
    </div>

    <div
      id="name-badge-name"
      :style="{
        position: 'absolute',
        top: '33.5%',
        left: '60%',
        color: variants.color,
        fontSize: '1.5rem',
        fontWeight: 'bold',
        fontFamily: 'JetBrainsMono-Regular, IBMPlexSansJP-Regular',
      }"
    >
      {{ name }}
    </div>

    <div
      v-if="userRole === 'Staff' && lang"
      id="name-badge-lang"
      :style="{
        position: 'absolute',
        top: '49%',
        left: '82.5%',
        transform: 'translateX(-50%)',
        color: variants.color,
        fontSize: '1.5rem',
        fontWeight: 'bold',
        fontFamily: 'JetBrainsMono-Regular, IBMPlexSansJP-Regular',
      }"
    >
      {{ lang }}
    </div>

    <div
      id="name-badge-avatar"
      :style="{
        position: 'absolute',
        bottom: '14.4%',
        right: '2%',
        transform: 'translateX(-50%)',
        width: '15.4%',
        height: '29.05%',
        borderRadius: '50%',
        overflow: 'hidden',
      }"
    >
      <img
        v-if="avatarImageUrl"
        :src="avatarImageUrl"
        alt="Avatar"
        :style="{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          ...(userRole === 'Sponsor'
            ? { objectFit: 'contain', backgroundColor: '#fff' }
            : {}
          ),
        }"
      />
    </div>
  </div>
</template>
