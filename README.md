# Studio Ui

## How to install

- [Installation](./doc/01_Installation.md)

## How to open

- Access it under `{your-domain}/admin/studio`

## Development

### How to install

1. Navigate to the plugin folder.
2. Change to the assets directory `cd ./assets`
3. Install dependencies `npm install`

### How to build

Create a new build by running:

`npm run build`

### Storybook

Pimcore studio is using [Storybook](https://storybook.js.org/) for documentation of presentational react components.

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
