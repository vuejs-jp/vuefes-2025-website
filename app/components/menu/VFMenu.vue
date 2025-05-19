<script setup lang="ts">
import MenuItem from "./VFMenuItem.vue";
import { NAV_ITEMS } from "./constant";
</script>

<template>
  <ul class="navigation-content" lang="en">
    <li v-for="(item, idx) in NAV_ITEMS" :key="idx">
      <MenuItem :label="item.label" :href="item.href" />
    </li>
  </ul>
</template>

<style scoped>
.navigation-content {
  width: auto;
  max-width: 15rem;
  background: var(--color-white);
  border-radius: 20px;
  padding: 0.5rem 0.1rem;
  margin: 0;
}

.navigation-content li {
  list-style: none;
  padding: 0.5rem 2rem;
}
</style>
