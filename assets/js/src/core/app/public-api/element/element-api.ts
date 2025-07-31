/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { assetOpeningService } from '@Pimcore/modules/asset/services/asset-opening-service'
import { documentOpeningService } from '@Pimcore/modules/document/services/document-opening-service'
import { dataObjectOpeningService } from '@Pimcore/modules/data-object/services/data-object-opening-service'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { type ElementSelectorConfig } from '@sdk/modules/element'
import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import { isInIframe } from '@Pimcore/utils/iframe'
import { ApiGatewayEventType, ApiGatewayEvent } from '@Pimcore/app/public-api/api-gateway'
import { type ModalUploadProps } from '@Pimcore/components/modal-upload/modal-upload'
import { type LinkModalOptions } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/link/provider/link-modal-provider'
import { type LinkValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/link/link'
import type { CropSettings } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/crop-types'
import { type CropModalOptions } from '@Pimcore/modules/element/components/crop-modal/provider/crop-modal-provider'
import type { IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'
import { type HotspotMarkersModalOptions } from '@Pimcore/modules/element/components/hotspot-markers-modal/provider/hotspot-markers-modal-provider'

class ElementOpeningService {
  async openAsset (config: { id: number }): Promise<void> {
    await assetOpeningService.openAsset(config)
  }

  async openDocument (config: { id: number }): Promise<void> {
    await documentOpeningService.openDocument(config)
  }

  async openDataObject (config: { id: number }): Promise<void> {
    await dataObjectOpeningService.openDataObject(config)
  }

  async openElement (id: number, type: ElementType): Promise<void> {
    const config = { id }
    switch (type) {
      case 'asset':
        await this.openAsset(config)
        break
      case 'document':
        await this.openDocument(config)
        break
      case 'data-object':
        await this.openDataObject(config)
        break
      default:
        console.warn(`Unknown element type: ${String(type)}`)
        break
    }
  }
}

// Create singleton instance
export const elementOpeningService = new ElementOpeningService()

export interface LinkModalProps {
  value?: LinkValue | null
  options?: LinkModalOptions
}

export interface CropModalProps {
  imageId: number
  crop?: CropSettings | null
  options?: CropModalOptions
}

export interface HotspotMarkersModalProps {
  imageId: number
  hotspots?: IHotspot[] | null
  crop?: CropSettings | null
  options?: HotspotMarkersModalOptions
}

// Public API interface and implementation
export interface ElementApi {
  openAsset: (id: number) => Promise<void>
  openDocument: (id: number) => Promise<void>
  openDataObject: (id: number) => Promise<void>
  openElement: (id: number, type: ElementType) => Promise<void>
  openElementSelector: (config: ElementSelectorConfig) => void
  openUploadModal: (props: ModalUploadProps) => void
  openLinkModal: (props: LinkModalProps) => void
  openCropModal: (props: CropModalProps) => void
  openHotspotMarkersModal: (props: HotspotMarkersModalProps) => void
  locateInTree: (id: number, elementType: ElementType) => void
}

class ElementApiImpl implements ElementApi {
  async openAsset (id: number): Promise<void> {
    await elementOpeningService.openAsset({ id })
  }

  async openDocument (id: number): Promise<void> {
    await elementOpeningService.openDocument({ id })
  }

  async openDataObject (id: number): Promise<void> {
    await elementOpeningService.openDataObject({ id })
  }

  async openElement (id: number, type: ElementType): Promise<void> {
    await elementOpeningService.openElement(id, type)
  }

  openElementSelector (config: ElementSelectorConfig): void {
    try {
      const { element: elementApi } = getPimcoreStudioApi()

      if (isInIframe()) {
        elementApi.openElementSelector(config)
      } else {
        this.openElementSelectorDirectly(config)
      }
    } catch (error) {
      console.error('Failed to open element selector:', error)
    }
  }

  private openElementSelectorDirectly (config: ElementSelectorConfig): void {
    const event = new ApiGatewayEvent(ApiGatewayEventType.openElementSelector, config)
    window.dispatchEvent(event)
  }

  openUploadModal (props: ModalUploadProps): void {
    try {
      if (isInIframe()) {
        const { element: elementApi } = getPimcoreStudioApi()
        elementApi.openUploadModal(props)
      } else {
        this.openUploadModalDirectly(props)
      }
    } catch (error) {
      console.error('Failed to open upload modal:', error)
    }
  }

  private openUploadModalDirectly (props: ModalUploadProps): void {
    const event = new ApiGatewayEvent(ApiGatewayEventType.openUploadModal, props)
    window.dispatchEvent(event)
  }

  openLinkModal (props: LinkModalProps): void {
    try {
      if (isInIframe()) {
        const { element: elementApi } = getPimcoreStudioApi()
        elementApi.openLinkModal(props)
      } else {
        this.openLinkModalDirectly(props)
      }
    } catch (error) {
      console.error('Failed to open link modal:', error)
    }
  }

  private openLinkModalDirectly (props: LinkModalProps): void {
    const event = new ApiGatewayEvent(ApiGatewayEventType.openLinkModal, props)
    window.dispatchEvent(event)
  }

  openCropModal (props: CropModalProps): void {
    try {
      if (isInIframe()) {
        const { element: elementApi } = getPimcoreStudioApi()
        elementApi.openCropModal(props)
      } else {
        this.openCropModalDirectly(props)
      }
    } catch (error) {
      console.error('Failed to open crop modal:', error)
    }
  }

  private openCropModalDirectly (props: CropModalProps): void {
    const event = new ApiGatewayEvent(ApiGatewayEventType.openCropModal, props)
    window.dispatchEvent(event)
  }

  openHotspotMarkersModal (props: HotspotMarkersModalProps): void {
    try {
      if (isInIframe()) {
        const { element: elementApi } = getPimcoreStudioApi()
        elementApi.openHotspotMarkersModal(props)
      } else {
        this.openHotspotMarkersModalDirectly(props)
      }
    } catch (error) {
      console.error('Failed to open hotspot markers modal:', error)
    }
  }

  private openHotspotMarkersModalDirectly (props: HotspotMarkersModalProps): void {
    const event = new ApiGatewayEvent(ApiGatewayEventType.openHotspotMarkersModal, props)
    window.dispatchEvent(event)
  }

  locateInTree (id: number, elementType: ElementType): void {
    try {
      const { element: elementApi } = getPimcoreStudioApi()

      if (isInIframe()) {
        elementApi.locateInTree(id, elementType)
      } else {
        this.locateInTreeDirectly(id, elementType)
      }
    } catch (error) {
      console.error('Failed to locate in tree:', error)
    }
  }

  private locateInTreeDirectly (id: number, elementType: ElementType): void {
    const event = new ApiGatewayEvent(ApiGatewayEventType.locateInTree, { id, elementType })
    window.dispatchEvent(event)
  }
}

export const elementApi = new ElementApiImpl()
