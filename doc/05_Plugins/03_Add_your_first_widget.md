# How to add your first widget

In this guide we want to add a new bottom widget when a user clicks a button. Let's take our [Folder tab plugin](./01_Register_a_tab_for_a_folder_asset.md) as starting point. 

A widget is just a simple react component. So, let's create one:

`./modules/asset/widgets/my-first-widget.tsx`
``` typescript
import React from 'react';

export const MyFirstWidget = (): React.JSX.Element => {
  return (
    <div>
      <h1>My First Widget</h1>
      <p>This is a simple widget component.</p>
    </div>
  );
}
```

Now, with the react component defined - we have to tell Pimcore Studio to handle it as a widget:

`./modules/asset/folder-tab-extension.tsx`:
``` typescript
import React from 'react'
import { type AbstractModule Icon, type FolderTabManager, container, serviceIds, WidgetRegistry } from 'pimcore-studio-ui'
import { MyFirstTabComponent } from './components/my-first-tab-component';
import { MyFirstWidget } from './widgets/my-first-widget';

export const FolderTabExtension: AbstractModule = {
  onInit: (): void => {
    // registration of our new widget
    const widgetManager = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetManager.registerWidget({
      name: 'my-first-widget',
      component: MyFirstWidget
    })

    const tabManager = container.get<FolderTabManager>(serviceIds['Asset/Editor/FolderTabManager'])

    tabManager.register({
      children: <MyFirstTabComponent />,
      icon: <Icon name={ 'camera' } />,
      key: 'my-first-tab-component',
      label: '1. tab component'
    })
  }
}
```

Last but not least we have to open up the widget via button click. For that let's extend our tab component:

`./modules/asset/components/my-first-tab-component.tsx`:
``` typescript
import React from 'react';
import { Button } from 'antd';
import { useWidgetManager } from 'pimcore-studio-ui';

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

That's it! We can now open up our first widget via button click.
