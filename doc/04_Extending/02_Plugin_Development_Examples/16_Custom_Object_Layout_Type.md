---
title: How to Add a Custom Object Layout Type
---

# How to Add a Custom Object Layout Type

## Overview

This example adds a custom `simpleTextLayout` layout type to
Pimcore Studio. Custom layout types appear in the class definition
editor's "Add Layout Component" dropdown and render as structural
containers in the data object editor.

Unlike data types, layout types do **not** require GDI adapters,
Studio Backend data adapters, or grid column definitions - they are
purely structural.

## Files Overview

| Layer | File | Purpose |
|---|---|---|
| Core | [SimpleTextLayout.php] | Layout class |
| Core | [config.yaml] | Layout type registration |
| Studio UI | [dynamic-type-object-layout-simple-text-layout.tsx] | Object editor rendering |
| Studio UI | [dynamic-type-field-definition-simple-text-layout.tsx] | Class editor |
| Studio UI | [simple-text-layout-module.tsx] | Registry registration |
| Studio UI | [index.ts] | Plugin entry point |
| Studio UI | [plugins.ts] | Plugin export |

[SimpleTextLayout.php]: https://github.com/pimcore/studio-example-bundle/blob/main/src/Model/DataObject/ClassDefinition/Layout/SimpleTextLayout.php
[config.yaml]: https://github.com/pimcore/studio-example-bundle/blob/main/config/pimcore/config.yaml
[dynamic-type-object-layout-simple-text-layout.tsx]: https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/examples/custom-object-layout-type/dynamic-types/definitions/dynamic-type-object-layout-simple-text-layout.tsx
[dynamic-type-field-definition-simple-text-layout.tsx]: https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/examples/custom-object-layout-type/dynamic-types/definitions/dynamic-type-field-definition-simple-text-layout.tsx
[simple-text-layout-module.tsx]: https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/examples/custom-object-layout-type/modules/simple-text-layout-module.tsx
[index.ts]: https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/examples/custom-object-layout-type/index.ts
[plugins.ts]: https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/plugins.ts

## Details

Adding a custom layout type requires registration across two
layers:

**Pimcore Core:**
- A layout class extending
  `Pimcore\Model\DataObject\ClassDefinition\Layout`
- Registration via `pimcore.objects.class_definitions.layout.map`

**Studio UI (Frontend):**
- A `DynamicTypeObjectLayoutAbstract` subclass for the data object
  editor, rendering the layout container
- A `DynamicTypeFieldDefinitionLayoutAbstract` subclass for the
  class definition editor
- Registration of both types via a module and plugin

The example implements `simpleTextLayout` as a minimal layout that
renders HTML content, demonstrating the full pattern without
additional complexity.

For the step-by-step guide, see
[Adding Object Layout Types](https://github.com/pimcore/pimcore/blob/2026.x/doc/10_Extending_Pimcore/03_Custom_Extension_Guides/05_Adding_Object_Layout_Types.md)
in the Pimcore core documentation.
