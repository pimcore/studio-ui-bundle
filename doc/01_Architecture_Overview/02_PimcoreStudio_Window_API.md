# PimcoreStudio Window API

The PimcoreStudio Window API provides a communication bridge between iframe-based components and the parent Studio UI window. This API enables seamless interaction and data exchange in Pimcore's multi-frame architecture.

## Overview

The PimcoreStudio Window API is primarily designed for document editor iframes, but can also be utilized by other iframe-based components in plugins when cross-frame communication is needed. The API facilitates communication between:

- **Parent Window**: The main Studio UI application
- **Document Editor Iframes**: Individual document editing interfaces (primary use case)
- **Plugin Iframes**: Custom iframe components that require interaction with the parent window

## API Structure

The PimcoreStudio API is available on the global `window` object and provides access to various subsystems:

```typescript
interface PimcoreStudioApi {
  element: ElementApi;
  document: DocumentApi;
  // ... other APIs
}
```

## Accessing the API

Always use the `getPimcoreStudioApi()` helper function to access the API safely:

```typescript
import { getPimcoreStudioApi } from '@sdk/app';

const studioApi = getPimcoreStudioApi();
```

This helper function:
- Provides proper error handling
- Works across different frame contexts (parent window and iframes)
- Returns a properly typed API interface

## Element API

The Element API provides methods for interacting with Pimcore elements (assets, documents, data objects):

### Methods

#### `openAsset(id: number): Promise<void>`
Opens an asset in the Studio UI.

#### `openDocument(id: number): Promise<void>`
Opens a document in the Studio UI.

#### `openDataObject(id: number): Promise<void>`
Opens a data object in the Studio UI.

#### `openElement(id: number, type: ElementType): Promise<void>`
Opens any element by ID and type.

#### `openElementSelector(config: ElementSelectorConfig): void`
Opens the element selector dialog with the specified configuration.

#### `openUploadModal(props: ModalUploadProps): void`
Opens the upload modal with the specified properties.

## Document API

The Document API provides document-specific functionality:

### Methods

#### `getIframeApi(documentId: number): DocumentIframeApi`
Gets the iframe API for a specific document, providing access to:

- `documentEditable.getValues()`: Retrieve editable values from the document iframe
- Other document-specific iframe interactions

#### `isIframeReady(documentId: number): boolean`
Checks if a document iframe is fully loaded and ready.

## Usage Examples

```typescript
import { getPimcoreStudioApi } from '@sdk/app';
import type { ElementSelectorConfig } from '@sdk/modules/element';
import type { ModalUploadProps } from '@sdk/components';

// Access the API (works from both parent window and iframe)
const studioApi = getPimcoreStudioApi();

// Open an element
await studioApi.element.openAsset(123);
await studioApi.element.openDocument(456);
await studioApi.element.openDataObject(789);

// Open any element by type
await studioApi.element.openElement(123, 'asset');
await studioApi.element.openElement(456, 'document');
await studioApi.element.openElement(789, 'data-object');

// Open element selector
const selectorConfig: ElementSelectorConfig = {
  multiple: false,
  types: ['asset'],
  onSelect: (elements) => {
    console.log('Selected elements:', elements);
  }
};
studioApi.element.openElementSelector(selectorConfig);

// Open upload modal
const uploadProps: ModalUploadProps = {
  targetFolderId: 1,
  maxItems: 10,
  multiple: true,
  accept: 'image/*',
  onSuccess: async (assets) => {
    console.log('Uploaded files:', assets);
  }
};
studioApi.element.openUploadModal(uploadProps);

// Get editable data from document iframe (from parent window)
const documentApi = studioApi.document;
const iframeApi = documentApi.getIframeApi(documentId);
const editableData = iframeApi.documentEditable.getValues();
```

## Cross-Frame Communication

### Automatic iframe Detection

The `getPimcoreStudioApi()` helper automatically handles iframe detection:

```typescript
import { getPimcoreStudioApi } from '@sdk/app';

// This works from both parent window and iframe contexts
const studioApi = getPimcoreStudioApi();
await studioApi.element.openAsset(123);
```

### Manual iframe Detection (Advanced)

For advanced use cases, you can manually check iframe context:

```typescript
import { isInIframe } from '@sdk/utils';
import { getPimcoreStudioApi } from '@sdk/app';

if (isInIframe()) {
  // Call parent's API through helper
  const studioApi = getPimcoreStudioApi();
  await studioApi.element.openAsset(123);
} else {
  // Do some custom logic if not in iframe
  console.log('Running in parent window context');
}
```
