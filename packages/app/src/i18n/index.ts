// i18n implementation for app package

import { en } from "./en"
import { uk } from "./uk"

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

const LOCALES: Record<Locale, Dictionary> = {
  en,
  uk,
  zh: {},
  zht: {},
  ko: {},
  de: {},
  es: {},
  fr: {},
  da: {},
  ja: {},
  pl: {},
  ru: {},
  ar: {},
  no: {},
  br: {},
  bs: {},
}

export type { Locale }

export function initI18n(): Promise<Locale> {
  return Promise.resolve("en" as Locale)
}

export function t(key: string, params?: Record<string, string | number>): string {
  const locale = "en" as Locale
  const dict = LOCALES[locale] || LOCALES.en
  let translation = dict[key] || key

  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      translation = translation.replace(`{${k}}`, String(v))
    })
  }

  return translation
}

export function loadLocaleDict(locale: string) {}

export function normalizeLocale(locale: string): string {
  return locale || "en"
}