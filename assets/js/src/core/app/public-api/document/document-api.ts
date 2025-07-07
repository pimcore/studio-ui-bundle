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
import { type PublicApiDocumentEditorIframe } from '../document-editor-iframe'
import { type IframeRef } from '@Pimcore/components/iframe/iframe'

export interface DocumentApi {
  markDraftAsModified: (documentId: number) => void
  getIframeApi: (documentId: number) => PublicApiDocumentEditorIframe
  isIframeAvailable: (documentId: number) => boolean
  registerIframe: (documentId: number, iframe: HTMLIFrameElement, iframeRef: React.RefObject<IframeRef>) => void
  unregisterIframe: (documentId: number) => void
  triggerValueChange: (documentId: number, key: string, value: any) => void
  triggerValueChangeWithReload: (documentId: number, key: string, value: any) => void
  notifyIframeReady: (documentId: number) => void
  isIframeReady: (documentId: number) => boolean
}

class DocumentApiImpl implements DocumentApi {
  private readonly autoSaveCallbacks = new Map<number, ReturnType<typeof debounce>>()

  markDraftAsModified (documentId: number): void {
    store.dispatch(markDocumentEditablesAsModified(documentId))
  }

  getIframeApi (documentId: number): PublicApiDocumentEditorIframe {
    return iframeDocumentEditorRegistry.getDocumentEditorApi(documentId)
  }

  isIframeAvailable (documentId: number): boolean {
    return iframeDocumentEditorRegistry.isIframeRegistered(documentId)
  }

  registerIframe (documentId: number, iframe: HTMLIFrameElement, iframeRef: React.RefObject<IframeRef>): void {
    iframeDocumentEditorRegistry.register(documentId, iframe, iframeRef)

    this.autoSaveCallbacks.set(documentId, debounce(async () => {
      await this.performAutoSave(documentId)
    }, 800))

    // Automatically set up ready state notification when iframe becomes ready
    iframeDocumentEditorRegistry.onReady(documentId, () => {
      // Notify the iframe component that it's ready
      iframeRef.current?.setReady(true)
    })
  }

  unregisterIframe (documentId: number): void {
    iframeDocumentEditorRegistry.unregister(documentId)
    this.autoSaveCallbacks.delete(documentId)
  }

  triggerValueChange (documentId: number, key: string, value: any): void {
    this.markDraftAsModified(documentId)

    this.autoSaveCallbacks.get(documentId)?.()
  }

  triggerValueChangeWithReload (documentId: number, key: string, value: any): void {
    this.markDraftAsModified(documentId)

    // Perform immediate auto-save without debounce, then reload
    this.performAutoSaveAndReload(documentId)
  }

  notifyIframeReady (documentId: number): void {
    iframeDocumentEditorRegistry.markAsReady(documentId)
  }

  isIframeReady (documentId: number): boolean {
    return iframeDocumentEditorRegistry.isIframeReady(documentId)
  }

  private async performAutoSave (documentId: number): Promise<void> {
    try {
      await documentSaveService.saveDocument(documentId, SaveTaskType.AutoSave)
    } catch (error) {
      console.error(`Auto-save failed for document ${documentId}:`, error)
    }
  }

  private async performAutoSaveAndReload (documentId: number): Promise<void> {
    try {
      // Get the iframe ref to trigger loading state
      const iframeRef = iframeDocumentEditorRegistry.getIframeRef(documentId)
      if (iframeRef?.current) {
        iframeRef.current.setReloading(true)
      }

      await documentSaveService.saveDocument(documentId, SaveTaskType.AutoSave)
      
      // Use the iframe ref's reload method instead of direct src manipulation
      if (iframeRef?.current) {
        iframeRef.current.reload()
      } else {
        // Fallback to direct iframe manipulation if ref not available
        const iframe = iframeDocumentEditorRegistry.getIframe(documentId)
        if (iframe) {
          const currentSrc = iframe.src
          iframe.src = currentSrc
        }
      }
    } catch (error) {
      console.error(`Auto-save and reload failed for document ${documentId}:`, error)
      // Reset loading state on error
      const iframeRef = iframeDocumentEditorRegistry.getIframeRef(documentId)
      if (iframeRef?.current) {
        iframeRef.current.setReloading(false)
      }
    }
  }
}

export const documentApi = new DocumentApiImpl()
