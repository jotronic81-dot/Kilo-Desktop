// App exports - re-export all types and functions from individual modules
export type { DesktopMenuAction, DesktopMenuRole } from "./desktop-menu.ts"
export type { UpdaterState } from "./updater.ts"
export type { Theme } from "./theme/types.ts"
export type { Platform } from "./platform.ts"
export type { WslServersState, WslServersPlatform } from "./wsl/types.ts"
export type { Locale, Dictionary } from "./i18n/types.ts"
export type { ServerConnection } from "./server/types.ts"

export { ACCEPTED_FILE_EXTENSIONS } from "./constants.ts"
export { useCommand, useWslServers, useServer, useSettings, useTabs, handleNotificationClick, loadLocaleDict, normalizeLocale, AppBaseProviders, AppInterface, PlatformProvider } from "./components.ts"
export { appPlugin } from "./vite/index.ts"

export { DESKTOP_MENU, desktopMenuVisible } from "./desktop-menu.ts"