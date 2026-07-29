import type { Plugin } from "vite"

const appPlugin: Plugin & { __noOp: true } = {
  name: "kilo:app-plugin",
  __noOp: true as const,
}

export default appPlugin
export { appPlugin }