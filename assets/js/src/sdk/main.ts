/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Pimcore as PimcoreApi } from '@Pimcore/app/public-api'
import { type components, type tokens } from '@Pimcore/modules/app/theme/utils/themes/theme-tokens'
import { type PimcoreThemeConfig } from '@Pimcore/modules/app/theme/dynamic-types/definitions/dynamic-type-theme-abstract'
export { type AbstractModule } from '@Pimcore/app/module-system/module-system'
export { type IAbstractPlugin } from '@Pimcore/app/plugin-system/plugin-system'

if (module.hot !== undefined) {
  module.hot.accept()
}

declare global {
  interface Window {
    Pimcore: typeof PimcoreApi
    pluginRemotes: Record<string, string>
  }
}

declare module 'antd-style' {
  export interface ThemeConfig extends PimcoreThemeConfig {}
  export interface FullToken extends tokens, components {}
}

export const Pimcore = window.Pimcore
export const container = window.Pimcore.container
