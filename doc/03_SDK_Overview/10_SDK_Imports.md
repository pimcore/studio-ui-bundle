# SDK Imports

The Pimcore Studio UI SDK provides a set of predefined imports that developers can use to build and extend functionalities. These imports act as modules that encapsulate specific functionalities or utilities.

The SDK defines the public API of Studio, meaning that not all components of the UI are exported by default. Only the components and modules intended to be used for extensions are made available through the SDK.

For a full overview of all available import sources, you can refer to the [GitHub repository](https://github.com/pimcore/studio-ui-bundle/tree/1.x/assets/js/src/sdk).

## Folder Structure and Import Paths

The folder structure in the SDK mirrors the import paths. Each folder and `index.ts` in the [SDK](https://github.com/pimcore/studio-ui-bundle/tree/1.x/assets/js/src/sdk) corresponds directly to an importable module. For example, if there is a file located at `sdk/api/asset/index.ts`, you can import it in your project as follows:

```typescript
import { useAssetGetByIdQuery } from '@pimcore/studio-ui-bundle/api/asset';
```

This structure ensures that the imports are intuitive and easy to locate within the SDK directory.

## Different Types of Imports

#### APIs

`@pimcore/studio-ui-bundle/api/*`: Provides access to RTK Query APIs, including hooks for fetching, mutating, and managing data. [See here](09_RTK_Query_API.md) for more details.

#### App Import

`@pimcore/studio-ui-bundle/app`: Provides some general modules like the DI container, APP config, redux store, and router.

#### UI Components

`@pimcore/studio-ui-bundle/components`: Predefined React UI components for building consistent user interfaces. [Read more here](01_UI_Components_and_Storybook.md).

#### Application Modules

`@pimcore/studio-ui-bundle/modules/*`: The various provided modules and parts of the application, such as the asset editor, data object editor, user management, etc.

#### Utils

`@pimcore/studio-ui-bundle/utils`: A collection of helper utilities, such as date and number formatters, UUID generation, and more.

## Example

Here’s an example of how to use an SDK import:

```typescript
// Import and use the Alert component
import { Alert } from '@pimcore/studio-ui-bundle/components';

const App = () => (
    <div>
        <Alert message="This is an alert message!" type="info" />
    </div>
);

export default App;
```

This example demonstrates how to use a simple UI component from the SDK to display an alert message.