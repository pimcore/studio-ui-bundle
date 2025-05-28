# Getting Started With Your First Plugin

The Pimcore Studio plugin system allows developers to extend the functionality of Pimcore Studio by creating custom plugins.

Plugins can add new features, modify existing functionality, or integrate with external systems. They can provide additional tools, widgets, or settings that enhance the user experience within Pimcore Studio.

## Getting started

Since there’s no npm package available yet, follow the local development guide to install the Pimcore Studio UI as one of your frontend dependencies. To do this, change to the Pimcore Studio path (vendor/pimcore/studio-ui-bundle/assets) and run these commands:

```
npm install
npm run build-app // for production builds
// or 
npm run dev-app // for development builds 
npm pack --pack-destination ~
```

This will create a installable tar file in our home directory. 

Switch back to your bundle directory. We can now install the package directly in our Bundle via:

```
npm install ~/package-name.tgz
```

To begin, ensure you have a basic [Pimcore Bundle](https://pimcore.com/docs/platform/Pimcore/Extending_Pimcore/Bundle_Developers_Guide/). For this guide, let’s call our plugin `PimcoreStudioUiDemoPluginBundle`.


With our dependency in place we should now setup our bundling process. we recommend using [Symfony Encore](https://symfony.com/doc/current/frontend/encore/installation.html). Later on, you’ll need a generated manifest from it.

> [Example webpack configuration](https://github.com/pimcore/studio-example-bundle/blob/main/assets/webpack.config.js)

Update your package.json with the following commands, to run Symfony Encore:

> [npm commands](https://github.com/pimcore/studio-example-bundle/blob/5715004cf377e91adfd1fce68b054181046edbc0/assets/package.json#L5-L8)

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


