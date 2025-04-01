<script setup lang="ts">
import { ContentRenderer } from "#components";
import { queryCollection } from "#imports";

const { path } = defineProps<{ path: string }>();

const content = await queryCollection("i18n").path(path).first();
</script>

<template>
  <div class="server-content-renderer">
    <ContentRenderer v-if="content" :value="content" />
  </div>
</template>
