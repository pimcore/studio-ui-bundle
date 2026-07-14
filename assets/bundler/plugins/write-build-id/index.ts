/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import fs from 'node:fs';
import path from 'node:path';
import type { RsbuildPlugin } from '@rsbuild/core';

interface PluginOptions {
  buildId: string;
}

/**
 * Marks the build dir as developer-owned so `BuildArchiveExtractor` hands off:
 * writes `.build-id`, deletes `../extracted-archive.json`, and sweeps sibling
 * dirs whose `.build-id` differs.
 *
 * Reset to archive mode with `rm -rf public/build/`.
 *
 * @internal
 */
export const pluginWriteBuildId = (options: PluginOptions): RsbuildPlugin => ({
  name: 'write-build-id',
  setup(api) {
    api.onAfterBuild((data) => {
      const buildPath: string = data.environments.web.config.output.distPath.root;
      const parent = path.dirname(buildPath);
      const currentDirName = path.basename(buildPath);
      const { buildId } = options;

      fs.writeFileSync(path.join(buildPath, '.build-id'), buildId);

      const markerPath = path.join(parent, 'extracted-archive.json');
      if (fs.existsSync(markerPath)) {
        try { fs.unlinkSync(markerPath); } catch {}
      }

      let entries: string[];
      try { entries = fs.readdirSync(parent); } catch { return; }
      for (const entry of entries) {
        if (entry === currentDirName) continue;
        const entryPath = path.join(parent, entry);
        try {
          if (!fs.statSync(entryPath).isDirectory()) continue;
          const idFile = path.join(entryPath, '.build-id');
          if (!fs.existsSync(idFile)) continue;
          if (fs.readFileSync(idFile, 'utf8').trim() !== buildId) {
            fs.rmSync(entryPath, { recursive: true, force: true });
          }
        } catch {}
      }
    });
  }
});
