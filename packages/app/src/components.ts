import type { Locale } from "./i18n/types"

type Platform = Record<string, any>

export type { Platform }

export const ACCEPTED_FILE_EXTENSIONS: string[] = []

export function useCommand(): any {
  return { trigger: (_id: string) => {} }
}

export function useWslServers(): any {
  return {}
}

export function useServer(): any {
  return {}
}

export function useSettings(): any {
  return {}
}

export function useTabs(): any {
  return []
}

export function handleNotificationClick(_href?: string) {}

export function loadLocaleDict(_locale: string) {}

export function normalizeLocale(locale: string): string {
  return locale || "en"
}

export function AppBaseProviders({ children, locale: _locale }: { children: any; locale?: Locale }) {
  return children
}

export function AppInterface(_props: any) {
  return null
}

export function PlatformProvider({ children, value: _value }: { children: any; value: Platform }) {
  return children
}

export const appPlugin = {}