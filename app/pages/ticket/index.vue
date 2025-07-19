<script setup lang="ts">
import { definePageMeta, navigateTo, useAuth, useLocaleRoute } from "#imports";
import { VFButton } from "#components";

definePageMeta({
  middleware: () => __FEATURE_TICKET_NAMECARD__ || navigateTo("/"),
});

const { signIn, status, data } = useAuth();
const localeRoute = useLocaleRoute();
</script>

<template>
  <div v-if="status === 'authenticated'">
    <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
    <VFButton v-if="data" :link="localeRoute({ name: 'ticket-userId', params: { userId: data.userId } })">
      ネームカードを確認する
    </VFButton>
  </div>

  <div v-else-if="status === 'unauthenticated'">
    <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
    <button @click="signIn('github', { callbackUrl: '/ticket' })">
      Github
    </button>
    <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
    <button @click="signIn('google', { callbackUrl: '/ticket' })">
      Google
    </button>
  </div>
</template>
