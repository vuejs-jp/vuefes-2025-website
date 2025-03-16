<script setup lang="ts">
import { defineRouteRules } from "#imports";
import { MainVisual } from "#components";

defineRouteRules({ prerender: true });
</script>

<template>
  <MainVisual />
</template>
