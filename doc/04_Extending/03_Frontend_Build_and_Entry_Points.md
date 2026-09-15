---
title: Frontend Build Registration and Distribution
---

# Frontend Build Registration and Distribution

Every bundle that ships a Studio UI plugin has to solve two problems:

1. **Registration** – tell Studio where the compiled frontend files are, so they can be loaded into the Studio app.
   This is done with a `WebpackEntryPointProviderInterface` service.
2. **Distribution** – get the compiled frontend onto the target installation when the bundle is installed via Composer.
   There are three supported options; one of them (a committed archive) uses the opt-in `BuildArchiveProviderInterface`.

This page describes both contracts and when to use which distribution option.

## Registering the frontend build

### The `entrypoints.json` manifest

The Rsbuild plugin `pluginGenerateEntrypoints` (from `@pimcore/studio-ui-bundle/rsbuild/plugins`) writes an
`entrypoints.json` manifest into the build output directory. It lists the JS and CSS files for every entry of the build
and adds a synthetic `exposeRemote` entry that registers the bundle's Module Federation remote with Studio.

By convention the output directory is `public/build/<build-id>/` inside the bundle, so it is served by
`bin/console assets:install` under `/bundles/<bundlename>/build/<build-id>/`. The `assetPrefix` in `rsbuild.config.ts`
must point to that URL, see the
[example Rsbuild configuration](https://github.com/pimcore/studio-example-bundle/blob/main/assets/rsbuild.config.ts).

### `WebpackEntryPointProviderInterface`

Studio collects all services tagged as entry point providers and loads the entries they declare.
Implement `Pimcore\Bundle\StudioUiBundle\Webpack\WebpackEntryPointProviderInterface`:

| Method | Purpose |
|--------|---------|
| `getEntryPointsJsonLocations()` | Absolute paths of the `entrypoints.json` files to read. Usually `glob(__DIR__ . '/../../public/build/*/entrypoints.json')`. |
| `getEntryPoints()` | Names of the entries from the manifest that Studio should load. A plugin bundle returns `['exposeRemote']`; the actual plugin code is then loaded through Module Federation. |
| `getOptionalEntryPoints()` | Entries that are allowed to be missing from the manifest (for example entries that only exist in a development build). Usually `[]`. |

```php
<?php
declare(strict_types=1);

namespace App\Webpack;

use Pimcore\Bundle\StudioUiBundle\Webpack\WebpackEntryPointProviderInterface;

final class WebpackEntryPointProvider implements WebpackEntryPointProviderInterface
{
    public function getEntryPointsJsonLocations(): array
    {
        return glob(__DIR__ . '/../../public/build/*/entrypoints.json') ?: [];
    }

    public function getEntryPoints(): array
    {
        return ['exposeRemote'];
    }

    public function getOptionalEntryPoints(): array
    {
        return [];
    }
}
```

### Service tags

Register the provider in your `services.yaml` with one or both of the following tags:

| Tag | Loads the entries into |
|-----|------------------------|
| `pimcore_studio_ui.webpack_entry_point_provider` | The main Studio application. Every plugin bundle needs this tag. |
| `pimcore_studio_ui.webpack_entry_point_provider.document_editor_iframe` | The document editor iframe, which has its own plugin bootstrap. Add this tag only if your plugin must also run inside the document editor, for example because it provides a [custom document editable](./02_Plugin_Development_Examples/14_Custom_Document_Editable.md). |

> **Note:** `StudioBuildCacheWarmer` (used by Option 3 below) only discovers providers tagged
> `pimcore_studio_ui.webpack_entry_point_provider`. If a `BuildArchiveProviderInterface` provider is registered
> **only** with the `.document_editor_iframe` tag, cache warmup will not extract its archive. A provider using the
> archive mechanism must always carry the main tag as well, even if it is only meant to run inside the document
> editor.

```yaml
services:
    App\Webpack\WebpackEntryPointProvider:
        tags:
            - { name: pimcore_studio_ui.webpack_entry_point_provider }
            # only when the plugin must also be available inside the document editor:
            - { name: pimcore_studio_ui.webpack_entry_point_provider.document_editor_iframe }
```

A complete working example is the
[Studio Example Bundle](https://github.com/pimcore/studio-example-bundle/blob/main/src/Webpack/WebpackEntryPointProvider.php).

## Distributing the compiled frontend

A bundle installed via Composer has to make sure the compiled files referenced by `entrypoints.json` exist in the target
installation. Pick one of the following options.

### Option 1: Commit the expanded build directory

Run `npm run build` and commit the resulting `public/build/` directory. This is what the Studio Example Bundle does and
is the simplest option: no build step on the target system, and a plain `WebpackEntryPointProviderInterface` is all
that is needed.

The downside is that every build produces new hashed file names, so the repository grows with generated files and merges
between branches frequently conflict on build output. For a small bundle with infrequent releases this is usually fine.

### Option 2: Build during deployment

Do not commit build output at all. Run `npm ci && npm run build` for the bundle as part of your deployment pipeline,
before `assets:install`. This also only needs a plain `WebpackEntryPointProviderInterface`, but requires Node.js on the
build host and a build step for every bundle that ships a Studio plugin.

### Option 3: Commit a single build archive (`BuildArchiveProviderInterface`)

Instead of the expanded directory, commit one zip file `build-dist/build-<id>.zip` and let Studio extract it into
`public/build/` on the target system. This is how the Studio UI Bundle itself and other Pimcore bundles ship their
frontend. It avoids the churn of Option 1 and the deployment requirement of Option 2.

This is an **opt-in** mechanism: bundles that do not implement `BuildArchiveProviderInterface` are not affected by it.
The following classes in `Pimcore\Bundle\StudioUiBundle\Build` are public API and safe to use from your bundle:

| Class | Role |
|-------|------|
| `BuildArchiveProviderInterface` | Extends `WebpackEntryPointProviderInterface` with `getBuildArchive(): ?BuildArchive`. Studio's cache warmer extracts the archives of all tagged providers implementing this interface. |
| `BuildArchive` | Value object returned by `getBuildArchive()`: the `archiveGlob` matching the committed zip and the `targetDir` it is extracted into. |
| `BuildArchiveExtractionTrait` | Ready-made implementation of `getBuildArchive()` and `getEntryPointsJsonLocations()`. Your provider only implements `buildArchive()` to supply its paths. |

`BuildArchiveExtractor` and `StudioBuildCacheWarmer` are internal; do not call or replace them directly.
The mechanism is available in Studio UI Bundle 2025.4.9 and later.

#### Step 1: Produce a build with a content-derived build id

The archive is named after a **build id** that is derived from the source tree, not generated randomly. Identical
source therefore always produces the same archive name, so re-running the build on unchanged source does not create a
new commit. The build id must be written into the output directory as `.build-id`, which the packaging script uses to
find the directories that belong to one build.

Use `getBuildGroupId()` and `pluginWriteBuildId` from the Studio UI npm package in your `rsbuild.config.ts`:

```ts
import { defineConfig } from '@rsbuild/core';
import { pluginGenerateEntrypoints, pluginWriteBuildId } from '@pimcore/studio-ui-bundle/rsbuild/plugins';
import { getBuildGroupId } from '@pimcore/studio-ui-bundle/bundler/build-id';
import fs from 'node:fs';
import path from 'node:path';

// Fingerprint of this assets directory (node_modules and dist are excluded).
// Keep the build output outside of this directory, otherwise every build changes the id.
const buildId = getBuildGroupId(__dirname);
const buildRoot = path.resolve(__dirname, '..', 'public', 'build');
const buildPath = path.resolve(buildRoot, buildId);

// A plugin bundle has a single build target, so remove other build directories. The packaging
// script picks one build id deterministically, not "the newest", so stale directories must go.
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
    distPath: {
      root: buildPath,
    },
  },
  plugins: [
    pluginGenerateEntrypoints(),
    pluginWriteBuildId({ buildId }),
    // ... pluginReact(), pluginModuleFederation(...) as in the example bundle
  ],
});
```

#### Step 2: Package the build into the archive

`@pimcore/studio-ui-bundle` ships the packaging script as the `studio-package-build` binary (the file
`bundler/package-build.cjs` in the package). Point it at your build directory and the directory the archive should be
written to. Both paths are resolved relative to the directory `npm run` is executed in:

```json
{
  "scripts": {
    "build": "rsbuild build",
    "package-build": "studio-package-build --build-dir ../public/build --out-dir ../build-dist"
  }
}
```

`npm run build && npm run package-build` then writes `build-dist/build-<id>.zip`. The script keeps an existing archive
with the same id untouched and removes archives of other ids, so `build-dist/` always contains exactly one file.

Ignore the expanded build and commit the archive:

```gitignore
# Expanded frontend build is generated from build-dist/build-<id>.zip, not committed
/public/build/
```

In CI, run the two npm scripts and commit `build-dist/` back to the branch. Because the id is a content hash, the commit
only contains changes when the frontend source actually changed.

You do **not** need `studio-package-build` for Option 1 or Option 2.

#### Step 3: Implement `BuildArchiveProviderInterface`

Replace the plain provider with one that declares the archive. The trait provides `getEntryPointsJsonLocations()` and
`getBuildArchive()`; you only supply the paths:

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

`targetDir` must be the directory that is served at the `assetPrefix` compiled into the build. The service registration
and tags are the same as for a plain provider. The trait receives the extractor through setter autowiring, so the
provider must be an autowired service (`autowire: true`, which is the default in most bundle `services.yaml` files).

#### How extraction works

- **Deployment:** `bin/console cache:warmup` (also run by `cache:clear` and by Pimcore's Composer scripts) extracts the
  archive of every registered `BuildArchiveProviderInterface` into its `targetDir`. This runs while `vendor/` is still
  writable, so read-only production filesystems are supported as long as the cache is warmed during the deploy phase.
  When `assets:install` runs in copy mode, run `cache:warmup` before it so the copied files include the build.
- **Local development:** if the expanded build is missing when Studio is rendered (for example after `git pull` with a
  new archive), the provider extracts it on the fly, provided the filesystem is writable.
- **Manual builds win:** a build produced by `npm run build` or `npm run dev` in the bundle is never overwritten by
  extraction. To go back to the committed archive, delete `public/build/` and warm the cache again.
- **Staleness:** the decision to extract is based on the archive file name (the content hash), never on file
  modification times, so it is stable across checkouts and deployments.
- **Read-only without a build:** `cache:warmup` itself never fails over extraction; it catches any extraction error
  and logs a warning instead, so a read-only deploy does not make the deploy step fail. If warmup could not extract
  the archive and no build is present, the failure instead surfaces the first time Studio resolves entry points at
  request time: `BuildArchiveNotWritableException` is thrown then, with instructions to run `cache:warmup` during
  deployment. Watch for the warmup warning log rather than relying on `cache:warmup` exiting non-zero.

## Summary

| | `WebpackEntryPointProviderInterface` | `BuildArchiveProviderInterface` | `studio-package-build` |
|---|---|---|---|
| Option 1: commit `public/build/` | required | – | – |
| Option 2: build at deploy time | required | – | – |
| Option 3: commit `build-dist/build-<id>.zip` | required (via the trait) | required | required |
