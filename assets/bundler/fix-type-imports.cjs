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
 * Rewrites the non-exported Redux Toolkit deep import in the emitted declarations
 * (usage: `node ./bundler/fix-type-imports.cjs [dir]`, dir defaults to dist/build/types).
 *
 * Since Redux Toolkit 2.14 exports `UseQueryStateDefaultResult`, tsc (moduleResolution "Node")
 * references it by name as `import("@reduxjs/toolkit/dist/query/react")` in every generated
 * `use...Query` hook. That path is not in Redux Toolkit's `exports`, so bundles resolving with
 * "bundler" get error types. `@reduxjs/toolkit/query/react` is the exported twin of the same
 * declarations.
 *
 * Only the references that name a member in REWRITE.members are rewritten. The older deep
 * imports on the slice `api` objects (`reactHooksModuleName`) stay byte for byte, so the types
 * partners know do not change (they are listed in known-deep-imports.json for the check).
 */
const path = require('node:path');
const fs = require('node:fs');

const REWRITE = {
  from: '@reduxjs/toolkit/dist/query/react',
  to: '@reduxjs/toolkit/query/react',
  members: ['UseQueryStateDefaultResult']
};

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');

const FROM = escapeRegExp(REWRITE.from);
// import("<from>").Member
const IMPORT_TYPE = new RegExp(`import\\((["'])${FROM}\\1\\)\\.([A-Za-z_$][\\w$]*)`, 'g');
// import { A, type B as C } from "<from>" / export { … } from "<from>"
const FROM_CLAUSE = new RegExp(`(\\b(?:import|export)\\s+(?:type\\s+)?\\{([^}]*)\\}\\s*from\\s*)(["'])${FROM}\\3`, 'g');

function importedNames (bindings) {
  return bindings
    .split(',')
    .map((binding) => binding.trim().replace(/^type\s+/, '').split(/\s+as\s+/)[0].trim())
    .filter((name) => name !== '');
}

function fixContent (text) {
  let count = 0;
  const fixed = text
    .replace(IMPORT_TYPE, (match, quote, member) => {
      if (!REWRITE.members.includes(member)) return match;
      count++;
      return `import(${quote}${REWRITE.to}${quote}).${member}`;
    })
    .replace(FROM_CLAUSE, (match, head, bindings, quote) => {
      const names = importedNames(bindings);
      if (names.length === 0 || !names.every((name) => REWRITE.members.includes(name))) return match;
      count++;
      return `${head}${quote}${REWRITE.to}${quote}`;
    });
  return { text: fixed, count };
}

function listDeclarationFiles (dir) {
  return fs.readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.d.ts'))
    .map((entry) => path.join(entry.parentPath, entry.name))
    .sort();
}

function fixDir (dir) {
  let files = 0;
  let count = 0;
  for (const file of listDeclarationFiles(dir)) {
    const text = fs.readFileSync(file, 'utf8');
    const result = fixContent(text);
    if (result.count === 0) continue;
    fs.writeFileSync(file, result.text);
    files++;
    count += result.count;
  }
  return { files, count };
}

if (require.main === module) {
  const dir = path.resolve(process.argv[2] ?? path.join(__dirname, '..', 'dist', 'build', 'types'));
  if (!fs.existsSync(dir)) {
    console.error(`fix-type-imports: ${dir} does not exist`);
    process.exit(1);
  }
  const { files, count } = fixDir(dir);
  console.log(`fix-type-imports: rewrote ${count} ${REWRITE.from} reference(s) to ${REWRITE.to} in ${files} file(s)`);
}

module.exports = { REWRITE, fixContent, fixDir, listDeclarationFiles };
