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

### Step-by-step guide

For a step-by-step guide on how to add a new widget to the Widget Manager, refer to the [How to Use the Widget Manager example](../05_Examples/04_Use_the_Widget_Manager.md).

### Source

- [Widget Manager Hooks](https://github.com/pimcore/studio-ui-bundle/tree/1.x/assets/js/src/core/modules/widget-manager/hooks)
