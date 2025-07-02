/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// Main API Gateway component
export { ApiGateway } from './gateway'

// Types
export { ApiGatewayEventType } from './types/event-types'

// Registry
export {
  type ApiGatewayHandler,
  type ApiGatewayHandlerContext,
  registerApiGatewayHandler,
  getApiGatewayHandler
} from './registry/handler-registry'

// Handlers
export {
  initializeHandlers,
  openElementSelectorHandler,
  openUploadModalHandler
} from './handlers'