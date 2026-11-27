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

## Replacing data object save buttons

A bundle can replace the `saveButtons` entry in the data object editor's right toolbar slot.
Choose one of the implementations below and save it as `components/save-buttons/save-buttons.tsx`.
Both use the public `useDataObjectEditorSave` hook to reuse native persistence, validation,
versioning, properties, schedules and save feedback.

### Register the replacement

Export this plugin from your bundle's `plugins.ts`. Its module replaces only the save-button entry;
other toolbar components, such as the workflow menu, stay registered.

```ts
import { container, type AbstractModule, type IAbstractPlugin } from '@pimcore/studio-ui-bundle'
import { serviceIds } from '@pimcore/studio-ui-bundle/app'
import { componentConfig, type ComponentRegistryInterface } from '@pimcore/studio-ui-bundle/modules/app'
import { CustomSaveButtons } from './components/save-buttons/save-buttons'

const SaveToolbarModule: AbstractModule = {
  onInit: (): void => {
    const registry = container.get<ComponentRegistryInterface>(
      serviceIds['App/ComponentRegistry/ComponentRegistry']
    )
    registry.overrideSlotComponent(componentConfig.dataObject.editor.toolbar.slots.right.name, {
      name: 'saveButtons',
      priority: 200,
      component: CustomSaveButtons
    })
  }
}

export const SaveToolbarPlugin: IAbstractPlugin = {
  name: 'CustomSaveToolbar',
  onStartup: ({ moduleSystem }): void => {
    moduleSystem.registerModule(SaveToolbarModule)
  }
}
```

### Example 1: Save only

For data-entry interfaces that do not offer publishing, show a single Save button. It writes the
current data with normal version history and does not explicitly change the publication flag.
The button is offered only when the user has Save permission.

```tsx
import React, { useContext } from 'react'
import { useTranslation } from '@pimcore/studio-ui-bundle/app'
import { Button } from '@pimcore/studio-ui-bundle/components'
import {
  DataObjectContext, SaveTaskType, useDataObjectDraft, useDataObjectEditorSave
} from '@pimcore/studio-ui-bundle/modules/data-object'
import { checkElementPermission } from '@pimcore/studio-ui-bundle/modules/element'

export const CustomSaveButtons = (): React.JSX.Element | null => {
  const { t } = useTranslation()
  const { id } = useContext(DataObjectContext)
  const { dataObject } = useDataObjectDraft(id)
  const { save, isLoading, savedTask } = useDataObjectEditorSave()

  if (!checkElementPermission(dataObject?.permissions, 'save')) return null

  return (
    <Button
      disabled={ isLoading }
      loading={ isLoading }
      onClick={ () => { void save(SaveTaskType.Save) } }
      success={ savedTask === SaveTaskType.Save }
      type="primary"
    >
      {t('toolbar.save')}
    </Button>
  )
}
```

### Example 2: Save with a Publish dropdown

For unpublished objects, offer Save with Save & Publish in a dropdown when both permissions are
available. For published objects with Publish permission, make Save & Publish the primary action.
Users with only Save permission get ordinary Save, including on published objects; this directly
updates their current data. Users with only Publish permission get Save & Publish. Folders offer
Save when permitted.

Use this component instead of Example 1; the registration above stays the same.

