---
title: Frontend Build Registration and Distribution
---

# Frontend Build Registration and Distribution

A bundle that ships a Studio UI plugin has to solve two problems:

1. **Registration** – tell Studio where the compiled frontend files are (`WebpackEntryPointProviderInterface`).
2. **Distribution** – get the compiled frontend onto the target installation when the bundle is installed via
   Composer. One of the three options below, a committed archive, uses the opt-in `BuildArchiveProviderInterface`.

## Registering the frontend build

### The `entrypoints.json` manifest

The Rsbuild plugin `pluginGenerateEntrypoints` (from `@pimcore/studio-ui-bundle/rsbuild/plugins`) writes an
`entrypoints.json` manifest into the build output directory. It lists the JS and CSS files of every entry and adds a
synthetic `exposeRemote` entry that registers the bundle's Module Federation remote with Studio.

By convention the output directory is `public/build/<build-id>/` inside the bundle, served by `assets:install` under
`/bundles/<bundlename>/build/<build-id>/`; the `assetPrefix` in `rsbuild.config.ts` must point to that URL (see the
[example Rsbuild configuration](https://github.com/pimcore/studio-example-bundle/blob/main/assets/rsbuild.config.ts)).
A bundle with several build targets sharing one id (such as Studio's own SDK and app builds) uses one suffixed
directory per target, e.g. `<build-id>-app/` and `<build-id>-sdk/`.

### `WebpackEntryPointProviderInterface`

Studio collects all tagged provider services and loads the entries they declare. Implement
`Pimcore\Bundle\StudioUiBundle\Webpack\WebpackEntryPointProviderInterface`:

| Method | Purpose |
|--------|---------|
| `getEntryPointsJsonLocations()` | Absolute paths of the `entrypoints.json` files to read, usually `glob(__DIR__ . '/../../public/build/*/entrypoints.json')`. |
| `getEntryPoints()` | Entries Studio must load. A plugin bundle returns `['exposeRemote']`; the plugin code itself is then loaded through Module Federation. |
| `getOptionalEntryPoints()` | Entries that may be missing from the manifest (e.g. development-only entries). A missing entry that is not optional fails with `InvalidEntryPointsJsonException`. Usually `[]`. |

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

Register the provider in `services.yaml` with one or both tags:

| Tag | Loads the entries into |
|-----|------------------------|
| `pimcore_studio_ui.webpack_entry_point_provider` | The main Studio application. Every plugin that runs there needs this tag. |
| `pimcore_studio_ui.webpack_entry_point_provider.document_editor_iframe` | The document editor iframe, which has its own plugin bootstrap. See [Custom Document Editable](./02_Plugin_Development_Examples/14_Custom_Document_Editable.md) for when a plugin needs it. |

> **Note:** cache warmup (Option 3 below) only discovers providers carrying the main tag. A
> `BuildArchiveProviderInterface` provider registered only with the `.document_editor_iframe` tag is never extracted,
> so archive providers must always carry the main tag as well.

```yaml
services:
    App\Webpack\WebpackEntryPointProvider:
        tags:
            - { name: pimcore_studio_ui.webpack_entry_point_provider }
            # only when required, see the table above:
            - { name: pimcore_studio_ui.webpack_entry_point_provider.document_editor_iframe }
```

A complete working example is the
[Studio Example Bundle](https://github.com/pimcore/studio-example-bundle/blob/main/src/Webpack/WebpackEntryPointProvider.php).

## Distributing the compiled frontend

A bundle installed via Composer must make sure the files referenced by `entrypoints.json` exist on the target
installation. There are three ways to do that.

### Option 1: Commit the expanded build directory

Run `npm run build` and commit `public/build/`. This is what the Studio Example Bundle does and needs nothing beyond a
plain `WebpackEntryPointProviderInterface`. The downside: every build changes the hashed file names, so generated files
accumulate in the repository and merges between branches conflict on build output.

### Option 2: Build during deployment

Commit no build output and run `npm ci && npm run build` for the bundle in the deployment pipeline, before
`assets:install`. Also needs only a plain provider, but requires Node.js on the build host and a build step per bundle.

### Option 3: Commit a single build archive (`BuildArchiveProviderInterface`)

Commit one zip file, `build-dist/build-<id>.zip`, and let Studio extract it into `public/build/` on the target system.
This is how the Studio UI Bundle itself and other Pimcore bundles ship their frontend: no build-output churn in git and
no build step at deploy time.

The mechanism is opt-in and available in Studio UI Bundle 2025.4.9+ and 2026.2.1+ (not in the 2026.1 line). These
classes in `Pimcore\Bundle\StudioUiBundle\Build` are public API:

| Class | Role |
|-------|------|
| `BuildArchiveProviderInterface` | Extends `WebpackEntryPointProviderInterface` with `getBuildArchive(): ?BuildArchive`. |
| `BuildArchive` | Value object: the `archiveGlob` matching the committed zip and the `targetDir` it is extracted into. |
| `BuildArchiveExtractionTrait` | Implements `getBuildArchive()` and `getEntryPointsJsonLocations()`; your provider only implements `buildArchive()` to supply the paths. |

`BuildArchiveExtractor` and `StudioBuildCacheWarmer` are internal; do not call or replace them.

#### Step 1: Build with a content-derived build id

The archive is named after a build id derived from the source tree, so unchanged source yields the same archive name
and no new commit. The id is also written into each output directory as `.build-id`, which the packaging script uses
to find the directories of one build. Use `getBuildGroupId()` and `pluginWriteBuildId` in `rsbuild.config.ts`:

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

#### Step 2: Package the build into the archive

`@pimcore/studio-ui-bundle` ships the packaging script as the `studio-package-build` binary. Point it at the build
directory and the archive directory; both paths are resolved relative to the package directory `npm run` executes in:

```json
{
  "scripts": {
    "build": "rsbuild build",
    "package-build": "studio-package-build --build-dir ../public/build --out-dir ../build-dist"
  }
}
```

`npm run build && npm run package-build` writes `build-dist/build-<id>.zip`. An existing archive with the same id is
left untouched and archives of other ids are removed, so `build-dist/` holds exactly one archive. Ignore the expanded
build and commit the archive:

```gitignore
# Expanded frontend build is generated from build-dist/build-<id>.zip, not committed
/public/build/
```

In CI, run both scripts and commit `build-dist/` back to the branch; there is nothing to commit unless the frontend
source changed. `studio-package-build` is not needed for Option 1 or 2.

#### Step 3: Implement `BuildArchiveProviderInterface`

Replace the plain provider with one that declares the archive; the trait provides the rest:

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

`targetDir` must be the directory served at the `assetPrefix` compiled into the build. Registration and tags are the
same as for a plain provider. The trait receives the extractor through setter autowiring, so the provider must be an
autowired service (`autowire: true`, the default in most bundle `services.yaml` files).

#### How extraction works

- **Deployment:** `bin/console cache:warmup` (or `cache:clear` without `--no-warmup`) extracts the archive of every
  registered `BuildArchiveProviderInterface` into its `targetDir`. Run it during the deploy phase while `vendor/` is
  still writable; read-only production filesystems are then fully supported. Pimcore's Composer scripts run
  `cache:clear --no-warmup` by default and therefore do not extract, so add an explicit `cache:warmup` to the
  deployment. When `assets:install` runs in copy mode, warm the cache before it.
- **Local development:** if the expanded build is missing when Studio resolves entry points (e.g. after `git pull`
  with a new archive), the provider extracts it on the fly, provided the filesystem is writable.
- **Manual builds win:** a build produced by `npm run build` or `npm run dev` (which `pluginWriteBuildId` marks as
  developer-owned) is never overwritten by extraction. To return to the committed archive, delete `public/build/` and
  warm the cache again.
- **Staleness** is decided by the archive file name (a content hash), never by file modification times.
- **Read-only without a build:** `cache:warmup` never fails over extraction; it logs a warning and continues. If no
  build is present at request time and the target is not writable, `BuildArchiveNotWritableException` is thrown then,
  telling you to run `cache:warmup` during deployment. Watch the warmup log rather than the command's exit code.

## Summary

| | `WebpackEntryPointProviderInterface` | `BuildArchiveProviderInterface` | `studio-package-build` |
|---|---|---|---|
| Option 1: commit `public/build/` | required | – | – |
| Option 2: build at deploy time | required | – | – |
| Option 3: commit `build-dist/build-<id>.zip` | required (via the trait) | required | required |
