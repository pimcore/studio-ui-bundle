---
title: Custom Tree Icons, Editor Tab Icons, and Tooltips
---

# Custom Tree Icons, Editor Tab Icons, and Tooltips

This guide explains how to customize element icons and tooltips in Pimcore Studio - both in the **element tree** and in **editor tabs**.

## Backend-Only Customization (No Frontend Code Needed)

For most use cases, configure icon and tooltip customization on the backend via event subscribers. Pimcore Studio automatically renders:
- `customAttributes.icon` - replaces the default element icon (in both tree and editor tabs)
- `customAttributes.tooltip` - shown as HTML on hover (in the tree)

:::warning
The tree and editor/detail endpoints fire **separate events**.
To customize icons everywhere, subscribe to both `pre_response.data_object` (tree)
and `pre_response.data_object_detail` (editor tab).
See the [Custom Icons & Tooltips extension guide](https://github.com/pimcore/pimcore/blob/2026.x/doc/10_Extending_Pimcore/03_Custom_Extension_Guides/10_Custom_Icons_and_Tooltips.md)
for a complete backend example covering both events.
:::

