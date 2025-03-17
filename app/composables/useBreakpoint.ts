import { onMounted, onUnmounted, readonly, ref } from "vue";

export type Breakpoint = "pc" | "mobile";

export function useBreakpoint() {
  const breakpoint = ref<Breakpoint>("pc");

  function handleResize() {
    breakpoint.value = window.innerWidth > 768 ? "pc" : "mobile";
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
