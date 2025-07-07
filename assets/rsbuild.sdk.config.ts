import { defineConfig, rspack } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { pluginGenerateEntrypoints } from './bundler/plugins/entrypoints-generate';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import path from 'path'
import fs from 'fs';
import { v4 } from 'uuid';
import packages from './package.json'

const buildId = v4();
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

let nodeEnv = process.env.NODE_ENV;
let env: 'development' | 'production' = 'production';

const isDevServer = nodeEnv === 'dev-server';
if (nodeEnv !== env) {
  env = 'development';
}

export default defineConfig({
  mode: env,
  server: {
    port: 3030,
  },
  dev: {
    ...(!isDevServer ? {assetPrefix: '/bundles/pimcorestudioui/build/' + buildId} : {}),
  },
  source: {
    entry: {
      index: './index.ts'
    },
    decorators: {
      version: 'legacy'
    }
  },
  tools: {
    bundlerChain: (chain, { env }) => {
      chain.output.uniqueName('pimcore_studio_ui_bundle');
    },
    rspack: {
      plugins: [
        new rspack.BannerPlugin({
          banner: `
            /**
             * This source file is available under the terms of the
             * Pimcore Open Core License (POCL)
             * Full copyright and license information is available in
             * LICENSE.md which is distributed with this source code.
             *
             *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
             *  @license    Pimcore Open Core License (POCL)
             */
          `
        })
      ]
    }
  },
  output: {
    manifest: true,
    assetPrefix: '/bundles/pimcorestudioui/build/' + buildId,
    distPath: {
      root: buildPath
    },
  },
  plugins: [
    pluginGenerateEntrypoints(),
    pluginReact(),
    pluginSvgr({
      svgrOptions: {
        icon: true,
        typescript: true,
      }
    }),
    pluginModuleFederation({
      name: 'pimcore_studio_ui_bundle',
      filename: 'static/js/remoteEntry.js',
      exposes: {
      '.': './js/src/sdk/main.ts',
      './_internal_/mf-bootstrap': './js/src/sdk/_internal_/mf-bootstrap.ts',
      './_internal_/mf-bootstrap-document-editor-iframe': './js/src/sdk/_internal_/mf-bootstrap-document-editor-iframe.ts',
      './components': './js/src/sdk/components/index.ts',
      './app': './js/src/sdk/app/index.ts',
      './api/asset': './js/src/sdk/api/asset/index.ts',
      './api': './js/src/sdk/api/index.ts',
      './api/custom-metadata': './js/src/sdk/api/custom-metadata/index.ts',
      './api/data-object': './js/src/sdk/api/data-object/index.ts',
      './api/dependencies': './js/src/sdk/api/dependencies/index.ts',
      './api/documents': './js/src/sdk/api/documents/index.ts',
      './api/elements': './js/src/sdk/api/elements/index.ts',
      './api/metadata': './js/src/sdk/api/metadata/index.ts',
      './api/perspectives': './js/src/sdk/api/perspectives/index.ts',
      './api/properties': './js/src/sdk/api/properties/index.ts',
      './api/role': './js/src/sdk/api/asset/index.ts',
      './api/schedule': './js/src/sdk/api/schedule/index.ts',
      './api/settings': './js/src/sdk/api/settings/index.ts',
      './api/tags': './js/src/sdk/api/tags/index.ts',
      './api/thumbnails': './js/src/sdk/api/thumbnails/index.ts',
      './api/translations': './js/src/sdk/api/translations/index.ts',
      './api/user': './js/src/sdk/api/user/index.ts',
      './api/version': './js/src/sdk/api/version/index.ts',
      './api/workflow': './js/src/sdk/api/workflow/index.ts',
      './modules/app': './js/src/sdk/modules/app/index.ts',
      './modules/asset': './js/src/sdk/modules/asset/index.ts',
      './modules/class-definitions': './js/src/sdk/modules/class-definitions/index.ts',
      './modules/data-object': './js/src/sdk/modules/data-object/index.ts',
      './modules/element': './js/src/sdk/modules/element/index.ts',
      './modules/icon-library': './js/src/sdk/modules/icon-library/index.ts',
      './modules/user': './js/src/sdk/modules/user/index.ts',
      './modules/widget-manager': './js/src/sdk/modules/widget-manager/index.ts',
      './modules/wysiwyg': './js/src/sdk/modules/wysiwyg/index.ts',
      './utils': './js/src/sdk/utils/index.ts',
      },
      dts: false,
      shared: {
        ...packages.dependencies,
        classnames: {
          singleton: true,
          eager: true,
          requiredVersion: packages.dependencies.classnames
        },
        react: {
          singleton: true,
          eager: true,
          requiredVersion: packages.dependencies.react
        },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: packages.dependencies['react-dom']
        },
        'inversify': {
          eager: true,
          version: packages.dependencies.inversify
        },
        'antd': {
          singleton: true,
          eager: true,
          requiredVersion: packages.dependencies.antd
        },
        'reflect-metadata': {
          singleton: true,
          eager: true,
          requiredVersion: false
        },
        '@uiw/react-codemirror': {
          singleton: true,
          eager: true,
          version: packages.dependencies['@uiw/react-codemirror'],
          requiredVersion: packages.dependencies['@uiw/react-codemirror']
        }
      }
    })
  ]
})