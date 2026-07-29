type ThemeStoreType = {
  themeId: () => "light" | "dark" | "system"
  mode: () => "light" | "dark"
  setTheme: (theme: "light" | "dark" | "system") => void
  resolvedTheme: () => "light" | "dark"
}

let currentTheme: "light" | "dark" | "system" = "system"
let resolvedThemeValue: "light" | "dark" = "light"
const listeners: Set<(theme: ThemeStoreType) => void> = new Set()

const updateResolvedTheme = () => {
  resolvedThemeValue = currentTheme === "dark" ? "dark" : currentTheme === "light" ? "light" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export const useTheme = (): ThemeStoreType => ({
  themeId: () => currentTheme,
  mode: () => resolvedThemeValue,
  setTheme: (theme: "light" | "dark" | "system") => {
    currentTheme = theme
    updateResolvedTheme()
    listeners.forEach(listener => listener(useTheme()))
  },
  resolvedTheme: () => resolvedThemeValue,
})

export const DesktopThemeProvider = {
  subscribe: (cb: (theme: ThemeStoreType) => void) => {
    listeners.add(cb)
    return () => listeners.delete(cb)
  },
}

export default useTheme