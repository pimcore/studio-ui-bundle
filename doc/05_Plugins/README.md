# Plugin system

The Pimcore Studio plugin system allows developers to extend the functionality of Pimcore Studio by creating custom plugins.

Plugins can add new features, modify existing functionality, or integrate with external systems. They can provide additional tools, widgets, or settings that enhance the user experience within Pimcore Studio.

## Getting started

To begin, ensure you have a basic [Pimcore Bundle](https://pimcore.com/docs/platform/Pimcore/Extending_Pimcore/Bundle_Developers_Guide/). For this guide, let’s call our plugin `PimcoreStudioUiDemoPluginBundle`.

Since there’s no npm package available yet, follow the local development guide to install the Pimcore Studio UI as one of your frontend dependencies.

With our dependency in place we should now setup our bundling process. we recommend using [Symfony Encore](https://symfony.com/doc/current/frontend/encore/installation.html). Later on, you’ll need a generated manifest from it.

``` javascript
const Encore = require('@symfony/webpack-encore');
const webpack = require('webpack');
const path = require('path');
// Install this package for live reloading during development
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
  // directory where compiled assets will be stored
  .setOutputPath(path.resolve(__dirname, 'public', 'build'))
  // public path used by the web server to access the output path
  .setPublicPath('/bundles/pimcorestudiouidemoplugin/build')
  
  /*
    * ENTRY CONFIG
    *
    * Each entry will result in one JavaScript file (e.g. app.js)
    * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
    */
  .addEntry('main', path.resolve(__dirname, 'assets', 'js', 'src', 'main.ts'))

  // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
  .splitEntryChunks()

  // will require an extra script tag for runtime.js
  // but, you probably want this, unless you're building a single-page app
  .disableSingleRuntimeChunk()

  /*
    * FEATURE CONFIG
    *
    * Enable & configure other features below. For a full
    * list of features, see:
    * https://symfony.com/doc/current/frontend.html#adding-more-features
    */
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableSourceMaps(!Encore.isProduction())
  // enables hashed filenames (e.g. app.abc123.css)
  .enableVersioning(Encore.isProduction())

  // uncomment if you use TypeScript
  .enableTypeScriptLoader()

  // uncomment if you use React
  .enableReactPreset()

  // install @svgr/webpack for this rule
  // You will be able to directly inline SVGs after importing them
  .addRule({
    test: /\inline\.svg$/i,
    use: [{ 
      loader: '@svgr/webpack', 
      options: { 
        icon: true,
        typescript: true
      } 
    }],
  })

  // Dev-server for local development with live-reloading
  .configureDevServerOptions(options => {
    options.host = '0.0.0.0';
    options.hot =  true;
    options.port = 3030;
    options.allowedHosts = 'all';
  })

  // Important! Reference this vendor-manifest in your build.
  // It will take care of injecting Ant-Design, React, etc. without the need to bundle it in your plugin.
  .addPlugin(new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: path.join(__dirname, 'node_modules', 'pimcore-studio-ui', 'dist', 'vendor',  'vendor-manifest.json')
  }))
;

if (!Encore.isDevServer()) {
  // only needed for CDN's or sub-directory deploy
  Encore
    .setManifestKeyPrefix('bundles/pimcorestudiouidemoplugin/build')
  ;
}

// Additional dev-server configuration
if (Encore.isDevServer()) {
  Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .addPlugin(new ReactRefreshPlugin())
  ;
}

let config = Encore.getWebpackConfig();

// Exclude inline SVGs for package "@svgr/webpack" from the default encore rule
config.module.rules.forEach(rule => {
  if (rule.test.toString().includes('|svg|')) {
    rule.exclude = /\.inline\.svg$/
  }
})

module.exports = config;
```

Update your package.json with the following commands, to run Symfony Encore:

``` json
"scripts": {
  "dev-server": "encore dev-server --port 3030 --hot",
  "dev": "encore dev",
  "watch": "encore dev --watch",
  "build": "encore production --progress"
},

```

We are now able to bundle files. So, let's create our main entry point `main.ts`. 

``` typescript
import { Pimcore } from 'pimcore-studio-ui'

Pimcore.pluginSystem.registerPlugin({
  name: 'pimcore-demo-plugin',

  // Register and overwrite services here
  onInit: ({ container }): void => {
    console.log('Init my plugin')
  },

  // register modules here
  onStartup: ({ moduleSystem }): void => {
    console.log('Start up my plugin')
  }
})

```

This will register a simple plugin in our Pimcore Studio UI.

Now that the main entry point is in place, it’s time to bundle our files. Simply run:

```
npm run build
```

When the command is finished you should have a few new files in your `./public/build` directory. Most important for us is the `entrypoint.json`, because we still have to tell Pimcore where it will find our generated frontend files. For that we need to register a `WebpackEntryPointProviderInterface` service in our Pimcore service container:

``` PHP
<?php
declare(strict_types=1);

namespace Pimcore\Bundle\StudioUiDemoPluginBundle\Webpack;

use Pimcore\Bundle\StudioUiBundle\Webpack\WebpackEntryPointProviderInterface;

final class WebpackEntryPointProvider implements WebpackEntryPointProviderInterface
{
    public function getEntryPointsJsonLocations(): array
    {
        return [__DIR__ . '/../../public/build/entrypoints.json'];
    }

    public function getEntryPoints(): array
    {
        return ['main'];
    }

    public function getOptionalEntryPoints(): array
    {
        return [];
    }

}

```

```YAML
# services.yaml

services:
    Pimcore\Bundle\StudioUiDemoPluginBundle\Webpack\WebpackEntryPointProvider:
        tags:
            - { name: pimcore_studio_ui.webpack_entry_point_provider }
```

Now just ensure that our bundle is installed. And finally we should see our `console.log()` in the browser console when we access our Pimcore Studio in the browser.

### Further guides

- [How to register a new tab for a folder asset](./01_Register_a_tab_for_a_folder_asset.md)
- [How to add a custom icon](./02_Adding_custom_icons.md)
- [How to add your first widget](03_Add_your_first_widget.md)

## Local development

For local development we have to create a local package of the Pimcore Studio UI first. For that we simply have to navigate to our package.json and run the following commands:

```
npm install
npm run build
npm pack --pack-destination ~
```

This will create a installable tar file in our home directory. We can now install the package directly in our Bundle via:

```
npm install ~/package-name.tgz
```
