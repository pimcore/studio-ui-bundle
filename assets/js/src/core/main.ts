/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import '@Pimcore/bootstrap'
import { runApp } from './modules/app/utils/app-runner'
import { pluginSystem } from './app/plugin-system/plugin-system'
import { type Pimcore } from './app/public-api'
import { moduleSystem } from './app/module-system/module-system'

if (module.hot !== undefined) {
  module.hot.accept()
}

declare global {
  interface Window {
    Pimcore: typeof Pimcore
  }
}

window.Pimcore = (await import('./app/public-api')).Pimcore

window.addEventListener('load', async () => {
  await pluginSystem.loadPlugins()
  pluginSystem.initPlugins()
  pluginSystem.startupPlugins()
  moduleSystem.initModules()
  runApp()
})
