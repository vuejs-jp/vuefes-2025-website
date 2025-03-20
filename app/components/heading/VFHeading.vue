<script setup lang="ts">
defineSlots<{
  default: () => unknown;
}>();
</script>

<template>
  <h2 v-bind="$attrs"><slot /></h2>
  <hr />
</template>

<style scoped>
h2 {
  margin: 0;
  &::before {
    content: "・";
  }
}

hr {
  border-top: 1px solid var(--color-divider);
  border-bottom: none;
  border-left: none;
  border-right: none;
}
</style>
