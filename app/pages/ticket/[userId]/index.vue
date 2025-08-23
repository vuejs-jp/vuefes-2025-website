<script setup lang="ts">
import { useRoute, useLocaleRoute } from "@typed-router";
import {
  defineOgImage,
  navigateTo,
  useAuth,
  useBreakpoint,
  useFetch,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useHead,
  useI18n,
  useSeoMeta,
} from "#imports";

import { VFNameBadgePreview, VFSection, VFToast } from "#components";
import { useToast } from "~/components/toast/VFToast.vue";

import XIcon from "~icons/icons/ic_x";
import BlueskyIcon from "~icons/icons/ic_bluesky";
import FacebookIcon from "~icons/icons/ic_facebook";

const { t } = useI18n();
const toast = useToast();
const bp = useBreakpoint();
const localeRoute = useLocaleRoute();

const { data: session, status } = useAuth();
const route = useRoute("ticket-userId");
const { data: nameBadgeData } = useFetch(`/api/name-badge/${route.params.userId}`);
defineOgImage({
  component: "OgNameBadge",
  props: {
    name: () => nameBadgeData.value?.name,
    userRole: () => nameBadgeData.value?.role,
    avatarImageUrl: () => nameBadgeData.value?.avatarUrl,
    lang: () => nameBadgeData.value?.lang,
  },
});

useSeoMeta({
  title: () => nameBadgeData.value?.role === "Sponsor"
    ? t("nameBadge.pageTitleSponsor", { sponsorName: nameBadgeData.value?.name })
    : t("nameBadge.pageTitle", { username: nameBadgeData.value?.name }),
  ogTitle: () => nameBadgeData.value?.role === "Sponsor"
    ? t("nameBadge.pageTitleSponsor", { sponsorName: nameBadgeData.value?.name })
    : t("nameBadge.pageTitle", { username: nameBadgeData.value?.name }),
  description: () => t("nameBadge.pageDescription"),
  ogDescription: () => t("nameBadge.pageDescription"),
});

function handleClickXIcon() {
  const shareUrl = window.location.href.endsWith("/") ? window.location.href : `${window.location.href}/`;
  const shareText = t("nameBadge.shareText", { link: shareUrl });
  const url = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  const _ = window.open(url, "_blank") ?? navigateTo(url, { external: true });
}

function handleClickBlueskyIcon() {
  const shareUrl = window.location.href;
  const shareText = t("nameBadge.shareText", { link: shareUrl });
  const url = `https://bsky.app/intent/compose?text=${encodeURIComponent(shareText)}`;
  const _ = window.open(url, "_blank") ?? navigateTo(url, { external: true });
}

function handleClickFacebookIcon() {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
  const _ = window.open(url, "_blank") ?? navigateTo(url, { external: true });
}

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
    <VFSection :title="t('nameBadge.title')" class="name-badge-section">
      <div class="name-badge-preview-area">
        <VFNameBadgePreview
          :user-role="nameBadgeData?.role ?? 'Attendee'"
          :name="nameBadgeData?.name || t('nameBadge.form.name.label')"
          :avatar-image-url="nameBadgeData?.avatarUrl"
          :lang="nameBadgeData?.lang ?? undefined"
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
        <p class="name-badge-status">
          <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
          {{ t("nameBadge.status.label") }} : {{ nameBadgeData ? t(`nameBadge.status.created`) : t(`nameBadge.status.notCreated`) }}
        </p>

        <VFButton
          :link="localeRoute(`/ticket/${session!.userId}/edit`)"
          class="vf-button vf-button-primary"
        >
          {{ t("nameBadge.edit") }}
        </VFButton>

        <p class="name-badge-deadline">
          {{ t("nameBadge.deadlineDescription") }}
        </p>
      </div>

      <hr class="divider" />

      <div class="foot-action">
        <p class="name-badge-lets-share">
          {{ t("nameBadge.letsShare") }}
        </p>

        <div class="name-badge-sns-buttons">
          <div class="name-badge-sns-icons">
            <button type="button" class="sns-icon-button" @click="handleClickXIcon">
              <XIcon />
            </button>

            <button type="button" class="sns-icon-button" @click="handleClickBlueskyIcon">
              <BlueskyIcon />
            </button>

            <button type="button" class="sns-icon-button" @click="handleClickFacebookIcon">
              <FacebookIcon />
            </button>
          </div>

          <VFButton outlined @click="copyUrl()">
            {{ t("copyLink") }}
          </VFButton>
        </div>

        <p class="name-badge-join-event">
          {{ t("nameBadge.joinEvent") }}
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

    .authenticated-action {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 1rem;

      .name-badge-status {
        margin-top: 2rem;
        color: var(--color-place-holder);
        @media (--mobile) {
          margin-top: 1.5rem;
        }
      }

      .name-badge-deadline {
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

      .name-badge-join-event {
        margin-top: 2rem;

        @media (--mobile) {
          margin-top: 1.5rem;
        }
      }

      .name-badge-sns-buttons {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        @media (--mobile) {
          flex-direction: column;
        }

        .name-badge-sns-icons {
          display: flex;
          gap: 0.5rem;
          align-items: center;

          .sns-icon-button {
            background: none;
            border: var(--color-divider) 1px solid;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 59px;
            height: 59px;

            @media (any-hover: hover) {
              &:hover {
                opacity: 0.8;
              }
            }
          }
        }
      }
    }
  }
}
</style>
