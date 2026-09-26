---
title: Cross-Realm Custom Modals
---

# Cross-Realm Custom Modals

Some plugin code runs in more than one realm - the main Studio application window and, for
document editables, the isolated `document_editor_iframe`. A dialog opened from inside that iframe
renders inside the iframe's own DOM by default, so it shares the iframe's CSS with the rendered
website page and is constrained to the iframe's viewport, instead of getting Studio's own styling
at full size.

Studio's built-in element selector, link, upload, crop, hotspot and video modals avoid this by
always rendering in the main window, no matter which realm asked for them. `registerIframeModal`
and `PimcoreStudio.modal.openCustom` extend the same mechanism to plugin-defined dialogs.

## Registering a modal

Call `registerIframeModal` once, unconditionally, from your plugin's `onInit`:

```typescript
import { registerIframeModal, type CustomModalComponentProps } from '@pimcore/studio-ui-bundle/modules/app'

interface MyModalPayload {
  objectId: number
}

type MyModalResult = { confirmed: boolean } | undefined

const MyModal = ({ payload, onClose }: CustomModalComponentProps<MyModalPayload, MyModalResult>): React.JSX.Element => {
  return (
    <Modal onCancel={ () => { onClose(undefined) } } onOk={ () => { onClose({ confirmed: true }) } } open>
      Editing object { payload.objectId }
    </Modal>
  )
}

export const MyPlugin: IAbstractPlugin = {
  name: 'my-plugin',
  onInit: (): void => {
    registerIframeModal('my-plugin.my-modal', MyModal)
  }
}
```

If your plugin's federation module loads into both the main app and the `document_editor_iframe`
(a second `pimcore_studio_ui.webpack_entry_point_provider.document_editor_iframe` tag, the same
pattern the headless-documents and Backend Power Tools bundles use for their editables), `onInit`
runs once per realm. Registering is cheap and safe to call from both - each realm loads its own
copy of the SDK, so the registration only has an effect in the realm it actually renders from (the
main window). Build `MyModal` so it only relies on what the main window provides - the Redux store,
the DI container, class definitions, i18n, the element selector - not on anything specific to the
iframe that requested it.

## Opening it

From anywhere - the iframe or the main window itself:

```typescript
import { getPimcoreStudioApi } from '@pimcore/studio-ui-bundle/app'

getPimcoreStudioApi().modal.openCustom<MyModalPayload, MyModalResult>(
  'my-plugin.my-modal',
  { objectId: 42 },
  {
    onClose: (result) => {
      if (result?.confirmed === true) {
        // ...
      }
    }
  }
)
```

`payload` and the `onClose` result are plain data (functions are fine as callbacks, since both
realms share the same origin) - nothing here is serialized through `postMessage` or JSON.

## How it works

`PimcoreStudio.modal.openCustom` mirrors `element.openElementSelector`: called from an iframe, it
resolves the parent window's `PimcoreStudio` API via `getPimcoreStudioApi()` and calls `openCustom`
on that instance, so the rest of the call executes in the main window. There it dispatches an
`openCustomModal` API Gateway event, which a handler resolves against the `registerIframeModal`
registry and renders through the same modal holder (`ModalHolderProvider`/`useModalHolder`) that
Studio's own ad hoc modals (bulk import/export, "About", …) use, mounted once alongside the
`ApiGateway` in the main application.
