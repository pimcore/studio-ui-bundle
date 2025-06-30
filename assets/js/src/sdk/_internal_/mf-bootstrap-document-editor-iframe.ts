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
import { pluginSystem } from '@Pimcore/app/plugin-system/plugin-system'
import { type Pimcore } from '@Pimcore/app/public-api'
import { moduleSystem } from '@Pimcore/app//module-system/module-system'
import { runApp } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/app-runner'

if (module.hot !== undefined) {
  module.hot.accept()
}

declare global {
  interface Window {
    Pimcore: typeof Pimcore
    pluginRemotes: Record<string, string>
  }
}

window.Pimcore = (await import('@Pimcore/app/public-api')).Pimcore

window.addEventListener('load', async () => {
  await pluginSystem.loadPlugins()
  pluginSystem.initPlugins()
  pluginSystem.startupPlugins()
  moduleSystem.initModules()
  runApp()
})