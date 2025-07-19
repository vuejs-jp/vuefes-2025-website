<script setup lang="ts">
import { computed, definePageMeta, navigateTo, ref, useAuth, useRoute } from "#imports";
import { NuxtLink } from "#components";

definePageMeta({
  middleware: () => __FEATURE_TICKET_NAMECARD__ || navigateTo("/"),
});

const { status, data, signOut } = useAuth();
const route = useRoute();

const userId = computed(() => route.params.userId as string);

const attendeeData = ref(null);
$fetch("/api/peatix/attendees/26570043", {
  // query: { fresh: true },
}).then((res) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  attendeeData.value = res;
});
</script>

<template>
  <div>
    {{ status }}
    {{ userId }}
  </div>

  <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
  <pre>attendeeData: {{ attendeeData ?? 'Loading...' }}</pre>

  <div v-if="data">
    <pre>{{ data }}</pre>

    <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
    <NuxtLink :to="`/ticket/${userId}/edit`">
      Edit
    </NuxtLink>
    <br />

    <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
    <button @click="signOut({ callbackUrl: '/ticket' })">
      Sign Out
    </button>
  </div>

  <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
  <div v-else>
    You are not logged in.
  </div>
</template>
