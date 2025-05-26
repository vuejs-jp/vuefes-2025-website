<script setup lang="ts">
import { computed, defineProps } from "vue";
import { VFButton } from "#components";

const { isOpened } = defineProps<{
  isOpened: boolean;
}>();

const emits = defineEmits<{
  click: [];
}>();

const label = computed(() => isOpened ? "Close" : "Menu");
</script>

<template>
  <VFButton class="toggle-button" @click="emits('click')">
    {{ label }}
  </VFButton>
</template>

<style scoped>
/* TODO: include VFButton style */
.toggle-button {
  background: var(--color-white-transparent);
  backdrop-filter: blur(8px);
  color: var(--color-base);
  border: 1px solid var(--color-divider-light);
  border-radius: 20px;
  font-weight: 500;

  /* TODO: no hover style when touch devices (in VFButton) */
  &:hover {
    background: var(--color-white-transparent) !important;
    backdrop-filter: blur(8px) !important;
    color: var(--color-base) !important;
  }
}
</style>
