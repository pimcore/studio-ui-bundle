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

if (!fs.existsSync(buildPath)) {
  fs.mkdirSync(buildPath, { recursive: true });
}

let nodeEnv = process.env.NODE_ENV;
let env: 'development' | 'production' = 'production';

const isDevServer = nodeEnv === 'dev-server';
if (nodeEnv !== env) {
  env = 'development';
  process.env.NODE_ENV = 'development'; 
}

export default defineConfig({
  mode: env,
  server: {
    port: 3031,
  },
  dev: {
    assetPrefix: (isDevServer ? 'http://localhost:3031' : '') + '/bundles/pimcorestudioui/build/' + buildId,
    writeToDisk: !isDevServer,
  },
  source: {
    entry: {
      main: './js/src/core/main.ts',
      documentEditorIframe: './js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/main.ts'
    },
    decorators: {
      version: 'legacy'
    }
  }, 
  output: {
    manifest: true,
    assetPrefix: '/bundles/pimcorestudioui/build/' + buildId,
    distPath: {
      root: buildPath
    },
  },
  tools: {
    bundlerChain: (chain, { env }) => {
      chain.output.uniqueName('pimcore_studio_ui_bundle_core');
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
      name: 'pimcore_studio_ui_bundle_core',
      dts: false,
      remotes: {
        '@sdk': `promise new Promise(resolve => {
          const studioUIBundleRemoteUrl = window.StudioUIBundleRemoteUrl
          const script = document.createElement('script')
          script.src = studioUIBundleRemoteUrl
          script.onload = () => {
            const proxy = {
              get: (request) => window['pimcore_studio_ui_bundle'].get(request),
              init: (...arg) => {
                try {
                  return window['pimcore_studio_ui_bundle'].init(...arg)
                } catch(e) {
                  console.log('remote container already initialized')
                }
              }
            }
            resolve(proxy)
          }
          document.head.appendChild(script);
        })
        `,
      },
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
        }
      }
    })
  ]
})
