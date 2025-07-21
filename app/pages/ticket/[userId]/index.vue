<script setup lang="ts">
import { computed, definePageMeta, navigateTo, useAuth, useFetch, useRoute } from "#imports";
import { NuxtLinkLocale } from "#components";

definePageMeta({
  middleware: () => __FEATURE_TICKET_NAMECARD__ || navigateTo("/"),
});

const { data } = useAuth();
const route = useRoute();

const { data: nameCardData } = useFetch("/api/namecard");

const userId = computed(() => route.params.userId as string);
</script>

<template>
  <div v-if="data">
    <pre>{{ data }}</pre>

    <NuxtLinkLocale :to="`/ticket/${userId}/edit`">
      <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
      {{ nameCardData ? 'Edit' : 'Create' }}
    </NuxtLinkLocale>
  </div>

  <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
  <div v-else>
    You are not logged in.
  </div>
</template>
