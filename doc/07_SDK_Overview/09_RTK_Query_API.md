# RTK Query API

The RTK Query API (slices) is automatically generated via [@rtk-query/codegen-openapi](https://redux-toolkit.js.org/rtk-query/usage/code-generation) from our [OpenAPI](https://www.openapis.org/) specification. This ensures that the API definitions, including schemas and types, are always consistent with the backend. By automating this process, we reduce manual effort, minimize errors, and ensure that the API is always up-to-date with backend changes.

The generated API slices are fully typed, providing strong TypeScript support for a better developer experience and fewer runtime errors. These slices integrate seamlessly with [RTK Query](https://redux-toolkit.js.org/rtk-query/overview), enabling features such as:

- **Auto-Generated Types**: The API slices include TypeScript types that are automatically generated from the OpenAPI specification. This ensures that all request parameters, response data, and other API-related structures are strongly typed, reducing runtime errors and improving code quality.
- **Data Caching**: Automatically cache API responses for efficient data reuse.
- **Automatic Refetching**: Keep your data fresh by refetching it when necessary.
- **Error Handling**: Simplify error management with built-in mechanisms.

### SDK Imports

You can import the generated API slices directly from our SDK. This makes it easy to integrate the API into your application without worrying about the underlying implementation details. For an overview of available imports, see the [SDK API directory](https://github.com/pimcore/studio-ui-bundle/tree/1.x/assets/js/src/sdk/api).

> **Hint:** The structure of the API imports mirrors the folder structure of the linked SDK API directory.

#### Examples:
```typescript
// Fetch details of an asset by its ID
import { useAssetGetByIdQuery } from '@pimcore/studio-ui-bundle/api/asset';

// Add a new data object to the system
import { useDataObjectAddMutation } from '@pimcore/studio-ui-bundle/api/data-object';

// Submit a workflow action for a specific element
import { useWorkflowActionSubmitMutation } from '@pimcore/studio-ui-bundle/api/workflow';
```

In these examples, all hooks are generated from the OpenAPI specification. They can be used to fetch data, manage loading states, and handle errors seamlessly.

For a general explanation of how Studio SDK imports work, refer to the [SDK Imports Section](./10_SDK_Imports.md).
