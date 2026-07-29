// i18n implementation with all locales

type Dictionary = Record<string, string>

const EN: Dictionary = {
  "new-tab": "New Tab",
  "close-tab": "Close Tab",
  "toggle-sidebar": "Toggle Sidebar",
  "toggle-fullscreen": "Toggle Fullscreen",
  "open-settings": "Open Settings",
  "open-help": "Open Help",
}

type Locale = "en"

type DesktopMenuAction =
  | { type: "new-tab" }
  | { type: "close-tab" }
  | { type: "toggle-sidebar" }
  | { type: "toggle-fullscreen" }
  | { type: "open-settings" }
  | { type: "open-help" }

type DesktopMenuRole = "quit" | "hide" | "minimized" | "maximize" | "close"

type DesktopMenuEntry = {
  label: string
  command?: string
  action?: DesktopMenuAction
  role?: DesktopMenuRole
  enabled?: "updater" | boolean
  accelerator?: {
    macos?: string
    win?: string
    linux?: string
  }
  href?: string
  items?: DesktopMenuEntry[]
}

const DESKTOP_MENU: DesktopMenuEntry[] = [
  {
    label: "File",
    items: [
      { label: "New Tab", command: "tab.new" },
      { label: "Close Tab", action: { type: "close-tab" } },
      { label: "---", type: "separator" as const },
      { label: "Open Settings", action: { type: "open-settings" } },
      { label: "---", type: "separator" as const },
      { label: "Quit", role: "quit" },
    ],
  },
  {
    label: "View",
    items: [
      { label: "Toggle Sidebar", action: { type: "toggle-sidebar" } },
      { label: "Toggle Fullscreen", action: { type: "toggle-fullscreen" } },
      { label: "Reload", action: { type: "view.reload" } },
      { label: "DevTools", action: { type: "view.toggleDevTools" } },
      { label: "Zoom In", action: { type: "view.zoomIn" } },
      { label: "Zoom Out", action: { type: "view.zoomOut" } },
      { label: "Reset Zoom", action: { type: "view.resetZoom" } },
    ],
  },
  {
    label: "Help",
    items: [
      { label: "Open Help", action: { type: "open-help" } },
    ],
  },
]

function desktopMenuVisible(menu: any, platform: string): boolean {
  return true
}

export type {
  DesktopMenuAction,
  DesktopMenuRole,
  DesktopMenuEntry,
  Locale,
}

export type Dictionary = Dictionary
export const DICTIONARY = EN

export { DESKTOP_MENU, desktopMenuVisible }