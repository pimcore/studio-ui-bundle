import { defineConfig } from '@rsbuild/core'

export default defineConfig({
  source: {
    entry: {
      entrypoints: './bundler/plugins/entrypoints-generate/studio-plugins.ts',
    }
  },
  output: {
    cleanDistPath: true,
    distPath: {
      root: './dist/build/rsbuild/plugins'
    },
    target: 'node',
  }
})
