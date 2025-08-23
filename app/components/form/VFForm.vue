<script lang="ts">
import type * as v from "valibot";
import {
  type FormFieldState,
  type FormSubmitEvent,
  Form as PForm,
} from "@primevue/forms";
import { valibotResolver } from "@primevue/forms/resolvers/valibot";
import { useTemplateRef } from "#imports";

export { type FormSubmitEvent, type FormFieldState } from "@primevue/forms";

export interface FormProps<State extends object> {
  initialValues: State;
  /** @default "blur" */
  validateOn?: "blur" | "submit" | "immediate";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema?: v.ObjectSchema<any, any> | v.ObjectSchemaAsync<any, any>;
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
const { initialValues, schema, validateOn = "blur" } = defineProps<FormProps<State>>();
const emit = defineEmits<FormEmits>();
defineSlots<FormSlots<State>>();

const form = useTemplateRef("form");

defineExpose({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentState: () => (form.value as any)?.states as FormFieldStates<State> | undefined,

  setFieldValue: (field: keyof State, value: State[keyof State]) => {
    if (form.value) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (form.value as any).setFieldValue(field as string, value);
    }
  },
});
</script>

<template>
  <PForm
    v-slot="$form"
    ref="form"
    :initial-values
    :resolver="schema ? valibotResolver(schema) : undefined"
    :validate-on-blur="validateOn === 'blur'"
    :validate-on-submit="validateOn === 'submit'"
    :validate-on-mount="validateOn === 'immediate'"
    @submit="emit('submit', $event)"
  >
    <slot v-bind="$form as FormFieldStates<State>" />
  </PForm>
</template>
