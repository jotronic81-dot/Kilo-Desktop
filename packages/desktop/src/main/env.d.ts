interface ImportMetaEnv {
  readonly KILO_CHANNEL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "virtual:kilo-server" {
  export namespace Server {
    export const listen: typeof import("../../../kilo/dist/types/src/node").Server.listen
    export type Listener = import("../../../kilo/dist/types/src/node").Server.Listener
  }
  export namespace Config {
    export const get: typeof import("../../../kilo/dist/types/src/node").Config.get
    export type Info = import("../../../kilo/dist/types/src/node").Config.Info
  }
  export const bootstrap: typeof import("../../../kilo/dist/types/src/node").bootstrap
}
