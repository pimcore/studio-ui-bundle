import '@Pimcore/bootstrap'
import { runApp } from './modules/app/utils/app-runner'
import { pluginSystem } from './app/plugin-system/plugin-system'
import { type Pimcore } from './app/sdk'

if (module.hot !== undefined) {
  module.hot.accept()
}

declare global {
  interface Window {
    Pimcore: typeof Pimcore
  }
}

window.Pimcore = (await import('./app/sdk')).Pimcore
console.log('Core', 'SDK injected')

await pluginSystem.loadPlugins()
console.log('Core', 'after plugins loaded')
pluginSystem.initPlugins()
console.log('Core', 'after init plugins')

runApp()
