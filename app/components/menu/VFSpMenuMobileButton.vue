<script setup lang="ts">
import { computed } from "vue";
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
  padding: 1rem 2rem;
  background: var(--color-gray-transparent);
  backdrop-filter: blur(10px);
  color: var(--color-base);
  border: 1px solid var(--color-white);
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  font-family: JetBrainsMono-Medium !important;
  font-size: 0.875rem;

  /* TODO: no hover style when touch devices (in VFButton) */
  &:hover {
    background: var(--color-gray-transparent) !important;
    backdrop-filter: blur(10px) !important;
    color: var(--color-base) !important;
  }
}
</style>
