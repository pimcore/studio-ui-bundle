# Hooks

In this context, hooks refer to [React custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks).  
There are numerous hooks available, including one that facilitates interaction with the widget manager.

## Example: Using a Hook to Open a Widget

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

### Source

- [Widget manager hooks](https://github.com/pimcore/studio-ui-bundle/tree/1.x/assets/js/src/core/modules/widget-manager/hooks)