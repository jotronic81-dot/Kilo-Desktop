export type ServerConnection = Record<string, any>

export type ServerConnectionAny = ServerConnection

export const ServerConnection = {
  builtin: (id: string) => id.startsWith("builtin:"),
  Key: {
    make: (url: string): ServerConnection => ({ id: url, url } as ServerConnection),
  },
  key: (conn: ServerConnection) => conn.id ?? conn,
  create: (config: ServerConnection): ServerConnection => config,
} as const

export function createServerConnection(config: ServerConnection): ServerConnection {
  return config
}