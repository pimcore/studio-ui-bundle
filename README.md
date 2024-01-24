# Studio Ui
todo

## Features in a Nutshell

## Storybook

Pimcore studio is using [Storybook](https://storybook.js.org/) for documentation of presentational react components.

### Commands

```
npm run storybook // run storybook with live reloading
npm run build-storybook // for building storybook for a static hosting
```

### Docker environment

To use storybook in your local environment ensure that you open up port `6006`

```
node:
  ports: 
    - "6006:6006"
  ...
```


## Documentation Overview
- [Installation](./doc/01_Installation.md)
