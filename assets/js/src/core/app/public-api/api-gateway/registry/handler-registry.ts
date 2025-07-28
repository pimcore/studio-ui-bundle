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
import { type LinkModalContextProps } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/link/provider/link-modal-provider'
import { type ApiGatewayEventType, type ApiGatewayEventPayload } from '../types/event-types'
import { type CropModalContextProps } from '@Pimcore/modules/element/components/crop-modal/provider/crop-modal-provider'
import { type HotspotMarkersModalContextProps } from '@Pimcore/modules/element/components/hotspot-markers-modal/provider/hotspot-markers-modal-provider'

// Define a context object that can be passed to handlers
export interface ApiGatewayHandlerContext {
  elementSelectorHelper: UseElementSelectorHelperReturn
  uploadModalContext: UploadContextProps
  linkModalContext: LinkModalContextProps
  cropModalContext: CropModalContextProps
  hotspotMarkersModalContext: HotspotMarkersModalContextProps
  // Add other helpers here as needed
}

export type ApiGatewayHandler<T extends ApiGatewayEventType = ApiGatewayEventType> = (
  payload: ApiGatewayEventPayload<T>,
  context: ApiGatewayHandlerContext
) => void

const handlerRegistry = new Map<ApiGatewayEventType, ApiGatewayHandler>()

export const registerApiGatewayHandler = <T extends ApiGatewayEventType>(
  type: T,
  handler: ApiGatewayHandler<T>
): void => {
  if (handlerRegistry.has(type)) {
    console.warn(`A handler for the API gateway event type "${type}" is already registered. It will be overwritten.`)
  }
  handlerRegistry.set(type, handler as ApiGatewayHandler)
}

export const getApiGatewayHandler = (type: ApiGatewayEventType): ApiGatewayHandler | undefined => {
  return handlerRegistry.get(type)
}
