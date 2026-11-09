/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ElementSelectorConfig } from './element-selector-provider'

// A custom tab renders with the caller's React; an iframe has its own copy, so its tabs cannot render in the parent window.
export const withoutCustomTabs = (config: ElementSelectorConfig): ElementSelectorConfig => {
  if (config.customTabs === undefined) {
    return config
  }

  console.warn('Element selector: custom tabs are not supported from an iframe and are ignored.')
  const { customTabs, ...rest } = config
  return rest
}
