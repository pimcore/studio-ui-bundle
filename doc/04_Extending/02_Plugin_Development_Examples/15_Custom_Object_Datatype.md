---
title: How to Add a Custom Object Datatype
---

# How to Add a Custom Object Datatype

## Overview

This example adds a custom `simpleText` data object field type to
Pimcore Studio. Custom datatypes appear in the class definition
editor's field type dropdown and render as editable fields in the
data object editor and grid.

## Files Overview

| Layer | File | Purpose |
|---|---|---|
| Core | [SimpleText.php] | Field definition class |
| Core | [config.yaml] | Field type registration |
| GDI | [generic-data-index.yaml] | Search index adapter |
| Studio Backend | [studio_backend.yaml] | Data adapter mapping |
| Studio Backend | [SimpleTextDefinition.php] | Grid column definition |
| Studio Backend | [PimcoreStudioExampleExtension.php] | Config loading |
| Studio Backend | [services.yaml] | Service registrations |
| Studio UI | [dynamic-type-object-data-simple-text.tsx] | Object editor + grid |
| Studio UI | [dynamic-type-field-definition-simple-text.tsx] | Class editor |
| Studio UI | [simple-text-datatype-module.tsx] | Registry registration |
| Studio UI | [index.ts] | Plugin entry point |
| Studio UI | [plugins.ts] | Plugin export |

[SimpleText.php]: https://github.com/pimcore/studio-example-bundle/blob/main/src/Model/DataObject/ClassDefinition/Data/SimpleText.php
[config.yaml]: https://github.com/pimcore/studio-example-bundle/blob/main/config/pimcore/config.yaml
[generic-data-index.yaml]: https://github.com/pimcore/studio-example-bundle/blob/main/config/generic-data-index.yaml
[studio_backend.yaml]: https://github.com/pimcore/studio-example-bundle/blob/main/config/pimcore/studio_backend.yaml
[SimpleTextDefinition.php]: https://github.com/pimcore/studio-example-bundle/blob/main/src/Grid/Column/Definition/SimpleTextDefinition.php
[PimcoreStudioExampleExtension.php]: https://github.com/pimcore/studio-example-bundle/blob/main/src/DependencyInjection/PimcoreStudioExampleExtension.php
[services.yaml]: https://github.com/pimcore/studio-example-bundle/blob/main/config/services.yaml
[dynamic-type-object-data-simple-text.tsx]: https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/examples/custom-object-datatype/dynamic-types/definitions/dynamic-type-object-data-simple-text.tsx
[dynamic-type-field-definition-simple-text.tsx]: https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/examples/custom-object-datatype/dynamic-types/definitions/dynamic-type-field-definition-simple-text.tsx
[simple-text-datatype-module.tsx]: https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/examples/custom-object-datatype/modules/simple-text-datatype-module.tsx
[index.ts]: https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/examples/custom-object-datatype/index.ts
[plugins.ts]: https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/plugins.ts

## Details

Adding a custom object datatype requires registration across four
layers:

**Pimcore Core:**
- A field definition class extending
  `Pimcore\Model\DataObject\ClassDefinition\Data`
- Registration via `pimcore.objects.class_definitions.data.map`

**Generic Data Index:**
- A field definition adapter tagged with
  `pimcore.generic_data_index.data-object.search_index_field_definition`
  for search index support (reuses `TextKeywordAdapter` for text
  fields)

**Studio Backend:**
- A data adapter mapping via
  `pimcore_studio_backend.data_object_data_adapter_mapping` for
  save/load (reuses `StringAdapter` for text fields)
- A `ColumnDefinitionInterface` tagged with
  `pimcore.studio_backend.grid_column_definition` for data object
  grid column and filter support

**Studio UI (Frontend):**
- A `DynamicTypeObjectDataAbstractInput` subclass for the data
  object editor and grid, with `dynamicTypeFieldFilterType` set for
  grid filter support
- A `DynamicTypeFieldDefinitionDataAbstract` subclass for the class
  definition editor
- Registration of both types via a module and plugin

The example implements `simpleText` as a simple text input,
demonstrating the full pattern without additional complexity.

For the step-by-step guide, see
[Adding Object Datatypes](https://github.com/pimcore/pimcore/blob/2026.x/doc/10_Extending_Pimcore/03_Custom_Extension_Guides/04_Adding_Object_Datatypes.md)
in the Pimcore core documentation.
