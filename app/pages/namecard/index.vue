<script setup lang="ts">
import { definePageMeta, navigateTo, useAuth } from "#imports";

definePageMeta({
  middleware: () => __FEATURE_TICKET_NAMECARD__ || navigateTo("/"),
});

const { signIn } = useAuth();
</script>

<template>
  <div>
    <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
    <button @click="signIn('github', { callbackUrl: '/namecard' })">
      Github
    </button>
    <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
    <button @click="signIn('google', { callbackUrl: '/namecard' })">
      Google
    </button>
  </div>
</template>
