/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type React from 'react'
import { useEffect } from 'react'
import { useElementSelectorHelper } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector-helper'
import { useUploadModalContext } from '@Pimcore/components/modal-upload/provider/upload-modal-provider/use-upload-modal-context'
import { useLinkModalContext } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/link/provider/use-link-modal-context'
import { useCropModalContext } from '@Pimcore/modules/element/components/crop-modal/provider/use-crop-modal-context'
import { useHotspotMarkersModalContext } from '@Pimcore/modules/element/components/hotspot-markers-modal/provider/use-hotspot-markers-modal-context'
import { getApiGatewayHandler } from './registry/handler-registry'
import { initializeHandlers } from './handlers'
import { API_GATEWAY_EVENT, ApiGatewayEvent, type ApiGatewayEventDetail } from './api-gateway-event'
import { isUndefined } from 'lodash'

/**
 * This component listens for various requests from the public API
 * and dispatches them to appropriate handlers based on the event type.
 */
export const ApiGateway = (): React.JSX.Element | null => {
  const elementSelectorHelper = useElementSelectorHelper()
  const uploadModalContext = useUploadModalContext()
  const linkModalContext = useLinkModalContext()
  const cropModalContext = useCropModalContext()
  const hotspotMarkersModalContext = useHotspotMarkersModalContext()

  // Initialize handlers on component mount
  useEffect(() => {
    initializeHandlers()
  }, [])

  useEffect(() => {
    const handleApiEvent = (event: Event): void => {
      // Type guard to ensure this is our custom ApiGatewayEvent
      if (!(event instanceof ApiGatewayEvent)) {
        console.warn('Received non-ApiGatewayEvent on API gateway listener')
        return
      }

      // Cast to CustomEvent to access detail with proper typing
      const customEvent = event as CustomEvent<ApiGatewayEventDetail>
      const { type, payload } = customEvent.detail

      try {
        const handler = getApiGatewayHandler(type)

        if (!isUndefined(handler)) {
          handler(payload, {
            elementSelectorHelper,
            uploadModalContext,
            linkModalContext,
            cropModalContext,
            hotspotMarkersModalContext
          })
        } else {
          console.warn(`No handler registered for API event type: ${type}`)
        }
      } catch (error) {
        console.error(`Error handling API gateway event of type ${type}:`, error)
      }
    }

    window.addEventListener(API_GATEWAY_EVENT, handleApiEvent)

    return () => {
      window.removeEventListener(API_GATEWAY_EVENT, handleApiEvent)
    }
  }, [elementSelectorHelper, uploadModalContext, linkModalContext, cropModalContext, hotspotMarkersModalContext])

  return null
}
