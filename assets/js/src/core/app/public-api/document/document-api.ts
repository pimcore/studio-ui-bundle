/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { store } from '@Pimcore/app/store'
import { markDocumentEditablesAsModified } from '@Pimcore/modules/document/document-draft-slice'
import { iframeDocumentEditorRegistry } from './iframe-registry'
import { documentSaveService, SaveTaskType } from '@Pimcore/modules/document/services'
import { debounce } from 'lodash'
import { PublicApiDocumentEditorIframe } from '../document-editor-iframe'

export interface DocumentApi {
  markDraftAsModified: (documentId: number) => void
  getIframeApi: (documentId: number) => PublicApiDocumentEditorIframe
  isIframeAvailable: (documentId: number) => boolean
  registerIframe: (documentId: number, iframe: HTMLIFrameElement) => void
  unregisterIframe: (documentId: number) => void
  triggerValueChange: (documentId: number, key: string, value: any) => void
}

class DocumentApiImpl implements DocumentApi {
  private autoSaveCallbacks = new Map<number, ReturnType<typeof debounce>>()

  markDraftAsModified (documentId: number): void {
    store.dispatch(markDocumentEditablesAsModified(documentId))
  }

  getIframeApi (documentId: number): PublicApiDocumentEditorIframe {
    return iframeDocumentEditorRegistry.getDocumentEditorApi(documentId)
  }

  isIframeAvailable (documentId: number): boolean {
    return iframeDocumentEditorRegistry.isIframeRegistered(documentId)
  }

  registerIframe (documentId: number, iframe: HTMLIFrameElement): void {
    iframeDocumentEditorRegistry.register(documentId, iframe)
    
    this.autoSaveCallbacks.set(documentId, debounce(async () => {
      await this.performAutoSave(documentId)
    }, 800))
  }

  unregisterIframe (documentId: number): void {
    iframeDocumentEditorRegistry.unregister(documentId)
    this.autoSaveCallbacks.delete(documentId)
  }

  triggerValueChange (documentId: number, key: string, value: any): void {
    this.markDraftAsModified(documentId)
    
    this.autoSaveCallbacks.get(documentId)?.()
  }

  private async performAutoSave (documentId: number): Promise<void> {
    try {
      await documentSaveService.saveDocument(documentId, SaveTaskType.AutoSave)
    } catch (error) {
      console.error(`Auto-save failed for document ${documentId}:`, error)
    }
  }
}

export const documentApi = new DocumentApiImpl()