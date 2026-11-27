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
import { runApp } from '@Pimcore/modules/app/utils/app-runner'
import { pluginSystem } from '@Pimcore/app/plugin-system/plugin-system'
import { type Pimcore, PimcoreStudio, type PimcoreStudioApi } from '@Pimcore/app/public-api'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { initFocusMode } from '@Pimcore/modules/app/focus-mode/focus-mode'

if (module.hot !== undefined) {
  module.hot.accept()
}

declare global {
  interface Window {
    Pimcore: typeof Pimcore
    PimcoreStudio: PimcoreStudioApi
    pluginRemotes: Record<string, string>
    alternativePluginExportPaths: Record<string, string>
  }
}

window.Pimcore = (await import('@Pimcore/app/public-api')).Pimcore
window.PimcoreStudio = PimcoreStudio

window.addEventListener('load', async () => {
  // before plugins start: they strip their deep link parameters from the address
  initFocusMode()
  await pluginSystem.loadPlugins()
  pluginSystem.initPlugins()
  pluginSystem.startupPlugins()
  moduleSystem.initModules()
  runApp()
})
