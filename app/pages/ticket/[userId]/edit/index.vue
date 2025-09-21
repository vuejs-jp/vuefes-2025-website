<script setup lang="ts">
import * as v from "valibot";
import emojiRegex from "emoji-regex";

import { useLocaleRoute } from "@typed-router";
import {
  computed,
  navigateTo,
  onMounted,
  ref,
  useAuth,
  useBreakpoint,
  useFetch,
  useI18n,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useHead,
  useSeoMeta,
  useTemplateRef,
  useRoute,
} from "#imports";

import type { FormFieldStates, FormSubmitEvent } from "~/components/form/VFForm.vue";
import type { VFFile } from "~/components/form/VFFileInput.vue";
import { VFFileInput, VFForm, VFNameBadgePreview, VFSection, VFToast } from "#components";
import { useToast } from "~/components/toast/VFToast.vue";

const { t } = useI18n();
const title = () => `${t("nuxtSiteConfig.name")} %separator %s`;
useSeoMeta({
  ogTitle: title,
  title,
});

const { data: user } = useAuth();
const toast = useToast();
const bp = useBreakpoint();
const localeRoute = useLocaleRoute();
const route = useRoute();

if (import.meta.vfFeatures.expiredNameBadgeRegistration) {
  if (user.value) {
    await navigateTo(localeRoute({
      name: "ticket-userId",
      params: { userId: user.value.userId },
    }));
  } else {
    await navigateTo(localeRoute({ name: "ticket" }));
  }
}

if (route.params.userId !== user.value?.userId) {
  if (user.value) {
    await navigateTo(localeRoute({
      name: "ticket-userId",
      params: { userId: user.value.userId },
    }));
  } else {
    await navigateTo(localeRoute({ name: "ticket" }));
  }
}

const { data: nameBadgeData, refresh } = useFetch("/api/name-badge");

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

const schema = v.objectAsync({
  name: v.pipe(
    v.string(),
    v.minLength(1, t("nameBadge.form.name.error.required")),
    v.check(
      (value) => {
        const len = [...value].reduce(
          (len, char) => len + (/[\u2E80-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF]/.test(char) ? 2 : 1),
          0,
        );
        return len <= 24;
      },
      t("nameBadge.form.name.error.tooLong"),
    ),
    v.check(
      value => !emojiRegex().test(value),
      t("nameBadge.form.name.error.emoji"),
    ),
  ),

  salesId: v.pipe(
    v.string(),
    v.minLength(1, t("nameBadge.form.receipt.error.required")),
  ),

  avatarImage: v.pipeAsync(
    v.custom<VFFile>((input: unknown): input is VFFile => !!input),
    v.checkAsync(
      async (file: VFFile) => {
        const { size } = await fetch(file.objectURL).then(r => r.blob());
        return sizeInMB(size) <= 5;
      },
      t("nameBadge.form.avatarImage.error.size"),
    ),
    v.check(
      (file: VFFile) => ["image/jpg", "image/jpeg", "image/png"].includes(file.type),
      t("nameBadge.form.avatarImage.error.type"),
    ),
  ),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const form = useTemplateRef<any>("form");
const currentStates = computed(() => form.value?.currentState?.() as FormFieldStates<v.InferOutput<typeof schema>> | undefined);
const initialValues = ref<Partial<v.InferOutput<typeof schema>>>({
  name: "",
  salesId: "",
  avatarImage: undefined,
});

onMounted(async () => {
  await refresh();

  if (nameBadgeData.value) {
    form.value?.setFieldValue("name", nameBadgeData.value.name ?? "");
    form.value?.setFieldValue("salesId", nameBadgeData.value.salesId ?? "");

    if (nameBadgeData.value?.avatarUrl && nameBadgeData.value?.avatarImageFileName) {
      // NOTE: need to configure cors
      const avatarBlob = await fetch(nameBadgeData.value.avatarUrl).then(r => r.blob());
      form.value?.setFieldValue("avatarImage", {
        displayName: nameBadgeData.value.avatarImageFileName,
        name: nameBadgeData.value.avatarImageFileName,
        type: avatarBlob.type,
        objectURL: URL.createObjectURL(avatarBlob),
      } satisfies VFFile);
    }
  }
});

const isLoading = ref(false);

async function submit(event: FormSubmitEvent) {
  if (!user.value) {
    toast.open({ type: "alert", message: t("nameBadge.form.submitResult.error") });
    return;
  }

  if (event.valid) {
    try {
      isLoading.value = true;
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
    } finally {
      isLoading.value = false;
    }
  }
}
</script>

<template>
  <div id="pages-ticket-userId-edit">
    <div v-if="isLoading" class="overlay" />

    <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
    <h1>Ticket</h1>

    <VFSection :title="nameBadgeData ? t('nameBadge.edit') : t('nameBadge.create')" class="name-badge-section">
      <div class="name-badge-preview-area">
        <VFNameBadgePreview
          :user-role="nameBadgeData?.role || 'Attendee'"
          :name="currentStates?.name?.value || t('nameBadge.form.name.label')"
          :avatar-image-url="currentStates?.avatarImage?.value?.objectURL"
          :lang="nameBadgeData?.lang ?? undefined"
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
        ref="form"
        :initial-values
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

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.2);
    z-index: var(--z-index-overlay);
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
