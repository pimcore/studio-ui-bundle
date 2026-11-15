---
title: Parallel Asset Uploads
description: How many asset uploads Pimcore Studio sends at the same time.
---

# Parallel Asset Uploads

When several assets are uploaded at once, Pimcore Studio sends at most five uploads at the same time
and queues the rest. To change that limit, add this configuration:

```yaml
pimcore_studio_ui:
    asset_upload:
        max_parallel_uploads: 5
```

Without a limit, the browser starts every selected file at once. Over HTTP/2 they all reach the
server together, which can occupy every available PHP-FPM worker and make uploads fail with a `500`
or `502`. Lower the value if that happens, raise it if uploads feel slow and the server has capacity.
