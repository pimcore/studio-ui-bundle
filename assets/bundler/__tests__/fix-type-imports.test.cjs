const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const SCRIPT = path.join(__dirname, '..', 'fix-type-imports.cjs');
const FIXTURES = path.join(__dirname, 'fixtures', 'fix');

function fixtureCopy () {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fix-type-imports-'));
  fs.cpSync(path.join(FIXTURES, 'input'), dir, { recursive: true });
  return dir;
}

function filesOf (dir) {
  return fs.readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => path.relative(dir, path.join(entry.parentPath, entry.name)))
    .sort();
}

test('AC1: rewrites the UseQueryStateDefaultResult deep imports and leaves every other byte unchanged', () => {
  const dir = fixtureCopy();
  try {
    const output = execFileSync(process.execPath, [SCRIPT, dir], { encoding: 'utf8' });
    assert.match(output, /rewrote 4 .* in 2 file\(s\)/);
    const expected = path.join(FIXTURES, 'expected');
    assert.deepEqual(filesOf(dir), filesOf(expected));
    for (const file of filesOf(expected)) {
      assert.deepEqual(fs.readFileSync(path.join(dir, file)), fs.readFileSync(path.join(expected, file)), file);
    }
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('AC1: rewrites both the import("…") and the from "…" forms', () => {
  const dir = fixtureCopy();
  try {
    execFileSync(process.execPath, [SCRIPT, dir]);
    const hooks = fs.readFileSync(path.join(dir, 'hooks.d.ts'), 'utf8');
    const from = fs.readFileSync(path.join(dir, 'nested', 'from.d.ts'), 'utf8');
    assert.doesNotMatch(hooks, /dist\/query\/react["']\)\.UseQueryStateDefaultResult/);
    assert.match(hooks, /import\("@reduxjs\/toolkit\/query\/react"\)\.UseQueryStateDefaultResult/);
    assert.match(from, /import type \{ UseQueryStateDefaultResult \} from "@reduxjs\/toolkit\/query\/react";/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('AC1: keeps the older reactHooksModuleName deep imports byte for byte', () => {
  const dir = fixtureCopy();
  try {
    execFileSync(process.execPath, [SCRIPT, dir]);
    const hooks = fs.readFileSync(path.join(dir, 'hooks.d.ts'), 'utf8');
    const from = fs.readFileSync(path.join(dir, 'nested', 'from.d.ts'), 'utf8');
    assert.match(hooks, /typeof import\("@reduxjs\/toolkit\/dist\/query\/react"\)\.reactHooksModuleName>/);
    assert.match(from, /import \{ reactHooksModuleName \} from "@reduxjs\/toolkit\/dist\/query\/react";/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('AC1: a second run changes nothing', () => {
  const dir = fixtureCopy();
  try {
    execFileSync(process.execPath, [SCRIPT, dir]);
    const output = execFileSync(process.execPath, [SCRIPT, dir], { encoding: 'utf8' });
    assert.match(output, /rewrote 0 /);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
