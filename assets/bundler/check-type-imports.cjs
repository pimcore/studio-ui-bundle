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

/**
 * The specifiers the check looks at: `<pkg>/dist/...`, scoped packages too.
 * Returns the package name and its subpath (`./dist/...`), or null.
 */
function matchDeepImport (specifier) {
  const match = /^((?:@[^/@.][^/]*\/)?[^/@.][^/]*)\/(dist(?:\/.*)?)$/.exec(specifier);
  return match === null ? null : { pkg: match[1], subpath: `./${match[2]}` };
}

/**
 * The names a `{ … }` clause imports (`type A as B` → `A`), joined with ", ".
 * Read word by word: no regex that can backtrack.
 */
function importedNames (bindings) {
  return bindings
    .split(',')
    .map(bindingName)
    .filter((name) => name !== '')
    .join(', ');
}

function bindingName (binding) {
  const words = [...binding.matchAll(/\S+/g)];
  if (words.length > 1 && words[0][0] === 'type') words.shift();
  if (words.length === 0) return '';
  const as = words.findIndex((word, index) => index > 0 && index < words.length - 1 && word[0] === 'as');
  const last = words[as === -1 ? words.length - 1 : as - 1];
  return binding.slice(words[0].index, last.index + last[0].length);
}

const isSpace = (char) => char !== undefined && char.trim() === '';
const isIdentifierStart = (char) => char !== undefined && /[A-Za-z_$]/.test(char);
const isIdentifierPart = (char) => char !== undefined && /[\w$]/.test(char);

function skipSpace (text, pos) {
  while (isSpace(text[pos])) pos++;
  return pos;
}

/** A quoted specifier at pos (`"x"` or `'x'`, one line, not empty): { value, start, end }, or null. */
function readString (text, pos) {
  const quote = text[pos];
  if (quote !== '"' && quote !== "'") return null;
  let end = pos + 1;
  while (end < text.length && text[end] !== '"' && text[end] !== "'" && text[end] !== '\n') end++;
  if (end === pos + 1 || text[end] !== quote) return null;
  return { value: text.slice(pos + 1, end), start: pos + 1, end: end + 1 };
}

/** `import("x")` with an optional `.Member` after it, `(` at pos. */
function readImportType (text, pos) {
  const string = readString(text, skipSpace(text, pos + 1));
  if (string === null) return null;
  const close = skipSpace(text, string.end);
  if (text[close] !== ')') return null;
  let end = close + 1;
  let member = null;
  if (text[end] === '.' && isIdentifierStart(text[end + 1])) {
    const start = end + 1;
    end = start + 1;
    while (isIdentifierPart(text[end])) end++;
    member = text.slice(start, end);
  }
  return { string, member, end };
}

/** `import "x"`, whitespace at pos. */
function readSideEffectImport (text, pos) {
  if (!isSpace(text[pos])) return null;
  const string = readString(text, skipSpace(text, pos));
  return string === null ? null : { string, member: null, end: string.end };
}

/** The `{ … }` right before a `from` at fromIndex, not before `after`: its content, or null. */
function bindingsBefore (text, fromIndex, after) {
  let close = fromIndex - 1;
  while (close >= after && isSpace(text[close])) close--;
  if (close < after || text[close] !== '}') return null;
  const open = text.indexOf('{', Math.max(after, text.lastIndexOf('}', close - 1) + 1));
  return open === -1 || open >= close ? null : text.slice(open + 1, close);
}

/** `[{ … }] from "x"`, `from` at pos. */
function readFrom (text, pos, after) {
  const string = readString(text, skipSpace(text, pos + 'from'.length));
  if (string === null) return null;
  const bindings = bindingsBefore(text, pos, after);
  return { string, member: bindings === null ? null : importedNames(bindings), end: string.end };
}

// import("x").Member | { A, B } from "x" | from "x" | import "x", read by hand: no backtracking regex
const KEYWORD = /\b(?:import|from)/g;

function readSpecifier (text, keyword, after) {
  if (keyword[0] === 'from') return readFrom(text, keyword.index, after);
  const pos = keyword.index + 'import'.length;
  return text[pos] === '(' ? readImportType(text, pos) : readSideEffectImport(text, pos);
}

function findSpecifiers (text) {
  const found = [];
  let after = 0;
  for (const keyword of text.matchAll(KEYWORD)) {
    if (keyword.index < after) continue;
    const read = readSpecifier(text, keyword, after);
    if (read === null) continue;
    const line = text.slice(0, read.string.start).split('\n').length;
    found.push({ specifier: read.string.value, member: read.member, line });
    after = read.end;
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
    if (star === -1 || key.includes('*', star + 1)) continue;
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

/** The package's manifest seen from file's folder (or nodeModules), read once per folder and package; null if missing. */
function loadManifest (packages, pkg, file, nodeModules) {
  const cacheKey = `${nodeModules ?? path.dirname(file)}\0${pkg}`;
  if (!packages.has(cacheKey)) {
    const packageJson = findPackageJson(pkg, path.dirname(file), nodeModules);
    packages.set(cacheKey, packageJson === null ? null : JSON.parse(fs.readFileSync(packageJson, 'utf8')));
  }
  return packages.get(cacheKey);
}

/** Why a deep import cannot be resolved, or null when it can. */
function unresolvedReason (manifest, deep) {
  if (manifest === null) return `${deep.pkg} is not installed`;
  if (manifest.exports !== undefined && !isExported(manifest.exports, deep.subpath)) return `not in ${deep.pkg}'s exports`;
  return null;
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
      const reason = unresolvedReason(loadManifest(packages, deep.pkg, file, nodeModules), deep);
      if (reason !== null) problems.push({ file, line, specifier, reason });
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
