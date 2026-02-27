# Felix Notes (Quartz)

This repository publishes the public subset of an Obsidian vault to `https://notes.felixzieger.de/` using Quartz.

Deployments run from the `master` branch via GitHub Actions.

Source notes are read from:

- `../obsidian-vault/public/`
- `../obsidian-vault/assets/` (only assets referenced by public notes are copied)

## CLI workflow

Install dependencies:

```bash
pnpm install
```

Sync public notes into Quartz content:

```bash
pnpm notes:sync
```

Run local preview:

```bash
pnpm notes:dev
```

Build static site:

```bash
pnpm notes:build
```

`pnpm notes:publish` currently runs the same sync + build flow so you can trigger publication on demand before committing/pushing.
