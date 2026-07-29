export type DesktopMenuAction =
  | { type: "new-tab" }
  | { type: "close-tab" }
  | { type: "toggle-sidebar" }
  | { type: "toggle-fullscreen" }
  | { type: "open-settings" }
  | { type: "open-help" }

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

export type DesktopMenuRole = "quit" | "hide" | "minimized" | "maximize" | "close"

const DESKTOP_MENU: any = [
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

export { DESKTOP_MENU, desktopMenuVisible }