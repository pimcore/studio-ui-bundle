/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { registerApiGatewayHandler } from '../registry/handler-registry'
import { ApiGatewayEventType } from '../types/event-types'
import { openElementSelectorHandler } from './element-selector-handler'
import { openUploadModalHandler } from './upload-modal-handler'
import { openLinkModalHandler } from './link-modal-handler'
import { openCropModalHandler } from './crop-modal-handler'
import { openHotspotMarkersModalHandler } from './hotspot-markers-modal-handler'
import { openVideoModalHandler } from './video-modal-handler'
import { locateInTreeHandler } from './locate-in-tree-handler'

export const initializeHandlers = (): void => {
  // Register all handlers here
  registerApiGatewayHandler(ApiGatewayEventType.openElementSelector, openElementSelectorHandler)
  registerApiGatewayHandler(ApiGatewayEventType.openUploadModal, openUploadModalHandler)
  registerApiGatewayHandler(ApiGatewayEventType.openLinkModal, openLinkModalHandler)
  registerApiGatewayHandler(ApiGatewayEventType.openCropModal, openCropModalHandler)
  registerApiGatewayHandler(ApiGatewayEventType.openHotspotMarkersModal, openHotspotMarkersModalHandler)
  registerApiGatewayHandler(ApiGatewayEventType.openVideoModal, openVideoModalHandler)
  registerApiGatewayHandler(ApiGatewayEventType.locateInTree, locateInTreeHandler)
}

// Export all handlers for potential direct use
export { openElementSelectorHandler } from './element-selector-handler'
export { openUploadModalHandler } from './upload-modal-handler'
export { openLinkModalHandler } from './link-modal-handler'
export { openCropModalHandler } from './crop-modal-handler'
export { openHotspotMarkersModalHandler } from './hotspot-markers-modal-handler'
export { openVideoModalHandler } from './video-modal-handler'
export { locateInTreeHandler } from './locate-in-tree-handler'
