export type Platform = Record<string, any>

export type { Platform }

export type { DesktopMenuAction, DesktopMenuRole, DesktopMenuEntry } from "./desktop-menu"
export type { UpdaterState } from "./updater"
export type { Theme } from "./theme/types"
export type { WslServersState, WslServersPlatform } from "./wsl/types"
export type { Locale } from "./i18n/types"

export type ServerConnection = {
  [key: string]: any
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

export const appPlugin = {}

export { DESKTOP_MENU, desktopMenuVisible } from "./desktop-menu"