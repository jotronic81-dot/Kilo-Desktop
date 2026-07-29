type ServerConnection = Record<string, any>

export type { ServerConnection }

export function createServerConnection(config: ServerConnection): ServerConnection {
  return config
}