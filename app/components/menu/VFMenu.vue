<script setup lang="ts">
import MenuItem, { type MenuItemProps } from "./VFMenuItem.vue";

const { items } = defineProps<{
  items: MenuItemProps[];
}>();
</script>

<template>
  <ul class="navigation-content" lang="en">
    <li v-for="(item, idx) in items" :key="idx">
      <MenuItem v-bind="item" />
    </li>
  </ul>
</template>

<style scoped>
.navigation-content {
  width: 100%;
  background: var(--color-white);
  border-radius: 20px;
  padding: 0.5rem 0;
  margin: 0;
  border: 1px solid var(--color-divider-light);
}

.navigation-content li {
  list-style: none;
  width: 150px;
  height: 40px;
  padding: 0.5rem 2rem;
}
</style>
