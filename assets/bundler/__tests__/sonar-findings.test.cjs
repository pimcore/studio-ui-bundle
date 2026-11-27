const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { findSpecifiers } = require('../check-type-imports.cjs');
const { fixContent } = require('../fix-type-imports.cjs');

const CHECK_SOURCE = fs.readFileSync(path.join(__dirname, '..', 'check-type-imports.cjs'), 'utf8');
const FIX_SOURCE = fs.readFileSync(path.join(__dirname, '..', 'fix-type-imports.cjs'), 'utf8');

// The pattern findSpecifiers used before it read the specifiers by hand (kept here as the reference)
const FORMER_SPECIFIER = /\bimport\(\s*(["'])([^"'\n]+)\1\s*\)(?:\.([A-Za-z_$][\w$]*))?|(?:\{([^}]*)\}\s*)?\bfrom\s*(["'])([^"'\n]+)\5|\bimport\s+(["'])([^"'\n]+)\7/g;

function formerFindSpecifiers (text) {
  const names = (bindings) => bindings
    .split(',')
    .map((binding) => binding.trim().replace(/^type\s+/, '').split(/\s+as\s+/)[0].trim())
    .filter((name) => name !== '')
    .join(', ');
  return [...text.matchAll(FORMER_SPECIFIER)].map((match) => {
    const specifier = match[2] ?? match[6] ?? match[8];
    const member = match[3] ?? (match[4] === undefined ? null : names(match[4]));
    const line = text.slice(0, match.index + match[0].lastIndexOf(specifier)).split('\n').length;
    return { specifier, member, line };
  });
}

const SAMPLE = [
  'import type { A, type B as C } from "pkg/dist/x";',
  "export { D } from 'pkg/dist/y';",
  'import {\n  E,\n  F as G\n} from "@scope/pkg/dist/z";',
  'import "side-effect/dist/a";',
  "import * as ns from 'ns-pkg';",
  'export * from "./relative";',
  'type H = import("@reduxjs/toolkit/dist/query/react").UseQueryStateDefaultResult<I>;',
  'type J = typeof import( \'@reduxjs/toolkit/dist/query/react\' ).reactHooksModuleName;',
  'type K = import("plain");',
  'type L = import("broken\');',
  'type M = import("").N;',
  'declare const o: { from: string };',
  'declare const p: { a: 1 } from "weird";',
  'import\n  "next-line";',
  'const fromage = "cheese"; importer("x");',
  'import type { } from "empty-bindings";',
  'export { type Q } from "q"; export { R as default } from "r";'
].join('\n');

test('AC1: findSpecifiers reads the same specifiers, members and lines as the former pattern', () => {
  assert.deepEqual(findSpecifiers(SAMPLE), formerFindSpecifiers(SAMPLE));
  assert.equal(findSpecifiers(SAMPLE).length, 14);
});

test('AC1: findSpecifiers matches the former pattern on 20000 seeded random token strings', () => {
  const tokens = ['import', 'from', '(', ')', '{', '}', '"', "'", '.', 'x', 'a/dist/b', ' ', '\n', 'type', 'as', ',', 'M', 'importx', '$y'];
  let seed = 42;
  const next = (n) => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed % n;
  };
  for (let i = 0; i < 20000; i++) {
    let text = '';
    for (let j = next(25); j >= 0; j--) text += tokens[next(tokens.length)];
    assert.deepEqual(findSpecifiers(text), formerFindSpecifiers(text), JSON.stringify(text));
  }
});

test('AC1: fixContent rewrites multi-line and type-only bindings as before', () => {
  const from = '@reduxjs/toolkit/dist/query/react';
  const text = [
    `import type {\n  UseQueryStateDefaultResult\n} from "${from}";`,
    `export { type UseQueryStateDefaultResult as U } from '${from}';`,
    `import { UseQueryStateDefaultResult, reactHooksModuleName } from "${from}";`
  ].join('\n');
  const result = fixContent(text);
  assert.equal(result.count, 2);
  assert.equal(result.text, [
    'import type {\n  UseQueryStateDefaultResult\n} from "@reduxjs/toolkit/query/react";',
    "export { type UseQueryStateDefaultResult as U } from '@reduxjs/toolkit/query/react';",
    `import { UseQueryStateDefaultResult, reactHooksModuleName } from "${from}";`
  ].join('\n'));
});

test('AC3: findSpecifiers and fixContent stay linear on inputs that made the former patterns backtrack', () => {
  const inputs = [
    'import("' + 'a'.repeat(50000),
    '{' + ' '.repeat(50000) + 'from',
    'import' + ' '.repeat(50000) + 'x',
    'import { ' + 'type '.repeat(20000) + 'x' + ' as'.repeat(20000) + ' } from "@reduxjs/toolkit/dist/query/react";'
  ];
  for (const input of inputs) {
    const start = process.hrtime.bigint();
    findSpecifiers(input.repeat(4));
    fixContent(input.repeat(4));
    const ms = Number(process.hrtime.bigint() - start) / 1e6;
    assert.ok(ms < 1000, `${input.slice(0, 20)}… took ${ms} ms`);
  }
});

test('AC3: the listed Sonar patterns are gone from both scripts', () => {
  assert.doesNotMatch(CHECK_SOURCE, /\\s\+as\\s\+/, 'check: \\s+as\\s+');
  assert.doesNotMatch(FIX_SOURCE, /\\s\+as\\s\+/, 'fix: \\s+as\\s+');
  assert.doesNotMatch(CHECK_SOURCE, /const SPECIFIER = /, 'check: the long SPECIFIER alternation');
  assert.doesNotMatch(CHECK_SOURCE, /indexOf\([^)]*\) !== -1/, 'check: indexOf(…) !== -1');
  assert.doesNotMatch(FIX_SOURCE, /new RegExp\(`/, 'fix: RegExp from an escaped template');
  assert.doesNotMatch(FIX_SOURCE, /'\\\\\$&'/, "fix: '\\\\$&'");
});

test('AC3: checkDir is split so no function nests the manifest lookup inside its loops', () => {
  const body = CHECK_SOURCE.slice(CHECK_SOURCE.indexOf('function checkDir'), CHECK_SOURCE.indexOf('if (require.main'));
  assert.doesNotMatch(body, /packages\.set\(/);
  assert.doesNotMatch(body, /else if/);
});
