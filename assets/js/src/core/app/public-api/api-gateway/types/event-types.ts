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
import { type LinkModalProps, type CropModalProps, type HotspotMarkersModalProps, type VideoModalProps } from '@Pimcore/app/public-api/element/element-api'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'

export enum ApiGatewayEventType {
  openElementSelector = 'openElementSelector',
  openUploadModal = 'openUploadModal',
  openLinkModal = 'openLinkModal',
  openCropModal = 'openCropModal',
  openHotspotMarkersModal = 'openHotspotMarkersModal',
  openVideoModal = 'openVideoModal',
  locateInTree = 'locateInTree',
  openCustomModal = 'openCustomModal',
  closeCustomModal = 'closeCustomModal',
}

/**
 * Payload for {@link ApiGatewayEventType.openCustomModal}. `payload` and the `onClose` result are
 * intentionally untyped here - the type-safe generics live on the public
 * `PimcoreStudio.modal.openCustom` API and on `registerCustomModal`, keyed by the same `id`.
 */
export interface OpenCustomModalPayload {
  id: string
  /** Unique per open; keys the holder entry so re-opening the same modal id keeps both instances apart. */
  instanceId?: string
  payload: unknown
  onClose?: (result?: unknown) => void
}

/**
 * Payload for {@link ApiGatewayEventType.closeCustomModal} - closes (without a result) a modal
 * previously opened via {@link ApiGatewayEventType.openCustomModal}, identified by the same `id`.
 * Dispatched by the close handle {@link ApiGatewayEventType.openCustomModal} itself returns, so a
 * caller can close a modal it opened without waiting for the person to dismiss it (e.g. the
 * opening component unmounting).
 */
export interface CloseCustomModalPayload {
  id: string
  /** The `instanceId` of the opened modal; falls back to `id` when absent. */
  instanceId?: string
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
  [ApiGatewayEventType.openVideoModal]: VideoModalProps
  [ApiGatewayEventType.locateInTree]: { id: number, elementType: ElementType }
  [ApiGatewayEventType.openCustomModal]: OpenCustomModalPayload
  [ApiGatewayEventType.closeCustomModal]: CloseCustomModalPayload
}

/**
 * Helper type to get the payload type for a specific event type
 */
export type ApiGatewayEventPayload<T extends ApiGatewayEventType> = ApiGatewayEventPayloadMap[T]
