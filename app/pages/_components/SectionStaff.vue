<script setup lang="ts">
import { HOME_HEADING_ID } from "~/constant";
import { useI18n, useFetch, useBreakpoint, computed } from "#imports";
import { VFSection } from "#components";

import StaffGrid from "./StaffGrid.vue";

const { t } = useI18n();
const bp = useBreakpoint();

const { data: staffList } = await useFetch("/api/staffs");

const leaderColumns = computed(() => {
  return bp.value === "pc" ? 3 : 2;
});

const coreColumns = computed(() => {
  return bp.value === "pc" ? 4 : 3;
});
</script>

<template>
  <VFSection :id="HOME_HEADING_ID.staff" :title="t('staff.title')">
    <p class="staff-description">
      {{ t('staff.description') }}
    </p>
    <template v-if="staffList">
      <StaffGrid
        :staff-list="staffList.leaders"
        grid-mode="leader"
        :columns="leaderColumns"
      />
      <StaffGrid
        :staff-list="staffList.cores"
        grid-mode="core"
        :columns="coreColumns"
      />

      <VFHeading id="volunteer-staff">
        {{ t('staff.volunteer') }}
      </VFHeading>

      <StaffGrid
        :staff-list="staffList.volunteers"
        grid-mode="volunteer"
      />
    </template>
  </VFSection>
</template>

<style scoped>
.staff-description {
  margin: 2rem 0;
  word-break: break-all;
}
</style>
