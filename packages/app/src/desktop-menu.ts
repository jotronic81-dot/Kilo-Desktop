export type DesktopMenuAction =
  | { type: "new-tab" }
  | { type: "close-tab" }
  | { type: "toggle-sidebar" }
  | { type: "toggle-fullscreen" }
  | { type: "open-settings" }
  | { type: "open-help" }
