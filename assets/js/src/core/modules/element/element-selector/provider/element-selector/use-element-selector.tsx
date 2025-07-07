/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ElementSelectorConfig } from '@sdk/modules/element'
import { useElementSelectorHelper } from './use-element-selector-helper'
import { isPimcoreStudioApiAvailable, getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import { isInIframe } from '@Pimcore/utils/iframe'

export interface UseElementSelectorReturn {
  open: () => void
}

export interface UseElementSelectorProps extends ElementSelectorConfig {}

export const useElementSelector = (props: UseElementSelectorProps): UseElementSelectorReturn => {
  const helper = useElementSelectorHelper()

  const open: UseElementSelectorReturn['open'] = () => {
    // Check if we're in an iframe and parent API is available
    if (isInIframe() && isPimcoreStudioApiAvailable()) {
      const { element } = getPimcoreStudioApi()
      element.openElementSelector(props)
      return
    }

    // Fallback to local context
    helper.setConfig(props)
    helper.open()
  }

  return {
    open
  }
}
