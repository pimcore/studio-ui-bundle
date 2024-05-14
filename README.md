# Studio Ui

The Studio UI Bundle provides a Backend UI for Pimcore. It is based on the [React](https://react.dev/) framework.

## How to install

- [Installation](./doc/01_Installation.md)

## How to open

- Login via the classic backend UI
- Access it under `{your-domain}/admin/studio`

## Development

### How to install

1. Navigate to the plugin directory.
2. Change to the assets directory `cd ./assets`
3. Install dependencies `npm install`

### How to build

Create a new build by running:

`npm run build`

### How to run the dev-server (HMR/Live reloading)

#### Pimcore config

Enable your local domains in terms of CSP (Content-Security-Policy) in the Pimcore config file (`./config/config.yml`)

```
pimcore_admin:
    admin_csp_header:
        enabled: true
        additional_urls:
            connect-src:
                - 'ws://localhost:3030'
                - 'ws://localhost:3031'
                - 'http://localhost:3030'
                - 'http://localhost:3031'
            script-src: 
                - 'http://localhost:3030'
                - 'http://localhost:3031'
            font-src:
                - 'http://localhost:3030'
                - 'http://localhost:3031'
            style-src:
                - 'http://localhost:3030'
                - 'http://localhost:3031'  
```

#### How to run and access the dev-server

Use the following command to run the dev-server:

`npm run dev-server`

Now your dev-server should be running. 
You can access it under your normal project domain: 

`{your-domain}/admin/studio`

### Storybook

Pimcore studio is using [Storybook](https://storybook.js.org/) for documentation of react components.

#### Commands

```
npm run storybook // run storybook with live reloading
npm run build-storybook // for building storybook for a static hosting
```

#### Docker environment

To use storybook in your local environment ensure that you open up port `6006`

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

  location ^~ /__webpack_hmr {
      proxy_pass http://node:6006/__webpack_hmr;
  }
}
```

Now ensure that storybook is running via `npm run storybook`.
Finally you can access it under `{your-domain/storybook}`

## Documentation Overview

- [Installation](./doc/01_Installation.md)
- [Getting started with your first plugin](./doc/05_Plugins/README.md)
