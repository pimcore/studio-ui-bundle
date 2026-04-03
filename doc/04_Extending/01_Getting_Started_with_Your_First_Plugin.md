---
title: Getting Started With Your First Plugin
---

# Getting Started With Your First Plugin

The Pimcore Studio plugin system allows developers to extend the functionality of Pimcore Studio by creating custom plugins.

Plugins provide additional tools, widgets, or settings that enhance the user experience within Pimcore Studio.

## Getting started

Create your Pimcore Studio Plugin either in a [Pimcore Bundle](https://pimcore.com/docs/platform/Pimcore/Extending_Pimcore/Bundle_Developers_Guide/)
(the way to go when your Studio Plugin should be reused in multiple Pimcore installations), or directly in your Pimcore App
without creating a Pimcore Bundle.

### Setup JS assets

To get started, create an assets root folder for your application (e.g. `/assets`) and install the 
[Pimcore Studio UI npm package](https://www.npmjs.com/package/@pimcore/studio-ui-bundle?activeTab=readme), which offers full TypeScript support for the Pimcore SDK.

```bash
npm install @pimcore/studio-ui-bundle react@18.3.x react-dom@18.3.x
```

:::tip
To adapt early to new features, use the canary release that includes typings for the most recent .x-branch updates:
:::

```bash
npm install @pimcore/studio-ui-bundle@canary react@18.3.x react-dom@18.3.x
```

:::warning
Ensure the React version matches the React version Pimcore Studio uses.
:::

With our dependency in place we should now setup our bundling process. We recommend [Rsbuild](https://rsbuild.rs/). Of course you also can choose your preferred custom bundling process,
or add additional steps like linting etc. to the bundling process. 

For rsbuild you need to add additional `rsbuild` dependencies to bundle your application:
```bash
npm add @rsbuild/core @rsbuild/plugin-react @module-federation/rsbuild-plugin -D
```

Then create a `rsbuild.config.ts` file in your assets root folder to configure the bundling: 
[Example Rsbuild configuration](https://github.com/pimcore/studio-example-bundle/blob/main/assets/rsbuild.config.ts)

Additionally, we need to create a `main.ts` in a source folder (e.g. `/assets/js/src`) which serves as the entrypoint in the rsbuild and 
is referenced in the [rsbuild.config.ts](https://github.com/pimcore/studio-example-bundle/blob/main/assets/rsbuild.config.ts#L48). 
Start with an empty file.

Update your package.json with the following commands:
[npm commands](https://github.com/pimcore/studio-example-bundle/blob/main/assets/package.json#L5-L7)

Create the main plugin file `index.ts` and export it in the `plugins.ts` file in the source folder (e.g. `/assets/js/src`). 
Use our boilerplate to get started quickly:
[Plugin boilerplate](https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/examples/boilerplate/index.ts)
[Plugins Export example file](https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/plugins.ts)

The assets folder should now contain these files:
```text
assets
 |- js
    |- src
        |- index.ts
        |- main.ts
        |- plugins.ts
 |- node_modules
 |- package-lock.json
 |- package.json
 |- rsbuild.config.ts

```

This will register a simple plugin in Pimcore Studio.

Now that everything is in place, it’s time to bundle the files. Run:

```bash
npm run build        # production
npm run dev          # development with watch
npm run dev-server   # development with live reloading
```

When the command is finished you should have a few new files in your `./public/build` directory.


### Register JS Entrypoint

Most important is the generated `entrypoints.json` manifest in `./public/build`, which tells Pimcore where to find the generated frontend files.
Register a `WebpackEntryPointProviderInterface` service in the Pimcore service container:

- [WebpackEntryPointProvider.php](https://github.com/pimcore/studio-example-bundle/blob/main/src/Webpack/WebpackEntryPointProvider.php)
- [services.yaml](https://github.com/pimcore/studio-example-bundle/blob/5715004cf377e91adfd1fce68b054181046edbc0/config/services.yaml#L12-L14)


### Check
Finally, we should ensure that our plugin is working.
Place a `console.log()` in one of the plugin methods.
Quickly recompile the app by using one of the npm commands listed above. On success, you should see your `console.log()`.

### Further reading

- [Plugin Development Examples](./02_Plugin_Development_Examples/README.md)
- [Studio UI Core Development](../05_Development_Details/01_Studio_UI_Core_Development.md)


