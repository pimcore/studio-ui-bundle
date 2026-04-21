---
title: How to Add a Custom Grid Column
---

# How to Add a Custom Grid Column

## Overview

This example adds a custom progress bar column to the Pimcore
Studio grid. Custom grid columns display element data using a
custom cell renderer that goes beyond the built-in frontend types
(input, checkbox, select, etc.).

## Files Overview

| Layer | File | Purpose |
|---|---|---|
| Backend | [ProgressBarDefinition.php] | Column definition |
| Backend | [ProgressBarResolver.php] | Column value resolver |
| Backend | [ProgressBarCollector.php] | Available columns provider |
| Backend | [services.yaml] | Service registration |
| UI | [progress-bar-cell.tsx] | React cell component |
| UI | [dynamic-type-grid-cell-progress-bar.tsx] | Grid cell dynamic type |
| UI | [progress-bar-grid-column-module.tsx] | Registry module |
| UI | [index.ts] | Plugin entry point |
| UI | [plugins.ts] | Plugin export |

[ProgressBarDefinition.php]: https://github.com/pimcore/studio-example-bundle/blob/main/src/Grid/Column/Definition/ProgressBarDefinition.php
[ProgressBarResolver.php]: https://github.com/pimcore/studio-example-bundle/blob/main/src/Grid/Column/Resolver/ProgressBarResolver.php
[ProgressBarCollector.php]: https://github.com/pimcore/studio-example-bundle/blob/main/src/Grid/Column/Collector/ProgressBarCollector.php
[services.yaml]: https://github.com/pimcore/studio-example-bundle/blob/main/config/services.yaml
[progress-bar-cell.tsx]: https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/examples/custom-grid-column/components/progress-bar-cell.tsx
[dynamic-type-grid-cell-progress-bar.tsx]: https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/examples/custom-grid-column/dynamic-types/definitions/dynamic-type-grid-cell-progress-bar.tsx
[progress-bar-grid-column-module.tsx]: https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/examples/custom-grid-column/modules/progress-bar-grid-column-module.tsx
[index.ts]: https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/examples/custom-grid-column/index.ts
[plugins.ts]: https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/plugins.ts

## Details

Adding a custom grid column with a custom cell renderer requires
work across two layers:

**Studio Backend:**
- A `ColumnDefinitionInterface` tagged with
  `pimcore.studio_backend.grid_column_definition` that declares the
  column type and returns a custom `getFrontendType()` value
- A `ColumnResolverInterface` tagged with
  `pimcore.studio_backend.grid_column_resolver` that fetches the
  column value for each element
- A `ColumnCollectorInterface` tagged with
  `pimcore.studio_backend.grid_column_collector` that lists the
  column in available configurations

**Studio UI (Frontend):**
- A `DynamicTypeGridCellAbstract` subclass whose `id` matches the
  backend `getFrontendType()` return value
- A React component for the custom cell rendering
- Registration of the dynamic type via a module and plugin

The `getFrontendType()` string is the key that connects backend
and frontend. If you use a built-in frontend type (e.g. `input`,
`checkbox`, `select`), no frontend work is needed.

For the step-by-step guide, see
[Custom Grid Columns](https://github.com/pimcore/pimcore/blob/2026.x/doc/10_Extending_Pimcore/03_Custom_Extension_Guides/11_Custom_Grid_Columns.md)
in the Pimcore core documentation. For backend details
(interfaces, constructor signatures, predefined columns,
transformers), see
[Extending Grid with Custom Columns](https://github.com/pimcore/studio-backend-bundle/blob/1.x/doc/03_Extending/08_Extending_Grid_with_Custom_Columns.md)
in the Studio Backend documentation.
