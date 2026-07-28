import { execFile } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { promisify } from "node:util"

import type { Configuration } from "electron-builder"

const execFileAsync = promisify(execFile)
const packageDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(packageDir, "../..")
const signScript = path.join(rootDir, "script", "sign-windows.ps1")
// The Electron 42 packaging update briefly installed Linux launchers/icons under
// "kilo-desktop". Keep that hidden desktop entry around so existing GNOME/KDE
// pins still resolve after the canonical app id changes back to ai.kilo.desktop.
const legacyDesktopEntry = path.join(packageDir, "resources", "linux", "kilo-desktop.desktop")
const legacyDesktopEntryFpm = `${legacyDesktopEntry}=/usr/share/applications/kilo-desktop.desktop`

const metainfoFpm = (appId: string) =>
  `${path.join(packageDir, "resources", `${appId}.metainfo.xml`)}=/usr/share/metainfo/${appId}.metainfo.xml`

async function signWindows(configuration: { path: string }) {
  if (process.platform !== "win32") return
  if (process.env.GITHUB_ACTIONS !== "true") return

  await execFileAsync(
    "pwsh",
    ["-NoLogo", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", signScript, configuration.path],
    { cwd: rootDir },
  )
}

const channel = (() => {
  const raw = process.env.KILO_CHANNEL
  if (raw === "dev" || raw === "beta" || raw === "prod") return raw
  return "dev"
})()

const APP_IDS = {
  dev: "ai.kilo.desktop.dev",
  beta: "ai.kilo.desktop.beta",
  prod: "ai.kilo.desktop",
} as const

const getBase = (appId: string): Configuration => ({
  artifactName: "kilo-desktop-${os}-${arch}.${ext}",
  directories: {
    output: "dist",
    buildResources: "resources",
  },
  // Linux launchers are .desktop files, so this is the desktop file name,
  // not just the app id. For prod, app id "ai.kilo.desktop" becomes
  // "ai.kilo.desktop.desktop".
  // https://developer.gnome.org/documentation/guidelines/maintainer/integrating.html
  // https://www.electron.build/docs/linux/
  extraMetadata: {
    desktopName: `${appId}.desktop`,
  },
  files: ["out/**/*", "resources/**/*", "!resources/kilo-cli*"],
  extraResources: [
    ...(channel === "dev"
      ? [
          {
            from: "resources/",
            to: "",
            filter: ["kilo-cli*"],
          },
        ]
      : []),
    {
      from: "native/",
      to: "native/",
      filter: ["index.js", "index.d.ts", "build/Release/mac_window.node", "swift-build/**"],
    },
  ],
  mac: {
    category: "public.app-category.developer-tools",
    icon: `resources/icons/icon.icns`,
    hardenedRuntime: true,
    gatekeeperAssess: false,
    entitlements: "resources/entitlements.plist",
    entitlementsInherit: "resources/entitlements.plist",
    notarize: true,
    target: ["dmg", "zip"],
  },
  dmg: {
    sign: true,
  },
  protocols: {
    name: "Kilo",
    schemes: ["kilo"],
  },
  win: {
    icon: `resources/icons/icon.ico`,
    signtoolOptions: {
      sign: signWindows,
    },
    target: ["nsis"],
    verifyUpdateCodeSignature: false,
  },
  nsis: {
    oneClick: true,
    perMachine: false,
    installerIcon: `resources/icons/icon.ico`,
    installerHeaderIcon: `resources/icons/icon.ico`,
  },
  linux: {
    icon: `resources/icons`,
    category: "Development",
    executableName: appId,
    desktop: {
      entry: {
        // Match the installed .desktop file and hicolor icon basename so
        // Linux shells can associate the running Electron window with its launcher.
        StartupWMClass: appId,
      },
    },
    target: ["AppImage", "deb", "rpm"],
  },
})

function getConfig() {
  const appId = APP_IDS[channel]
  const base = getBase(appId)

  switch (channel) {
    case "dev": {
      return {
        ...base,
        appId,
        productName: "Kilo Dev",
        deb: { fpm: [metainfoFpm(appId)] },
        rpm: { packageName: "kilo-dev", fpm: [metainfoFpm(appId)] },
      }
    }
    case "beta": {
      return {
        ...base,
        appId,
        productName: "Kilo Beta",
        protocols: { name: "Kilo Beta", schemes: ["kilo"] },
        publish: { provider: "github", owner: "jotronic81-dot", repo: "kilo-beta", channel: "latest" },
        deb: { fpm: [metainfoFpm(appId)] },
        rpm: { packageName: "kilo-beta", fpm: [metainfoFpm(appId)] },
      }
    }
    case "prod": {
      return {
        ...base,
        appId,
        productName: "Kilo",
        protocols: { name: "Kilo", schemes: ["kilo"] },
        publish: { provider: "github", owner: "jotronic81-dot", repo: "Kilo-Desktop", channel: "latest" },
        deb: { fpm: [metainfoFpm(appId), legacyDesktopEntryFpm] },
        rpm: { packageName: "kilo", fpm: [metainfoFpm(appId), legacyDesktopEntryFpm] },
      }
    }
  }
}

export default getConfig()
