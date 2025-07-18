<script setup lang="ts">
import { definePageMeta, navigateTo, useAuth } from "#imports";

definePageMeta({
  middleware: () => __FEATURE_TICKET_NAMECARD__ || navigateTo("/"),
});

const { signOut } = useAuth();
</script>

<template>
  <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
  <div>
    Edit Namecard Page
  </div>

  <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
  <button @click="signOut({ callbackUrl: '/namecard' })">
    Sign Out
  </button>
</template>
