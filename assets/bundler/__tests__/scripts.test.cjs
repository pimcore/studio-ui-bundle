const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const { scripts } = require(path.join(__dirname, '..', '..', 'package.json'));

test('AC4: generate-types ends with the rewrite step', () => {
  assert.match(scripts['generate-types'], /&& node \.\/bundler\/fix-type-imports\.cjs$/);
  assert.ok(scripts['generate-types'].indexOf('tsc-alias') < scripts['generate-types'].indexOf('fix-type-imports'));
});

test('AC4: ci-prepublish runs generate-types, then the check, then build-rsbuild-plugins', () => {
  const steps = scripts['ci-prepublish'].split('&&').map((step) => step.trim());
  assert.deepEqual(steps, [
    'npm run generate-types',
    'node ./bundler/check-type-imports.cjs dist/build/types',
    'npm run build-rsbuild-plugins'
  ]);
});
