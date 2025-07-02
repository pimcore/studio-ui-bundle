import { type UseElementSelectorHelperReturn } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector-helper'
import { type UploadContextProps } from '@Pimcore/components/modal-upload/provider/upload-modal-provider/upload-modal-provider'
import { ApiGatewayEventType } from '../types/event-types'

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