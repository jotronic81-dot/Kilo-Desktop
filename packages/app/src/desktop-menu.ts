export type DesktopMenuAction = string

export type DesktopMenuRole = "quit" | "hide" | "minimized" | "maximize" | "close"

export type DesktopMenuEntry = {
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
  type?: "separator"
}

const DESKTOP_MENU: DesktopMenuEntry[] = [
  {
    label: "File",
    items: [
      { label: "New Tab", command: "tab.new" },
      { label: "Close Tab", action: "close-tab" },
      { label: "---", type: "separator" },
      { label: "Open Settings", action: "open-settings" },
      { label: "---", type: "separator" },
      { label: "Quit", role: "quit" },
    ],
  },
  {
    label: "View",
    items: [
      { label: "Toggle Sidebar", action: "toggle-sidebar" },
      { label: "Toggle Fullscreen", action: "toggle-fullscreen" },
      { label: "Reload", action: "view.reload" },
      { label: "DevTools", action: "view.toggleDevTools" },
      { label: "Zoom In", action: "view.zoomIn" },
      { label: "Zoom Out", action: "view.zoomOut" },
      { label: "Reset Zoom", action: "view.resetZoom" },
    ],
  },
  {
    label: "Help",
    items: [
      { label: "Open Help", action: "open-help" },
    ],
  },
]

function desktopMenuVisible(_menu: DesktopMenuEntry, _platform: string): boolean {
  return true
}

export { DESKTOP_MENU, desktopMenuVisible }