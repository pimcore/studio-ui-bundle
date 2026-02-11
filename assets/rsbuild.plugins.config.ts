import { defineConfig } from '@rsbuild/core'

export default defineConfig({
  source: {
    entry: {
      entrypoints: './bundler/plugins/entrypoints-generate/studio-plugins.ts',
      utils: './bundler/utils/index.ts',
    }
  },
  output: {
    cleanDistPath: true,
    distPath: {
      root: './dist/build/rsbuild'
    },
    target: 'node',
  }
})
