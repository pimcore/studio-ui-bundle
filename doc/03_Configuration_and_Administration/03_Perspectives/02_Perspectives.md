---
title: Perspectives
---

# Perspectives

Perspectives define the layout of Pimcore Studio by controlling which
[tree widgets](./01_Widgets.md) are visible and where they are positioned.
Each perspective arranges widgets into left, right, and bottom panels
and controls which navigation menu items are available.

Create and manage perspectives through the built-in perspective editor in Pimcore Studio.

:::warning
Perspectives and widgets are not intended to restrict access to data.
Use [permissions](../02_Users_and_Roles/README.md) for access control.
:::

## Perspective Configuration

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Display name |
| `icon` | ElementIcon | Icon with `type` and `value` for the perspective switcher |
| `widgetsLeft` | array | Widgets assigned to the left panel |
| `widgetsRight` | array | Widgets assigned to the right panel |
| `widgetsBottom` | array | Widgets assigned to the bottom panel |
| `expandedLeft` | string | ID of the widget expanded by default in the left panel |
| `expandedRight` | string | ID of the widget expanded by default in the right panel |
| `contextPermissions` | object | Navigation menu visibility (see below) |

Perspectives reference widgets by their unique ID.
Define widgets first (see [Widgets](./01_Widgets.md)),
then assign them to the perspective's widget arrays.

## Navigation Context Permissions

The `contextPermissions` property controls which navigation menu items
are visible in a perspective. Permissions are organized into groups
matching the Pimcore Studio mega menu structure.
Each group supports a `hidden` flag to hide the entire group, plus boolean flags for individual items within the group.

## Switching Perspectives

Users switch between perspectives through the perspective selector in Pimcore Studio.

## Restricting Perspective Access

Restrict which perspectives a user sees through the user settings.
Navigate to `System` > `Users & Roles` > `Users`, select a user,
and assign the allowed perspectives.

## Example

A perspective for catalog administrators showing only product data objects and assets:

1. Create a widget for the product objects tree:
   - Element type: `data-object`
   - Root folder: `/Product Data/Cars`
   - Classes: `['CAR']`

2. Create a perspective referencing this widget by its ID:
   - Add the product widget to `widgetsLeft`
   - Add a standard asset tree to `widgetsRight`
   - Set the product widget as `expandedLeft`
   - Hide irrelevant navigation groups via `contextPermissions`
     (e.g., set `experienceEcommerce.hidden` to `true`)

This gives catalog administrators a focused view with only the relevant
data objects and assets visible, and a simplified navigation menu.
