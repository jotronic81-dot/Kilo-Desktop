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

export type { DesktopMenuEntry }

const DESKTOP_MENU_VISIBLE_COMPONENTS: any = {
  File: true,
  View: true,
  Help: true,
}

export { DESKTOP_MENU_VISIBLE_COMPONENTS }