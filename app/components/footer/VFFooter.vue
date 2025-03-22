<script setup lang="ts">
import { useI18n, useLocalePath } from "#imports";
import { VFButton } from "#components";
import type { MessageSchema } from "~~/i18n/message-schema";

import XIcon from "~icons/sns-icons/ic_x";
import YoutubeIcon from "~icons/sns-icons/ic_youtube";
import GithubIcon from "~icons/sns-icons/ic_github";
import NoteIcon from "~icons/sns-icons/ic_note";

import Logo from "~icons/logo/logo";

const localePath = useLocalePath();
const { t } = useI18n<{ message: MessageSchema }>();
</script>

<template>
  <footer>
    <div class="sns-container">
      <VFButton icon link="https://x.com/vuefes" external>
        <XIcon />
      </VFButton>
      <VFButton
        icon
        link="https://www.youtube.com/channel/UC6KPwA1kZJtQYdlh8_2hxCA"
        external
      >
        <YoutubeIcon />
      </VFButton>
      <VFButton icon link="https://github.com/vuejs-jp" external>
        <GithubIcon />
      </VFButton>
      <VFButton icon link="https://note.com/vuejs_jp/m/mb35849fee631" external>
        <NoteIcon />
      </VFButton>
    </div>

    <div class="container">
      <Logo class="logo-image" />

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
  .sns-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;

    :deep(img) {
      width: 40px;
      height: 40px;
      @media (--mobile) {
        width: 24px;
        height: 24px;
      }
    }
  }

  .container {
    color: var(--color-sub);
    background-color: var(--color-base);
    border-radius: var(--radius-m);
    margin-top: 0.5rem;

    padding: 5rem;
    @media (--mobile) {
      padding: 3rem 2rem;
    }

    :deep(svg),
    :deep(path) {
      fill: var(--color-sub) !important;
    }

    .links {
      margin-top: 2rem;

      display: flex;
      @media (--mobile) {
        flex-direction: column;
      }

      .past-vuefes-links,
      .other-links {
        width: 50%;
        @media (--mobile) {
          width: 100%;
        }
        :deep(a) {
          color: var(--colo-base);
          text-decoration: none;
        }
      }
    }
  }
}
</style>
