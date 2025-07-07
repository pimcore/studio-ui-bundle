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

// Public API interface and implementation
export interface ElementApi {
  openAsset: (id: number) => Promise<void>
  openDocument: (id: number) => Promise<void>
  openDataObject: (id: number) => Promise<void>
  openElement: (id: number, type: ElementType) => Promise<void>
  openElementSelector: (config: ElementSelectorConfig) => void
  openUploadModal: (props: ModalUploadProps) => void
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
        // We're in an iframe, call the parent's API
        elementApi.openElementSelector(config)
      } else {
        // We're in the parent window, dispatch the event directly
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
        // We're in an iframe, call the parent's API
        const { element: elementApi } = getPimcoreStudioApi()
        elementApi.openUploadModal(props)
      } else {
        // We're in the parent window, dispatch the event directly
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
}

export const elementApi = new ElementApiImpl()
