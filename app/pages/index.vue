<script setup lang="ts">
import { z } from "zod";

import {
  defineRouteRules,
  queryCollection,
  reactive,
  useAsyncData,
  useBreakpoint,
  useI18n,
  useRuntimeConfig,

  // NOTE: import useHead to avoid `useHead is not defined` error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useHead,
  useSeoMeta,
} from "#imports";

import { ContentRenderer, VFHeading } from "#components";

import {
  type FormSubmitEvent,
  VFForm,
  VFInput,
  VFTextarea,
} from "~/components/form";
import VFToast, { useToast } from "~/components/toast/VFToast.vue";

import type { MessageSchema } from "~~/i18n/message-schema";

defineRouteRules({ prerender: true });

const config = useRuntimeConfig();

const { locale, t } = useI18n<{ message: MessageSchema }>();

useSeoMeta({ title: "" });

const bp = useBreakpoint();

const { data: message } = useAsyncData(`message-${locale.value}`, () =>
  queryCollection("i18n").path(`/${locale.value}/message`).first(),
);

const { data: sponsorWanted } = useAsyncData(
  `sponsor-wanted-${locale.value}`,
  () => queryCollection("i18n").path(`/${locale.value}/sponsor-wanted`).first(),
);

const contactForm = (() => {
  const toast = useToast();

  const schema = z.object({
    name: z.string().nonempty(
      t("validation.required", {
        target: t("contactForm.formFields.name.label"),
      }),
    ),
    email: z
      .string()
      .nonempty(
        t("validation.required", {
          target: t("contactForm.formFields.email.label"),
        }),
      )
      .email(t("validation.email")),
    content: z.string().nonempty(
      t("validation.required", {
        target: t("contactForm.formFields.content.label"),
      }),
    ),
  });

  type State = Partial<z.infer<typeof schema>>;

  const state = reactive<State>({
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
      } catch (error) {
        console.error(error);
        toast.open({
          type: "alert",
          message: t("contactForm.errorMessage"),
        });
      }
    }
  }

  return { state, schema, submit, toastState: toast.state };
})();
</script>

<template>
  <section class="message">
    <img
      :src="
        bp === 'pc'
          ? '/images/top/cover/message-pc.png'
          : '/images/top/cover/message-sp.png'
      "
      :alt="t('messageCoverImageAlt')"
    />
    <div class="message-content">
      <VFHeading>{{ t("message") }}</VFHeading>
      <ContentRenderer
        v-if="message"
        :value="message"
        class="message-content-text"
      />
    </div>
  </section>

  <section class="sponsor-wanted">
    <img
      :src="
        bp === 'pc'
          ? '/images/top/cover/sponsor-wanted-pc.svg'
          : '/images/top/cover/sponsor-wanted-sp.svg'
      "
      :alt="t('sponsorWantedCoverImageAlt')"
    />
    <div class="sponsor-wanted-content">
      <VFHeading>{{ t("sponsorWanted") }}</VFHeading>
      <ContentRenderer
        v-if="sponsorWanted"
        :value="sponsorWanted"
        class="sponsor-wanted-text"
      />
      <VFButton
        class="sponsor-apply-button"
        @click="
          () => {
            // TODO: link to form
          }
        "
        >{{ t("sponsorApplyButton") }}</VFButton
      >
    </div>
  </section>

  <section class="contact">
    <div class="contact-content">
      <!-- NOTE: provide id for hash link from coc -->
      <VFHeading id="contact-text">{{ t("contactForm.title") }}</VFHeading>
      <div class="sponsor-wanted-text">
        <p>{{ t("contactForm.description") }}</p>
      </div>
      <VFForm
        :state="contactForm.state"
        :schema="contactForm.schema"
        @submit="contactForm.submit"
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
            :disabled="
              !(
                $form.name?.touched &&
                $form.name?.valid &&
                $form.email?.touched &&
                $form.email?.valid &&
                $form.content?.touched &&
                $form.content?.valid
              )
            "
            >{{ t("contactForm.formFields.submit.label") }}</VFButton
          >
        </template>
      </VFForm>
    </div>
  </section>

  <h2 class="sns-introduction-heading">{{ t("snsIntroduction") }}</h2>

  <VFToast :state="contactForm.toastState.value" />
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.message,
.sponsor-wanted,
.contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-m);
  background-color: var(--color-white);
  border: 1px solid var(--color-divider-light);
  margin-bottom: 0.5rem;

  img {
    border-radius: var(--radius-m) var(--radius-m) 0 0;
    width: 100%;
    max-width: 700px;
    @media (--mobile) {
      max-width: none;
      width: 100%;
    }
  }

  .message-content,
  .sponsor-wanted-content {
    padding: 2.5rem 3.5rem 3rem;
    @media (--mobile) {
      padding: 2rem 1.5rem 3rem;
    }
  }

  .contact-content {
    padding: 3rem 3.5rem 3rem;
    @media (--mobile) {
      padding: 2rem 1.5rem 3rem;
    }
  }

  .message-content-text,
  .sponsor-wanted-text,
  .contact-text {
    margin-top: 2rem;

    @media (--mobile) {
      margin-top: 1.5rem;
    }
  }

  .sponsor-wanted-content {
    .sponsor-apply-button {
      display: block;
      margin: 0 auto;
      margin-top: 2rem;
      @media (--mobile) {
        margin-top: 1.5rem;
      }
    }
  }

  .contact-content {
    button[type="submit"] {
      display: block;
      margin: 0 auto;
      margin-top: 2rem;
      @media (--mobile) {
        margin-top: 1.5rem;
      }
    }
  }

  .contact-form-items {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    margin-top: 2rem;
    @media (--mobile) {
      margin-top: 1.5rem;
    }
  }
}

.sns-introduction-heading {
  font-size: 20px;
  line-height: 34px;
  text-align: center;
  margin-top: 1.5rem;
  text-wrap-style: auto;
  
  @media (--mobile) {
    font-size: 18px;
    line-height: 31px;
    margin-top: 1rem;
  }
}
</style>
