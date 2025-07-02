/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { useElementSelectorHelper } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector-helper'
import { useUploadModalContext } from '@Pimcore/components/modal-upload/provider/upload-modal-provider/use-upload-modal-context'
import { getApiGatewayHandler } from './registry/handler-registry'
import { initializeHandlers } from './handlers'
import { ApiGatewayEventType } from './types/event-types'

/**
 * This component listens for various requests from the public API
 * and dispatches them to appropriate handlers based on the event type.
 */
export const ApiGateway = (): React.JSX.Element | null => {
  const elementSelectorHelper = useElementSelectorHelper()
  const uploadModalContext = useUploadModalContext()

  // Initialize handlers on component mount
  useEffect(() => {
    initializeHandlers()
  }, [])

  useEffect(() => {
    const handleApiEvent = (event: CustomEvent<{ type: string; payload: any }>): void => {
      const { type, payload } = event.detail
      
      try {
        // Convert string type to enum type
        const eventType = type as ApiGatewayEventType
        const handler = getApiGatewayHandler(eventType)
        
        if (handler) {
          handler(payload, { 
            elementSelectorHelper,
            uploadModalContext,
            // Add other context dependencies here as needed
          })
        } else {
          console.warn(`No handler registered for API event type: ${type}`)
        }
      } catch (error) {
        console.error(`Error handling API gateway event of type ${type}:`, error)
      }
    }

    window.addEventListener('pimcore:gateway:request', handleApiEvent as EventListener)

    return () => {
      window.removeEventListener('pimcore:gateway:request', handleApiEvent as EventListener)
    }
  }, [elementSelectorHelper, uploadModalContext])

  return null
}