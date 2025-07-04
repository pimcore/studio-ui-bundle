/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { App } from 'antd'
import { useMemo } from 'react'
import { isInIframe } from '@Pimcore/utils/iframe'
import { isPimcoreStudioApiAvailable, getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import { isNil } from 'lodash'

type ModalStaticFunctions = ReturnType<typeof App.useApp>['modal']

/**
 * Hook that provides modal functionality that works seamlessly across iframe boundaries.
 * When in an iframe, it uses the parent window's modal instance.
 * When not in an iframe, it uses the current window's modal instance.
 */
export function useStudioModal (): ModalStaticFunctions {
  const { modal: localModal } = App.useApp()

  return useMemo<ModalStaticFunctions>(() => {
    // Check if we're in an iframe and parent API is available
    if (isInIframe() && isPimcoreStudioApiAvailable()) {
      try {
        // Get the parent window's modal instance through the studio API
        const studioApi = getPimcoreStudioApi()

        // Check if the parent window has modal functionality available
        if (!isNil(studioApi.modal)) {
          return studioApi.modal
        }
      } catch (error) {
        console.warn('Failed to access parent window modal, falling back to local modal:', error)
      }
    }

    // Use local modal as fallback
    return localModal
  }, [localModal])
}
