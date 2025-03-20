<script setup lang="ts">
const { nth = 2 } = defineProps<{
  /** @default 2 */
  nth?: 1 | 2 | 3;
}>();

defineSlots<{
  default: () => unknown;
}>();
</script>

<template>
  <component :is="`h${nth}`" v-bind="$attrs"><slot /></component>
  <hr />
</template>

<style scoped>
h1,
h2,
h3 {
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
