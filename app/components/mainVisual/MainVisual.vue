<script setup lang="ts">
import MainVisualGraphic from "./MainVisualGraphic.vue";

const { titleTag = "h1", animation = true } = defineProps<{
  titleTag?: "h1" | "div";
  animation?: boolean;
}>();
</script>

<template>
  <section class="main-visual">
    <component :is="titleTag" class="main-visual-head">
      <span class="site-title site-title-en" lang="en">
        <span>Vue Fes</span>
        <span>Japan 2025</span>
      </span>
      <span class="site-title site-title-ja" lang="ja">
        <span>ビューフェス</span>
        <span>ジャパン2025</span>
      </span>
    </component>

    <div class="main-visual-body">
      <time datetime="2025-10-25" lang="en">OCTOBER 25, 2025</time>
      <MainVisualGraphic
        :appearance="animation ? 'webgl' : 'png'"
        class="main-visual-graphic"
      />
      <time datetime="2025-10-25" lang="ja">2025年10月25日</time>
    </div>

    <div class="main-visual-foot">
      <div lang="en">
        <span>Otemachi</span>
        <span>Place Hall & Conference</span>
      </div>

      <div lang="ja">
        <span>大手町</span>
        <span>プレイス ホール &</span>
        <span>カンファレンス</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.main-visual {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr auto;
  height: 100dvh;
  width: 100%;
  box-sizing: border-box;
  color: var(--color-base);
  background: var(--color-sub);

  padding: 24px;
  @media (--mobile) {
    padding: 16px;
  }

  /**
   * NOTE: 
   * background-blend-mode is not working on iOS. \n
   * So, use before pseudo element + mix-blend-mode instead.
   */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.4;
    background: var(--color-sub) url("~/assets/images/noise/1.png") repeat;
    mix-blend-mode: overlay;
  }

  .main-visual-head {
    margin-top: 0;
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;

    @media (--mobile) {
      padding: 2px 4px;
    }

    .site-title {
      display: flex;
      flex-direction: column;
      * {
        font-family: ClashDisplay-SemiBold, IBMPlexSansJP-SemiBold;
        line-height: inherit;
        font-size: inherit;
        font-feature-settings: "palt";

        @media (--mobile) {
          font-size: 1.5rem;
        }
      }
    }

    .site-title-en {
      font-size: 3rem;
      line-height: 0.9;
      letter-spacing: -0.02em;
      text-align: left;

      @media (--mobile) {
        letter-spacing: -0.01em;
      }
    }

    .site-title-ja {
      font-size: 2.5rem;
      line-height: 1.1;
      text-align: right;

      @media (--mobile) {
        * {
          font-size: 1.25rem;
        }
      }
    }
  }

  .main-visual-body {
    grid-column: 1 / -1;
    grid-row: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (--mobile) {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 309fr auto 271fr;
      justify-content: center;
    }

    [lang="en"],
    [lang="en-US"] {
      flex-basis: 25%;
      flex-shrink: 0;
      font-family: JetBrainsMono-Regular;
      font-size: 1.25rem;
      text-align: left;

      @media (--mobile) {
        grid-row: 1;
        text-align: center;
        padding-top: 20px;
        font-size: 0.875rem;
      }
    }

    .main-visual-graphic {
      flex-basis: 50%;
      flex-shrink: 1;
      max-width: 640px;
      min-width: 1px;

      @media (--mobile) {
        grid-row: 2;
        width: 72%;
        margin: 0 auto;
      }
    }

    [lang="ja"],
    [lang="ja-JP"] {
      flex-basis: 25%;
      flex-shrink: 0;
      font-family: JetBrainsMono-Regular;
      font-size: 1.25rem;
      text-align: right;

      @media (--mobile) {
        grid-row: 3;
        text-align: center;
        font-size: 0.875rem;
      }
    }
  }

  .main-visual-foot {
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    @media (--mobile) {
      align-items: center;
    }

    [lang="en"],
    [lang="en-US"] {
      * {
        font-size: 1.5rem;
        line-height: 1.2;
        letter-spacing: -0.02em;
        text-align: left;
        display: flex;
        flex-direction: column;

        @media (--mobile) {
          max-width: 176px;
          font-size: 1rem;
        }
      }
    }

    [lang="ja"],
    [lang="ja-JP"] {
      * {
        font-family: IBMPlexSansJP-Medium;
        font-size: 1.5rem;
        font-weight: 500;
        line-height: 1.2;
        letter-spacing: -0.02em;
        text-align: right;
        display: flex;
        flex-direction: column;

        @media (--mobile) {
          font-size: 0.875rem;
        }
      }
    }
  }
}
</style>
