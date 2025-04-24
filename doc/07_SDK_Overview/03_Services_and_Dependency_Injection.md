# Services and Dependency Injection

Services are straightforward objects that assist with specific tasks. To maximize the benefits of services, we’ve introduced a service container using [Inversify](https://github.com/inversify/InversifyJS).  

This container is initialized early in the application lifecycle, ensuring accessibility throughout the entire app.

To interact with the service container, the following three main SDK imports are relevant:

```typescript
import { container } from '@pimcore/studio-ui-bundle' // Provides access to the service container
import { serviceIds } from '@pimcore/studio-ui-bundle/app' // Contains identifiers for registered services
import { useInjection } from '@pimcore/studio-ui-bundle/app' // A hook for injecting services in functional components
```

> **Note:** `serviceIds` is a list of registered services in the container. It ensures that the service you are trying to retrieve from Studio UI is properly registered in the container.

## Example: Creating a New Tab

Below is an example of how to create and register a new tab using the service container:

```typescript
import { container } from '@pimcore/studio-ui-bundle'
import { serviceIds } from '@pimcore/studio-ui-bundle/app'
import { FolderTabManager } from '@pimcore/studio-ui-bundle/modules/asset'

// Retrieve the FolderTabManager service from the container
const tabManager = container.get<FolderTabManager>(serviceIds['Asset/Editor/FolderTabManager'])

// Register a new tab with custom properties
tabManager.register({
  children: <ImageGallery />, // The content to display in the tab
  icon: <Icon name={'camera'} />, // Icon to represent the tab
  key: 'image-gallery', // Unique identifier for the tab
  label: 'Image Gallery' // Display name for the tab
})
```

In this example, `FolderTabManager` is a service responsible for managing tabs in the asset editor. It allows you to dynamically add, remove, or modify tabs in the application.

## Example: Using `useInjection` in Functional Components

The `useInjection` hook simplifies dependency injection in functional components. Here's an example:

```typescript
import React from 'react'
import { useInjection } from '@pimcore/studio-ui-bundle/app'
import { serviceIds } from '@pimcore/studio-ui-bundle/app'
import { FolderTabManager } from '@pimcore/studio-ui-bundle/modules/asset'

const MyComponent = (): React.JSX.Element => {
  // Inject the FolderTabManager service
  const tabManager = useInjection<FolderTabManager>(serviceIds['Asset/Editor/FolderTabManager'])

  // Use the injected service
  const handleAddTab = () => {
    tabManager.register({
      children: <CustomTabContent />,
      icon: <Icon name={'custom-icon'} />,
      key: 'custom-tab',
      label: 'Custom Tab'
    })
  }

  return <button onClick={handleAddTab}>Add Tab</button>
}
```

This example demonstrates how to use `useInjection` to retrieve and use a service directly within a React functional component.

## Full Code Example
The DI container is used in multiple examples. For instance, refer to the [How to Use the Tab Manager Example](../05_Examples/05_Use_the_Tab_Manager.md). 

### Source

- [Core services](https://github.com/pimcore/studio-ui-bundle/blob/1.x/assets/js/src/core/app/config/services/index.ts)
