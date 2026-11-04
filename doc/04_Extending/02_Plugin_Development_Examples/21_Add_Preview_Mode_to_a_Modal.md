---
title: How to Add Preview Mode to a Modal
---

# How to Add Preview Mode to a Modal

## Overview

Preview mode lets users pick a sample element and see, next to each
column or field of a configuration modal, the value that element would
produce. The Studio UI uses it in the grid configuration modal. The
building blocks are exported from the SDK, so any modal can use them
with its own value source.

| Export | Purpose |
|---|---|
| `PreviewModeProvider` | Holds the on/off state and the picked element |
| `PreviewModeSwitch` | The "Preview mode" switch (off every time the provider mounts) |
| `PreviewModeBar` | Shows the picked element and lets the user pick another one |
| `ColumnPreview` | Slot rendered under a column; shows your value only while preview mode is on |
| `usePreviewMode` | Hook to read `enabled` and the picked `item` (inside a provider) |

## Example

```tsx
import {
  ColumnPreview,
  PreviewModeBar,
  PreviewModeProvider,
  PreviewModeSwitch,
  usePreviewMode
} from '@pimcore/studio-ui-bundle/components'

// 1. The value source: fetch the value for the picked element.
//    `ColumnPreview` calls its child only while preview mode is on,
//    so nothing is requested while the switch is off.
const NamePreview = ({ fieldName }: { fieldName: string }) => {
  const { item } = usePreviewMode()

  return (
    <ColumnPreview>
      {() => <NameValue elementId={ item?.data.id } fieldName={ fieldName } />}
    </ColumnPreview>
  )
}

// 2. Alternatively pass an already loaded value source:
//    <ColumnPreview source={ { isLoading, error, value } } />

// 3. Wrap the modal content in the provider, add the switch and the bar.
export const MyModal = () => (
  <PreviewModeProvider>
    <PreviewModeSwitch />
    <PreviewModeBar allowedClasses={ ['Product'] } />
    <NamePreview fieldName="name" />
  </PreviewModeProvider>
)
```

## Notes

- `NameValue` stands for your own component that loads and renders the value (for example with an RTK Query hook, see [Use API Data](./08_Use_API_Data.md)).
- Render the bar only while preview mode is on: read `enabled` from `usePreviewMode()`.
- Set `resetKey` on the provider to clear the picked element when the context changes (e.g. another class is selected).
- Pass `fallbackItem` (`{ id, fullpath? }`) to show a default element in the bar while nothing is picked.
- Without a provider, use `usePreviewModeOptional()` to get an inactive preview mode instead of an error.
