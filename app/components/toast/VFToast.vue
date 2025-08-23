<script lang="ts">
import {
  computed,
  onUnmounted,
  readonly,
  ref,
  useTemplateRef,
  watch,
} from "vue";
import { useI18n } from "#imports";

export type ToastOption
  = {
    autoClose: true;
    durationMs?: number;
  }
  | {
    autoClose: false;
  };

export type ToastType = "success" | "alert";

export interface ToastState {
  isOpened: boolean;
  type: ToastType;
  message: string;
}

function defaultToastState(): ToastState {
  return {
    isOpened: false,
    type: "success",
    message: "",
  };
}

const DEFAULT_DURATION_MS = 3000;

export function useToast(
  options: ToastOption = {
    autoClose: true,
    durationMs: DEFAULT_DURATION_MS,
  },
) {
  let closeTimerId: ReturnType<typeof setTimeout> | undefined;

  const state = ref<ToastState>(defaultToastState());

  function open({ type: t, message: m }: { type: ToastType; message: string }) {
    state.value = {
      isOpened: true,
      type: t,
      message: m,
    };
  }

  function close() {
    state.value = defaultToastState();
  }

  watch(
    () => state.value.isOpened,
    (v) => {
      if (closeTimerId) {
        clearTimeout(closeTimerId);
        closeTimerId = undefined;
      }

      if (v && options.autoClose) {
        closeTimerId = setTimeout(
          () => close(),
          options.durationMs ?? DEFAULT_DURATION_MS,
        );
      }
    },
  );

  onUnmounted(() => {
    if (closeTimerId) {
      clearTimeout(closeTimerId);
      closeTimerId = undefined;
    }
  });

  return {
    state: readonly(state),
    open,
    close,
  };
}
</script>

<script setup lang="ts">
const { state } = defineProps<{ state: ToastState }>();
const { locale: lang } = useI18n();

const rootElRef = useTemplateRef("root");

const positionRight = computed(() => {
  if (rootElRef.value) {
    return `calc(50% - (${rootElRef.value.offsetWidth}px / 2))`;
  }
  return "50%";
});
</script>

<template>
  <Transition name="vf-toast">
    <div
      v-if="state.isOpened"
      ref="root"
      class="vf-toast"
      :class="`vf-toast-${state.type}`"
      :role="state.type === 'alert' ? 'alert' : 'status'"
      :aria-live="state.type === 'alert' ? 'assertive' : 'polite'"
      :lang
    >
      <div class="vf-toast-content">
        <span class="vf-toast-icon" aria-hidden="true">
          <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
          {{ state.type === "success" ? "🎉" : "⚠️" }}
        </span>
        <span class="vf-toast-message">
          {{ state.message }}
        </span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

/**
 * Toast
 * ------------------------------------------------ */

.vf-toast {
  position: fixed;
  bottom: 1rem;
  left: v-bind(positionRight);
  transition: all linear 0s;
  z-index: var(--z-index-modal);
  padding: 1.5rem 2.5rem;
  @media (--mobile) {
    padding: 1rem 1.5rem;
  }

  background-color: var(--color-black);
  color: var(--color-white);
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  border-radius: var(--radius-m);

  &[lang="ja"],
  &[lang="ja-JP"] {
    font-family: IBMPlexSansJP-Bold;
  }

  &[lang="en"],
  &[lang="en-US"] {
    font-family: JetBrainsMono-Bold;
  }

  .vf-toast-content {
    display: flex;
    align-items: center;
  }

  .vf-toast-icon {
    margin-right: 1rem;
  }

  &.vf-toast-alert {
    background-color: var(--color-alert);
  }
}

/**
 * Transition
 * ------------------------------------------------ */

.vf-toast-enter-active,
.vf-toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.vf-toast-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.vf-toast-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.vf-toast-enter-to,
.vf-toast-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
