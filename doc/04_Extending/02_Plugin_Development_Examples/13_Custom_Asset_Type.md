---
title: How to Add a Custom Asset Type
---

# How to Add a Custom Asset Type

## Overview

This example adds a custom `indesign` asset type to Pimcore Studio. When users upload
`.indd` files, they are automatically detected as InDesign assets and open with a dedicated
editor showing Custom Metadata, Properties, Versions, and other standard tabs.

## Details

Adding a custom asset type requires both a PHP backend and a Pimcore Studio frontend plugin:

**Backend (PHP):**
- An asset model class extending `Pimcore\Model\Asset` (or a specific subtype)
- Registration via `pimcore.assets.type_definitions.map` configuration with filename matching patterns
- No database migration needed - the `assets.type` column is `varchar(20)`

**Frontend (Studio Plugin):**
- A `TabManager` subclass that defines the editor type
- Registration in the `Asset/Editor/TypeRegistry` with the asset type name and tab manager service ID
- Tab registration (Custom Metadata, Properties, Versions, Dependencies, Notes & Events, Tags, Workflow)

Unlike custom document types, asset types do not need a sidebar manager or context menu
registration - assets are typed automatically based on filename matching patterns.

For the full backend + frontend guide, see the
[Adding Asset Types](https://github.com/pimcore/pimcore/blob/2026.x/doc/10_Extending_Pimcore/03_Custom_Extension_Guides/01_Adding_Asset_Types.md)
documentation in the Pimcore core.

## Code Example on GitHub

> [Custom Asset Type example on GitHub](https://github.com/pimcore/studio-example-bundle/tree/main/assets/js/src/examples/custom-asset-type).

- [Plugin entry (index.ts)](https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/examples/custom-asset-type/index.ts) - binds TabManager and registers the module
- [Module (indesign-asset-module.tsx)](https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/examples/custom-asset-type/modules/indesign-asset-module.tsx) - registers type, tabs, and context menu
- [TabManager (indesign-tab-manager.ts)](https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/examples/custom-asset-type/asset/editor/types/indesign/tab-manager/indesign-tab-manager.ts) - extends `TabManager` with `type = 'indesign'`
