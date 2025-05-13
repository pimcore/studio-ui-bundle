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

import { type Pimcore as PimcoreApi } from '@Pimcore/app/public-api'
import { components, PimcoreThemeConfig, tokens } from '@Pimcore/modules/app/theme/utils/themes/default-theme'
export { type AbstractModule } from '@Pimcore/app/module-system/module-system'
export { type IAbstractPlugin } from '@Pimcore/app/plugin-system/plugin-system'

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
