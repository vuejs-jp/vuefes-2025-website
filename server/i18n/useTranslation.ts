import type { TranslationKey } from "./generated/types";
import { translations, type Locale } from "./generated/translations";

type TranslationValue = string | number | boolean | Record<string, unknown> | unknown[];
type TranslationData = Record<string, TranslationValue>;

function getNestedProperty(obj: TranslationData, path: string): TranslationValue | undefined {
  const keys = path.split(".");
  let current: TranslationValue = obj;

  for (const key of keys) {
    if (current && typeof current === "object" && !Array.isArray(current) && key in current) {
      current = (current as Record<string, TranslationValue>)[key] as TranslationValue;
    } else {
      return undefined;
    }
  }

  return current;
}

export function useTranslation(locale: string = "ja") {
  const localeKey = (locale in translations ? locale : "ja") as Locale;
  const translationData = translations[localeKey] as TranslationData;

  const t = (key: TranslationKey): string => {
    const value = getNestedProperty(translationData, key);

    if (value === undefined) {
      console.warn(`Translation key not found: ${key} for locale: ${locale}`);
      return key;
    }

    return String(value);
  };

  return t;
}
