---
title: Field Definitions Editor
---

# Field Definitions Editor

The editor behind the class, object brick and field collection editors is one configurable component: `Editor` from `@pimcore/studio-ui-bundle/modules/field-definitions`. Data access is injected as hooks, so a bundle can host the same layout tree and settings forms on top of its own endpoints.

```typescript
import { Editor } from '@pimcore/studio-ui-bundle/modules/field-definitions'

<Editor
  area={ ['my-bundle', 'class'] }
  useItemsQuery={ useMyItemsQuery }
  useDetailGeneralSettingsQuery={ useMyGeneralSettingsQuery }
  useDetailLayoutQuery={ useMyLayoutQuery }
  useDetailUpdateMutation={ useMyUpdateMutation }
  GeneralSettingsFormFields={ MyGeneralSettingsFormFields }
/>
```

`view` replaces the editor's own body, and `ItemDetail` is exported from the same module, so a bundle can mount the detail pane alone.

## Review mode

Pass `readOnly` to render a definition without a way to change it: the tree navigates but never rearranges, the forms render disabled, and Save, import/export and custom layouts leave the toolbar. `useDetailUpdateMutation` is not required in this mode.

`decorateTreeItem` receives every layout-tree item before it renders, together with its field definition and path, and returns the item to render — the place to add a status class or wrap the title.

```typescript
<Editor
  readOnly
  decorateTreeItem={ (item, { path }) => changedPaths.has(path.join('/'))
    ? { ...item, className: 'my-changed', title: <>{ item.title } <Tag>changed</Tag></> }
    : item }
  area={ ['my-bundle', 'class'] }
  useItemsQuery={ useMyItemsQuery }
  useDetailGeneralSettingsQuery={ useMyGeneralSettingsQuery }
  useDetailLayoutQuery={ useMyLayoutQuery }
  GeneralSettingsFormFields={ MyGeneralSettingsFormFields }
/>
```

## Annotating form items

`FormAnnotationsProvider` marks form items from the outside: every `Form.Item` below it whose name is in the map renders with a status tint (`added`, `changed`, `removed` or `moved`) and an optional hint under the control. The form itself needs no change, so the editor's per-type settings forms can show what a proposal alters.

```typescript
import { FormAnnotationsProvider } from '@pimcore/studio-ui-bundle/components'

<FormAnnotationsProvider annotations={ { title: { status: 'changed', hint: 'was: Product name' } } }>
  <LayoutForm />
</FormAnnotationsProvider>
```

Items are keyed by their resolved name path joined with `.`; `formItemAnnotationKey(name)` builds the key the same way.
