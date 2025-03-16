<script setup lang="ts">
defineSlots<{
  default: () => unknown;
}>();
</script>

<template>
  <h1 v-bind="$attrs"><slot /></h1>
  <hr />
</template>

<style scoped>
h1::before {
  content: "・";
}

hr {
  border-top: 1px solid var(--color-divider);
  border-bottom: none;
  border-left: none;
  border-right: none;
  margin: 0.5em;
}
</style>
