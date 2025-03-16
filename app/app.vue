<script setup lang="ts">
import "~/assets/styles/main.css";
import { NuxtPage, NuxtRouteAnnouncer } from "#components";
import { useLangClass } from "#imports";

const langClass = useLangClass();
</script>

<template>
  <div :class="langClass">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
