<script setup lang="ts">
import InputText from "primevue/inputtext";
import { useId } from "vue";

import type { FormFieldState } from "./VFForm.vue";

import { useI18n } from "#imports";

defineProps<{
  formState?: FormFieldState;
  description?: string;
}>();

const id = useId();
const descriptionId = useId();
const { locale: lang } = useI18n();
</script>

<template>
  <div>
    <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
    <label v-if="$attrs.label" :for="id" :lang>{{ $attrs.label }}</label>
    <InputText
      v-bind="$attrs"
      :id="id"
      :aria-describedby="descriptionId"
      :class="{
        invalid: formState?.invalid,
      }"
    />
    <p v-if="description" class="description text-caption">
      {{ description }}
    </p>
    <p
      v-if="formState?.invalid"
      :id="descriptionId"
      class="error-message text-caption"
      :aria-hidden="formState.valid"
    >
      <span v-if="formState?.invalid">
        <!-- NOTE: formState.error potential nullish value -->
        {{ formState.error?.message }}
      </span>
    </p>
  </div>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

input {
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--color-divider);
  border-radius: 0.5rem;
  @media (--mobile) {
    font-size: 0.875rem;
  }

  &::placeholder {
    color: var(--color-place-holder);
  }

  &:enabled:focus,
  &:enabled:hover {
    border-color: var(--color-primary);
    &.invalid {
      border-color: var(--color-alert);
    }
  }

  &.invalid {
    border-color: var(--color-alert);
    &::placeholder {
      color: var(--color-place-holder);
    }
  }
}

label {
  display: block;
  color: var(--color-text-default);
  margin-bottom: 0.25rem;

  &[lang="ja"],
  &[lang="ja-JP"] {
    font-family: IBMPlexSansJP-SemiBold;
  }

  &[lang="en"],
  &[lang="en-US"] {
    font-family: JetBrainsMono-Bold;
  }
}

.description {
    margin-top: 0.5rem;
    margin-bottom: 0rem;
  }

.error-message {
  color: var(--color-alert);
  margin: 0.5rem 0;

  /* align to text-caption line-height */
  min-height: 19px;
  @media (--mobile) {
    line-height: 17px;
  }
}
</style>
