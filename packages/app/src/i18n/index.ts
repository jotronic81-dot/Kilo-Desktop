// Simple i18n implementation for app package

type Dictionary = Record<string, string>

type Locale =
  | "en"
  | "zh"
  | "zht"
  | "ko"
  | "de"
  | "es"
  | "fr"
  | "da"
  | "ja"
  | "pl"
  | "ru"
  | "uk"
  | "ar"
  | "no"
  | "br"
  | "bs"

export type { Locale }
export function initI18n(): Promise<Locale> {
  return Promise.resolve("en" as Locale)
}
export function t(key: string, params?: Record<string, string | number>): string {
  return key
}
export function loadLocaleDict(locale: string) {}
export function normalizeLocale(locale: string): string {
  return locale || "en"
}