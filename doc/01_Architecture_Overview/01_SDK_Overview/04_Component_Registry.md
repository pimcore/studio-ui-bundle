---
title: Component Registry
---

# Component Registry

The Component Registry is a centralized system for managing React UI components in Pimcore Studio.
It defines which components are rendered in specific contexts or for particular purposes.
Developers can exchange components in plugins or dynamically register additional items in slots,
enabling customization and extension of the UI.

Components in the registry are categorized as **single components** or **slots**.
Single components cover scenarios where one component is rendered;
slots handle locations where multiple components are needed.

## Single Components

Single components are unique and can only be registered once in the registry.
They are typically used for standalone UI elements.
Attempting to register a single component with the same name twice results in an error
unless the `override` method is used.

### Example - Overriding a Single Component

The `override` method replaces an existing single component with a new implementation.
This is useful for customizing or extending the behavior of default components.

#### Example
```typescript
import { container } from '@pimcore/studio-ui-bundle'
import { serviceIds } from '@pimcore/studio-ui-bundle/app'
import { componentConfig, type ComponentRegistry } from '@pimcore/studio-ui-bundle/modules/app'
...

componentRegistry.override({
  name: componentConfig.asset.editor.container.name,
  component: CustomAssetEditorContainer
})
```

In this example, the default `AssetEditorContainer` component is replaced with `CustomAssetEditorContainer`.
The new component is used wherever `asset.editor.container` is rendered.

## Slots

Slots are placeholders for multiple components. Register multiple components under a single slot name,
with optional priorities to control rendering order.

### Example
```typescript
componentRegistry.registerToSlot(componentConfig.asset.editor.toolbar.slots.left.name, {
  name: 'customToolbarButton',
  component: CustomToolbarButton,
  priority: 50
})
```

In this example, `customToolbarButton` is added to the `asset.editor.toolbar.slots.left` slot
with a priority of 50. This slot holds toolbar buttons on the **left side** of the asset editor toolbar.
Components with lower priority values are rendered first.

## Configuration

The Component Registry uses a configuration object to define the structure and types of components.
This configuration ensures that components are registered in the correct context (single or slot).

### Default Configuration

The default configuration is defined in
[`component-config.ts`](https://github.com/pimcore/studio-ui-bundle/blob/1.x/assets/js/src/core/modules/app/component-registry/component-config.ts).
It organizes components into a hierarchical structure based on their context,
such as `asset`, `dataObject`, or `wysiwyg`.

### Example Configuration
```typescript
const defaultComponentConfig = {
  asset: {
    editor: {
      container: { type: ComponentType.SINGLE, name: 'asset.editor.container' },
      toolbar: {
        slots: {
          left: {
            type: ComponentType.SLOT,
            name: 'asset.editor.toolbar.slots.left',
            defaultEntries: [
              { name: 'contextMenu', priority: 100 }
            ]
          }
        }
      }
    }
  }
}
```

### Extending the Configuration

Extend the default configuration by registering additional components or slots dynamically.
Use the `registerConfig` method to add new entries.

### Example
```typescript
componentRegistry.registerConfig({
  customModule: {
    editor: {
      toolbar: {
        slots: {
          customSlot: {
            type: ComponentType.SLOT,
            name: 'customModule.editor.toolbar.slots.customSlot'
          }
        }
      }
    }
  }
})
```

Refer to the [Component Configuration Source](https://github.com/pimcore/studio-ui-bundle/blob/1.x/assets/js/src/core/modules/app/component-registry/component-config.ts)
for the complete default configuration and available single components and slots.
This file lists the extension points available in Pimcore Studio via the component registry.

## Full Example

For a complete working example, refer to the [Add an Additional Asset Editor Toolbar Button Example](../../04_Extending/02_Plugin_Development_Examples/03_Add_Additional_Asset_Editor_Toolbar_Button.md).
