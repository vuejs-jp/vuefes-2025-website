<script setup lang="ts">
import { useScroll } from "@vueuse/core";
import { computed, useBreakpoint, useLocaleRoute, useRoute } from "#imports";
import { MainVisual, VFHeader, VFFooter, VFMenu, VFSpMenu } from "#components";
import { useAnimationStore } from "~/stores/animation";

defineSlots<{ default: () => unknown }>();

const [animation] = useAnimationStore();

const bp = useBreakpoint();
const route = useRoute();
const localeRoute = useLocaleRoute();
const isRoot = computed(() => ["/", "/en"].includes(route.path));

const { y } = useScroll(window);
const isShowedSpMenu = computed(() => isRoot.value && bp.value === "mobile" && y.value > 450);

const isWidenContent = computed(() =>
  ["speakers"]
    .map(it => localeRoute(it)?.name)
    .includes(route.name?.toString() ?? ""),
);
</script>

<template>
  <div>
    <MainVisual
      :title-tag="isRoot ? 'h1' : 'div'"
      :animation
      :show-scroll-attention="isRoot"
      class="main-visual"
    />
    <div v-if="isRoot" style="height: 100svh" />
    <div class="layout">
      <div class="side-content left-menu">
        <div v-if="isRoot && bp === 'pc'" class="nav-menu">
          <VFMenu />
        </div>
      </div>
      <div class="content" :class="{ 'widen-content': isWidenContent }">
        <VFHeader :is-root class="header" />

        <main class="main">
          <slot />
        </main>
        <VFFooter />
      </div>
      <div class="side-content right-menu"></div>
    </div>
    <div style="height: 100lvh" />
  </div>

  <Transition>
    <VFSpMenu v-if="isShowedSpMenu" class="sp-nav-menu" />
  </Transition>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.layout {
  display: flex;
  position: relative;
}

.main-visual {
  position: fixed;
  z-index: -1;
}

.content {
  margin: 0;
  padding: 0 0.5rem;
  background-color: transparent;
  display: flex;
  row-gap: 1.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 700px;
  max-width: 700px;

  @media (--mobile) {
    row-gap: 1rem;
    padding: 0 0.25rem;
    max-width: none;
    width: 100%;
    min-width: 0;
    flex-basis: auto;
  }

  &.widen-content {
    min-width: 960px;

    @media (--mobile) {
      min-width: 0;
      width: 100%;
    }
  }
}

.side-content {
  display: flex;
  flex: 1 1 0;
  min-width: 0;
  min-height: 100%;
  height: 100%;
  width: calc((100vw - 700px) / 2);

  @media (--mobile) {
    display: none;
  }
}

.left-menu {
  position: sticky;
  justify-content: end;
  top: calc(100svh / 2 - 7rem);
  left: 0;
  padding-top: 0.5rem;
  /* align to header padding top */
  padding-left: 0.5rem;
}

.header {
  position: sticky;
  top: 0;
  width: 100%;
  padding-top: 0.5rem;
  z-index: 100;

  @media (--mobile) {
    padding-top: 0.25rem;
  }
}

.nav-menu {
  width: auto;
  height: 100%;
}

.sp-nav-menu {
  position: fixed;
  bottom: 5svh;
  width: 100vw;
  height: auto;
  z-index: 10;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.main {
  width: 100%;
  margin-top: 0.5rem;

  @media (--mobile) {
    margin-top: 0.25rem;
  }
}
</style>
