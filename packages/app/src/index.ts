export type Platform = Record<string, any>

export type { DesktopMenuAction } from "./desktop-menu.ts"
export type { UpdaterState } from "./updater.ts"
export type { WslServersState, WslServersPlatform } from "./wsl/types.ts"
export type { Theme } from "./theme/types.ts"

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
