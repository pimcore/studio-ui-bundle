/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * Packages the latest frontend build into a single committed archive
 * (build-dist/build-<id>.zip). Only this archive is tracked in git; the expanded build is
 * gitignored and reconstructed by BuildArchiveExtractor.
 *
 * - The build id is the shared `.build-id` written into each output dir at build time. It
 *   is deterministic (content-derived), so identical source produces the same id, the same
 *   archive contents and — with the fixed entry order/timestamps below — the same bytes, so
 *   git sees no change when nothing actually changed.
 * - Only the dirs of the latest build (matching the newest `.build-id`) are packaged, so a
 *   dev tree containing several builds still yields a single-pair archive.
 * - Any previous build-*.zip is removed, so only the latest archive is ever tracked.
 */
const path = require('path');
const fs = require('fs');
const AdmZip = require('adm-zip');

const EXCLUDED = new Set(['studio-npm-package.tgz']);
const FIXED_TIME = new Date(Date.UTC(2001, 0, 1)); // stable zip entry timestamp

const buildDir = path.resolve(__dirname, '..', '..', 'public', 'build');
const outDir = path.resolve(__dirname, '..', '..', 'build-dist');

if (!fs.existsSync(buildDir)) {
  console.error(`[package-build] nothing to package: ${buildDir} is missing`);
  process.exit(1);
}

// Resolve the latest build id: among output dirs that carry a .build-id, pick the one
// belonging to the most recently modified dir.
const dirs = fs
  .readdirSync(buildDir, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => {
    const idFile = path.join(buildDir, e.name, '.build-id');
    return {
      name: e.name,
      buildId: fs.existsSync(idFile) ? fs.readFileSync(idFile, 'utf8').trim() : null,
      mtime: fs.statSync(path.join(buildDir, e.name)).mtimeMs,
    };
  })
  .filter((d) => d.buildId);

if (dirs.length === 0) {
  console.error('[package-build] no build dirs with a .build-id found — run the build first');
  process.exit(1);
}

const latestBuildId = dirs.sort((a, b) => b.mtime - a.mtime)[0].buildId;
const pairDirs = dirs.filter((d) => d.buildId === latestBuildId).map((d) => d.name);

// Collect files of the latest pair, relative to public/build, sorted for determinism.
function collect(absDir, relBase, out) {
  for (const entry of fs.readdirSync(absDir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (EXCLUDED.has(entry.name)) {
      continue;
    }
    const abs = path.join(absDir, entry.name);
    const rel = relBase ? `${relBase}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      collect(abs, rel, out);
    } else {
      out.push({ rel, abs });
    }
  }
}

const files = [];
for (const dir of pairDirs.sort()) {
  collect(path.join(buildDir, dir), dir, files);
}
files.sort((a, b) => a.rel.localeCompare(b.rel));

const zip = new AdmZip();
for (const f of files) {
  zip.addFile(f.rel, fs.readFileSync(f.abs));
  const entry = zip.getEntry(f.rel);
  if (entry) {
    entry.header.time = FIXED_TIME;
  }
}

fs.mkdirSync(outDir, { recursive: true });
// Keep only the latest archive.
for (const file of fs.readdirSync(outDir)) {
  if (/^build.*\.zip$/.test(file)) {
    fs.rmSync(path.join(outDir, file), { force: true });
  }
}

const outFile = path.join(outDir, `build-${latestBuildId}.zip`);
zip.writeZip(outFile);

const sizeMb = (fs.statSync(outFile).size / (1024 * 1024)).toFixed(1);
console.log(`[package-build] wrote ${path.relative(path.resolve(__dirname, '..', '..'), outFile)} (${sizeMb} MB) from ${pairDirs.length} dir(s)`);
