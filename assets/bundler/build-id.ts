/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createHash, type Hash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Deterministic build id derived from the whole `assets/` source tree (excluding installed
 * dependencies and generated output). It is a sha256 over every file's normalized relative
 * path + content, so identical source — including configs (rsbuild, tsconfig, …), fonts and
 * the API spec — yields the same id regardless of checkout location, and any change to them
 * bumps it. This includes the build tooling itself (these bundler scripts live under
 * `assets/`), so editing them also changes the id even though they are not bundled into the
 * app. Both the SDK and app builds of one `build-app` run resolve the same id (used as the
 * archive filename and the grouping key).
 */

// Installed dependencies and generated output — not part of the source fingerprint.
const EXCLUDED_DIRS = new Set(['node_modules', 'dist']);

let cachedFingerprint: string | undefined;

function hashTree(dir: string, base: string, hash: Hash): void {
  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name));

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!EXCLUDED_DIRS.has(entry.name)) {
        hashTree(path.join(dir, entry.name), base, hash);
      }
    } else if (entry.isFile()) {
      const abs = path.join(dir, entry.name);
      // relative + normalized path keeps the id stable across checkout locations / OSes
      hash.update(path.relative(base, abs).split(path.sep).join('/'));
      hash.update(fs.readFileSync(abs));
    }
  }
}

function sourceFingerprint(): string {
  if (cachedFingerprint === undefined) {
    const assets = path.resolve(__dirname, '..');
    const hash = createHash('sha256');
    hashTree(assets, assets, hash);
    cachedFingerprint = hash.digest('hex');
  }

  return cachedFingerprint;
}

/**
 * Shared id for one build (the SDK + app pair). Used as the archive filename
 * (`build-<id>.zip`) and written into each output dir as `.build-id` so the dirs of a
 * single build can be grouped and stale builds ignored at serve time.
 */
export function getBuildGroupId(): string {
  return sourceFingerprint().slice(0, 12);
}
