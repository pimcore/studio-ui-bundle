---
title: PimcoreStudio Window API
---

# PimcoreStudio Window API

The PimcoreStudio Window API provides a communication bridge between iframe-based components
and the parent Pimcore Studio window.
It enables cross-frame interaction and data exchange in Pimcore's multi-frame architecture.

## Overview

The API is primarily designed for document editor iframes but works with any iframe-based component
that needs cross-frame communication. It facilitates communication between:

- **Parent Window**: The main Pimcore Studio application
- **Document Editor Iframes**: Individual document editing interfaces (primary use case)
- **Plugin Iframes**: Custom iframe components that require interaction with the parent window

## API Structure

The PimcoreStudio API is available on the global `window` object and provides access to several subsystems:

```typescript
interface PimcoreStudioApi {
  element: ElementApi
  document: DocumentApi
  i18n: I18nApi
  modal: ModalApi
  settings: SettingsApi
}
```

## Accessing the API

Use the `getPimcoreStudioApi()` helper function to access the API safely:

```typescript
import { getPimcoreStudioApi } from '@pimcore/studio-ui-bundle/app'

const studioApi = getPimcoreStudioApi()
```

This helper function:
- Throws if the API is not available on the window object
- Works across different frame contexts (parent window and iframes)
- Returns a fully typed API interface

## Element API

The Element API provides methods for interacting with Pimcore elements (assets, documents, data objects).

### Opening Elements

#### `openAsset(id: number): Promise<void>`
Opens an asset editor tab.

#### `openDocument(id: number): Promise<void>`
Opens a document editor tab.

#### `openDataObject(id: number): Promise<void>`
Opens a data object editor tab.

#### `openElement(id: number, type: ElementType): Promise<void>`
Opens any element by ID and type (`'asset'`, `'document'`, or `'data-object'`).

#### `locateInTree(id: number, elementType: ElementType): void`
Locates and highlights an element in the navigation tree.

### Dialogs

#### `openElementSelector(config: ElementSelectorConfig): void`
Opens the element selector dialog with the specified configuration:

```typescript
import { getPimcoreStudioApi } from '@pimcore/studio-ui-bundle/app'
import {
  type ElementSelectorConfig,
  SelectionType
} from '@pimcore/studio-ui-bundle/modules/element'

const studioApi = getPimcoreStudioApi()

const selectorConfig: ElementSelectorConfig = {
  selectionType: SelectionType.Single,
  areas: {
    asset: true,
    document: false,
    object: false
  },
  onFinish: (event) => {
    console.log('Selected items:', event.items)
  }
}
studioApi.element.openElementSelector(selectorConfig)
```

**`ElementSelectorConfig` properties:**

| Property | Type | Description |
|----------|------|-------------|
| `selectionType` | `SelectionType` | `Disabled`, `Single`, or `Multiple` (default: `Multiple`) |
| `areas` | `{ asset: boolean, document: boolean, object: boolean }` | Enable/disable element type tabs (default: all `true`) |
| `onFinish` | `(event: ElementSelectorFinishEvent) => void` | Callback receiving selected items |
| `config` | `object` | Optional type-specific filters for allowed types/classes |

#### `openUploadModal(props: ModalUploadProps): void`
Opens the file upload modal:

```typescript
import { getPimcoreStudioApi } from '@pimcore/studio-ui-bundle/app'
import type { ModalUploadProps } from '@pimcore/studio-ui-bundle/components'

const studioApi = getPimcoreStudioApi()

const uploadProps: ModalUploadProps = {
  targetFolderId: 1,
  maxItems: 10,
  multiple: true,
  accept: 'image/*',
  onSuccess: async (assets) => {
    console.log('Uploaded assets:', assets)
  }
}
studioApi.element.openUploadModal(uploadProps)
```

#### `openLinkModal(props: LinkModalProps): void`
Opens the link editor modal.

#### `openCropModal(props: CropModalProps): void`
Opens the image crop modal.

#### `openHotspotMarkersModal(props: HotspotMarkersModalProps): void`
Opens the hotspot and marker editor for images.

#### `openVideoModal(props: VideoModalProps): void`
Opens the video selector modal.

## Document API

The Document API provides document-specific functionality for iframe-based editing.

### Methods

#### `getIframeApi(documentId: number): PublicApiDocumentEditorIframe`
Returns the iframe API for a specific document, providing access to editable values and interactions:

```typescript
const iframeApi = studioApi.document.getIframeApi(documentId)
const editableData = iframeApi.documentEditable.getValues()
```

#### `isIframeReady(documentId: number): boolean`
Checks if a document iframe is fully loaded and ready.

#### `isIframeAvailable(documentId: number): boolean`
Checks if a document iframe is registered (loaded in the editor).

#### `onReady(documentId: number, callback: () => void): void`
Registers a callback that fires when the document iframe becomes ready.

#### `markDraftAsModified(documentId: number): void`
Marks a document draft as modified, triggering change tracking.

#### `triggerValueChange(documentId: number, key: string, value: any): void`
Notifies the system of an editable value change. Triggers debounced auto-save (800ms).

#### `triggerValueChangeWithReload(documentId: number, key: string, value: any): void`
Triggers a value change with immediate auto-save and iframe reload.

#### `triggerSaveAndReload(documentId: number): void`
Triggers an immediate auto-save and iframe reload without a value change.

## Cross-Frame Communication

### Automatic Iframe Detection

The `getPimcoreStudioApi()` helper automatically handles iframe detection:

```typescript
import { getPimcoreStudioApi } from '@pimcore/studio-ui-bundle/app'

// Works from both parent window and iframe contexts
const studioApi = getPimcoreStudioApi()
await studioApi.element.openAsset(123)
```

### Manual Iframe Detection

For advanced use cases, check the iframe context manually:

```typescript
import { isInIframe } from '@pimcore/studio-ui-bundle/utils'
import { getPimcoreStudioApi } from '@pimcore/studio-ui-bundle/app'

if (isInIframe()) {
  const studioApi = getPimcoreStudioApi()
  await studioApi.element.openAsset(123)
} else {
  console.log('Running in parent window context')
}
```
