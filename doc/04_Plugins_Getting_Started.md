# Getting Started With Your First Plugin

The Pimcore Studio plugin system allows developers to extend the functionality of Pimcore Studio by creating custom plugins.

Plugins can add new features, modify existing functionality, or integrate with external systems. They can provide additional tools, widgets, or settings that enhance the user experience within Pimcore Studio.

## Getting started

You can create your Pimcore Studio Plugin either in a [Pimcore Bundle](https://pimcore.com/docs/platform/Pimcore/Extending_Pimcore/Bundle_Developers_Guide/) 
(the way to go when your Studio Plugin should be reused in multiple Pimcore installations). Or you can also create the Pimcore Studio Plugin directly in your Pimcore App
without creating a Pimcore Bundle. 

### Setup JS assets

To get started, create a assets root folder for your application (e.g. `/assets`) and install the 
[Pimcore Studio UI npm package](https://www.npmjs.com/package/@pimcore/studio-ui-bundle?activeTab=readme), which offers full TypeScript support for the Pimcore SDK.

```
npm install @pimcore/studio-ui-bundle react@18.3.x react-dom@18.3.x
```

💡 Want to adapt early to new features? There's also a canary release that includes typings for the most recent .x-branch updates:

```
npm install @pimcore/studio-ui-bundle@canary react@18.3.x react-dom@18.3.x
```

Make sure the react version matches the react version studio is using. 

With our dependency in place we should now setup our bundling process. We recommend [Rsbuild](https://rsbuild.rs/). Of course you also can choose your preferred custom bundling process,
or add additional steps like linting etc. to the bundling process. 

For rsbuild you need to add additional `rsbuild` dependencies in order to be able to bundle your application:
```
npm add @rsbuild/core @rsbuild/plugin-react @module-federation/rsbuild-plugin -D
```

Then create a `rsbuild.config.ts` file in your assets root folder to configure the bundling: 
[Example Rsbuild configuration](https://github.com/pimcore/studio-example-bundle/blob/main/assets/rsbuild.config.ts)

Additionally, we need to create a `main.ts` in a source folder (e.g. `/assets/js/src`) which serves as the entrypoint in the rsbuild and 
is referenced in the [rsbuild.config.ts](https://github.com/pimcore/studio-example-bundle/blob/main/assets/rsbuild.config.ts#L48). 
For the beginning, this can be an empty file. 

Update your package.json with the following commands, to run Symfony Encore:
[npm commands](https://github.com/pimcore/studio-example-bundle/blob/main/assets/package.json#L5-L7)

Finally, let's create our main plugin file `index.ts` and export it in the `plugins.ts` file in the source folder (e.g. `/assets/js/src`). 
Use our boilerplate to get started quickly:
[Plugin boilerplate](https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/examples/boilerplate/index.ts)
[Plugins Export example file](https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/plugins.ts)

Now you should have following files in your assets folder: 
```
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

This will register a simple plugin in our Pimcore Studio UI.

Now that everthing is in place, it’s time to bundle our files. Simply run:

```
npm run build // for production
// or 
npm run dev // for development
// or 
npm run dev-server // for development with live reloading
```

When the command is finished you should have a few new files in your `./public/build` directory.


### Register JS entrypoint in Webpack

Most important for us is the `entrypoint.json`, because we have to tell Pimcore where it will find our generated frontend files. 
For that we need to register a `WebpackEntryPointProviderInterface` service in our Pimcore service container:

- [WebpackEntryPointProvider.php](https://github.com/pimcore/studio-example-bundle/blob/main/src/Webpack/WebpackEntryPointProvider.php)
- [services.yaml](https://github.com/pimcore/studio-example-bundle/blob/5715004cf377e91adfd1fce68b054181046edbc0/config/services.yaml#L12-L14)


### Check
Finally, we should ensure that our plugin is working.
Place a `console.log()` in one of the plugin methods.
Quickly recompile the app by using one of the npm commands listed above. When everything worked well, you should see your `console.log()`.

### Further reading

- [Plugin Development Examples](./05_Examples/README.md)
- [Studio UI Core Development](./09_Studio_UI_Core_Development.md)


