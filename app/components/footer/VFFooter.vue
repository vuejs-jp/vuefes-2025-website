<script setup lang="ts">
import { useI18n, useLocalePath } from "#imports";
import { VFButton } from "#components";
import type { MessageSchema } from "~~/i18n/message-schema";

import XIcon from "~icons/icons/ic_x";
import YoutubeIcon from "~icons/icons/ic_youtube";
import GithubIcon from "~icons/icons/ic_github";
import NoteIcon from "~icons/icons/ic_note";
import BlueskyIcon from "~icons/icons/ic_bluesky";

import Logo from "~icons/logo/logo";

const localePath = useLocalePath();
const { t } = useI18n<{ message: MessageSchema }>();
</script>

<template>
  <footer>
    <div class="sns-container">
      <VFButton icon link="https://x.com/vuefes" external class="sns-button">
        <XIcon :aria-label="t('snsIconImageAlt.x')" role="img" />
      </VFButton>
      <VFButton
        icon
        link="https://bsky.app/profile/vuefes.bsky.social"
        external
        class="sns-button"
      >
        <BlueskyIcon :aria-label="t('snsIconImageAlt.bluesky')" role="img" />
      </VFButton>
      <VFButton
        icon
        link="https://www.youtube.com/channel/UC6KPwA1kZJtQYdlh8_2hxCA"
        external
        class="sns-button"
      >
        <YoutubeIcon :aria-label="t('snsIconImageAlt.youtube')" role="img" />
      </VFButton>
      <VFButton
        icon
        link="https://github.com/vuejs-jp"
        external
        class="sns-button"
      >
        <GithubIcon :aria-label="t('snsIconImageAlt.github')" role="img" />
      </VFButton>
      <VFButton
        icon
        link="https://note.com/vuejs_jp/m/mb35849fee631"
        external
        class="sns-button"
      >
        <NoteIcon :aria-label="t('snsIconImageAlt.note')" role="img" />
      </VFButton>
    </div>

    <div class="container">
      <Logo class="logo-image" :aria-label="t('logo.alt')" role="img" />
      <div class="links">
        <ul class="past-vuefes-links">
          <li>
            <NuxtLink to="https://vuefes.jp/2024" external target="_blank"
              >Vue Fes Japan 2024</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="https://vuefes.jp/2023" external target="_blank"
              >Vue Fes Japan 2023</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="https://vuefes.jp/2022" external target="_blank"
              >Vue Fes Japan Online 2022</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="https://vuefes.jp/2020" external target="_blank"
              >Vue Fes Japan 2020</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="https://vuefes.jp/2019" external target="_blank"
              >Vue Fes Japan 2019</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="https://vuefes.jp/2018" external target="_blank"
              >Vue Fes Japan 2018</NuxtLink
            >
          </li>
        </ul>

        <ul class="other-links">
          <!-- TODO: -->
          <!-- <li>
            <NuxtLink to="#">関連イベント</NuxtLink>
          </li> -->
          <li>
            <NuxtLink :to="localePath('/privacy-policy')">{{
              t("privacyPolicy")
            }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/code-of-conduct')">{{
              t("coc")
            }}</NuxtLink>
          </li>

          <!-- NOTE: チケット販売までは必要ない -->
          <!-- <li>
            <NuxtLink :to="localePath('/tokusho')">{{
              t("transactions")
            }}</NuxtLink>
          </li> -->
        </ul>
      </div>

      <p class="text-caption">
        © 2018-2025 Vue.js Japan Users Group some rights reserved. <br />
        Vue.js artworks by Evan You is licensed under a Creative Commons
        Attribution 4.0 International License.
      </p>
    </div>
  </footer>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

footer {
  width: 100%;

  .sns-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;

    :deep(svg) {
      width: 40px;
      height: 40px;

      @media (--mobile) {
        width: 24px;
        height: 24px;
      }
    }

    .sns-button:hover {
      --color-base: var(--color-accent-hover);
    }
  }

  .container {
    color: var(--color-sub);
    background-color: var(--color-base);
    border-radius: var(--radius-m);
    margin-top: 0.5rem;
    padding: 3rem 3.5rem;
    border: 1px solid var(--color-divider-light);

    @media (--mobile) {
      padding: 2.5rem 1.5rem;
    }

    .logo-image {
      display: block;
      width: 301px;
      height: 56px;

      @media (--mobile) {
        width: 215px;
        height: 40px;
      }
    }

    :deep(svg),
    :deep(path) {
      fill: var(--color-sub) !important;
    }

    .links {
      margin-top: 2.5rem;
      display: flex;
      gap: 2.5rem;

      @media (--mobile) {
        margin-top: 3rem;
        flex-direction: column;
      }

      .past-vuefes-links,
      .other-links {
        flex-basis: 50%;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin: 0;

        @media (--mobile) {
          flex-basis: 100%;
        }

        :deep(li) {
          font-size: 0.875rem;
          line-height: 1.72;

          @media (--mobile) {
            font-size: 0.75rem;
            line-height: 1.67;
          }
        }

        :deep(a) {
          font-size: 0.875rem;
          line-height: 1.72;
          color: var(--color-white);
          text-decoration: none;

          @media (--mobile) {
            font-size: 0.75rem;
            line-height: 1.67;
          }
        }
      }
    }
  }

  .text-caption {
    margin-top: 2.5rem;
    font-family: IBMPlexSansJP-Regular;
    color: var(--color-white);

    @media (--mobile) {
      margin-top: 3rem;
    }
  }
}
</style>
