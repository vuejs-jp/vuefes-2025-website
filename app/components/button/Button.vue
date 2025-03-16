<script setup lang="ts">
import { useLangClass } from "#imports";

const {
  type = "button",
  outlined = false,
  icon = false,
} = defineProps<{
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  outlined?: boolean;
  icon?: boolean;
}>();

const emit = defineEmits<{
  click: [];
}>();

const langClass = useLangClass();
</script>

<template>
  <button
    :type
    :class="[
      langClass,
      {
        'button-outlined': outlined,
        'button-icon': icon,
      },
    ]"
    v-bind="$attrs"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

button {
  padding: 1rem 2.5rem;
  border-radius: 6.25rem;
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;

  cursor: pointer;

  /* align to h2 */
  font-size: 18px;
  line-height: 31px;
  @media (--mobile) {
    font-size: 16px;
    line-height: 28px;
  }

  &.lang-ja {
    font-family: IBMPlexSansJP-Bold;
  }

  &.lang-en {
    font-family: JetBrainsMono-Regular;
  }

  &:hover,
  &:active {
    background-color: var(--color-accent-hover);
  }

  &.button-outlined {
    background-color: transparent;
    border: 1px solid var(--color-place-holder);
    color: var(--color-text-default);
    &:hover,
    &:active {
      border: 1px solid var(--color-primary);
      color: var(--color-primary);
    }
  }

  &.button-icon {
    background-color: var(--color-white);
    color: var(--color-primary);
    border: 1px solid var(--color-divider);
    box-sizing: border-box;
    width: 6.5rem;
    height: 5rem;
    padding: 1.25rem 2rem;
    border-radius: 25%;
    @media (--mobile) {
      width: 5.5rem;
      height: 4rem;
      padding: 1.25rem 2rem;
      border-radius: 12.5%;
    }
  }
}
</style>
