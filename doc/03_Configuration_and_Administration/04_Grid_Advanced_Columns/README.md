---
title: Grid Advanced Columns
---

# Grid Advanced Columns

**Advanced Columns** (`dataobject.advanced`) let you build custom Data Object grid
columns that combine one or more data sources and pass them through *transformers*
before the value is displayed.

- **Data sources** declare what to read from the object:
  - `simpleField` – a getter on the object
  - `relationField` – a value resolved through a relation
  - `staticText` – a fixed text value
- **Transformers** post-process the collected values, e.g. *Combine*, *Change Case*,
  *Blur*, *Anonymizer*, *Translate*, *PHP Code*, and the **Twig Operator**.

## Table of Contents

- [Twig Operator](./01_Twig_Operator.md) – render a Twig template over the column's values

> For the full backend reference of advanced columns and every transformer (including
> the complete Twig sandbox policy), see
> [Grid](https://github.com/pimcore/studio-backend-bundle/blob/2026.x/doc/01_Architecture_Overview/01_Grid.md)
> in the Studio Backend bundle. To add your own column types, see
> [How to Add a Custom Grid Column](../../04_Extending/02_Plugin_Development_Examples/18_Custom_Grid_Column.md).
