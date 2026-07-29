export type WslDistroProbe = {
  name: string
  version?: string
  path?: string
  canExecute?: boolean
  label?: string
}

export type WslInstalledDistro = {
  name: string
  version: string
  path: string
}

export type WslJob = {
  id: string
  status: "running" | "pending" | "completed" | "failed"
  progress?: number
  message?: string
}

export type WslOnlineDistro = {
  name: string
  version: string
  available: boolean
  label?: string
}

export type WslKiloCheck = {
  installed: boolean
  version?: string
}

export type WslRuntimeCheck = {
  available: boolean
  version?: string
}

export type WslServerConfig = {
  name: string
  command: string
  args?: string[]
  cwd?: string
  env?: Record<string, string>
  shellIntegration?: boolean
}

export type WslServerItem = {
  name: string
  command: string
  id: string
  status: "stopped" | "running" | "error"
  pid?: number
  args?: string[]
  cwd?: string
  env?: Record<string, string>
  shellIntegration?: boolean
  config?: WslServerConfig
  runtime?: any
}

export type WslServerRuntime = {
  name: string
  command: string
  id: string
  status: "stopped" | "running" | "error"
  pid?: number
  args?: string[]
  cwd?: string
  env?: Record<string, string>
  shellIntegration?: boolean
  config?: WslServerConfig
  runtime?: any
}

export type WslServersEvent = {
  type: "started" | "stopped" | "error" | "output"
  serverId: string
  data?: string
  error?: string
}

export type WslServersState = {
  servers: Record<string, WslServerItem>
  jobs: Record<string, WslJob>
  distros: WslInstalledDistro[]
  onlineDistros: WslOnlineDistro[]
}

export type WslServersPlatform = {
  name: string
  path: string
}