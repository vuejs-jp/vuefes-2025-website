<script setup lang="ts">
import { z } from "zod";
import { definePageMeta, navigateTo, ref, useAuth, useBreakpoint, useFetch, useI18n, watch } from "#imports";

import type { FormSubmitEvent } from "~/components/form/VFForm.vue";
import type { VFFile } from "~/components/form/VFFileInput.vue";
import { VFFileInput, VFForm, VFNamecardPreview, VFSection, VFToast } from "#components";
import { useToast } from "~/components/toast/VFToast.vue";

definePageMeta({
  middleware: () => __FEATURE_TICKET_NAMECARD__ || navigateTo("/"),
});

const { data: user } = useAuth();
const { t } = useI18n();
const toast = useToast();
const bp = useBreakpoint();

const { data: nameCardData } = useFetch("/api/namecard");

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

const schema = z.object({
  name: z.string().min(1, t("namecard.form.name.error.required")),
  salesId: z.string().min(1, t("namecard.form.receipt.error.required")),
  avatarImage: z
    .custom<VFFile>()
    .refine(file => !!file, { message: t("namecard.form.avatarImage.error.required") })
    .refine(async (file) => {
      const { size } = await fetch(file.objectURL).then(r => r.blob());
      return sizeInMB(size) <= 5;
    }, { message: t("namecard.form.avatarImage.error.size") })
    .refine(file => ["image/jpg", "image/jpeg", "image/png"].includes(file.type), {
      message: t("namecard.form.avatarImage.error.type"),
    }),
});

const state = ref<Partial<z.infer<typeof schema>>>({
  name: "",
  salesId: "",
  avatarImage: undefined,
});
watch(nameCardData, async (data) => {
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
    toast.open({ type: "alert", message: t("namecard.form.submitResult.error") });
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
      await $fetch(`/api/namecard/`, { method: "POST", body: formData });
      toast.open({ type: "success", message: t("namecard.form.submitResult.success") });
      await navigateTo(`/ticket/${user.value.userId}`);
    }
    catch (error) {
      console.error(error);
      toast.open({ type: "alert", message: t("namecard.form.submitResult.error") });
    }
  }
}
</script>

<template>
  <div id="pages-ticket-uerId-edit">
    <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
    <h1>Ticket</h1>

    <VFSection :title="nameCardData ? t('namecard.edit') : t('namecard.create')" class="namecard-section">
      <div class="namecard-preview-area">
        <VFNamecardPreview
          :type="
            // TODO:
            'Attendee'
          "
          :name="state.name || t('namecard.form.name.label')"
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
        class="namecard-form"
        @submit="submit"
      >
        <template #default="$form">
          <VFInput
            name="name"
            required
            :label="t('namecard.form.name.label')"
            :placeholder="t('namecard.form.name.placeholder')"
            :form-state="$form.name"
          />
          <VFFileInput
            name="avatarImage"
            :label="t('namecard.form.avatarImage.label')"
            :placeholder="t('namecard.form.avatarImage.placeholder')"
            :description="t('namecard.form.avatarImage.description')"
            :form-state="$form.avatarImage"
          />
          <VFInput
            name="salesId"
            required
            :label="t('namecard.form.receipt.label')"
            :description="t('namecard.form.receipt.description')"
            :form-state="$form.salesId"
          />

          <div class="namecard-form-actions">
            <VFButton outlined link="/ticket">
              {{ t("namecard.form.cancel") }}
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
              {{ t("namecard.form.save") }}
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

#pages-ticket-uerId-edit {
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

  .namecard-section {
    .namecard-preview-area {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-bottom: 2rem;
      @media (--mobile) {
        margin-bottom: 1.5rem;
      }
    }

    .namecard-form {
      display: grid;
      row-gap: 1.5rem;

      .namecard-form-actions {
        display: flex;
        column-gap: 1rem;
        justify-content: center;

        button {
          width: 100%;
          max-width: 200px;
        }
      }
    }
  }
}
</style>
