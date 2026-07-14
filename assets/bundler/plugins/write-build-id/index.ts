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
  /**
   * The value written into the `.build-id` file inside the current build output dir.
   * All build dirs sharing this id are considered part of the same build (e.g. the
   * `<id>-sdk` and `<id>-app` pair studio-ui-bundle emits).
   */
  buildId: string;
}

/**
 * Rsbuild plugin that owns the two-mode contract between a local `npm run build` and
 * the `BuildArchiveExtractor` shipped by studio-ui-bundle:
 *
 *   - Marker present (`extracted-archive.json`): archive mode — the extractor may refresh
 *     the expanded build when a new archive appears on disk (e.g. after `git pull`).
 *   - Marker absent: manual-build mode — the extractor keeps its hands off; the expanded
 *     build is owned by the developer.
 *
 * On every successful build the plugin therefore:
 *
 *   1. Writes `.build-id` into the current build output dir, so `entryPointLocations()`
 *      can group the SDK + app dirs of one build together.
 *   2. Removes the extractor's marker at the parent of the build dir. That flips the
 *      state into "manual-build mode": subsequent `git pull`s bringing a new archive
 *      are ignored until the developer either rebuilds (this plugin rewrites nothing
 *      new — same effect: manual mode continues) or resets by `rm -rf`-ing the parent
 *      build dir (extractor sees the empty dir and re-extracts).
 *   3. Sweeps sibling directories whose `.build-id` does not match the current one.
 *      This keeps a single active build present so `entryPointLocations()` doesn't have
 *      to disambiguate between multiple builds via lexicographic fallback. Directories
 *      without a `.build-id` marker are never touched — those are considered
 *      externally-managed (e.g. `studio-npm-package.tgz` is a file, not a dir, so it is
 *      unaffected either way).
 *
 * @caveat If a bundle emits multiple build dirs per build (studio-ui-bundle's SDK + app
 * pair), an *isolated* partial build (`npm run build-sdk` after a source change) will
 * sweep the counterpart dir (its `.build-id` will differ) and the page will fail until
 * both configs have been built. Use `npm run build-app` (or the equivalent aggregate)
 * unless you know you want the partial state.
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

      // 1. Write the id file for this build.
      fs.writeFileSync(path.join(buildPath, '.build-id'), buildId);

      // 2. Switch to manual-build mode by removing the extractor's marker.
      const markerPath = path.join(parent, 'extracted-archive.json');
      if (fs.existsSync(markerPath)) {
        try {
          fs.unlinkSync(markerPath);
        } catch { /* best-effort: ignore FS races */ }
      }

      // 3. Sweep stale sibling build dirs (those whose .build-id differs from ours).
      let entries: string[];
      try {
        entries = fs.readdirSync(parent);
      } catch {
        return;
      }
      for (const entry of entries) {
        if (entry === currentDirName) continue;
        const entryPath = path.join(parent, entry);
        try {
          if (!fs.statSync(entryPath).isDirectory()) continue;
          const idFile = path.join(entryPath, '.build-id');
          if (!fs.existsSync(idFile)) continue;
          const otherId = fs.readFileSync(idFile, 'utf8').trim();
          if (otherId !== buildId) {
            fs.rmSync(entryPath, { recursive: true, force: true });
          }
        } catch { /* skip anything that races or can't be read */ }
      }
    });
  }
});
