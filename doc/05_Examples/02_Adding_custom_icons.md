# How to add custom icons

In this guide we want add a completely new icon to Pimcore Studio UI. Let's take our [Folder tab plugin](./01_Register_a_tab_for_a_folder_asset.md) as starting point. 

We could use any kind of icon library like Font Awesome or comparable. But let's assume we want to add a custom one:

`./icons/my-rocket.inline.svg`
``` html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 15L9 12M12 15C13.3968 14.4687 14.7369 13.7987 16 13M12 15V20C12 20 15.03 19.45 16 18C17.08 16.38 16 13 16 13M9 12C9.53214 10.6194 10.2022 9.29607 11 8.05C12.1652 6.18699 13.7876 4.65305 15.713 3.5941C17.6384 2.53514 19.8027 1.98637 22 2C22 4.72 21.22 9.5 16 13M9 12H4C4 12 4.55 8.97 6 8C7.62 6.92 11 8 11 8M4.5 16.5C3 17.76 2.5 21.5 2.5 21.5C2.5 21.5 6.24 21 7.5 19.5C8.21 18.66 8.2 17.37 7.41 16.59C7.02131 16.219 6.50929 16.0046 5.97223 15.988C5.43516 15.9714 4.91088 16.1537 4.5 16.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

In the current version of our plugin we are rendering a already known camera icon of Pimcore Studio. Let's replace it with our rocket:

`./modules/asset/folder-tab-extension.tsx`:
``` typescript
import React from 'react'
import { type AbstractModule Icon, type FolderTabManager, container, serviceIds, type IconLibrary } from 'pimcore-studio-ui'
import { MyFirstTabComponent } from './components/my-first-tab-component';
import MyRocket from './../../icons/my-rocket.inline.svg'

export const FolderTabExtension: AbstractModule = {
  onInit: (): void => {
    const iconLibrary = container.get<IconLibrary>(serviceIds.iconLibrary)

    // register your new icon here
    iconLibrary.register({
      name: 'my-rocket',
      component: MyRocket
    })

    const tabManager = container.get<FolderTabManager>(serviceIds['Asset/Editor/FolderTabManager'])

    tabManager.register({
      children: <MyFirstTabComponent />,
      icon: <Icon name={ 'my-rocket' } />, // tell the tab manager to use our new icon
      key: 'my-first-tab-component',
      label: '1. tab component'
    })
  }
}
```

We are using `@svgr/webpack` to directly convert a loaded svg file to a react component. So please make sure that you have it installed like mentioned in our [basic plugin](./README.md) example. Also, TypeScript does not know how to handle our svg-import, yet. Let's add a simple declaration file for that:

`./types/svg.d.ts`
``` typescript
declare module '*.svg' {
  import type React from 'react'
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>
  export default SVG
}
```

That's it! Compile your plugin and take a look at our newly added icon!
