---
title: Shipping the Frontend Build as an Archive
---

# Shipping the Frontend Build as an Archive

A bundle installed via Composer must make sure the files referenced by its `entrypoints.json` exist on the target
installation. There are three ways to do that:

- **Commit the expanded build directory** (`public/build/`). This is what the Studio Example Bundle does and needs
  nothing beyond the provider from [Registering the Frontend Build](./03_Registering_the_Frontend_Build.md). Every
  build changes the hashed file names, so build output accumulates in the repository and branches conflict on it.
- **Build during deployment.** Commit no build output and run `npm ci && npm run build` for the bundle in the
  deployment pipeline, before `assets:install`. Also needs only the plain provider, but requires Node.js on the build
  host and a build step per bundle.
- **Commit a single build archive.** Commit one zip file, `build-dist/build-<id>.zip`, and let Studio extract it into
  `public/build/` on the target system. No build-output churn in git and no build step at deploy time. This is how the
  Studio UI Bundle itself and other Pimcore bundles ship their frontend, and it is what the rest of this page describes.

The archive mechanism is opt-in and available in Studio UI Bundle 2025.4.9+ and 2026.2.1+ (not in the 2026.1 line).

## Step 1: Build with a content-derived build id

The archive is named after a build id derived from the source tree, so unchanged source yields the same archive name
and no new commit. `pluginWriteBuildId` writes the id into the output directory as `.build-id`, which the packaging
script uses to find the directories of one build.

```ts
import { defineConfig } from '@rsbuild/core';
import { pluginGenerateEntrypoints, pluginWriteBuildId } from '@pimcore/studio-ui-bundle/rsbuild/plugins';
import { getBuildGroupId } from '@pimcore/studio-ui-bundle/bundler/build-id';
import fs from 'node:fs';
import path from 'node:path';

// Hash of this assets directory (node_modules and dist excluded). Keep the build output
// outside of it, otherwise every build changes the id.
const buildId = getBuildGroupId(__dirname);
const buildRoot = path.resolve(__dirname, '..', 'public', 'build');
const buildPath = path.resolve(buildRoot, buildId);

// Remove stale build directories: the packaging script picks a build id deterministically,
// not "the newest".
if (fs.existsSync(buildRoot)) {
  for (const entry of fs.readdirSync(buildRoot)) {
    if (entry !== buildId) {
      fs.rmSync(path.resolve(buildRoot, entry), { recursive: true, force: true });
    }
  }
}

export default defineConfig({
  output: {
    manifest: true,
    assetPrefix: '/bundles/<bundlename>/build/' + buildId,
    distPath: { root: buildPath },
  },
  plugins: [
    pluginGenerateEntrypoints(),
    pluginWriteBuildId({ buildId }),
    // ... pluginReact(), pluginModuleFederation(...) as in the example bundle
  ],
});
```

## Step 2: Package the build into the archive

`@pimcore/studio-ui-bundle` ships the packaging script as the `studio-package-build` binary. Both paths are resolved
relative to the package directory `npm run` executes in:

```json
{
  "scripts": {
    "build": "rsbuild build",
    "package-build": "studio-package-build --build-dir ../public/build --out-dir ../build-dist"
  }
}
```

`npm run build && npm run package-build` writes `build-dist/build-<id>.zip`. An existing archive with the same id is
left untouched and archives of other ids are removed, so `build-dist/` holds exactly one archive.

Recommended setup: ignore the expanded build and commit only the archive. In CI, run both scripts and commit
`build-dist/` back to the branch; there is nothing to commit unless the frontend source changed.

```gitignore
# Expanded frontend build is generated from build-dist/build-<id>.zip, not committed
/public/build/
```

## Step 3: Implement `BuildArchiveProviderInterface`

Switch the provider from [Registering the Frontend Build](./03_Registering_the_Frontend_Build.md) to
`BuildArchiveProviderInterface` and add `BuildArchiveExtractionTrait`. The trait implements `getBuildArchive()` and
`getEntryPointsJsonLocations()`; the provider only supplies the paths:

```php
<?php
declare(strict_types=1);

namespace App\Webpack;

use Pimcore\Bundle\StudioUiBundle\Build\BuildArchive;
use Pimcore\Bundle\StudioUiBundle\Build\BuildArchiveExtractionTrait;
use Pimcore\Bundle\StudioUiBundle\Build\BuildArchiveProviderInterface;

final class WebpackEntryPointProvider implements BuildArchiveProviderInterface
{
    use BuildArchiveExtractionTrait;

    public function getEntryPoints(): array
    {
        return ['exposeRemote'];
    }

    public function getOptionalEntryPoints(): array
    {
        return [];
    }

    protected function buildArchive(): BuildArchive
    {
        return new BuildArchive(
            archiveGlob: __DIR__ . '/../../build-dist/build*.zip',
            targetDir: __DIR__ . '/../../public/build',
        );
    }
}
```

`targetDir` must be the directory served at the `assetPrefix` compiled into the build. The trait receives the extractor
through setter autowiring, so the provider must be an autowired service (`autowire: true`, the default in most bundle
`services.yaml` files).

Service tags are the same as for a plain provider. The provider must carry the main tag
`pimcore_studio_ui.webpack_entry_point_provider`: cache warmup only discovers providers with that tag, so a provider
registered only with the `.document_editor_iframe` tag is never extracted.

## Deployment

- `bin/console cache:warmup` (or `cache:clear` without `--no-warmup`) extracts the archive of every registered
  `BuildArchiveProviderInterface` into its `targetDir`. Run it during the deploy phase while `vendor/` is still
  writable; read-only production filesystems are then fully supported. When `assets:install` runs in copy mode, warm
  the cache before it.
- Pimcore's Composer scripts run `cache:clear --no-warmup` by default and therefore do not extract. Add an explicit
  `cache:warmup` to the deployment.
- Warmup never fails over extraction; it logs a warning and continues. If no build is present at request time and the
  target is not writable, `BuildArchiveNotWritableException` is thrown then. Watch the warmup log rather than the
  command's exit code.
- In local development, a missing expanded build (e.g. after `git pull` with a new archive) is extracted on the fly
  when Studio resolves entry points, provided the filesystem is writable.
- A build produced by `npm run build` or `npm run dev` is never overwritten by extraction. To return to the committed
  archive, delete `public/build/` and warm the cache again.

## Public API

These classes in `Pimcore\Bundle\StudioUiBundle\Build` are public API:

| Class | Role |
|-------|------|
| `BuildArchiveProviderInterface` | Extends `WebpackEntryPointProviderInterface` with `getBuildArchive(): ?BuildArchive`. |
| `BuildArchive` | Value object: the `archiveGlob` matching the committed zip and the `targetDir` it is extracted into. |
| `BuildArchiveExtractionTrait` | Implements `getBuildArchive()` and `getEntryPointsJsonLocations()`; the provider only implements `buildArchive()`. |

On the npm side, `pluginWriteBuildId` (`@pimcore/studio-ui-bundle/rsbuild/plugins`), `getBuildGroupId`
(`@pimcore/studio-ui-bundle/bundler/build-id`) and the `studio-package-build` binary are public.
`BuildArchiveExtractor` and `StudioBuildCacheWarmer` are internal; do not call or replace them.
