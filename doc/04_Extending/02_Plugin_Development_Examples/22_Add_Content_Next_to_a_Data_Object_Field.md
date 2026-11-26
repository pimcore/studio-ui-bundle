---
title: How to Add Content Next to a Data Object Field
---

# How to Add Content Next to a Data Object Field

## Overview

This example shows a value resolved by your own application logic next to a field of the data object
edit form, without overriding the field's dynamic type:

```
Warranty
[ 5        ]  Manufacturer: 3 years
```

The same extension points suit comparable needs: a value from an external system (ERP, supplier feed)
to compare against, a data quality hint, or an action for a single field (translate, copy from the
parent, open the source object).

## Extension points

Every data field of the edit form renders three component registry slots:

| Name | Placement |
|---|---|
| `dataObject.editor.field.after` | On the row of the control, right after it. A control that takes the full width pushes the content to the next line. |
| `dataObject.editor.field.below` | Under the control. |
| `dataObject.editor.field.label` | At the end of the label row, after the label and everything Studio adds to it (required mark, restore inheritance action). |

Studio takes care of the layout and keeps the field bound to the form, so your component only renders
its own content. The slots are rendered for the fields inside object bricks, field collections, blocks,
classification stores and localized fields too, but not for those containers themselves.

A slot is only rendered for a field when at least one component is registered to it, so a field nobody
extends renders exactly as before.

## Field context

Each registered component receives the `DataObjectFieldAddonProps` of the field it is rendered for:

| Prop | Description |
|---|---|
| `objectId` | ID of the object being edited. |
| `className` | Name of the object's class. |
| `fieldDefinition` | Definition of the field, e.g. `name`, `title` and `fieldtype`. |
| `fieldPath` | Path from the object down to the field, e.g. `['attributes', 'Dimensions', 'height']` for a field of an object brick, `['localizedfields', 'name']` for a localized field or `['features', 0, 'Color', 'hue']` for a field of a field collection item. |
| `locale` | Locale of the value, set for a field inside localized fields. |

The same component is rendered for every field, so it decides from these props whether it applies and
returns `null` otherwise.

## Details

### The addon component

```tsx
import React from 'react'
import { type DataObjectFieldAddonProps } from '@pimcore/studio-ui-bundle/modules/data-object'

export const ManufacturerWarranty = ({ className, fieldPath }: DataObjectFieldAddonProps): React.JSX.Element | null => {
  // only the warranty of the Product class, inside any of its object bricks
  if (className !== 'Product' || fieldPath.at(-1) !== 'warranty') {
    return null
  }

  return <span>Manufacturer: 3 years</span>
}
```

Fetch the resolved value with your own API endpoint, e.g. through RTK Query, keyed by `objectId` and
`fieldPath`.

### Registering the component

Register the component in a module of your plugin:

```typescript
import { container, type AbstractModule } from '@pimcore/studio-ui-bundle'
import { serviceIds } from '@pimcore/studio-ui-bundle/app'
import { componentConfig, type ComponentRegistry } from '@pimcore/studio-ui-bundle/modules/app'
import { ManufacturerWarranty } from './manufacturer-warranty'

export const FieldAddonModule: AbstractModule = {
  onInit: (): void => {
    const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])

    componentRegistry.registerToSlot(componentConfig.dataObject.editor.field.after.name, {
      name: 'manufacturerWarranty',
      component: ManufacturerWarranty
    })
  }
}
```

Use `componentConfig.dataObject.editor.field.below.name` or `componentConfig.dataObject.editor.field.label.name`
to place the content under the control or in the label row instead. Several components can be registered
to the same slot; `priority` orders them, lower values first.
