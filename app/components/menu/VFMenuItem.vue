<script setup lang="ts">
export type MenuItemProps = {
  id: string;
  label: string;
  routeName: string;
  disabled?: boolean;
};

const { label, disabled } = defineProps<MenuItemProps>();
</script>

<template>
  <NuxtLink
    :class="{ 'menuitem-link': true, 'text-body-1': true, 'menuitem-link-disabled': disabled }"
    :to="{ name: routeName as any }"
    prefetch-on="visibility"
    active-class="menuitem-link-active"
    v-bind="$attrs"
  >
    {{ label }}
  </NuxtLink>
</template>

<style scoped>
.menuitem-link {
  color: var(--color-base);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: var(--color-base);
  }

  &.menuitem-link-active {
    color: var(--color-base) !important;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: -20px;
      top: 5px;
      width: 10px;
      height: 10px;
      margin: 0;
      display: inline-block;
      background-color: var(--color-base);
      border-radius: 50%;
    }
  }

  &.menuitem-link-disabled {
    /* Keep existing disabled styles if needed */
    color: var(--color-place-holder) !important;
    pointer-events: none;
    cursor: not-allowed;
    &::before {
      display: none;
    }
  }
}
</style>
