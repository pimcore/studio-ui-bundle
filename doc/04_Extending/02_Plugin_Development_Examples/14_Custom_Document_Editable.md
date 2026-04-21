---
title: How to Add a Custom Document Editable
---

# How to Add a Custom Document Editable

## Overview

This example adds a custom `markdown` document editable type to Pimcore Studio. Custom editables
appear inline in the document editor alongside built-in types like input, textarea, and wysiwyg.

## Details

Adding a custom document editable requires both a PHP backend and a Pimcore Studio frontend plugin:

**Backend (PHP):**
- An editable model class extending `Pimcore\Model\Document\Editable` and implementing `EditmodeDataInterface`
- Registration via `pimcore.documents.editables.map` configuration

**Frontend (Studio Plugin):**
- A `DynamicTypeDocumentEditableAbstract` subclass with `getEditableDataComponent()` returning a React component
- The component receives `value` and `onChange` props injected by the framework via `React.cloneElement` on the root element
- Registration in the `DynamicTypeDocumentEditableRegistry` via a module
- `InheritanceOverlay` from the SDK to support document inheritance
- Theme-aware styling via `createStyles` from `antd-style`

**Service Configuration:**
- The bundle's `WebpackEntryPointProvider` must be tagged with both
  `pimcore_studio_ui.webpack_entry_point_provider` and
  `pimcore_studio_ui.webpack_entry_point_provider.document_editor_iframe`,
  since document editables render inside an iframe with its own plugin bootstrap

The example implements the `markdown` type as a plain `<textarea>` with monospace font,
demonstrating the full pattern without external dependencies.

For the full backend + frontend guide, see the
[Adding Document Editables](https://github.com/pimcore/pimcore/blob/2026.x/doc/10_Extending_Pimcore/03_Custom_Extension_Guides/03_Adding_Document_Editables.md)
documentation in the Pimcore core.

## Code Example on GitHub

> [Custom Document Editable example on GitHub](https://github.com/pimcore/studio-example-bundle/tree/main/assets/js/src/examples/custom-document-editable).

- [Plugin entry (index.ts)](https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/examples/custom-document-editable/index.ts) - binds the dynamic type and registers the module
- [Module (markdown-editable-module.tsx)](https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/examples/custom-document-editable/modules/markdown-editable-module.tsx) - registers the type in the `DynamicTypeDocumentEditableRegistry`
- [Dynamic type (dynamic-type-document-editable-markdown.tsx)](https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/examples/custom-document-editable/dynamic-types/definitions/dynamic-type-document-editable-markdown.tsx) - extends `DynamicTypeDocumentEditableAbstract` with a `<textarea>` component
- [Styles (dynamic-type-document-editable-markdown.styles.ts)](https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/examples/custom-document-editable/dynamic-types/definitions/dynamic-type-document-editable-markdown.styles.ts) - theme-aware styling via `createStyles`
