<script setup lang="ts">
import { useI18n } from "#imports";

const { t } = useI18n();
</script>

<template>
  <VFButton link="https://vuejs-jp.stores.jp" external class="vf-button">
    {{ t('store.preOrder') }}
  </VFButton>
</template>

<style scoped>
.vf-button {
  color: var(--color-white);

  &:hover {
    color: var(--color-white);
  }
}
</style>
