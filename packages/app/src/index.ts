// Platform type for native integrations
type Platform = Record<string, any>

export type { Platform }

export type { DesktopMenuAction, DesktopMenuRole, DesktopMenuEntry } from "./desktop-menu"
export type { UpdaterState } from "./updater"
export type { Theme } from "./theme/types"
export type { WslServersState, WslServersPlatform } from "./wsl/types"
export type { Locale } from "./i18n/types"
export type { ServerConnection } from "./server/types"

export { ACCEPTED_FILE_EXTENSIONS } from "./constants"
export { useCommand, useWslServers, useServer, useSettings, useTabs, handleNotificationClick, loadLocaleDict, normalizeLocale, AppBaseProviders, AppInterface, PlatformProvider } from "./components"
export { appPlugin } from "./vite/index"

export { DESKTOP_MENU, desktopMenuVisible } from "./desktop-menu"