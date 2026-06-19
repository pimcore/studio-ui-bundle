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
 * Deterministic build id derived from the content of the frontend source.
 *
 * It is a content hash over the `js/` source tree plus the dependency manifests, using
 * relative paths so the same source yields the same id regardless of the checkout
 * location (CI vs. local). Identical source therefore produces the same output dirs and
 * an identical archive — no git churn when nothing actually changed. Both the SDK and app
 * builds of a single `build-app` run resolve the same group id, which is used as the
 * archive filename and the grouping key.
 */

const SOURCES = ['js'];
const MANIFESTS = ['package-lock.json', 'package.json'];

let cachedFingerprint: string | undefined;

function hashTree(root: string, base: string, hash: Hash): void {
  if (!fs.existsSync(root)) {
    return;
  }

  const entries = fs
    .readdirSync(root, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name));

  for (const entry of entries) {
    const abs = path.join(root, entry.name);
    if (entry.isDirectory()) {
      hashTree(abs, base, hash);
    } else if (entry.isFile()) {
      // relative + normalized path keeps the id stable across checkout locations / OSes
      hash.update(path.relative(base, abs).split(path.sep).join('/'));
      hash.update(fs.readFileSync(abs));
    }
  }
}

function sourceFingerprint(): string {
  if (cachedFingerprint !== undefined) {
    return cachedFingerprint;
  }

  const assets = path.resolve(__dirname, '..');
  const hash = createHash('sha256');

  for (const dir of SOURCES) {
    hashTree(path.join(assets, dir), assets, hash);
  }
  for (const file of MANIFESTS) {
    const p = path.join(assets, file);
    if (fs.existsSync(p)) {
      hash.update(file);
      hash.update(fs.readFileSync(p));
    }
  }

  cachedFingerprint = hash.digest('hex');

  return cachedFingerprint;
}

/**
 * Shared id for one build (the SDK + app pair). Used as the archive filename
 * (`build-<id>.zip`) and written into each output dir as `.build-id` so the dirs of a
 * single build can be grouped and the newest build selected at serve time.
 */
export function getBuildGroupId(): string {
  return sourceFingerprint().slice(0, 12);
}
