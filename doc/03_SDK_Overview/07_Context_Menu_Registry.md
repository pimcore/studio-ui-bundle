# Context Menu Registry

The Context Menu Registry is a centralized system for managing context menu items in Pimcore Studio UI. It enables developers to register custom menu items for different contexts such as tree nodes, grid rows, and editor toolbars.

Context menu items are organized into **slots**, which are specific locations where menu items can be registered with configurable priorities.

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

## Registering Context Menu Items

Use the `registerToSlot` method to register custom menu items:

```typescript
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type ContextMenuRegistryInterface } from '@Pimcore/modules/app/context-menu-registry/context-menu-registry'
import { contextMenuConfig } from '@Pimcore/modules/app/context-menu-registry/context-menu-config'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'

moduleSystem.registerModule({
  onInit: () => {
    const contextMenuRegistry = container.get<ContextMenuRegistryInterface>(
      serviceIds['App/ContextMenuRegistry/ContextMenuRegistry']
    )

    contextMenuRegistry.registerToSlot(contextMenuConfig.dataObjectTree.name, {
      name: 'customAction',
      priority: contextMenuConfig.dataObjectTree.priority.addObject + 1,
      useMenuItem: (context) => {
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

The [Context Menu Configuration Source](https://github.com/pimcore/studio-ui-bundle/blob/1.x/assets/js/src/core/modules/app/context-menu-registry/context-menu-config.ts) contains all available slot names and their priority configurations for consistent referencing.