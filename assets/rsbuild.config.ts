import { defineConfig } from '@rsbuild/core'
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

export default defineConfig({
  // mode: 'development',
  server: {
    port: 3032,
  },
  dev: {
    assetPrefix: '/bundles/pimcorestudioui/build/' + buildId,
  },
  source: {
    entry: {
      main: './js/src/core/main.ts'
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
        '@pimcore/studio-ui-bundle': `promise new Promise(resolve => {
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
        react: {
          singleton: true,
          eager: true,
          requiredVersion: packages.peerDependencies.react
        },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: packages.peerDependencies['react-dom']
        },
        'inversify': {
          eager: true,
          version: packages.peerDependencies.inversify
        },
        'antd': {
          singleton: true,
          eager: true,
          requiredVersion: packages.peerDependencies.antd
        }
      }
    })
  ]
})