```tsx
import React, { useContext } from 'react'
import { useTranslation } from '@pimcore/studio-ui-bundle/app'
import { Button, ButtonGroup, Dropdown, IconButton } from '@pimcore/studio-ui-bundle/components'
import {
  DataObjectContext, SaveTaskType, useDataObjectDraft, useDataObjectEditorSave
} from '@pimcore/studio-ui-bundle/modules/data-object'
import { checkElementPermission, UnpublishedLabel } from '@pimcore/studio-ui-bundle/modules/element'

export const CustomSaveButtons = (): React.JSX.Element | null => {
  const { t } = useTranslation()
  const { id } = useContext(DataObjectContext)
  const { dataObject, publishDraft } = useDataObjectDraft(id)
  const { save, isLoading, savedTask } = useDataObjectEditorSave()
  const canSave = checkElementPermission(dataObject?.permissions, 'save')
  const canPublish = dataObject?.type !== 'folder' &&
    checkElementPermission(dataObject?.permissions, 'publish')

  if (!canSave && !canPublish) return null

  const primaryTask = canPublish && (dataObject?.published === true || !canSave)
    ? SaveTaskType.Publish
    : SaveTaskType.Save
  const label = t(primaryTask === SaveTaskType.Publish ? 'toolbar.save-and-publish' : 'toolbar.save')
  const handleSave = (task: SaveTaskType): void => {
    void save(task, () => {
      if (task === SaveTaskType.Publish) publishDraft()
    })
  }
  const buttons = [
    <Button
      disabled={ isLoading }
      key="save"
      loading={ isLoading }
      onClick={ () => { handleSave(primaryTask) } }
      success={ savedTask === primaryTask }
      type="primary"
    >
      {label}
    </Button>
  ]

  if (dataObject?.published === false && canSave && canPublish) {
    buttons.push(
      <Dropdown
        disabled={ isLoading }
        key="publish-menu"
        menu={ {
          items: [{
            key: 'publish',
            label: t('toolbar.save-and-publish'),
            disabled: isLoading,
            onClick: () => { handleSave(SaveTaskType.Publish) }
          }]
        } }
        trigger={ ['click'] }
      >
        <IconButton
          aria-label={ t('more-actions') }
          disabled={ isLoading }
          icon={ { value: 'chevron-down' } }
          tooltip={ { title: t('more-actions'), placement: 'left' } }
          type="primary"
        />
      </Dropdown>
    )
  }

  return (
    <>
      <UnpublishedLabel published={ dataObject?.published } />
      <ButtonGroup
        items={ buttons }
        noSpacing
      />
    </>
  )
}
```

### Save flow and editor state

The hook must run inside the data object editor's existing providers, as it does when registered
in the toolbar slot above. Callers choose the actions and check permissions before offering them;
backend permission checks still apply. These examples focus on buttons. Bind any desired keyboard
shortcuts with the public `useHandleKeyBindings` hook from `modules/app`, using the same permission
and loading checks as the buttons.

`SaveTaskType.Save` saves the current object without explicitly changing its publication flag.
`SaveTaskType.Publish` publishes it, and `SaveTaskType.Version` stores a draft version.
The optional `onFinish` callback runs after successful object persistence, including when the
operation was queued behind an auto-save; it does not signal successful schedule persistence.
The hook also exposes `runningTask`, `isAutoSaveLoading` and `savedTask` for toolbar indicators.
`savedTask` briefly identifies a successful action once both data and schedules have been saved,
then resets to `null`. The editor's workflow coordinator uses the same save flow for transitions
configured to save unsaved changes.
The existing `UnpublishedLabel` is exported from `modules/element` for custom toolbars.

## Configuration

The Component Registry uses a configuration object to define the structure and types of components.
This configuration ensures that components are registered in the correct context (single or slot).

### Default Configuration

The default configuration is defined in
[`component-config.ts`](https://github.com/pimcore/studio-ui-bundle/blob/2026.x/assets/js/src/core/modules/app/component-registry/component-config.ts).
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

Refer to the [Component Configuration Source](https://github.com/pimcore/studio-ui-bundle/blob/2026.x/assets/js/src/core/modules/app/component-registry/component-config.ts)
for the complete default configuration and available single components and slots.
This file lists the extension points available in Pimcore Studio via the component registry.

## Full Example

For a complete working example, refer to the [Add an Additional Asset Editor Toolbar Button Example](../../04_Extending/02_Plugin_Development_Examples/03_Add_Additional_Asset_Editor_Toolbar_Button.md).
