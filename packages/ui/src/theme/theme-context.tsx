import { writable } from "svelte/store"
import type { DesktopTheme } from "./types.ts"

type ThemeStoreType = {
  theme: DesktopTheme
  setTheme: (theme: DesktopTheme) => void
  resolvedTheme: "light" | "dark"
}

const themeStore = writable<ThemeStoreType>({
  theme: "system" as DesktopTheme,
  setTheme: () => {},
  resolvedTheme: "light",
})

export const useTheme = () => {
  return $themeStore
}

export const DesktopThemeProvider = {
  subscribe: themeStore.subscribe,
}

export default useTheme