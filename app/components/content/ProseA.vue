<script setup lang="ts">
import { useLocalePath } from "#imports";

const { href = "", target } = defineProps<{
  href: string;
  target?:
    | "_blank"
    | "_parent"
    | "_self"
    | "_top"
    | (string & object)
    | null
    | undefined;
}>();

const localePath = useLocalePath();
</script>

<template>
  <NuxtLink :href="localePath(href)" :target>
    <slot />
  </NuxtLink>
</template>

<style scoped>
a {
  color: var(--color-base);

  &:not([class]) {
    color: var(--color-base);
  }

  &:hover {
    color: var(--color-accent-hover);
  }
}
</style>
