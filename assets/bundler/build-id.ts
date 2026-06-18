/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { execFileSync } from 'child_process';
import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';

/**
 * Deterministic build id derived from the content of the `assets/` source tree.
 *
 * Using the git tree hash means the id changes if and only if the frontend source
 * changes: identical source (even across commits/branches) yields the same id, so a
 * rebuild produces the same output dirs and an identical archive — no git churn when
 * nothing actually changed. Both the SDK and app builds of a single `build-app` run
 * resolve the same group id, which is used as the archive filename and the grouping key.
 */

let cachedFingerprint: string | null | undefined;

function sourceFingerprint(): string | null {
  if (cachedFingerprint !== undefined) {
    return cachedFingerprint;
  }

  const bundleRoot = path.resolve(__dirname, '..', '..');

  // Preferred: content hash of the committed assets/ tree (cheap, deterministic).
  try {
    const out = execFileSync('git', ['-C', bundleRoot, 'rev-parse', 'HEAD:assets'], {
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    cachedFingerprint = out.toString().trim();
    return cachedFingerprint;
  } catch {
    // not a git checkout / git unavailable
  }

  // Fallback: hash the dependency + manifest files (still deterministic).
  try {
    const hash = createHash('sha1');
    for (const file of ['package-lock.json', 'package.json']) {
      const p = path.resolve(__dirname, '..', file);
      if (fs.existsSync(p)) {
        hash.update(fs.readFileSync(p));
      }
    }
    cachedFingerprint = hash.digest('hex');
    return cachedFingerprint;
  } catch {
    cachedFingerprint = null;
    return null;
  }
}

function short(input: string): string {
  return createHash('sha1').update(input).digest('hex').slice(0, 12);
}

/**
 * Shared id for one build (the SDK + app pair). Used as the archive filename
 * (`build-<id>.zip`) and written into each output dir as `.build-id` so the dirs of a
 * single build can be grouped and the newest build selected at serve time.
 */
export function getBuildGroupId(): string {
  return short(sourceFingerprint() ?? 'studio-build-fallback');
}
