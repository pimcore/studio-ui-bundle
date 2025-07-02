import { registerApiGatewayHandler } from '../registry/handler-registry'
import { ApiGatewayEventType } from '../types/event-types'
import { openElementSelectorHandler } from './element-selector-handler'
import { openUploadModalHandler } from './upload-modal-handler'

export const initializeHandlers = (): void => {
  // Register all handlers here
  registerApiGatewayHandler(ApiGatewayEventType.openElementSelector, openElementSelectorHandler)
  registerApiGatewayHandler(ApiGatewayEventType.openUploadModal, openUploadModalHandler)
  
  // Add more handlers as needed
  // registerApiGatewayHandler(ApiGatewayEventType.ANOTHER_EVENT_TYPE, anotherHandler)
}

// Export all handlers for potential direct use
export { openElementSelectorHandler } from './element-selector-handler'
export { openUploadModalHandler } from './upload-modal-handler'