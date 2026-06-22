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
 *   is content-derived, so identical source always yields the same id. The compiled output
 *   itself is NOT byte-reproducible (e.g. Module Federation's mf-stats.json lists modules in
 *   non-deterministic order), so the id — not the bytes — is the archive's identity: if an
 *   archive for this id already exists it is kept untouched, avoiding a churned commit on
 *   every build when the source did not actually change.
 * - Only the dirs of one build (a single `.build-id`, chosen deterministically) are
 *   packaged, so a dev tree containing several builds still yields a single-pair archive.
 * - When the id is new (a real source change) any previous build-*.zip is removed, so only
 *   one archive is ever tracked.
 */
const path = require('node:path');
const fs = require('node:fs');
const AdmZip = require('adm-zip');

const EXCLUDED = new Set(['studio-npm-package.tgz']);
const FIXED_TIME = new Date(Date.UTC(2001, 0, 1)); // stable zip entry timestamp

const buildDir = path.resolve(__dirname, '..', '..', 'public', 'build');
const outDir = path.resolve(__dirname, '..', '..', 'build-dist');

if (!fs.existsSync(buildDir)) {
  console.error(`[package-build] nothing to package: ${buildDir} is missing`);
  process.exit(1);
}

// All output dirs of one build share a .build-id. A clean build emits exactly one; if
// several linger, pick deterministically (sorted) rather than by mtime.
const dirs = fs
  .readdirSync(buildDir, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => {
    const idFile = path.join(buildDir, e.name, '.build-id');
    return {
      name: e.name,
      buildId: fs.existsSync(idFile) ? fs.readFileSync(idFile, 'utf8').trim() : null,
    };
  })
  .filter((d) => d.buildId);

if (dirs.length === 0) {
  console.error('[package-build] no build dirs with a .build-id found — run the build first');
  process.exit(1);
}

const buildId = [...new Set(dirs.map((d) => d.buildId))].sort((a, b) => a.localeCompare(b)).pop();
const pairDirs = dirs.filter((d) => d.buildId === buildId).map((d) => d.name);

fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, `build-${buildId}.zip`);

// The id is the source-tree hash, so an existing archive with this id already represents
// this exact source. Rewriting it would only churn the committed binary with non-reproducible
// build noise (see header), so leave it untouched — but still sweep any stray archive from a
// different id (e.g. dragged in by a merge) to preserve the one-archive invariant.
if (fs.existsSync(outFile)) {
  const strays = fs
    .readdirSync(outDir)
    .filter((file) => /^build.*\.zip$/.test(file) && file !== path.basename(outFile));
  for (const file of strays) {
    fs.rmSync(path.join(outDir, file), { force: true });
  }
  console.log(
    strays.length > 0
      ? `[package-build] kept ${path.basename(outFile)}; removed ${strays.length} stray archive(s)`
      : `[package-build] ${path.basename(outFile)} already up to date for this source; nothing to do`
  );
  process.exit(0);
}

// Collect the build's files, relative to public/build, sorted for determinism.
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
for (const dir of pairDirs) {
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

// New id (a real source change): drop any previous archive before writing the new one.
for (const file of fs.readdirSync(outDir)) {
  if (/^build.*\.zip$/.test(file)) {
    fs.rmSync(path.join(outDir, file), { force: true });
  }
}

zip.writeZip(outFile);

const sizeMb = (fs.statSync(outFile).size / (1024 * 1024)).toFixed(1);
console.log(`[package-build] wrote ${path.relative(path.resolve(__dirname, '..', '..'), outFile)} (${sizeMb} MB) from ${pairDirs.length} dir(s)`);
