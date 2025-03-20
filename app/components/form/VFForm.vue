<script lang="ts">
import type { ZodSchema } from "zod";
import {
  type FormFieldState,
  type FormSubmitEvent,
  Form as PForm,
} from "@primevue/forms";
import { zodResolver } from "@primevue/forms/resolvers/zod";
export { type FormSubmitEvent, type FormFieldState } from "@primevue/forms";

export interface FormProps<State extends object> {
  state: State;
  /** @default "blur" */
  validateOn?: "blur" | "submit" | "immediate";
  schema?: ZodSchema<State>;
}

export interface FormEmits {
  submit: [FormSubmitEvent];
}

export type FormFieldStates<State extends object> = {
  [key in keyof State]: FormFieldState;
};

export interface FormSlots<State extends object> {
  default: ($form: FormFieldStates<State>) => unknown;
}
</script>

<script setup lang="ts" generic="State extends object">
const { state, schema, validateOn = "blur" } = defineProps<FormProps<State>>();
const emit = defineEmits<FormEmits>();
defineSlots<FormSlots<State>>();
</script>

<template>
  <PForm
    v-slot="$form"
    :initial-values="state"
    :resolver="schema ? zodResolver(schema) : undefined"
    :validate-on-blur="validateOn === 'blur'"
    :validate-on-submit="validateOn === 'submit'"
    :validate-on-mount="validateOn === 'immediate'"
    @submit="emit('submit', $event)"
  >
    <slot v-bind="$form as FormFieldStates<State>" />
  </PForm>
</template>
