# Services and Dependency Injection

Think of services as straightforward objects that assist with specific tasks. To maximize the benefits of services, we’ve introduced a service container using [Inversify](https://github.com/inversify/InversifyJS).  

This container is created early in the application lifecycle, ensuring accessibility throughout the entire app.

For interaction with the service container, the following two main SDK imports are relevant:

```typescript
import { container } from '@pimcore/studio-ui-bundle' // Provides access to the service container
import { serviceIds } from '@pimcore/studio-ui-bundle/app' // Contains identifiers for registered services
```

## Example: Creating a New Tab

Below is an example of how to create and register a new tab using the service container:

```typescript
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

This example demonstrates how to leverage the service container to dynamically add functionality to your application.

### Source

- [Core services](https://github.com/pimcore/studio-ui-bundle/blob/1.x/assets/js/src/core/app/config/services/index.ts)