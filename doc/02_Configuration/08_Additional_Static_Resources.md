# Including Additional CSS or JS Files

In general, Studio UI plugins require a Webpack build and entry point files to function correctly. For more details, refer to the [Plugins documentation](../05_Plugins/README.md).

However, if you want to include additional CSS or JS files that are not part of the frontend build (e.g., to add a basic CSS class or include an external script), you can configure them via the config tree as shown below:

```yaml
pimcore_studio_ui:
   static_resources:
      css:
         - my-custom-css.css
      js:
         - my-custom-js.js
```

