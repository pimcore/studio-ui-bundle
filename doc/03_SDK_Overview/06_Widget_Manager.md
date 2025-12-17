# Widget Manager

The Widget Manager is a powerful tool that allows you to manage and interact with widgets in the Pimcore Studio UI.  
It provides functionality to open, close, and manipulate widgets programmatically, enabling seamless integration into your custom components.

## Example: Opening a Widget with the Widget Manager

The following example demonstrates how to use the `useWidgetManager` hook to open a widget programmatically:

```typescript
export const MyFirstTabComponent = (): React.JSX.Element => {
  const widgetManager = useWidgetManager();

  function onClick(): void {
    widgetManager.openBottomWidget({
      name: 'My first widget',
      component: 'my-first-widget',
    });
  }

  return (
    <div>
      <h1>My First Tab</h1>
      <p>This is a simple tab component.</p>
      
      <Button type="primary" onClick={onClick}>Open up my first widget</Button>
    </div>
  );
}
```

### Key Features of the Widget Manager

- **Open Widgets**: Use `openBottomWidget` or similar methods to display widgets in specific areas of the UI.
- **Close Widgets**: Programmatically close widgets when they are no longer needed.
- **Custom Components**: Specify custom React components to be rendered within widgets.

## Transform Configuration

Use `transformConfig` to dynamically modify widget configuration when widgets are created. This allows configuration transformation based on widget properties:

```typescript
widgetRegistry.registerWidget({
  name: 'my-widget',
  component: MyWidgetComponent,
  transformConfig: (config) => ({
    ...config,
    translationKey: `widgets.${config.name}` // Set translation key from name
  })
})
```

## Title Components

When registering widgets, you can customize both the tab/button titles and widget content headers using specialized title components.

### titleComponent - Tab/Button Titles

Controls the title displayed in tabs or sidebar buttons. Use `TabTitleContainer` for full functionality with auto-detection:

```typescript
import { TabTitleContainer, type TabTitleContainerProps } from '@pimcore/studio-ui-bundle/modules/widget-manager'

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

Controls the header inside the widget content area. Use `WidgetContentTitleView` for styled headers:

```typescript
import { WidgetContentTitleView, type WidgetContentTitleViewProps } from '@pimcore/studio-ui-bundle/modules/widget-manager'

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

For advanced use cases where you need different behavior for sidebar buttons vs tabs, you can implement custom logic using `BorderTitleView` and `TabTitleView` directly. Widgets appear as border buttons when placed in sidebars, and as tabs when in the main content area:

```typescript
import { BorderNode } from 'flexlayout-react'
import { BorderTitleView, TabTitleView, type TabTitleContainerProps, useWidgetManager } from '@pimcore/studio-ui-bundle'

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

### Available Components

- **`TabTitleContainer`** - Full-featured with auto-detection, close buttons, modified state
- **`BorderTitleView`** - Sidebar button style only
- **`TabTitleView`** - Tab style only
- **`WidgetContentTitleView`** - Simple content header without translation
- **`TitleView`** - Basic title with icon and text

### Step-by-step guide

For a step-by-step guide on how to add a new widget to the Widget Manager, refer to the [How to Use the Widget Manager example](../05_Examples/04_Use_the_Widget_Manager.md).

### Source

- [Widget Manager Hooks](https://github.com/pimcore/studio-ui-bundle/tree/1.x/assets/js/src/core/modules/widget-manager/hooks)
