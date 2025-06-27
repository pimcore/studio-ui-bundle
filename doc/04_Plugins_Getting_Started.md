# Getting Started With Your First Plugin

The Pimcore Studio plugin system allows developers to extend the functionality of Pimcore Studio by creating custom plugins.

Plugins can add new features, modify existing functionality, or integrate with external systems. They can provide additional tools, widgets, or settings that enhance the user experience within Pimcore Studio.

## Getting started

To get started, install the [Pimcore Studio UI npm package](https://www.npmjs.com/package/@pimcore/studio-ui-bundle?activeTab=readme), which offers full TypeScript support for the Pimcore SDK.

```
npm install @pimcore/studio-ui-bundle
```

💡 Want to adapt early to new features? There's also a canary release that includes typings for the most recent .x-branch updates:

```
npm install @pimcore/studio-ui-bundle@canary
```

Also ensure you have a basic [Pimcore Bundle](https://pimcore.com/docs/platform/Pimcore/Extending_Pimcore/Bundle_Developers_Guide/). For this guide, let’s call our plugin `PimcoreStudioUiDemoPluginBundle`.


With our dependency in place we should now setup our bundling process. We recommend [Rsbuild](https://rsbuild.rs/).

> [Example Rsbuild configuration](https://github.com/pimcore/studio-example-bundle/blob/main/assets/rsbuild.config.ts)

Update your package.json with the following commands, to run Symfony Encore:

> [npm commands](https://github.com/pimcore/studio-example-bundle/blob/14b74bc27c25598cb872c704470c90c3d8c6ca6a/assets/package.json#L5-L7)

We are now able to bundle files. So, let's create our main entry point `main.ts`. Use our boilerplate to get started quickly:

> [Plugin boilerplate](https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/examples/boilerplate/index.ts)

This will register a simple plugin in our Pimcore Studio UI.

Now that the main entry point is in place, it’s time to bundle our files. Simply run:

```
npm run build // for production
// or 
npm run dev // for development
// or 
npm run dev-server // for development with live reloading
```

When the command is finished you should have a few new files in your `./public/build` directory. Most important for us is the `entrypoint.json`, because we still have to tell Pimcore where it will find our generated frontend files. For that we need to register a `WebpackEntryPointProviderInterface` service in our Pimcore service container:

> [WebpackEntryPointProvider.php](https://github.com/pimcore/studio-example-bundle/blob/main/src/Webpack/WebpackEntryPointProvider.php)

> [services.yaml](https://github.com/pimcore/studio-example-bundle/blob/5715004cf377e91adfd1fce68b054181046edbc0/config/services.yaml#L12-L14)

Finally, we should ensure that our plugin is working.
Place a `console.log()` in one of the plugin methods.
Quickly recompile the app by using one of the npm commands listed above. When everything worked well, you should see your `console.log()`.

### Further reading

- [Plugin Development Examples](./05_Examples/README.md)
- [Studio UI Core Development](./doc/09_Studio_UI_Core_Development.md)


