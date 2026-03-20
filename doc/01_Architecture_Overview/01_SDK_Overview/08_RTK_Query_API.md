---
title: RTK Query API
---

# RTK Query API

The RTK Query API (slices) is automatically generated via
[@rtk-query/codegen-openapi](https://redux-toolkit.js.org/rtk-query/usage/code-generation)
from the [OpenAPI](https://www.openapis.org/) specification.
This ensures that API definitions, including schemas and types, stay consistent with the backend.
Automating this process reduces manual effort, minimizes errors,
and keeps the API up-to-date with backend changes.

The generated API slices are fully typed, providing strong TypeScript support
and fewer runtime errors. These slices integrate with
[RTK Query](https://redux-toolkit.js.org/rtk-query/overview), enabling features such as:

- **Auto-Generated Types**: The API slices include TypeScript types generated from the OpenAPI specification.
  All request parameters, response data, and other API-related structures are strongly typed.
- **Data Caching**: Automatically cache API responses for efficient data reuse.
- **Automatic Refetching**: Keep your data fresh by refetching it when necessary.
- **Error Handling**: Simplify error management with built-in mechanisms.

### SDK Imports

Import the generated API slices directly from the SDK.
For an overview of available imports, see the
[SDK API directory](https://github.com/pimcore/studio-ui-bundle/tree/1.x/assets/js/src/sdk/api).

:::tip
The structure of the API imports mirrors the folder structure of the linked SDK API directory.
:::

#### Examples:
```typescript
// Fetch details of an asset by its ID
import { useAssetGetByIdQuery } from '@pimcore/studio-ui-bundle/api/asset';

// Add a new data object to the system
import { useDataObjectAddMutation } from '@pimcore/studio-ui-bundle/api/data-object';

// Submit a workflow action for a specific element
import { useWorkflowActionSubmitMutation } from '@pimcore/studio-ui-bundle/api/workflow';
```

All hooks above are generated from the OpenAPI specification.
They handle data fetching, loading states, and error management.

For a general explanation of how Studio SDK imports work, refer to the [SDK Imports Section](./09_SDK_Imports.md).
