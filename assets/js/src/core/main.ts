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

await pluginSystem.loadPlugins()
pluginSystem.initPlugins()
pluginSystem.startupPlugins()
moduleSystem.initModules()

runApp()
