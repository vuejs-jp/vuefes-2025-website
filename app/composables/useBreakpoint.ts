import { onMounted, onUnmounted, readonly, ref } from "vue";

export type Breakpoint = "pc" | "mobile" | "mobile-wide";

export function useBreakpoint() {
  const breakpoint = ref<Breakpoint>("pc");

  function handleResize() {
    if (window.innerWidth > 1300) {
      breakpoint.value = "pc";
    } else if (window.innerWidth > 1036) {
      breakpoint.value = "mobile-wide";
    } else {
      breakpoint.value = "mobile";
    }
  }

  onMounted(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });

  return readonly(breakpoint);
}
