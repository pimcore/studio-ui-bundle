---
title: How to Add a Custom Document Type
---

# How to Add a Custom Document Type

## Overview

This example adds a custom `book` document type to Pimcore Studio. Custom document types
appear in the document tree alongside built-in types like pages, snippets, and emails.
Users can create, edit, and manage them through the same Studio interface.

## Details

Adding a custom document type requires both a PHP backend and a Pimcore Studio frontend plugin:

**Backend (PHP):**
- A document model class extending `Pimcore\Model\Document\Page` (or another document type)
- Registration via `pimcore.documents.type_definitions.map` configuration
- A bundle installer that adds the type to the `documents` table ENUM column

**Frontend (Studio Plugin):**
- A `TabManager` subclass that defines the editor type
- Registration in the `TypeRegistry` with the document type name and tab manager service ID
- A `DocumentSidebarManager` bound with the convention-based service ID
  `Document/Editor/Sidebar/${CapitalizedType}SidebarManager`
- Tab registration (Edit, Preview, Properties, Versions, etc.)
- Sidebar registration (areablock types, content settings, document configuration)
- A context menu entry using `useAddDocument` for the document tree right-click menu

The example registers the `book` type with the same editor capabilities as a standard
page document (Edit, Preview, Properties, Versions, Dependencies, Notes & Events, Tags,
Workflow).

**Optional - Backend API Adapter:**
If your document type has custom properties or settings beyond standard editables, you also need a
document type adapter in the Studio Backend Bundle. The `book` example doesn't need one because it
only uses standard page editables. See the
[Custom Document Types](https://github.com/pimcore/studio-backend-bundle/blob/2026.x/doc/03_Extending/07_Documents/01_Custom_Document_Types.md)
documentation in the Studio Backend Bundle for details.

For the full backend + frontend guide, see the
[Adding Document Types](https://github.com/pimcore/pimcore/blob/2026.x/doc/10_Extending_Pimcore/03_Custom_Extension_Guides/02_Adding_Document_Types.md)
documentation in the Pimcore core.

## Code Example on GitHub

> [Custom Document Type example on GitHub](https://github.com/pimcore/studio-example-bundle/tree/main/assets/js/src/examples/custom-document-type).
