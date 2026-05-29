---
title: Including Additional CSS or JS Files
---

# Including Additional CSS or JS Files

Pimcore Studio plugins typically require a frontend build and entry point files.
For details, refer to the [Getting started with your first plugin guide](../../04_Extending/01_Getting_Started_with_Your_First_Plugin.md).

However, if you want to include additional CSS or JS files that are not part of the frontend build (e.g., to add a basic CSS class or include an external script), configure them in the config tree.

> **Important — use absolute paths**
>
> The values configured below are rendered verbatim into `<link href="...">` and `<script src="...">` tags.
> Always provide an **absolute, web-accessible URL path** (starting with `/`) or a full external URL — relative values like `my-custom-css.css` will not resolve correctly.
>
> Typical sources for these files:
> - **Files shipped by a Pimcore bundle:** place them in the bundle's `public/` directory and run `bin/console assets:install --symlink --relative`. They are then served from `/bundles/<bundle-name>/...` (the bundle name is the lowercased class name without the `Bundle` suffix, e.g. `MyCustomBundle` → `/bundles/mycustom/`).
> - **Files in the application's `public/` directory:** they are served from the path they live at, e.g. `public/static/custom.css` → `/static/custom.css`.
> - **External resources:** provide the full URL, e.g. `https://cdn.example.com/lib.js`.

## Regular Pimcore Studio Resources

For the main Pimcore Studio interface:

```yaml
pimcore_studio_ui:
   static_resources:
      css:
         - /bundles/mycustom/css/my-custom-css.css
         - /static/global-overrides.css
      js:
         - /bundles/mycustom/js/my-custom-js.js
         - https://cdn.example.com/some-lib.min.js
```

## Document Editmode Resources

For document editor iframes (editmode), you can include additional resources that will be loaded specifically in the editmode context:

```yaml
pimcore_studio_ui:
   static_resources:
      editmode:
         css:
            - /bundles/mycustom/css/my-editmode-styles.css
         js:
            - /bundles/mycustom/js/my-editmode-scripts.js
```

## Multi-Bundle Configuration

When multiple bundles define static resources, they will be automatically merged together. For example:

**Bundle A:**
```yaml
pimcore_studio_ui:
   static_resources:
      css:
         - /bundles/bundlea/css/bundle-a-styles.css
      editmode:
         css:
            - /bundles/bundlea/css/bundle-a-editmode.css
```

**Bundle B:**
```yaml
pimcore_studio_ui:
   static_resources:
      css:
         - /bundles/bundleb/css/bundle-b-styles.css
      editmode:
         css:
            - /bundles/bundleb/css/bundle-b-editmode.css
```

**Result:** All files from both bundles will be included in their respective contexts, with duplicates automatically removed.

