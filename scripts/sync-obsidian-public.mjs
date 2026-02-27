import { mkdir, readdir, readFile, rm, stat, copyFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, "..")

const srcPublicDir = path.resolve(repoRoot, "../obsidian-vault/public")
const srcAssetsDir = path.resolve(repoRoot, "../obsidian-vault/assets")
const dstContentDir = path.resolve(repoRoot, "content")
const dstAssetsDir = path.join(dstContentDir, "assets")
const legacyHomeNote = "obsidian-notes.felixzieger.de index page.md"

const assetRefPattern = /\(\.\.\/assets\/([^\)\n]+)\)/g

async function walkMarkdownFiles(rootDir) {
  const markdownFiles = []
  const queue = [rootDir]

  while (queue.length > 0) {
    const current = queue.pop()
    const entries = await readdir(current, { withFileTypes: true })

    for (const entry of entries) {
      const absolutePath = path.join(current, entry.name)
      if (entry.isDirectory()) {
        queue.push(absolutePath)
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
        markdownFiles.push(absolutePath)
      }
    }
  }

  return markdownFiles
}

async function ensureDirectoryForFile(filePath) {
  await mkdir(path.dirname(filePath), { recursive: true })
}

function parseAssetRef(raw) {
  const cleaned = raw.trim().replace(/^<|>$/g, "")
  const relativePath = cleaned.split(/\s+/, 1)[0]
  return relativePath
}

async function main() {
  await rm(dstContentDir, { recursive: true, force: true })
  await mkdir(dstContentDir, { recursive: true })
  await mkdir(dstAssetsDir, { recursive: true })

  const mdFiles = await walkMarkdownFiles(srcPublicDir)
  const assetsToCopy = new Set()
  let copiedNotes = 0

  for (const srcFile of mdFiles) {
    const relative = path.relative(srcPublicDir, srcFile)
    if (relative === legacyHomeNote) {
      continue
    }

    const outRelative = relative
    const dstFile = path.join(dstContentDir, outRelative)

    let content = await readFile(srcFile, "utf8")

    for (const match of content.matchAll(assetRefPattern)) {
      const assetPath = parseAssetRef(match[1])
      if (assetPath) {
        assetsToCopy.add(assetPath)
      }
    }

    await ensureDirectoryForFile(dstFile)
    await writeFile(dstFile, content, "utf8")
    copiedNotes += 1
  }

  const indexContent = `---
title: Public Notes
---

These notes are synced from the public subset of my Obsidian vault.

Use search, graph view, backlinks, and the explorer to navigate.
`
  await writeFile(path.join(dstContentDir, "index.md"), indexContent, "utf8")
  copiedNotes += 1

  let copiedAssets = 0
  let missingAssets = 0

  for (const assetRelative of assetsToCopy) {
    const srcAsset = path.join(srcAssetsDir, assetRelative)
    const dstAsset = path.join(dstAssetsDir, assetRelative)

    try {
      const sourceStat = await stat(srcAsset)
      if (!sourceStat.isFile()) {
        missingAssets += 1
        continue
      }

      await ensureDirectoryForFile(dstAsset)
      await copyFile(srcAsset, dstAsset)
      copiedAssets += 1
    } catch {
      missingAssets += 1
    }
  }

  console.log(`Synced ${copiedNotes} notes from ${srcPublicDir}`)
  console.log(`Copied ${copiedAssets} referenced assets to ${dstAssetsDir}`)
  if (missingAssets > 0) {
    console.warn(`Warning: ${missingAssets} referenced assets were missing and skipped.`)
  }
}

main().catch((error) => {
  console.error("Failed to sync public Obsidian notes:")
  console.error(error)
  process.exit(1)
})
