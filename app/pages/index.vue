<script setup lang="ts">
import { z } from "zod";

import {
  defineRouteRules,
  queryCollection,
  reactive,
  useAsyncData,
  useBreakpoint,
  useI18n,
} from "#imports";

import {
  ContentRenderer,
  VFFooter,
  VFHeading,
  VFHeader,
  MainVisual,
} from "#components";

import {
  type FormSubmitEvent,
  VFForm,
  VFInput,
  VFTextarea,
} from "~/components/form";

import type { MessageSchema } from "~~/i18n/message-schema";

defineRouteRules({ prerender: true });

const { locale, t } = useI18n<{ message: MessageSchema }>();

const bp = useBreakpoint();

const { data: message } = useAsyncData(`message-${locale.value}`, () =>
  queryCollection("i18n").path(`/${locale.value}/message`).first(),
);

const { data: sponsorWanted } = useAsyncData(
  `sponsor-wanted-${locale.value}`,
  () => queryCollection("i18n").path(`/${locale.value}/sponsor-wanted`).first(),
);

const contactForm = (() => {
  const schema = z.object({
    name: z.string().nonempty(),
    email: z.string().email().nonempty(),
    content: z.string().nonempty(),
  });

  type State = Partial<z.infer<typeof schema>>;

  const state = reactive<State>({
    name: undefined,
    email: undefined,
    content: undefined,
  });

  function submit(event: FormSubmitEvent) {
    console.log("🚀 ~ submit ~ event:", event);
    // TODO:
  }

  return { state, schema, submit };
})();
</script>

<template>
  <MainVisual class="main-visual" />

  <div class="content">
    <div style="height: 100vh" />

    <VFHeader class="header" />

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
        <ContentRenderer v-if="message" :value="message" />
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
        <ContentRenderer v-if="sponsorWanted" :value="sponsorWanted" />
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
        <VFHeading>{{ t("contactForm.title") }}</VFHeading>
        <p>{{ t("contactForm.description") }}</p>
        <VFForm
          :state="contactForm.state"
          :schema="contactForm.schema"
          @submit="contactForm.submit"
        >
          <template #default="$form">
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

            <VFButton type="submit">{{
              t("contactForm.formFields.submit.label")
            }}</VFButton>
          </template>
        </VFForm>
      </div>
    </section>

    <h2 class="sns-introduction-heading">{{ t("snsIntroduction") }}</h2>

    <VFFooter />

    <div style="height: 100vh" />
  </div>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.main-visual {
  position: fixed;
  z-index: -1;
}

.content {
  margin: 0 auto;
  background-color: transparent;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  max-width: 700px;
  @media (--mobile) {
    max-width: none;
    width: 100%;
    padding: 0.25rem;
  }

  .header {
    position: sticky;
    top: 0;
    width: 100%;
    margin: 0.5rem;
  }

  .message,
  .sponsor-wanted,
  .contact {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-m);
    background-color: var(--color-white);

    margin-bottom: 1.5rem;
    @media (--mobile) {
      margin-bottom: 0.5rem;
    }

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
    .sponsor-wanted-content,
    .contact-content {
      padding: 3rem 3.5rem;
      @media (--mobile) {
        padding: 0 1.5rem;
        margin: 1.5rem 0;
      }
    }

    .sponsor-wanted-content {
      .sponsor-apply-button {
        display: block;
        margin: 0 auto;
        margin-top: 1.5rem;
        @media (--mobile) {
          margin-top: 1rem;
        }
      }
    }

    .contact-content {
      p {
        margin-bottom: 1.5rem;
        @media (--mobile) {
          margin-bottom: 1rem;
        }
      }
      /* :deep(input[name="name"]),
      :deep(input[name="email"]),
      :deep(textarea[name="content"]) {
        margin-bottom: 1.5rem;
        @media (--mobile) {
          margin-bottom: 1rem;
        }
      } */

      button[type="submit"] {
        display: block;
        margin: 0 auto;
        margin-top: 1.5rem;
        @media (--mobile) {
          margin-top: 1rem;
        }
      }
    }
  }

  .sns-introduction-heading {
    text-align: center;
    margin: 1rem 0 2rem 0;
    padding: 0 0.5rem;
  }
}
</style>
