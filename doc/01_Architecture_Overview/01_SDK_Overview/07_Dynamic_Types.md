---
title: Dynamic Types
---

# Dynamic Types

## Introduction

Dynamic types define how different parts of the Pimcore Studio application behave.
Each dynamic type has an abstract base class that serves as a blueprint for all subtypes,
outlining the structure and implementation details required for specific use cases.

## Common Use Cases

### Object Data Types and Layout Types
For data objects, dynamic types define the different data and layout types and how the application
handles them. They serve as boilerplate for creating or extending types by covering all
implementation details, from the edit view to versions and listings.

#### Source
  - [Data types](https://github.com/pimcore/studio-ui-bundle/tree/1.x/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related)
  - [Layout types](https://github.com/pimcore/studio-ui-bundle/tree/1.x/assets/js/src/core/modules/element/dynamic-types/definitions/objects/layout-related)

### Meta-Data
Dynamic types define how asset metadata appears in different views,
such as grids and version comparisons.

#### Source
  - [Meta-data](https://github.com/pimcore/studio-ui-bundle/tree/1.x/assets/js/src/core/modules/element/dynamic-types/definitions/meta-data)

### Grid-Cells
For grid cells, dynamic types describe how each cell renders its value and whether it supports
inline editing. Grid cell types range from simple text to images and other complex types.

#### Source
- [Grid cells](https://github.com/pimcore/studio-ui-bundle/tree/1.x/assets/js/src/core/modules/element/dynamic-types/definitions/grid-cell)

### Assets
Defines which asset types (image, audio, folder, etc.) are available in Pimcore Studio.

#### Source

- [Assets](https://github.com/pimcore/studio-ui-bundle/tree/1.x/assets/js/src/core/modules/element/dynamic-types/definitions/asset)

### Batch-Edit
In the context of batch editing, dynamic types specify how form fields should behave.

#### Source

- [Batch-edit](https://github.com/pimcore/studio-ui-bundle/tree/1.x/assets/js/src/core/modules/element/dynamic-types/definitions/batch-edits)

### Field-Filters
Dynamic types define filter behavior within grids,
mapping each data or asset metadata type to a suitable filter UI component.

#### Source

- [Field-filters](https://github.com/pimcore/studio-ui-bundle/tree/1.x/assets/js/src/core/modules/element/dynamic-types/definitions/field-filters)

## Overriding Dynamic Types

Override dynamic types from plugins by rebinding them in the DI container.
This allows defining new behaviors and customizing the application for specific requirements.
