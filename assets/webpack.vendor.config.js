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

const Encore = require('@symfony/webpack-encore');
const path = require('path');
const { DllPlugin } = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const uuid = require('uuid');
const buildId = uuid.v4();
const fs = require('fs');
const buildPath = path.resolve(__dirname, '..', 'public', 'build', buildId);

if (fs.existsSync( path.resolve(__dirname, '..', 'public', 'build'))) {
  fs.readdirSync(path.resolve(__dirname, '..', 'public', 'build')).forEach((file) => {
    if (file !== 'studio-npm-package.tgz') {
      fs.rmSync(path.resolve(__dirname, '..', 'public', 'build', file), { recursive: true });
    }
  })
}

if (!fs.existsSync(buildPath)) {
  fs.mkdirSync(buildPath, { recursive: true });
}

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
  .setOutputPath(buildPath)
  // public path used by the web server to access the output path
  .setPublicPath('/bundles/pimcorestudioui/build/' + buildId)
  .setManifestKeyPrefix('bundles/pimcorestudioui/build/' + buildId)

    .addEntry('vendor', [
      'react',
      'react-dom',
      'antd',
      'antd/es/table/style',
      'antd/es/pagination/style',
      'antd/es/config-provider/context',
      'antd-style',
      'reflect-metadata',
      'inversify'
    ])

    .disableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    // .enableVersioning(Encore.isProduction())
    
    .addPlugin(new DllPlugin({
      context: __dirname,
      name: 'studio_vendor',
      path: __dirname + '/dist/vendor/vendor-manifest.json',
    }))

    .addPlugin(new ForkTsCheckerWebpackPlugin())

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
