<script setup lang="ts">
import { useRoute, useLocaleRoute } from "@typed-router";
import { definePageMeta, navigateTo, useAuth, useBreakpoint, useFetch, useI18n } from "#imports";

import { VFNamecardPreview, VFSection, VFToast } from "#components";
import { useToast } from "~/components/toast/VFToast.vue";

definePageMeta({
  middleware: () => __FEATURE_TICKET_NAMECARD__ || navigateTo("/"),
});

const { t } = useI18n();
const toast = useToast();
const bp = useBreakpoint();
const localeRoute = useLocaleRoute();

const { data: session, status } = useAuth();
const route = useRoute();
const { data: nameCardData } = useFetch(`/api/namecard/${route.params.userId}`);

function copyUrl() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    toast.open({ type: "success", message: t("clipboard.copySuccess") });
  });
}
</script>

<template>
  <div id="pages-ticket-userId">
    <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
    <h1>Ticket</h1>
    <VFSection :title="t('namecard.title')" class="namecard-section">
      <div class="namecard-preview-area">
        <VFNamecardPreview
          :user-role="nameCardData?.role ?? 'Attendee'"
          :name="nameCardData?.name || t('namecard.form.name.label')"
          :avatar-image-url="nameCardData?.avatarUrl"
          v-bind="
            bp === 'mobile'
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

      <div
        v-if="status === 'authenticated' && session?.userId === route.params.userId"
        class="authenticated-action"
      >
        <p class="name-card-status">
          <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
          {{ t("namecard.status.label") }} : {{ nameCardData ? t(`namecard.status.created`) : t(`namecard.status.notCreated`) }}
        </p>

        <VFButton
          :link="localeRoute(`/ticket/${session!.userId}/edit`)"
          class="vf-button vf-button-primary"
        >
          {{ t("namecard.edit") }}
        </VFButton>

        <p class="name-card-deadline">
          {{ t("namecard.deadlineDescription") }}
        </p>
      </div>

      <hr class="divider" />

      <div class="foot-action">
        <p class="name-card-lets-share">
          {{ t("namecard.letsShare") }}
        </p>
        <VFButton outlined @click="copyUrl()">
          {{ t("copyLink") }}
        </VFButton>
        <!-- TODO: sns -->

        <p class="name-card-join-event">
          {{ t("namecard.joinEvent") }}
        </p>
        <VFButton :link="localeRoute('/')">
          {{ t("siteName") }}
        </VFButton>
      </div>
    </VFSection>
  </div>

  <VFToast :state="toast.state.value" />
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

#pages-ticket-userId {
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

    .authenticated-action {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 1rem;

      .name-card-status {
        margin-top: 2rem;
        color: var(--color-place-holder);
        @media (--mobile) {
          margin-top: 1.5rem;
        }
      }

      .name-card-deadline {
        color: var(--color-text-secondary);
        text-align: center;
        margin-top: 1rem;
      }
    }

    hr.divider {
      width: 100%;
      border: 0;
      border-top: 1px solid var(--color-divider);
      margin: 2rem 0;

      @media (--mobile) {
        margin: 1.5rem 0;
      }
    }

    .foot-action {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 1rem;

      p {
        width: 100%;
        text-align: start;
        margin: 0;
      }

      .name-card-join-event {
        margin-top: 2rem;

        @media (--mobile) {
          margin-top: 1.5rem;
        }
      }
    }
  }
}
</style>
