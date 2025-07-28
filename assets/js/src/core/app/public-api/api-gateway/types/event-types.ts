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
import { type ModalUploadProps } from '@Pimcore/components/modal-upload/modal-upload'
import { type LinkModalProps, type CropModalProps, type HotspotMarkersModalProps } from '@Pimcore/app/public-api/element/element-api'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'

export enum ApiGatewayEventType {
  openElementSelector = 'openElementSelector',
  openUploadModal = 'openUploadModal',
  openLinkModal = 'openLinkModal',
  openCropModal = 'openCropModal',
  openHotspotMarkersModal = 'openHotspotMarkersModal',
  locateInTree = 'locateInTree',
}

/**
 * Type mapping that connects each ApiGatewayEventType to its specific payload type
 */
export interface ApiGatewayEventPayloadMap {
  [ApiGatewayEventType.openElementSelector]: ElementSelectorConfig
  [ApiGatewayEventType.openUploadModal]: ModalUploadProps
  [ApiGatewayEventType.openLinkModal]: LinkModalProps
  [ApiGatewayEventType.openCropModal]: CropModalProps
  [ApiGatewayEventType.openHotspotMarkersModal]: HotspotMarkersModalProps
  [ApiGatewayEventType.locateInTree]: { id: number, elementType: ElementType }
}

/**
 * Helper type to get the payload type for a specific event type
 */
export type ApiGatewayEventPayload<T extends ApiGatewayEventType> = ApiGatewayEventPayloadMap[T]
