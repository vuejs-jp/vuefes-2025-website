<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

let showAttentionTimerId: ReturnType<typeof setTimeout> | undefined;
let scrollTimerId: ReturnType<typeof setTimeout> | undefined;

const { direction: _direction = "bottom" } = defineProps<{
  /**
   * @default "bottom"
   *
   * NOTE: not implemented yet
   */
  direction?: "top" | "bottom";
}>();

const isShow = ref(false);
const isMoved = ref(false);

const setIsMoved = () => {
  // If the user scrolls, remove the event listener to prevent multiple calls
  window.removeEventListener("scroll", setIsMoved);

  isMoved.value = true;
};

const hideScrollAttention = () => {
  // If the user scrolls, remove the event listener to prevent multiple calls
  window.removeEventListener("scroll", hideScrollAttention);

  if (isShow.value) {
    isShow.value = false;
  }
};

const showScrollAttention = () => {
  if (isMoved.value) {
    // If the user has already scrolled, do not show the attention
    return;
  }

  isShow.value = true;
  // Add an event listener to hide the attention when the user scrolls
  window.addEventListener("scroll", hideScrollAttention, {
    once: true,
  });
};

// TODO: If props.direction is "top", show the attention when the user scrolls down
onMounted(() => {
  showAttentionTimerId = setTimeout(() => {
    // If the user has not scrolled for 4 seconds, show the attention
    showScrollAttention();

    window.removeEventListener("scroll", setIsMoved);
  }, 4000);

  scrollTimerId = setTimeout(() => {
    window.addEventListener("scroll", setIsMoved, {
      once: true,
    });
  }, 1000);
});

onUnmounted(() => {
  window.removeEventListener("scroll", setIsMoved);
  window.removeEventListener("scroll", hideScrollAttention);

  if (showAttentionTimerId) {
    clearTimeout(showAttentionTimerId);
    showAttentionTimerId = undefined;
  }

  if (scrollTimerId) {
    clearTimeout(scrollTimerId);
    scrollTimerId = undefined;
  }
});
</script>

<template>
  <Transition name="vf-scroll-attention">
    <div v-if="isShow" class="vf-scroll-attention">
      <div class="floating">
        <span>Scroll</span>
        <span class="dotted">・</span>
        <span class="dotted">・</span>
        <span class="dotted">・</span>
        <span class="dotted">・</span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

/**
 * Scroll Attention
 * ------------------------------------------------ */

@keyframes floating-y {
  0% {
    transform: translateY(-10%);
  }
  100% {
    transform: translateY(10%);
  }
}

.vf-scroll-attention {
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;

  /* TODO: If props.direction is "top", set top: 1.625rem; */
  bottom: 1.625rem;
  @media (--mobile) {
    bottom: 1.125rem;
  }

  > .floating {
    display: inline-flex;
    align-items: center;
    flex-direction: column;
    margin: auto;
    animation: floating-y 1.8s ease-in-out infinite alternate;

    > span {
      font-size: 1.25rem;
      line-height: 1.5rem;
      font-family: JetBrainsMono-Regular;

      @media (--mobile) {
        font-size: 0.875rem;
        line-height: 1rem;
      }
    }

    > .dotted {
      height: 6px;
      font-size: 1.2rem;
      line-height: 1.2rem;

      &:not(:last-child) {
        margin-bottom: 3px;
      }
    }
  }
}

/**
 * Transition
 * ------------------------------------------------ */

.vf-scroll-attention-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.vf-scroll-attention-leave-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.vf-scroll-attention-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.vf-scroll-attention-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.vf-scroll-attention-enter-to,
.vf-scroll-attention-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
