<script setup lang="ts">
import { useScroll } from "@vueuse/core";
import { useLocaleRoute, type RoutesNamesList } from "@typed-router";
import { computed, nextTick, useBreakpoint, useRoute, watch, useI18n, type Breakpoint } from "#imports";
import {
  EnCtaTicket,
  JaCtaTicket,
  MainVisual,
  VFCta,
  VFFooter,
  VFHeader,
  VFMenu,
  VFSpCta,
  VFSpMenu,
} from "#components";
import { useAnimationStore } from "~/stores/animation";
import { HOME_HEADING_ID } from "~/constant";
import type { MenuItemProps } from "~/components/menu/VFMenuItem.vue";

defineSlots<{ default: () => unknown }>();

const [animation] = useAnimationStore();

const bp = useBreakpoint();
const route = useRoute();
const localeRoute = useLocaleRoute();
const isRoot = computed(() => ["/", "/en"].includes(route.path));
const { locale, t } = useI18n();

const menuItems = computed<MenuItemProps[]>(() =>
  [
    {
      id: HOME_HEADING_ID.home,
      label: "Home",
      routeName: localeRoute({ name: "index" }).name,
    },
    {
      id: HOME_HEADING_ID.timetable,
      label: "Timetable",
      // TODO:
      routeName: localeRoute({ name: "index" }).name,
      disabled: !__FEATURE_TIMETABLE__,
    },
    {
      id: HOME_HEADING_ID.speaker,
      label: "Speaker",
      routeName: localeRoute({ name: "speaker" }).name,
    },
    {
      id: HOME_HEADING_ID.ticket,
      label: "Event",
      // TODO:
      routeName: localeRoute({ name: "index" }).name,
      disabled: !__FEATURE_EVENT__,
    },
    {
      id: HOME_HEADING_ID.event,
      label: "Ticket",
      routeName: localeRoute({ name: "ticket" }).name,
    },
    {
      id: HOME_HEADING_ID.sponsor,
      label: "Sponsor",
      routeName: localeRoute({ name: "sponsors" }).name,
    },
  ].filter(it => !!it),
);

const cta = computed(() =>
  ({
    props: {
      actionButton: {
        label: t("ticket.details"),
        link: localeRoute({ name: "ticket" }).path,
      },
      openerText: "Ticket",
    },
    content: locale.value === "ja"
      ? JaCtaTicket
      : EnCtaTicket,
  }),
);

const { y } = useScroll(window);
const isShowedSpMenu = computed(() => {
  const targetBp: Breakpoint[] = isWidenContent.value ? ["mobile-wide", "mobile"] : ["mobile"];
  return targetBp.includes(bp.value) && (!isRoot.value || y.value > 450);
});
const isShowedSpCta = computed(() => {
  const targetBp: Breakpoint[] = isWidenContent.value ? ["pc", "mobile-wide", "mobile"] : ["mobile-wide", "mobile"];
  return targetBp.includes(bp.value) && (!isRoot.value || y.value > 450);
});

const WIDE_ROUTE_NAMES: RoutesNamesList[] = [
  "speaker",
  "speaker-speakerId",
  "ticket",
  "ticket-userId",
  "ticket-userId-edit",
  "sponsors",
  "sponsors-sponsorId",
];

const isWidenContent = computed(() =>
  WIDE_ROUTE_NAMES
    .map(r => localeRoute(r as string)?.name as string | undefined)
    .filter(it => !!it)
    .includes(route.name?.toString() ?? ""),
);

// scroll behavior
watch(() => route.hash, async (hash) => {
  if (hash === "") {
    return;
  }

  await nextTick();

  if (isRoot.value && hash === "#") {
    window.scrollTo(0, 0);
    return;
  }

  const target = document.querySelector(hash);
  if (target) {
    const top = target.getBoundingClientRect().top + window.scrollY - window.innerHeight / 3;
    window.scrollTo({ top, behavior: "smooth" });
  }
});
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
        <div v-if="!isShowedSpMenu" class="nav-menu">
          <VFMenu :items="menuItems" />
        </div>
      </div>
      <div class="content" :class="{ 'widen-content': isWidenContent }">
        <VFHeader :is-root class="header" />

        <main class="main">
          <slot />
        </main>
        <VFFooter />
      </div>
      <div class="side-content right-menu">
        <div v-if="!isShowedSpCta && cta" class="nav-menu">
          <VFCta
            :action-button="cta.props.actionButton"
          >
            <component :is="cta.content" />
          </VFCta>
        </div>
      </div>
    </div>
    <div style="height: 100lvh" />
  </div>

  <div class="sp-nav-container">
    <Transition>
      <VFSpMenu
        v-if="isShowedSpMenu && cta"
        :items="menuItems"
      />
    </Transition>

    <Transition>
      <VFSpCta
        v-if="
          isShowedSpCta
            && cta
            // NOTE: When already on /ticket, don't show the menu as clicking the link won't navigate and could be confusing
            && route.path !== localeRoute({ name: 'ticket' }).path
        "
        v-bind="cta.props"
      >
        <component :is="cta.content" />
      </VFSpCta>
    </Transition>
  </div>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

.layout {
  display: flex;
  column-gap: 1rem;
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

  position: sticky;
  padding-top: 0.5rem;

  @media (--mobile) {
    display: none;
  }
}

.left-menu {
  justify-content: end;
  top: calc(100svh / 2 - 128px - 0.25rem);
}

.right-menu {
  justify-content: start;
  top: calc(100svh / 2 - 190px - 0.25rem); /* Hardcoded(190px) to half the content height */
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

.sp-nav-container {
  position: fixed;
  bottom: 24px;
  width: 100%;
  height: auto;
  z-index: 200; /* higher than .header */
  display: flex;
  justify-content: center;
  gap: 0.5rem;
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
