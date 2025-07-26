<script setup lang="ts">
import { computed } from "#imports";

const { name, userRole, avatarImageUrl } = defineProps<{
  name?: string;
  userRole?: "Attendee" | "Attendee+Party" | "Sponsor" | "Speaker" | "Staff";
  avatarImageUrl?: string;
}>();

const variants = computed(() => {
  switch (userRole) {
    case "Attendee+Party":
      return {
        color: "#007f62",
        baseImageUrl: "/images/og/name-badge/party.png",
        nameBadgeBaseImageUrl: "/images/name-badge/party.png",
      };
    case "Sponsor":
      return {
        color: "#f66c21",
        baseImageUrl: "/images/og/name-badge/sponsor.png",
        nameBadgeBaseImageUrl: "/images/name-badge/sponsor.png",
      };
    case "Speaker":
      return {
        color: "#8314d3",
        baseImageUrl: "/images/og/name-badge/speaker.png",
        nameBadgeBaseImageUrl: "/images/name-badge/speaker.png",
      };
    case "Staff":
      return {
        color: "#ffffff",
        baseImageUrl: "/images/og/name-badge/staff.png",
        nameBadgeBaseImageUrl: "/images/name-badge/staff.png",
      };
    case "Attendee":
    default:
      return {
        color: "#385FCC",
        baseImageUrl: "/images/og/name-badge/default.png",
        nameBadgeBaseImageUrl: "/images/name-badge/default.png",
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
        top: '-69.5%',
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
        top: '36.5%',
        left: '64.5%',
        transform: 'translate(-50%, -50%)',
        color: variants.color,
        fontSize: '1.5rem',
        fontWeight: 'bold',
        fontFamily: 'JetBrainsMono-Regular, IBMPlexSansJP-Regular',
      }"
    >
      {{ name }}
    </div>
  </div>
</template>
