# Including Additional CSS or JS Files

In general, Studio UI plugins require a Webpack build and entry point files to function correctly. For more details, refer to the [Getting started with your first plugin guide](../04_Plugins_Getting_Started.md).

However, if you want to include additional CSS or JS files that are not part of the frontend build (e.g., to add a basic CSS class or include an external script), you can configure them via the config tree as shown below:

## Regular Studio UI Resources

For the main Studio UI interface:

```yaml
pimcore_studio_ui:
   static_resources:
      css:
         - my-custom-css.css
      js:
         - my-custom-js.js
```

## Document Editmode Resources

For document editor iframes (editmode), you can include additional resources that will be loaded specifically in the editmode context:

```yaml
pimcore_studio_ui:
   static_resources:
      editmode:
         css:
            - my-editmode-styles.css
         js:
            - my-editmode-scripts.js
```

## Multi-Bundle Configuration

When multiple bundles define static resources, they will be automatically merged together. For example:

**Bundle A:**
```yaml
pimcore_studio_ui:
   static_resources:
      css:
         - bundle-a-styles.css
      editmode:
         css:
            - bundle-a-editmode.css
```

**Bundle B:**
```yaml
pimcore_studio_ui:
   static_resources:
      css:
         - bundle-b-styles.css
      editmode:
         css:
            - bundle-b-editmode.css
```

**Result:** All files from both bundles will be included in their respective contexts, with duplicates automatically removed.

