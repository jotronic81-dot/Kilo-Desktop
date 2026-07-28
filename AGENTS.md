# AGENTS.md

Kilo Desktop is an Electron desktop application that wraps the Kilo AI coding agent. It is ported from the upstream OpenCode Desktop and rebranded for the Kilo ecosystem.

- ALWAYS USE PARALLEL TOOLS WHEN APPLICABLE.
- The default branch in this repo is `main`.
- Prefer automation: execute requested actions without confirmation unless blocked by missing info or safety/irreversibility.
- You may be running in a git worktree. All changes must be made in your current working directory — never modify files in the main repo checkout.

## Build and Dev

- **Dev**: `bun run dev` (runs from root) or `bun run --cwd packages/desktop dev`
- **Dev with params**: `bun dev -- help`
- **Typecheck**: `bun turbo typecheck`
- **Test**: `bun test` from `packages/desktop/` (NOT from root -- root blocks tests)
- **Package**: `bun run --cwd packages/desktop package` (or `package:mac`, `package:win`, `package:linux`)

## Quality Checks

Before saying an implementation is ready, run the smallest relevant checks that can catch lint, typecheck, and test failures for the touched package.

| Area | Checks |
|---|---|
| Root / cross-package | `bun run lint`, `bun run typecheck` |
| Desktop | From `packages/desktop/`: `bun run typecheck`, `bun test` or targeted `bun test ./path/to/file.test.ts` |

Never run root `bun test`; the root script prints `do not run tests from root` and exits with code 1. Use package-level tests instead.

## Products

| Product | Package | Description |
|---|---|---|
| Kilo Desktop | `packages/desktop/` | Electron desktop app wrapping the Kilo headless server (sidecar). Ported from upstream OpenCode Desktop. |

## Naming Conventions

- All code, config, and branding must use `Kilo` / `kilo` instead of `OpenCode` / `opencode`.
- Package namespace is `@kilocode-ai/*` instead of `@opencode-ai/*`.
- Protocol scheme is `kilo://` instead of `opencode://`.
- App IDs follow `ai.kilo.desktop.{dev,beta,prod}` instead of `ai.opencode.desktop.*`.
- Store keys, service names, environment variables, and CLI binary names must all use the `kilo` prefix.
- GitHub owner/repo references must point to `jotronic81-dot/Kilo-Desktop` instead of `anomalyco/opencode`.

## Style Guide

- Keep things in one function unless composable or reusable
- Avoid unnecessary destructuring. Instead of `const { a, b } = obj`, use `obj.a` and `obj.b` to preserve context
- Avoid `try`/`catch` where possible
- Avoid using the `any` type
- Prefer single word variable names where possible
- Use Bun APIs when possible, like `Bun.file()`
- Rely on type inference when possible; avoid explicit type annotations or interfaces unless necessary for exports or clarity

### Avoid let statements

Prefer `const`. Replace `let` + if/else assignment with a ternary or an IIFE. Reassignment is the only legitimate reason to reach for `let`.

### Naming Enforcement (Read This)

THIS RULE IS MANDATORY FOR AGENT WRITTEN CODE.

- Use single word names by default for new locals, params, and helper functions.
- Multi-word names are allowed only when a single word would be unclear or ambiguous.
- Do not introduce new camelCase compounds when a short single-word alternative is clear.
- Before finishing edits, review touched lines and shorten newly introduced identifiers where possible.
- Good short names to prefer: `pid`, `cfg`, `err`, `opts`, `dir`, `root`, `child`, `state`, `timeout`.
- Examples to avoid unless truly required: `inputPID`, `existingClient`, `connectTimeout`, `workerPath`.

### Avoid else statements

Prefer early returns (or an IIFE) over `else`. After an `if` that returns/throws, the `else` is redundant.

### No empty catch blocks

Never leave a `catch` block empty. An empty `catch` silently swallows errors and hides bugs. If you're tempted to write one, ask yourself:

1. Is the `try`/`catch` even needed? (prefer removing it)
2. Should the error be handled explicitly? (recover, retry, rethrow)
3. At minimum, log it via `log.error("...", { err })` so failures are visible — never `catch {}` or `catch (e) {}` with no body.

### Prefer single word naming

Default to a single-word name for variables, parameters, and helper functions. Reach for a multi-word name only when a single word would be genuinely ambiguous in context — not just because the longer name "reads nicer". The rule is about meaning, not character count: don't introduce camelCase compounds like `inputPID`, `existingClient`, `connectTimeout`, or `workerPath` when `pid`, `client`, `timeout`, or `path` is already clear from the surrounding code.

## Testing

You MUST avoid using `mocks` as much as possible.
Tests MUST test actual implementation, do not duplicate logic into a test.

## Markdown Tables

Do not pad markdown table cells for column alignment. Use the compact form with single-space-padded content cells and a minimal separator row:

