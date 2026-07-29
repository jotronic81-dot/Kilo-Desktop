import type { ThemeTokens } from "./types"

function resolveThemeVariant(theme: ThemeTokens, _isDark: boolean): ThemeTokens {
  return theme
}

export { resolveThemeVariant }