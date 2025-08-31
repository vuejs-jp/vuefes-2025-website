<script setup lang="ts">
import { computed } from "vue";

import StaffGridItem, { type StaffItemProps } from "./StaffGridItem.vue";

const {
  staffList,
  gridMode,
  columns,
} = defineProps<{
  staffList: StaffItemProps[];
  gridMode: "leader" | "core" | "volunteer";
  columns?: number;
}>();

const gridClass = computed(() => `staff-grid staff-grid-${gridMode}`);

const gridStyle = computed(() =>
  columns && (gridMode === "leader" || gridMode === "core")
    ? { gridTemplateColumns: `repeat(${columns}, 1fr)` }
    : {},
);
</script>

<template>
  <div :class="gridClass" :style="gridStyle">
    <StaffGridItem
      v-for="(staff, idx) in staffList" :key="idx" class="staff-member"
      v-bind="{ ...staff, gridMode }"
    />
  </div>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.staff-grid {
  display: grid;
  margin-bottom: 1.5rem;
}

.staff-grid-leader {
  gap: 1rem;
}

.staff-grid-core {
  gap: 0.9rem;
}

.staff-grid-volunteer {
  display: flex;
  flex-wrap: wrap;
  align-items: left;
  margin: 1.5rem 0 0 0;
}
</style>
