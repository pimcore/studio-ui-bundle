---
title: Widget Manager
---

# Widget Manager

The Widget Manager controls the layout of widgets in Pimcore Studio.
It provides functionality to open, close, and manipulate widgets programmatically from custom components.

## Opening a Widget

Use the `useWidgetManager` hook to open a widget programmatically:

```typescript
import { Button } from 'antd'
import { useWidgetManager } from '@pimcore/studio-ui-bundle/modules/widget-manager'

export const MyFirstTabComponent = (): React.JSX.Element => {
  const widgetManager = useWidgetManager()

  function onClick(): void {
    widgetManager.openBottomWidget({
      name: 'My first widget',
      component: 'my-first-widget',
    })
  }

  return (
    <div>
      <h1>My First Tab</h1>
      <p>This is a simple tab component.</p>
      <Button type="primary" onClick={onClick}>Open my first widget</Button>
    </div>
  )
}
```

## `useWidgetManager` Hook

The hook returns the following methods:

| Method | Signature | Description |
|--------|-----------|-------------|
| `openMainWidget` | `(tabConfig: WidgetManagerTabConfig) => void` | Opens a widget in the main content area |
| `openBottomWidget` | `(tabConfig: WidgetManagerTabConfig) => void` | Opens a widget in the bottom panel |
| `openLeftWidget` | `(tabConfig: WidgetManagerTabConfig) => void` | Opens a widget in the left sidebar |
| `openRightWidget` | `(tabConfig: WidgetManagerTabConfig) => void` | Opens a widget in the right sidebar |
| `updateWidget` | `(tabConfig: WidgetManagerTabConfig) => void` | Updates an existing widget's configuration |
| `switchToWidget` | `(id: string) => void` | Activates/focuses a widget by ID |
| `closeWidget` | `(id: string) => void` | Closes a widget by ID |
| `isMainWidgetOpen` | `(id: string) => boolean` | Checks if a widget is open in the main area |
| `hasOuterWidget` | `(id: string) => boolean` | Checks if a widget exists in the outer layout (sidebars/bottom) |
| `getOpenedMainWidget` | `() => TabNode \| undefined` | Returns the currently active main widget node |

## Focus View

Add `focus=1` to a Studio link to show only the main widget that link opens, full width, without the trees,
sidebars and other tabs. A small header shows the widget's title and links to the same address without the
flag, which opens it in the full Studio.

```
/pimcore-studio/data-object/12?focus=1
/pimcore-studio/?changeRequest=<uuid>&focus=1
```

- Works with any link that opens a main widget, also one a bundle answers: open it with `openMainWidget` once
  `selectWidgetManagerRestored` is `true`, as for a link without the flag.
- The saved layout is neither restored nor saved while the focus view is open, so the user's tabs in the full
  Studio stay as they were.
- The flag is read once when Studio starts, before plugins are initialized, so a bundle may remove its own
  parameter from the address; the header link still carries it. Without a widget to show, the focus view
  says so and offers the same link.
- The focus view sets a `width=device-width` viewport so it can be used on a phone; the full Studio does not.

## Transform Configuration

Use `transformConfig` to dynamically modify widget configuration when widgets are created:

```typescript
widgetRegistry.registerWidget({
  name: 'my-widget',
  component: MyWidgetComponent,
  transformConfig: (config) => ({
    ...config,
    translationKey: `widgets.${config.name}`
  })
})
```

## Title Components

Customize both the tab/button titles and widget content headers using specialized title components.

### titleComponent - Tab/Button Titles

Controls the title displayed in tabs or sidebar buttons.
Use `TabTitleContainer` for full functionality with auto-detection:

```typescript
import {
  TabTitleContainer,
  type TabTitleContainerProps
} from '@pimcore/studio-ui-bundle/modules/widget-manager'

const MyCustomTitle = ({ node, modified }: TabTitleContainerProps) => {
  const config = node.getConfig()
  const customTitle = `${config.elementType || 'Widget'}`

  return <TabTitleContainer node={node} modified={modified} title={customTitle} />
}

widgetRegistry.registerWidget({
  name: 'my-widget',
  component: MyWidgetComponent,
  titleComponent: MyCustomTitle
})
```

### contentTitleComponent - Widget Content Headers

Controls the header inside the widget content area.
Use `WidgetContentTitleView` for styled headers:

```typescript
import {
  WidgetContentTitleView,
  type WidgetContentTitleViewProps
} from '@pimcore/studio-ui-bundle/modules/widget-manager'

const MyContentTitle = ({ node, icon, title }: WidgetContentTitleViewProps) => {
  const customTitle = `Dashboard: ${title}`

  return (
    <WidgetContentTitleView
      node={node}
      icon={icon}
      title={customTitle}
    />
  )
}

widgetRegistry.registerWidget({
  name: 'my-widget',
  component: MyWidgetComponent,
  contentTitleComponent: MyContentTitle
})
```

### Custom Conditional Logic

For advanced use cases with different behavior for sidebar buttons vs tabs,
use `BorderTitleView` and `TabTitleView` directly.
Widgets appear as border buttons in sidebars and as tabs in the main content area:

```typescript
import { BorderNode } from 'flexlayout-react'
import {
  BorderTitleView,
  TabTitleView,
  type TabTitleContainerProps,
  useWidgetManager
} from '@pimcore/studio-ui-bundle/modules/widget-manager'

const MyAdvancedTitle = ({ node, modified }: TabTitleContainerProps) => {
  const { closeWidget } = useWidgetManager()
  const config = node.getConfig()
  const isBorderNode = node.getParent() instanceof BorderNode
  const icon = config.icon ?? { value: 'widget-default', type: 'name' }
  const title = `Custom ${config.elementType ?? 'Widget'}`

  const onClose = () => closeWidget(node.getId())

  if (isBorderNode) {
    return (
      <BorderTitleView
        icon={icon}
        title={title}
      />
    )
  }

  return (
    <TabTitleView
      icon={icon}
      title={title + (modified ? ' *' : '')}
      onClose={node.isEnableClose() ? onClose : undefined}
      onConfirm={modified ? onClose : undefined}
    />
  )
}

widgetRegistry.registerWidget({
  name: 'my-advanced-widget',
  component: MyWidgetComponent,
  titleComponent: MyAdvancedTitle
})
```

### Available Title Components

| Component | Import from | Purpose |
|-----------|-------------|---------|
| `TabTitleContainer` | `@pimcore/studio-ui-bundle/modules/widget-manager` | Full-featured with auto-detection, close buttons, modified state |
| `BorderTitleView` | `@pimcore/studio-ui-bundle/modules/widget-manager` | Sidebar button style only |
| `TabTitleView` | `@pimcore/studio-ui-bundle/modules/widget-manager` | Tab style only |
| `WidgetContentTitleView` | `@pimcore/studio-ui-bundle/modules/widget-manager` | Content header without translation |

### Step-by-Step Guide

For a step-by-step guide on adding a widget,
refer to the [Widget Manager example](../../04_Extending/02_Plugin_Development_Examples/05_Use_the_Widget_Manager.md).

### Source

- [Widget Manager Hooks](https://github.com/pimcore/studio-ui-bundle/tree/2026.x/assets/js/src/core/modules/widget-manager/hooks)
