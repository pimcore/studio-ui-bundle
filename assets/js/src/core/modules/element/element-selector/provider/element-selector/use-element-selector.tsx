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
import { useElementSelectorHelper } from './use-element-selector-helper'

export interface UseElementSelectorReturn {
  open: () => void
}

export interface UseElementSelectorProps extends ElementSelectorConfig {}

export const useElementSelector = (props: UseElementSelectorProps): UseElementSelectorReturn => {
  const helper = useElementSelectorHelper()

  const open: UseElementSelectorReturn['open'] = () => {
    helper.setConfig(props)
    helper.open()
  }

  return {
    open
  }
}
