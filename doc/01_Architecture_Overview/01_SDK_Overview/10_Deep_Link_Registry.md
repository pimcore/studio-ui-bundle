---
title: Deep Link Registry
---

# Deep Link Registry

The Deep Link Registry lets a bundle open its own content from a link to Pimcore Studio. A link has the form `<studio base url>?link=<name>&<your parameters>`, for example `https://example.com/pimcore-studio/?link=my-bundle-report&report=42`.

When Studio starts with such an address, it waits until the widget layout of the previous session is restored, calls the handler registered under `<name>` once with all query parameters, and then removes the query from the address, so a reload does not open the link again. When the user has to log in first, the login screen keeps the address, so the handler runs after the login.

## Registering a Handler

Register the handler in a module's `onInit`:

```typescript
import { container } from '@pimcore/studio-ui-bundle'
import { serviceIds } from '@pimcore/studio-ui-bundle/app'
import { type DeepLinkRegistryInterface } from '@pimcore/studio-ui-bundle/modules/app'

const deepLinkRegistry = container.get<DeepLinkRegistryInterface>(
  serviceIds['App/DeepLinkRegistry/DeepLinkRegistry']
)

deepLinkRegistry.register({
  name: 'my-bundle-report',
  handle: async (params: URLSearchParams) => {
    const reportId = params.get('report')
    // Validate the parameters and open the widget, select the node, ...
  }
})
```

- The name is the value of the `link` parameter and must be unique; prefix it with your bundle. A second handler with the same name is reported and ignored.
- An unknown name, a thrown error and a rejected promise are reported with Studio's error handling.
- The parameters come from an address anyone can send: validate them before use and open only what the current user may see.
