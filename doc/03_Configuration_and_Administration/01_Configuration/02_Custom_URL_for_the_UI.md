---
title: Custom URL for the UI
---

# Custom URL for the UI

To change the URL, add this configuration:

```yaml
pimcore_studio_ui:
    url_path: '/my-backend'
```

Pimcore Studio is then accessible under `{your-domain}/my-backend`.

## Keep dependent paths in sync

Some settings hold a Pimcore Studio UI path of their own and do not follow `url_path` automatically. Change
them alongside it, or the feature that uses them lands on a `404`:

| Setting | Default | Change it to |
|---|---|---|
| `pimcore_studio_backend.oauth.consent_path` | `/pimcore-studio/oauth/consent` | `/my-backend/oauth/consent` |

`consent_path` is where the OAuth authorize endpoint sends the browser for login and consent. It only matters
when the embedded OAuth authorization server in the Studio Backend Bundle is enabled, but when it is, an
unchanged value breaks every authorization request at its first redirect.