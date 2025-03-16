import { computed, useI18n } from "#imports";

type Lang = "ja" | "en";

export type LangClass = `lang-${Lang}`;

export function useLangClass() {
  const { locale } = useI18n();
  return computed<LangClass>(() => `lang-${locale.value}`);
}
