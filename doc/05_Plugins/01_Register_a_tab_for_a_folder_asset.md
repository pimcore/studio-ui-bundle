# How to register a new tab for a folder asset

In this guide we want to add a new tab for a folder asset. Let's take our [basic plugin](./README.md) as starting point. 

First of all let's create a new module that takes care of the registration of a new tab.

`./modules/asset/folder-tab-extension.tsx`:
``` typescript
import React from 'react'
import { type AbstractModule, Icon, type FolderTabManager, container, serviceIds } from 'pimcore-studio-ui'
import { MyFirstTabComponent } from './components/my-first-tab-component';

export const FolderTabExtension: AbstractModule = {
  onInit: (): void => {
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

In our example we are importing the `MyFirstTabComponent` as the content for our new registered tab. Let's create it:

`./modules/asset/components/my-first-tab-component.tsx`:
``` typescript
import React from 'react';

export const MyFirstTabComponent = (): React.JSX.Element => {
  return (
    <div>
      <h1>My First Tab</h1>
      <p>This is a simple tab component.</p>
    </div>
  )
}
```

And last but not least we have to register our newly created module:

`./main.ts`
``` typescript
import { Pimcore } from 'pimcore-studio-ui'
import { FolderTabExtension } from './modules/assets/folder-tab-extension'

Pimcore.pluginSystem.registerPlugin({
  name: 'pimcore-plugin',

  // register modules here
  onStartup: ({ moduleSystem }): void => {
    moduleSystem.registerModule(FolderTabExtension)
  }
})
```

That's it! Our new tab is now rendered in our Pimcore Studio UI.




