const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const SCRIPT = path.join(__dirname, '..', 'check-type-imports.cjs');
const FIXTURES = path.join(__dirname, 'fixtures', 'check');

function check (fixture, nodeModules = 'packages') {
  return spawnSync(process.execPath, [SCRIPT, fixture, '--node-modules', path.join(FIXTURES, nodeModules)], {
    cwd: FIXTURES,
    encoding: 'utf8'
  });
}

test('AC2: fails on import("…") of a dist path the exports map does not list', () => {
  const result = check('bad-import');
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stderr, /^bad-import\/bad\.d\.ts:2 @scope\/cond-pkg\/dist\/hidden /m);
  assert.match(result.stderr, /^bad-import\/bad\.d\.ts:3 pattern-pkg\/dist\/public\/private\/x /m);
  assert.doesNotMatch(result.stderr, /bad\.d\.ts:1 /);
});

test('AC2: fails on from "…" of a dist path the exports map does not list', () => {
  const result = check('bad-from');
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stderr, /^bad-from\/bad\.d\.ts:1 exact-pkg\/dist\/gone /m);
  assert.match(result.stderr, /^bad-from\/bad\.d\.ts:2 string-pkg\/dist\/index /m);
});

test('AC2: fails on a dist path of a package that is not installed', () => {
  const result = check('bad-missing');
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stderr, /^bad-missing\/bad\.d\.ts:1 not-installed-pkg\/dist\/x \(not-installed-pkg is not installed\)/m);
});

test('AC2: fails on a new Redux Toolkit deep import that the baseline does not list', () => {
  const result = check('known', 'rtk');
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stderr, /^known\/new\.d\.ts:1 @reduxjs\/toolkit\/dist\/query\/react /m);
  assert.doesNotMatch(result.stderr, /known\.d\.ts/);
});

test('AC3: passes on exported subpaths, relative paths and packages without exports', () => {
  const result = check('good');
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /4 <pkg>\/dist\/\.\.\. import\(s\) checked/);
});

test('AC3: passes on the known reactHooksModuleName deep import from the baseline', () => {
  const result = spawnSync(process.execPath, [
    SCRIPT, 'known', '--node-modules', path.join(FIXTURES, 'rtk')
  ], { cwd: FIXTURES, encoding: 'utf8' });
  assert.match(result.stderr, /known\/new\.d\.ts/);
  assert.doesNotMatch(result.stderr, /known\/known\.d\.ts/);
});
