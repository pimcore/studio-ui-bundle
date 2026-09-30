---
title: Registering the Frontend Build
---

# Registering the Frontend Build

Studio loads a bundle's compiled frontend through the `entrypoints.json` manifest written by the build. The bundle
registers that manifest with a `WebpackEntryPointProviderInterface` service. This page describes the provider contract
and the service tags. If you prefer to keep the build in git as one zip archive instead of committing every generated
file, see [Shipping the Frontend Build as an Archive](./04_Shipping_the_Frontend_Build_as_an_Archive.md).

## The `entrypoints.json` manifest

The Rsbuild plugin `pluginGenerateEntrypoints` (from `@pimcore/studio-ui-bundle/rsbuild/plugins`) writes
`entrypoints.json` into the build output directory. It lists the JS and CSS files of every entry and adds a synthetic
`exposeRemote` entry that registers the bundle's Module Federation remote with Studio.

The output directory is `public/build/<build-id>/` inside the bundle, served by `assets:install` under
`/bundles/<bundlename>/build/<build-id>/`. The `assetPrefix` in `rsbuild.config.ts` must point to that URL (see the
[example Rsbuild configuration](https://github.com/pimcore/studio-example-bundle/blob/main/assets/rsbuild.config.ts)).

## The provider

Implement `Pimcore\Bundle\StudioUiBundle\Webpack\WebpackEntryPointProviderInterface`:

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

## Service tags

Register the provider in `services.yaml`. Studio collects all tagged providers and loads the entries they declare.

| Tag | Loads the entries into |
|-----|------------------------|
| `pimcore_studio_ui.webpack_entry_point_provider` | The main Studio application. Every plugin needs this tag. |
| `pimcore_studio_ui.webpack_entry_point_provider.document_editor_iframe` | The document editor iframe, which has its own plugin bootstrap. Only needed by plugins that run there, see [Custom Document Editable](./02_Plugin_Development_Examples/14_Custom_Document_Editable.md). |

```yaml
services:
    App\Webpack\WebpackEntryPointProvider:
        tags:
            - { name: pimcore_studio_ui.webpack_entry_point_provider }
            # only for plugins that run inside the document editor iframe:
            - { name: pimcore_studio_ui.webpack_entry_point_provider.document_editor_iframe }
```

A complete working example is the
[Studio Example Bundle](https://github.com/pimcore/studio-example-bundle/blob/main/config/services.yaml). Its provider
ships the build as an archive, so the class itself follows
[Shipping the Frontend Build as an Archive](./04_Shipping_the_Frontend_Build_as_an_Archive.md) rather than the plain
provider above; the service registration and the tags are the same either way.
