---
title: Tree Widgets
---

# Tree Widgets

A tree widget is a custom tree view representing a subset of elements from the main trees.
Configure tree widgets for documents, assets, and data objects to provide focused views
for specific workflows or user roles.

## Tree Widget Configuration

Each element tree widget has these properties:

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Unique widget identifier |
| `name` | string | Display name |
| `icon` | ElementIcon | Icon with `type` and `value` |
| `elementType` | string | Tree type: `data-object`, `asset`, or `document` |
| `rootFolder` | string | Root path for the tree (e.g., `/Product Data/Cars`) |
| `showRoot` | boolean | Whether to display the root folder node |
| `classes` | array | Restrict to specific data object classes (e.g., `['CAR']`) |
| `pql` | string | PQL filter expression to subset the tree |
| `pageSize` | integer | Number of items per page in the tree |
| `contextPermissions` | object | Tree context menu permissions (see below) |

:::note
For tree pagination to work correctly, a parent node must be available.
If the root level has more items than `pageSize`, set `showRoot` to `true`.
:::

## Tree Context Permissions

Control which context menu actions are available in the widget tree.
Each permission is a boolean flag. The available permissions depend on the `elementType`.

## Filtering with PQL

Use the `pql` property to filter which elements appear in the widget tree.

## Custom Widget Types

The built-in widget type is `element_tree`. To create new widget types
(e.g., dashboards, custom panels), see the
[Custom Perspective Widgets](https://github.com/pimcore/pimcore/blob/2026.x/doc/10_Extending_Pimcore/03_Custom_Extension_Guides/14_Custom_Perspective_Widgets.md)
extension guide.
