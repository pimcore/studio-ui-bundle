/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - Pimcore Open Core License (POCL)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
 */

/* eslint-disable  @typescript-eslint/no-var-requires */
const Encore = require('@symfony/webpack-encore')
const path = require('path')
const webpack = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev')
}

Encore
  // directory where compiled assets will be stored
  .setOutputPath(path.resolve(__dirname, 'dist', 'sdk'))
  .setPublicPath('/dist/')

  /*
    * ENTRY CONFIG
    *
    * Each entry will result in one JavaScript file (e.g. app.js)
    * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
    */
  .addEntry('main', path.resolve(__dirname, 'js', 'src', 'sdk', 'main.ts'))
  .addEntry('components/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'components', 'index.ts'))
  .addEntry('app/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'app', 'index.ts'))
  .addEntry('api/asset/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'api', 'asset', 'index.ts'))
  .addEntry('api/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'api', 'index.ts'))
  .addEntry('api/custom-metadata/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'api', 'custom-metadata', 'index.ts'))
  .addEntry('api/data-object/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'api', 'data-object', 'index.ts'))
  .addEntry('api/dependencies/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'api', 'dependencies', 'index.ts'))
  .addEntry('api/documents/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'api', 'documents', 'index.ts'))
  .addEntry('api/elements/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'api', 'elements', 'index.ts'))
  .addEntry('api/metadata/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'api', 'metadata', 'index.ts'))
  .addEntry('api/perspectives/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'api', 'perspectives', 'index.ts'))
  .addEntry('api/properties/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'api', 'properties', 'index.ts'))
  .addEntry('api/role/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'api', 'asset', 'index.ts'))
  .addEntry('api/schedule/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'api', 'schedule', 'index.ts'))
  .addEntry('api/settings/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'api', 'settings', 'index.ts'))
  .addEntry('api/tags/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'api', 'tags', 'index.ts'))
  .addEntry('api/thumbnails/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'api', 'thumbnails', 'index.ts'))
  .addEntry('api/translations/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'api', 'translations', 'index.ts'))
  .addEntry('api/user/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'api', 'user', 'index.ts'))
  .addEntry('api/version/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'api', 'version', 'index.ts'))
  .addEntry('api/workflow/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'api', 'workflow', 'index.ts'))
  .addEntry('modules/app/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'modules', 'app', 'index.ts'))
  .addEntry('modules/asset/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'modules', 'asset', 'index.ts'))
  .addEntry('modules/class-definitions/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'modules', 'class-definitions', 'index.ts'))
  .addEntry('modules/data-object/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'modules', 'data-object', 'index.ts'))
  .addEntry('modules/element/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'modules', 'element', 'index.ts'))
  .addEntry('modules/icon-library/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'modules', 'icon-library', 'index.ts'))
  .addEntry('modules/user/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'modules', 'user', 'index.ts'))
  .addEntry('modules/widget-manager/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'modules', 'widget-manager', 'index.ts'))
  .addEntry('modules/utils/index', path.resolve(__dirname, 'js', 'src', 'sdk', 'utils', 'index.ts'))

// enables the Symfony UX Stimulus bridge (used in assets/bootstrap.js)
// .enableStimulusBridge('./assets/controllers.json')

  // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
  // .splitEntryChunks()

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
  // .enableVersioning(Encore.isProduction())

  // .configureBabel((config) => {
  //   config.plugins.push('@babel/plugin-transform-class-properties');
  // })

  // enables @babel/preset-env polyfills
  // .configureBabelPresetEnv((config) => {
  //     config.useBuiltIns = 'usage';
  //     config.corejs = 3;
  // })

  // enables Sass/SCSS support
  // .enableSassLoader()

  // uncomment if you use TypeScript
  .enableTypeScriptLoader()

  // uncomment if you use React
  .enableReactPreset()

  .addRule({
    test: /inline\.svg$/i,
    use: [{
      loader: '@svgr/webpack',
      options: {
        icon: true,
        typescript: true
      }
    }]
  })

  // uncomment to get integrity="..." attributes on your script & link tags
  // requires WebpackEncoreBundle 1.4 or higher
  // .enableIntegrityHashes(Encore.isProduction())

  // uncomment if you're having problems with a jQuery plugin
  // .autoProvidejQuery()

  .addAliases({
    '@Pimcore': path.resolve(__dirname, 'js', 'src', 'core'),
    '@test-utils': path.resolve(__dirname, 'js', 'test-utils')
  })

  .addPlugin(
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.join(__dirname, 'dist', 'vendor',  'vendor-manifest.json'),
    }),
  )

  .addPlugin(
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.join(__dirname, 'dist', 'core-dll', 'core-manifest.json'),
    }),
  )

  .addPlugin(
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  )

  .addPlugin(new webpack.BannerPlugin({
    banner: `
      /**
       * Pimcore
       *
       * This source file is available under two different licenses:
       * - Pimcore Open Core License (POCL)
       * - Pimcore Commercial License (PCL)
       * Full copyright and license information is available in
       * LICENSE.md which is distributed with this source code.
       *
       *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
       *  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
       */
    `
  }))

  // .addPlugin(new ForkTsCheckerWebpackPlugin())

  .configureSplitChunks

if (!Encore.isDevServer() && !Encore.isProduction()) {
  Encore
    .addPlugin(new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }))
}

let config = Encore.getWebpackConfig()

// Exclude inline SVGs for package "@svgr/webpack" from the default encore rule
config.module.rules.forEach(rule => {
  if (rule.test.toString().includes('|svg|')) {
    rule.exclude = /\.inline\.svg$/
  }
})

config = {
  ...config,

  output: {
    ...config.output,
    library: 'pimcore_studio_ui_sdk',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true
  },
}

module.exports = config