```
| Command | What it runs |
|---|---|
| `bun run dev` | Starts the Kilo Desktop Electron app. |
```

Do **not** right-pad cells to line up columns.

## Commit Conventions

[Conventional Commits](https://www.conventionalcommits.org/) with scopes matching packages: `desktop`, `docs`, `chore`, `refactor`, and `test`.

Examples: `fix(desktop): correct window title on macOS`, `docs: update contributing guide`, `chore(desktop): bump electron to 50`.

## Changesets

User-facing changes (features, fixes, breaking changes) require a changeset file for release notes. Prefer one concise changeset per PR, grouping related changes when possible. Run `bunx changeset add` or manually create `.changeset/<slug>.md`. Use `patch` for bug fixes, `minor` for new features, `major` for breaking changes. See `.changeset/README.md` for details.

Changeset descriptions appear directly in release notes and are read by end users. Keep them concise and feature-oriented — describe **what changed from the user's perspective**, not implementation details. Write in imperative mood (e.g. "Support exporting conversations as markdown" not "Add a new export handler that serializes session messages to .md files").

## Pull Requests

PR descriptions should explain **what** changed, **why** the change is needed, and the intent or constraints a reviewer cannot infer from the diff alone. Keep simple PRs brief, but give non-trivial changes enough context to stand on their own. Skip file-by-file inventories, test result summaries, and anything obvious from the code itself.

## GitHub Issues

When creating or managing GitHub issues for the VS Code extension or JetBrains plugin via `gh`, load `.kilo/skills/gh-issues/SKILL.md`. It covers templates, project boards (`VS Code Extension`, `Jetbrains Plugin`), title conventions, and the `gh auth refresh -s project` recovery path.

## Fork Merge Process

Kilo CLI is a fork of [opencode](https://github.com/anomalyco/opencode).

**Very important**: when planning or coding, update shared files with OpenCode as last resort! Everything is shared code from OpenCode, except folders that contain `kilo` in the name or have a parent directory that contains `kilo` in the name. Example of kilo specific folders: `packages/opencode/src/kilocode/` and `packages/kilo-docs/`. Always look for ways to implement your feature or fix in a way that minimizes changes to shared code.

### Minimizing Merge Conflicts

We regularly merge upstream changes from opencode. To minimize merge conflicts and keep the sync process smooth:

1. **Prefer `kilocode` directories** - Place Kilo-specific code in dedicated directories whenever possible:
   - `packages/opencode/src/kilocode/` - Kilo-specific source code
   - `packages/opencode/test/kilocode/` - Kilo-specific tests
   - `packages/kilo-gateway/` - The Kilo Gateway package

2. **Minimize changes to shared files** - When you must modify files that exist in upstream opencode, keep changes as small and isolated as possible.

3. **Use `kilocode_change` markers** - When modifying shared code, mark your changes with `kilocode_change` comments so they can be easily identified during merges.
   Do not use these markers in files within directories with kilo in the name

4. **Avoid restructuring upstream code** - Don't refactor or reorganize code that comes from opencode unless absolutely necessary.

5. **Mirror new config keys to the cloud schema** - When adding a `kilocode_change` key to `Config.Info` in `packages/opencode/src/config/config.ts`, also add the matching JSON Schema entry in `apps/web/src/app/config.json/extras.ts` in the [cloud repo](https://github.com/Kilo-Org/cloud). See [CLI Config Schema](packages/kilo-docs/pages/contributing/architecture/config-schema.md) for the step-by-step.

The goal is to keep our diff from upstream as small as possible, making regular merges straightforward and reducing the risk of conflicts.

### Git conflict style

`bun install` sets `merge.conflictStyle=zdiff3` repo-locally via `script/setup-git.ts` (wired into `postinstall`). Conflicts include the common ancestor between `|||||||` and `=======`, which is what `script/upstream/` and `mergiraf` rely on for structural resolution and what makes manual resolution on shared opencode files tractable. If you've overridden it in your user config, the repo-local setting takes precedence — don't override it back.

### Kilocode Change Markers

When editing shared upstream files, mark Kilo-specific lines with `kilocode_change` comments so future merges can find them. The basic forms are:

- Single line: `const value = 42 // kilocode_change`
- Multi-line block: wrap with `// kilocode_change start` / `// kilocode_change end`
- New file in a shared path: `// kilocode_change - new file` at the top
- JSX/TSX: use `{/* kilocode_change */}` (and `{/* kilocode_change start */}` / `end`)

Markers are NOT needed in paths that contain `kilocode` in the name (e.g. `packages/opencode/src/kilocode/`, `packages/opencode/test/kilocode/`) — these are entirely Kilo Code additions and won't conflict with upstream.

For decision rules on when to keep changes inline vs. extract Kilo logic, marker placement guidance, and verification commands, load `.kilo/skills/kilocode-merge-minimizer/SKILL.md`.