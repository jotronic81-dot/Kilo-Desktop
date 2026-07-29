import { $ } from "bun"
import { downloadCliToResources } from "./utils"

await $`bun ./scripts/copy-icons.ts ${process.env.KILO_CHANNEL ?? "dev"}`

await $`cd ../opencode && bun script/build-node.ts`
await downloadCliToResources()
