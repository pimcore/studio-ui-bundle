# Studio UI Core Development

### How to install

1. Navigate to the plugin directory.
2. Change to the assets directory `cd ./assets`
3. Install dependencies `npm install`

### How to build

Create a new build by running:

`npm run build-app`

### How to run the dev-server (HMR/Live reloading)

To use hmr you need two commands constantly running.
And they need to be executed in the order like listed:

```
npm run dev-server-sdk
npm run dev-server
```

Now your dev-server should be running (the dev server started on the same URL, but it’s using Webpack HMR).  
You can access it under your normal project domain: 

`{your-domain}/pimcore-studio`

### Storybook

Pimcore studio is using [Storybook](https://storybook.js.org/) for documentation of React components.

#### Commands

```
npm run storybook // run storybook with live reloading
npm run build-storybook // for building storybook for a static hosting
```

#### Docker environment

To use Storybook in your local environment ensure that you open up port `6006`

```
node:
  ports: 
    - "6006:6006"
  ...
```

#### Nginx configuration

You should take care of the following configuration:

```
server {
  location ^~ /storybook/ {
      proxy_pass http://node:6006/;
  }

  location ^~ /rsbuild-hmr?compilationId=web_pimcore_studio_ui_bundle_core {
      proxy_pass http://node:6006/rsbuild-hmr?compilationId=web_pimcore_studio_ui_bundle_core;
  }
}
```

Now ensure that Storybook is running via `npm run storybook`.
Finally, you can access it under `{your-domain/storybook}`

### How to test the package

To test or debug implementations you can build the package locally:

```
npm run build-app
npm run build-rsbuild-plugins
npm run generate-types
npm link

// in your bundle
npm link @pimcore/studio-ui-bundle
```

Please note that the link in the bundle needs to be recreated after an npm install in the bundle.
