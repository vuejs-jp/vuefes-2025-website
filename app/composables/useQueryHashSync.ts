import { useRoute, useRouter } from "@typed-router";
import { watch } from "#imports";

export function useQueryHashSync(option: { queryKey: string }) {
  const route = useRoute();
  const router = useRouter();

  watch(
    () => route.hash,
    (h) => {
      if (!h) return;
      router.replace({
        query: {
          [option.queryKey]: h.replace("#", ""),
        },
        hash: h,
      });
    },
    { immediate: true },
  );
}
