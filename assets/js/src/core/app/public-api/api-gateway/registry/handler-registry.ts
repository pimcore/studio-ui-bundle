/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type UseElementSelectorHelperReturn } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector-helper'
import { type UploadContextProps } from '@Pimcore/components/modal-upload/provider/upload-modal-provider/upload-modal-provider'
import { type ApiGatewayEventType } from '../types/event-types'

// Define a context object that can be passed to handlers
export interface ApiGatewayHandlerContext {
  elementSelectorHelper: UseElementSelectorHelperReturn
  uploadModalContext: UploadContextProps
  // Add other helpers here as needed
}

export type ApiGatewayHandler = (payload: any, context: ApiGatewayHandlerContext) => void

const handlerRegistry = new Map<ApiGatewayEventType, ApiGatewayHandler>()

export const registerApiGatewayHandler = (type: ApiGatewayEventType, handler: ApiGatewayHandler): void => {
  if (handlerRegistry.has(type)) {
    console.warn(`A handler for the API gateway event type "${type}" is already registered. It will be overwritten.`)
  }
  handlerRegistry.set(type, handler)
}

export const getApiGatewayHandler = (type: ApiGatewayEventType): ApiGatewayHandler | undefined => {
  return handlerRegistry.get(type)
}
