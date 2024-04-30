const Encore = require('@symfony/webpack-encore');
const path = require('path');
var { DllPlugin } = require('webpack');

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
  .setOutputPath(path.resolve(__dirname, 'public', 'vendor'))
  // public path used by the web server to access the output path
  .setPublicPath('/bundles/pimcorestudioui/vendor')
  .setManifestKeyPrefix('bundles/pimcorestudioui/vendor')

    .addEntry('vendor', ['react', 'react-dom', 'antd', 'antd-style', 'reflect-metadata'])

    .disableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())
    
    .addPlugin(new DllPlugin({
      context: __dirname,
      name: 'studio_vendor',
      path: __dirname + '/public/vendor/vendor-manifest.json',
    }));

let webpackConfig = Encore.getWebpackConfig();

webpackConfig.name = 'studio_vendor';

webpackConfig = {
  ...webpackConfig,
  output: {
      ...webpackConfig.output,
      library: 'studio_vendor'
  }
}

module.exports = [webpackConfig];
