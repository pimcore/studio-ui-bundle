---
title: Studio UI Core Development
---

# Studio UI Core Development

## How to install

1. Navigate to the plugin directory.
2. Change to the assets directory `cd ./assets`
3. Install dependencies `npm install`

## How to build

Create a new build by running:

`npm run build-app`

## How to run the dev-server (HMR/Live reloading)

HMR requires two commands running simultaneously, started in the order listed:

```bash
npm run dev-server-sdk
npm run dev-server
```

The dev server runs on the same URL as the project, with HMR for live reloading.
Access it at:

`{your-domain}/pimcore-studio`

## Storybook

Pimcore Studio uses [Storybook](https://storybook.js.org/) for documentation of React components.

### Commands

```bash
npm run storybook # run storybook with live reloading
npm run build-storybook # for building storybook for a static hosting
```

### Docker environment

For local Docker environments, expose port `6006`:

```yaml
node:
  ports:
    - "6006:6006"
  ...
```

### Nginx configuration

Add the following Nginx configuration:

```nginx
server {
  location ^~ /storybook/ {
      proxy_pass http://node:6006/;
  }

  location ^~ /rsbuild-hmr?compilationId=web_pimcore_studio_ui_bundle_core {
      proxy_pass http://node:6006/rsbuild-hmr?compilationId=web_pimcore_studio_ui_bundle_core;
  }
}
```

Start Storybook with `npm run storybook`.
Access it at `{your-domain}/storybook`

## How to test the package

Build and link the package locally for testing:

```bash
npm run build-app
npm run build-rsbuild-plugins
npm run generate-types
npm link

# in your bundle
npm link @pimcore/studio-ui-bundle
```

:::note
Re-run `npm link @pimcore/studio-ui-bundle` in the bundle after every `npm install`, as npm install removes symlinks.
:::
