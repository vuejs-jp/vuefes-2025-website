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
  background: var(--color-grey-transparent);
  backdrop-filter: blur(4px);
  color: var(--color-base);
  font-weight: 500;
  border-radius: 20px;
  border: 1px solid var(--color-white);

  /* TODO: no hover style when touch devices (in VFButton) */
  &:hover {
    background: var(--color-grey-transparent) !important;
    backdrop-filter: blur(4px) !important;
    color: var(--color-base) !important;
  }
}
</style>
