---
title: Context Menu Registry
---

# Context Menu Registry

The Context Menu Registry is a centralized system for managing context menu items in Pimcore Studio. It enables developers to register custom menu items for different contexts such as tree nodes, grid rows, and editor toolbars.

Context menu items are organized into **slots** - specific locations where you register menu items with configurable priorities.

## Available Context Menu Slots

### Tree Context Menus
- **`document.tree`** - Document tree right-click menu
- **`asset.tree`** - Asset tree right-click menu  
- **`data-object.tree`** - Data Object tree right-click menu

### Editor Toolbar Context Menus
- **`document.editor.toolbar`** - Document editor toolbar context menu
- **`data-object.editor.toolbar`** - Data Object editor toolbar context menu
- **`asset.editor.toolbar`** - Asset editor toolbar context menu

### List Grid Context Menus
- **`data-object.list-grid`** - Data Object list view right-click menu
- **`asset.list-grid`** - Asset list view right-click menu
- **`asset.preview-card`** - Asset folder preview card context menu

### Application Menus
- **`user-menu`** - The user menu behind the avatar in the left sidebar

Unlike the slots above, `user-menu` takes no context — pass `{}`. Every row below the username header is a provider: `notifications` (100), `myProfile` (200) and `logout` (9999). Logout's priority is deliberately above the registry's `?? 999` fallback, so a provider registered without a priority still sorts before it.

Providers must be registered in a module's `onInit`. `useContextMenuSlot` calls each `useMenuItem()` in slot order, so registering after first render changes React's hook order for the menu.

To hide a built-in entry, override it with a provider that returns `null`:

```typescript
contextMenuRegistry.overrideSlotProvider(contextMenuConfig.userMenu.name, {
  name: 'logout',
  priority: contextMenuConfig.userMenu.priority.logout,
  useMenuItem: () => null
})
```

## Registering Context Menu Items

Use the `registerToSlot` method to register custom menu items:

```typescript
import { container } from '@pimcore/studio-ui-bundle'
import { serviceIds } from '@pimcore/studio-ui-bundle/app'
import { contextMenuConfig, type ContextMenuRegistryInterface, type DataObjectTreeContextMenuProps } from '@pimcore/studio-ui-bundle/modules/app'

const contextMenuRegistry = container.get<ContextMenuRegistryInterface>(
  serviceIds['App/ContextMenuRegistry/ContextMenuRegistry']
)

contextMenuRegistry.registerToSlot(contextMenuConfig.dataObjectTree.name, {
  name: 'customAction',
  priority: contextMenuConfig.dataObjectTree.priority.addObject + 1,
  useMenuItem: (context: DataObjectTreeContextMenuProps) => {
    const { t } = useTranslation()


    return {
      label: t('custom.action.label'),
      key: 'customAction',
      icon: <Icon value='custom-icon' />,
      onClick: () => {
        // Perform custom action
      }
    }
  }
})
```

## Priority System

Menu items are ordered by priority values (lower numbers appear first). Use the `contextMenuConfig` to reference slot names and priority values:

```typescript
// Reference slot names
contextMenuRegistry.registerToSlot(contextMenuConfig.assetListGrid.name, {
  // Use existing priority as base
  priority: contextMenuConfig.assetListGrid.priority.download + 1,
  // ...
})
```

The [Context Menu Configuration Source](https://github.com/pimcore/studio-ui-bundle/blob/2026.x/assets/js/src/core/modules/app/context-menu-registry/context-menu-config.ts) contains all available slot names and their priority configurations for consistent referencing.

## Modifying Existing Context Menu Items

### Override a Provider Completely

Use `overrideSlotProvider` to completely replace an existing context menu provider:

```typescript
contextMenuRegistry.overrideSlotProvider(contextMenuConfig.dataObjectTree.name, {
  name: 'delete', // Must match existing provider name
  priority: 100,
  useMenuItem: (context: DataObjectTreeContextMenuProps) => {
    return {
      label: 'Custom Delete',
      key: 'delete',
      icon: <Icon value='trash' />,
      onClick: () => {
        // Custom delete logic
      }
    }
  }
})
```

### Update a Provider Partially

Use `updateSlotProvider` to modify specific properties of an existing provider using a closure:

```typescript
// Modify the menu item based on existing provider
contextMenuRegistry.updateSlotProvider(
  contextMenuConfig.dataObjectTree.name,
  'delete',
  (provider) => ({
    ...provider,
    useMenuItem: (context: DataObjectTreeContextMenuProps) => {
      const originalItem = provider.useMenuItem(context)
      
      return originalItem === null ? null : {
        ...originalItem,
        label: 'Custom Delete Label'
      }
    }
  })
)
```

## Full Example

For a complete working example, refer to the [Customize Context Menus Example](../../04_Extending/02_Plugin_Development_Examples/09_Customize_Context_Menus.md).