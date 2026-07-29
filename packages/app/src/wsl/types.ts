export type WslDistroProbe = {
  name: string
  version?: string
  path?: string
  canExecute?: boolean
  label?: string
  hasBash?: boolean
  hasCurl?: boolean
  error?: string | null
}

export type WslInstalledDistro = {
  name: string
  version: number | null
  path?: string
  isDefault?: boolean
}

export type WslJob = {
  id?: string
  kind?: string
  status?: "running" | "pending" | "completed" | "failed"
  progress?: number
  message?: string
  distro?: string
  startedAt?: number
  distros?: string[]
}

export type WslOnlineDistro = {
  name: string
  label: string
}

export type WslKiloCheck = {
  distro: string
  resolvedPath: string | null
  version: string | null
  expectedVersion: string
  matchesDesktop: boolean | null
  error: string | null
}

export type WslRuntimeCheck = {
  available: boolean
  version?: string | null
  error?: string | null
}

export type WslServerConfig = {
  id: string
  distro: string
  name?: string
  command?: string
  args?: string[]
  cwd?: string
  env?: Record<string, string>
  shellIntegration?: boolean
}

export type WslServerItem = {
  name?: string
  command?: string
  id?: string
  status?: "stopped" | "running" | "error"
  pid?: number
  args?: string[]
  cwd?: string
  env?: Record<string, string>
  shellIntegration?: boolean
  config: WslServerConfig
  runtime?: WslServerRuntime
}

export type WslServerRuntime = {
  kind: "stopped" | "starting" | "ready" | "failed"
  url?: string
  username?: string | null
  password?: string
  message?: string
}

export type WslServersEvent = {
  type: "started" | "stopped" | "error" | "output" | "state"
  serverId?: string
  data?: string
  error?: string
  state?: WslServersState
}

export type WslServersState = {
  servers: WslServerItem[]
  job: WslJob | null
  installed: WslInstalledDistro[]
  online: WslOnlineDistro[]
  distroProbes: Record<string, WslDistroProbe>
  kiloChecks: Record<string, WslKiloCheck>
  runtime: WslRuntimeCheck | null
  pendingRestart: boolean
}

export type WslServersPlatform = {
  getState: () => Promise<WslServersState>
  subscribe: (cb: (event: WslServersEvent) => void) => () => void
  probeRuntime: () => Promise<void>
  refreshDistros: () => Promise<{ installed: WslInstalledDistro[]; online: WslOnlineDistro[] }>
  installWsl: () => Promise<void>
  installDistro: (name: string) => Promise<void>
  probeAddable: (distros: string[]) => Promise<void>
  installKilo: (name: string) => Promise<void>
  openTerminal: (name: string) => Promise<void>
  addServer: (distro: string) => Promise<WslServerConfig>
  removeServer: (id: string) => Promise<void>
  startServer: (id: string) => Promise<void>
}