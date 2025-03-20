<script setup lang="ts">
import Textarea from "primevue/textarea";
import { useId } from "vue";

import type { MessageSchema } from "~~/i18n/message-schema";
import { useI18n } from "#imports";

import type { FormFieldState } from "./VFForm.vue";

defineProps<{
  formState?: FormFieldState;
}>();

const id = useId();
const { locale: lang } = useI18n<{ message: MessageSchema }>();
</script>

<template>
  <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
  <label v-if="$attrs.label" :for="id" :lang>{{ $attrs.label }}</label>
  <Textarea v-bind="$attrs" :id="id" :class="{ 'has-form-state': formState }" />
  <p
    v-if="formState"
    class="error-message text-caption"
    :aria-hidden="formState.valid"
  >
    <span v-if="formState?.invalid">
      {{ formState.error.message }}
    </span>
  </p>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--color-divider);
  border-radius: 0.5rem;

  &::placeholder {
    color: var(--color-place-holder);
  }

  &:enabled:focus,
  &:enabled:hover {
    border-color: var(--color-primary);
  }
}

label {
  display: block;
  color: var(--color-text-default);
  margin-bottom: 0.5rem;

  &[lang="ja"] {
    font-family: IBMPlexSansJP-Bold;
  }

  &[lang="en"] {
    font-family: JetBrainsMono-Regular;
  }
}

.error-message {
  color: var(--color-error);
  margin: 0.5rem 0;

  /* align to text-caption line-height */
  min-height: 19px;
  @media (--mobile) {
    line-height: 17px;
  }
}
</style>
