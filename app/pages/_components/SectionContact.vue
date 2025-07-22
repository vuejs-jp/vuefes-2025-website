<script setup lang="ts">
import { z } from "zod";
import { HOME_HEADING_ID } from "~/constant";
import { reactive, useI18n, useRuntimeConfig } from "#imports";
import { VFSection, VFButton } from "#components";
import { type FormSubmitEvent, VFForm, VFInput, VFTextarea } from "~/components/form";
import VFToast, { useToast } from "~/components/toast/VFToast.vue";

const { t } = useI18n();

const config = useRuntimeConfig();

const toast = useToast();

const schema = z.object({
  name: z
    .string()
    .nonempty(t("validation.required", { target: t("contactForm.formFields.name.label") })),
  email: z
    .string()
    .nonempty(t("validation.required", { target: t("contactForm.formFields.email.label") }))
    .email(t("validation.email")),
  content: z
    .string()
    .nonempty(t("validation.required", { target: t("contactForm.formFields.content.label") })),
});

const state = reactive<z.infer<typeof schema>>({
  name: "",
  email: "",
  content: "",
});

async function submit(event: FormSubmitEvent) {
  if (event.valid) {
    const formData = new FormData();
    Object.entries(event.states).forEach(([name, { value }]) => {
      formData.append(name, value);
    });
    try {
      await fetch(config.public.contactFormEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      event.reset();
      toast.open({
        type: "success",
        message: t("contactForm.successMessage"),
      });
    }
    catch (error) {
      console.error(error);
      toast.open({
        type: "alert",
        message: t("contactForm.errorMessage"),
      });
    }
  }
}
</script>

<template>
  <VFSection
    :id="HOME_HEADING_ID.contact"
    :title="t('contactForm.title')"
  >
    <p>{{ t("contactForm.description") }}</p>
    <VFForm
      :initialValues="state"
      :schema="schema"
      @submit="submit"
    >
      <template #default="$form">
        <div class="contact-form-items">
          <VFInput
            name="name"
            required
            :label="t('contactForm.formFields.name.label')"
            :placeholder="t('contactForm.formFields.name.placeholder')"
            :form-state="$form.name"
          />
          <VFInput
            name="email"
            required
            :label="t('contactForm.formFields.email.label')"
            :placeholder="t('contactForm.formFields.email.placeholder')"
            :form-state="$form.email"
          />
          <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
          <VFTextarea
            name="content"
            required
            :label="t('contactForm.formFields.content.label')"
            :placeholder="t('contactForm.formFields.content.placeholder')"
            :form-state="$form.content"
          />
        </div>
        <VFButton
          type="submit"
          class="submit-button"
          :disabled="
            !(
              $form.name?.touched
              && $form.name?.valid
              && $form.email?.touched
              && $form.email?.valid
              && $form.content?.touched
              && $form.content?.valid
            )
          "
        >
          {{ t("contactForm.formFields.submit.label") }}
        </VFButton>
      </template>
    </VFForm>

    <VFToast :state="toast.state.value" />
  </VFSection>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.contact-form-items {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  margin-top: 2rem;
  @media (--mobile) {
    margin-top: 1.5rem;
  }
}

.submit-button {
  display: block;
  margin: 0 auto;
  margin-top: 2rem;
  @media (--mobile) {
    margin-top: 1.5rem;
  }
}
</style>
