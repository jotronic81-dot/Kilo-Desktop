// Platform type for native integrations

type Platform = Record<string, any>

export type { Platform }

export type UpdaterState = "idle" | "checking" | "available" | "downloading" | "installing" | "restart" | "error"

export type WslServersState = Record<string, any>
export type WslServersPlatform = { name: string }

export type Theme = "light" | "dark" | "system"

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

type ServerConnection = Record<string, any>

export type {
  Platform,
  UpdaterState,
  WslServersState,
  WslServersPlatform,
  Theme,
  Locale,
  ServerConnection,
}

export const ACCEPTED_FILE_EXTENSIONS: string[] = []

export function useCommand(): any {
  return { trigger: (id: string) => {} }
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

export function handleNotificationClick(href?: string) {}

export function loadLocaleDict(locale: string) {}

export function normalizeLocale(locale: string): string {
  return locale || "en"
}

export function AppBaseProviders({ children }: { children: any }) {
  return children
}

export function AppInterface(props: any) {
  return null
}

export function PlatformProvider({ children, value }: { children: any; value: Platform }) {
  return children
}

export { appPlugin } from "./vite/index.ts"