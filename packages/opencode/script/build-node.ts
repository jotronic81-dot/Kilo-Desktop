#!/usr/bin/env bun
import { build } from "bun"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const outDir = join(import.meta.dir, "..", "dist")
mkdirSync(outDir, { recursive: true })

const result = await build({
  entrypoints: ["./src/index.ts"],
  outdir: outDir,
  format: "esm",
  target: "node",
  minify: true,
})

if (result.success) {
  // Rename index.js to node.js
  const fs = require("node:fs")
  const indexPath = join(outDir, "index.js")
  const nodePath = join(outDir, "node.js")
  if (fs.existsSync(indexPath)) {
    fs.renameSync(indexPath, nodePath)
    console.log("Build successful! Created dist/node.js")
  } else {
    console.log("Build successful!")
  }
} else {
  console.error("Build failed!")
  for (const issue of result.issues) {
    console.error(issue)
  }
  process.exit(1)
}