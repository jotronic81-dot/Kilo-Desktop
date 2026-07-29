type ThemeToken = string

type ThemeTokens = {
  [key: string]: ThemeToken | ThemeTokens
}

type Theme = {
  name: string
  light: ThemeTokens
  dark: ThemeTokens
}

type DesktopTheme = "light" | "dark" | "system"

export type { Theme, ThemeTokens, DesktopTheme }