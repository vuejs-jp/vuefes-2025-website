<script setup lang="ts">
import { z } from "zod";
import emojiRegex from "emoji-regex";

import { useLocaleRoute } from "@typed-router";
import { definePageMeta, navigateTo, ref, useAuth, useBreakpoint, useFetch, useI18n, watch } from "#imports";

import type { FormSubmitEvent } from "~/components/form/VFForm.vue";
import type { VFFile } from "~/components/form/VFFileInput.vue";
import { VFFileInput, VFForm, VFNameBadgePreview, VFSection, VFToast } from "#components";
import { useToast } from "~/components/toast/VFToast.vue";

definePageMeta({
  middleware: () => __FEATURE_TICKET_NAME_BADGE__ || navigateTo("/"),
});

const { data: user } = useAuth();
const { t } = useI18n();
const toast = useToast();
const bp = useBreakpoint();
const localeRoute = useLocaleRoute();

const { data: nameBadgeData } = useFetch("/api/name-badge");

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

const schema = z.object({
  name: z
    .string()
    .min(1, t("nameBadge.form.name.error.required"))
    .refine(
      (value) => {
        const len = [...value].reduce(
          (len, char) => len + (/[\u2E80-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF]/.test(char) ? 2 : 1),
          0,
        );
        return len <= 24;
      },
      { message: t("nameBadge.form.name.error.tooLong") },
    )
    .refine(
      value => !emojiRegex().test(value),
      { message: t("nameBadge.form.name.error.emoji") },
    ),

  salesId: z
    .string()
    .min(1, t("nameBadge.form.receipt.error.required")),

  avatarImage: z
    .custom<VFFile>()
    .refine(
      file => !!file,
      { message: t("nameBadge.form.avatarImage.error.required") },
    )
    .refine(
      async (file) => {
        const { size } = await fetch(file.objectURL).then(r => r.blob());
        return sizeInMB(size) <= 5;
      },
      { message: t("nameBadge.form.avatarImage.error.size") },
    )
    .refine(
      file => ["image/jpg", "image/jpeg", "image/png"].includes(file.type),
      { message: t("nameBadge.form.avatarImage.error.type") },
    ),
});

const state = ref<Partial<z.infer<typeof schema>>>({
  name: "",
  salesId: "",
  avatarImage: undefined,
});
watch(nameBadgeData, async (data) => {
  if (data) {
    state.value.name = data?.name || "";
    state.value.salesId = data?.salesId || "";

    if (data?.avatarUrl && data?.avatarImageFileName) {
      // NOTE: need to configure cors
      const avatarBlob = await fetch(data.avatarUrl).then(r => r.blob());
      state.value.avatarImage = {
        name: data.avatarImageFileName,
        type: avatarBlob.type,
        objectURL: URL.createObjectURL(avatarBlob),
      };
    }
  }
}, { immediate: true });

async function submit(event: FormSubmitEvent) {
  if (!user.value) {
    toast.open({ type: "alert", message: t("nameBadge.form.submitResult.error") });
    return;
  }

  if (event.valid) {
    try {
      const formData = new FormData();
      formData.append("name", event.states.name!.value);
      formData.append("salesId", event.states.salesId!.value);
      if (event.states.avatarImage?.value) {
        const blob = await fetch(event.states.avatarImage.value.objectURL).then(r => r.blob());
        formData.append("avatarImageBlob", blob);
        formData.append("avatarImageName", event.states.avatarImage.value.name);
      }

      // ident by session
      await $fetch(`/api/name-badge/`, { method: "POST", body: formData });
      toast.open({ type: "success", message: t("nameBadge.form.submitResult.success") });
      await navigateTo(`/ticket/${user.value.userId}`);
    }
    catch (error) {
      console.error(error);
      toast.open({ type: "alert", message: t("nameBadge.form.submitResult.error") });
    }
  }
}
</script>

<template>
  <div id="pages-ticket-userId-edit">
    <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
    <h1>Ticket</h1>

    <VFSection :title="nameBadgeData ? t('nameBadge.edit') : t('nameBadge.create')" class="name-badge-section">
      <div class="name-badge-preview-area">
        <VFNameBadgePreview
          :user-role="
            // TODO:
            'Attendee'
          "
          :name="state.name || t('nameBadge.form.name.label')"
          :avatar-image-url="state.avatarImage?.objectURL"
          v-bind="
            bp =='mobile'
              ? {
                width: '100%',
                height: '284px',
                aspectRatio: '200 / 284',
              }
              : {
                width: '100%',
                height: '360px',
                aspectRatio: '253.52 / 360',
              }
          "
        />
      </div>

      <VFForm
        :state
        :schema
        class="name-badge-form"
        @submit="submit"
      >
        <template #default="$form">
          <VFInput
            name="name"
            required
            :label="t('nameBadge.form.name.label')"
            :placeholder="t('nameBadge.form.name.placeholder')"
            :form-state="$form.name"
          />
          <VFFileInput
            name="avatarImage"
            :label="t('nameBadge.form.avatarImage.label')"
            :placeholder="t('nameBadge.form.avatarImage.placeholder')"
            :description="t('nameBadge.form.avatarImage.description')"
            :form-state="$form.avatarImage"
          />
          <VFInput
            name="salesId"
            required
            :label="t('nameBadge.form.receipt.label')"
            :description="t('nameBadge.form.receipt.description')"
            :form-state="$form.salesId"
          />

          <div class="name-badge-form-actions">
            <VFButton
              outlined
              :link="localeRoute({
                name: 'ticket-userId',
                params: { userId: user!.userId },
              })"
            >
              {{ t("nameBadge.form.cancel") }}
            </VFButton>
            <VFButton
              type="submit"
              :disabled="
                !$form.name?.valid
                  || !$form.avatarImage?.value
                  || !$form.avatarImage?.valid
                  || !$form.salesId?.valid
              "
            >
              {{ t("nameBadge.form.save") }}
            </VFButton>
          </div>
        </template>
      </VFForm>
    </VFSection>
  </div>

  <VFToast :state="toast.state.value" />
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

#pages-ticket-userId-edit {
  display: grid;
  row-gap: 1.5rem;

  @media (--mobile) {
    row-gap: 1rem;
  }

  h1 {
    font-family: "ClashDisplay-Semibold";
    font-size: 3rem;
    padding: 7.5rem 0;
    margin: 0;

    @media (--mobile) {
      padding: 2.5rem 0.75rem;
    }
  }

  .name-badge-section {
    .name-badge-preview-area {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-bottom: 2rem;
      @media (--mobile) {
        margin-bottom: 1.5rem;
      }
    }

    .name-badge-form {
      display: grid;
      row-gap: 1.5rem;

      .name-badge-form-actions {
        display: flex;
        column-gap: 1rem;
        justify-content: center;
      }
    }
  }
}
</style>
