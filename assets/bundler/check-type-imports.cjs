#!/usr/bin/env node
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
 * Fails when the emitted declarations import a `<pkg>/dist/...` path that `<pkg>`'s `exports`
 * map does not resolve: bundles resolving with moduleResolution "bundler" get error types there.
 * Usage: `node ./bundler/check-type-imports.cjs [dir] [--node-modules <dir>] [--baseline <file>]`
 * (dir defaults to dist/build/types).
 *
 * - `import("…")`, `from "…"` and `import "…"` specifiers in every `.d.ts` under dir are checked.
 * - A package without an `exports` map passes (deep paths resolve there); a package that is not
 *   installed fails.
 * - Known old deep imports (specifier + referenced member, or the names a `{ … } from` imports)
 *   in known-deep-imports.json pass, so only new ones are caught.
 * - Prints `file:line specifier` for each offending import and exits 1; exits 0 otherwise.
 */
const path = require('node:path');
const fs = require('node:fs');

const DEFAULT_BASELINE = path.join(__dirname, 'known-deep-imports.json');

// import("x").Member | { A, B } from "x" | from "x" | import "x"
const SPECIFIER = /\bimport\(\s*(["'])([^"'\n]+)\1\s*\)(?:\.([A-Za-z_$][\w$]*))?|(?:\{([^}]*)\}\s*)?\bfrom\s*(["'])([^"'\n]+)\5|\bimport\s+(["'])([^"'\n]+)\7/g;

/**
 * The specifiers the check looks at: `<pkg>/dist/...`, scoped packages too.
 * Returns the package name and its subpath (`./dist/...`), or null.
 */
function matchDeepImport (specifier) {
  const match = /^((?:@[^/@.][^/]*\/)?[^/@.][^/]*)\/(dist(?:\/.*)?)$/.exec(specifier);
  return match === null ? null : { pkg: match[1], subpath: `./${match[2]}` };
}

/** The names a `{ … }` clause imports (`type A as B` → `A`), joined with ", ". */
function importedNames (bindings) {
  return bindings
    .split(',')
    .map((binding) => binding.trim().replace(/^type\s+/, '').split(/\s+as\s+/)[0].trim())
    .filter((name) => name !== '')
    .join(', ');
}

function findSpecifiers (text) {
  const found = [];
  for (const match of text.matchAll(SPECIFIER)) {
    const specifier = match[2] ?? match[6] ?? match[8];
    const member = match[3] ?? (match[4] === undefined ? null : importedNames(match[4]));
    const line = text.slice(0, match.index + match[0].lastIndexOf(specifier)).split('\n').length;
    found.push({ specifier, member, line });
  }
  return found;
}

function hasTarget (target) {
  if (target === null || target === undefined) return false;
  if (typeof target === 'string') return true;
  if (Array.isArray(target)) return target.some(hasTarget);
  return Object.values(target).some(hasTarget);
}

/** Whether an `exports` field resolves the subpath (`./dist/...`): exact keys first, then `*` patterns. */
function isExported (exportsField, subpath) {
  if (exportsField === null || typeof exportsField !== 'object' || Array.isArray(exportsField)) {
    // a string or array target only exports "."
    return false;
  }
  const keys = Object.keys(exportsField);
  if (!keys.some((key) => key.startsWith('.'))) {
    // a condition object only exports "."
    return false;
  }
  if (Object.hasOwn(exportsField, subpath)) {
    return hasTarget(exportsField[subpath]);
  }
  let best = null;
  for (const key of keys) {
    const star = key.indexOf('*');
    if (star === -1 || key.indexOf('*', star + 1) !== -1) continue;
    const prefix = key.slice(0, star);
    const suffix = key.slice(star + 1);
    if (subpath.length < key.length - 1 || !subpath.startsWith(prefix) || !subpath.endsWith(suffix)) continue;
    // Node picks the key with the longest prefix, then the longest key
    if (best === null || prefix.length > best.prefix.length ||
      (prefix.length === best.prefix.length && key.length > best.key.length)) {
      best = { key, prefix };
    }
  }
  return best !== null && hasTarget(exportsField[best.key]);
}

function findPackageJson (pkg, fromDir, nodeModules) {
  const candidates = [];
  if (nodeModules !== undefined) {
    candidates.push(path.join(nodeModules, pkg, 'package.json'));
  } else {
    for (let dir = fromDir; ; dir = path.dirname(dir)) {
      candidates.push(path.join(dir, 'node_modules', pkg, 'package.json'));
      if (path.dirname(dir) === dir) break;
    }
  }
  return candidates.find((candidate) => fs.existsSync(candidate)) ?? null;
}

function readBaseline (file) {
  if (file === null || !fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function isKnown (baseline, specifier, member) {
  return baseline.some((entry) => entry.specifier === specifier && (entry.member ?? null) === member);
}

function listDeclarationFiles (dir) {
  return fs.readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.d.ts'))
    .map((entry) => path.join(entry.parentPath, entry.name))
    .sort();
}

function checkDir (dir, { nodeModules, baseline = DEFAULT_BASELINE } = {}) {
  const known = readBaseline(baseline);
  const packages = new Map();
  const problems = [];
  let checked = 0;
  for (const file of listDeclarationFiles(dir)) {
    const text = fs.readFileSync(file, 'utf8');
    for (const { specifier, member, line } of findSpecifiers(text)) {
      const deep = matchDeepImport(specifier);
      if (deep === null) continue;
      checked++;
      if (isKnown(known, specifier, member)) continue;
      const cacheKey = `${nodeModules ?? path.dirname(file)}\0${deep.pkg}`;
      if (!packages.has(cacheKey)) {
        const packageJson = findPackageJson(deep.pkg, path.dirname(file), nodeModules);
        packages.set(cacheKey, packageJson === null ? null : JSON.parse(fs.readFileSync(packageJson, 'utf8')));
      }
      const manifest = packages.get(cacheKey);
      if (manifest === null) {
        problems.push({ file, line, specifier, reason: `${deep.pkg} is not installed` });
      } else if (manifest.exports !== undefined && !isExported(manifest.exports, deep.subpath)) {
        problems.push({ file, line, specifier, reason: `not in ${deep.pkg}'s exports` });
      }
    }
  }
  return { checked, problems };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const option = (name) => {
    const index = args.indexOf(name);
    if (index === -1) return undefined;
    const value = args[index + 1];
    args.splice(index, 2);
    return path.resolve(value);
  };
  const nodeModules = option('--node-modules');
  const baseline = option('--baseline') ?? DEFAULT_BASELINE;
  const dir = path.resolve(args[0] ?? path.join(__dirname, '..', 'dist', 'build', 'types'));
  if (!fs.existsSync(dir)) {
    console.error(`check-type-imports: ${dir} does not exist`);
    process.exit(1);
  }
  const { checked, problems } = checkDir(dir, { nodeModules, baseline });
  for (const { file, line, specifier, reason } of problems) {
    console.error(`${path.relative(process.cwd(), file)}:${line} ${specifier} (${reason})`);
  }
  if (problems.length > 0) {
    console.error(`check-type-imports: ${problems.length} <pkg>/dist/... import(s) a bundle cannot resolve`);
    process.exit(1);
  }
  console.log(`check-type-imports: ${checked} <pkg>/dist/... import(s) checked, all resolvable or known`);
}

module.exports = { matchDeepImport, findSpecifiers, isExported, checkDir };
