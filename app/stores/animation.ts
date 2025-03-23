import {
  onMounted,
  computed,
  ref,
  shallowRef,
  useState,
  watch,
  type ComputedRef,
} from "#imports";

export function useAnimationStore(): [
  state: ComputedRef<boolean>,
  set: (value: boolean) => void,
  isWebGLSupported: ComputedRef<boolean>,
] {
  const state = useState<boolean>("animation", () => shallowRef(false));
  const isWebGLSupported = ref(false);

  function set(value: boolean): void {
    state.value = _isWebGLSupported() && value;
  }

  onMounted(() => {
    isWebGLSupported.value = _isWebGLSupported();
    const isPreferredReducedMotion = _isPreferredReducedMotion();
    if (isWebGLSupported.value && !isPreferredReducedMotion) {
      set(true);
    }
  });

  return [
    computed(() => state.value),
    set,
    computed(() => isWebGLSupported.value),
  ] as const;

  function _isWebGLSupported(): boolean {
    try {
      const canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch {
      return false;
    }
  }

  function _isPreferredReducedMotion(): boolean {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
}

export function useAutoThemeChanger() {
  let intervalId: number | undefined;
  let themeIter = new ThemeCircularIter();

  const [enabledAnimation] = useAnimationStore();

  function enableAutoThemeChanging() {
    if (intervalId) {
      window.clearInterval(intervalId);
      intervalId = undefined;
    }

    const body = document.querySelector("body");
    if (!body) return;

    setTheme(themeIter.next());
    intervalId = window.setInterval(() => {
      setTheme(themeIter.next());
    }, 15000);
  }

  onMounted(() => {
    if (enabledAnimation.value) {
      enableAutoThemeChanging();
    }
  });

  watch(enabledAnimation, (value) => {
    if (value) {
      themeIter = new ThemeCircularIter();
      enableAutoThemeChanging();
    } else {
      setTheme(themeIter.default());
      if (intervalId) {
        window.clearInterval(intervalId);
        intervalId = undefined;
      }
    }
  });
}

type Theme = (typeof ThemeCircularIter.list)[number];
function setTheme(theme: Theme) {
  const body = document.querySelector("body");
  if (!body) return;

  body.classList.remove(...ThemeCircularIter.list);
  body.classList.add(theme);
}

class ThemeCircularIter {
  private _current = -1;

  /**
   * see: main.css
   *
   * target: body
   *
   * order: align to MainVisualWebGL.vue
   */
  static list = [
    "theme-primary",
    "theme-purple",
    "theme-orange",
    "theme-navy",
  ] as const;

  next(): Theme {
    this._current = (this._current + 1) % ThemeCircularIter.list.length;
    return ThemeCircularIter.list[this._current]!;
  }

  default(): Theme {
    return ThemeCircularIter.list[0];
  }
}
