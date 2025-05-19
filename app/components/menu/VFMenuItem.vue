<script setup lang="ts">
import { computed, useRoute } from "#imports";

export type MenuItemProps = {
  label: string;
  href: string;
  lang?: "en" | "ja";
};

const { label, href: to } = defineProps<MenuItemProps>();

const route = useRoute();

const activeLinkComp = computed(() => to.startsWith("#") ? to == route.hash : to == route.path);
</script>

<template>
  <NuxtLink
    :class="{ 'menuitem-link': true, 'menuitem-link-active': activeLinkComp }"
    :to
    prefetch-on="visibility"
    v-bind="$attrs"
  >
    {{ label }}
  </NuxtLink>
</template>

<style scoped>
.menuitem-link {
  color: var(--color-place-holder);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.2rem;
}

.menuitem-link:hover {
  color: var(--color-base);
}

.menuitem-link-active {
  color: var(--color-base) !important;
  position: relative;
}

.menuitem-link-active::before {
  content: "";
  position: absolute;
  left: -20px;
  top: 10px;
  width: 10px;
  height: 10px;
  margin: 0;
  display: inline-block;
  background-color: var(--color-base);
  border-radius: 50%;
}
</style>
