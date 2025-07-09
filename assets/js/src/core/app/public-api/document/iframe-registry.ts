/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil, isNull } from 'lodash'
import { type PublicApiDocumentEditorIframe } from '../document-editor-iframe'
import { type IframeRef } from '@Pimcore/components/iframe/iframe'

interface IframeDocumentEditorReference {
  iframe: HTMLIFrameElement
  documentId: number
  contentWindow: Window
  iframeRef: React.RefObject<IframeRef>
  isReady: boolean
  readyCallbacks: Array<() => void>
}

class IframeDocumentEditorRegistry {
  private readonly iframes = new Map<number, IframeDocumentEditorReference>()

  register (documentId: number, iframe: HTMLIFrameElement, iframeRef: React.RefObject<IframeRef>): void {
    if (isNull(iframe.contentWindow)) {
      throw new Error(`Iframe for document ${documentId} has no content window`)
    }

    this.iframes.set(documentId, {
      iframe,
      documentId,
      contentWindow: iframe.contentWindow,
      iframeRef,
      isReady: false,
      readyCallbacks: []
    })
  }

  unregister (documentId: number): void {
    this.iframes.delete(documentId)
  }

  getIframe (documentId: number): HTMLIFrameElement | undefined {
    return this.iframes.get(documentId)?.iframe
  }

  getContentWindow (documentId: number): Window | undefined {
    return this.iframes.get(documentId)?.contentWindow
  }

  getDocumentEditorApi (documentId: number): PublicApiDocumentEditorIframe {
    const contentWindow = this.getContentWindow(documentId)
    if (isNull(contentWindow)) {
      throw new Error(`No iframe found for document ID ${documentId}`)
    }

    const api = (contentWindow as any).PimcoreDocumentEditor
    if (isNil(api)) {
      throw new Error(`Document editor API not available in iframe for document ID ${documentId}`)
    }

    return api
  }

  isIframeRegistered (documentId: number): boolean {
    return this.iframes.has(documentId)
  }

  getAllRegisteredDocumentIds (): number[] {
    return Array.from(this.iframes.keys())
  }

  getIframeRef (documentId: number): React.RefObject<IframeRef> | undefined {
    return this.iframes.get(documentId)?.iframeRef
  }

  /**
   * Mark an iframe as ready and execute any pending callbacks
   */
  markAsReady (documentId: number): void {
    const reference = this.iframes.get(documentId)
    if (!isNil(reference) && !reference.isReady) {
      reference.isReady = true
      // Execute all pending callbacks
      reference.readyCallbacks.forEach(callback => {
        try {
          callback()
        } catch (error) {
          console.error(`Error executing ready callback for document ${documentId}:`, error)
        }
      })
      // Clear callbacks after execution
      reference.readyCallbacks.length = 0
    }
  }

  /**
   * Check if an iframe is ready
   */
  isIframeReady (documentId: number): boolean {
    return this.iframes.get(documentId)?.isReady ?? false
  }

  /**
   * Register a callback to be executed when the iframe is ready
   * If already ready, executes immediately
   */
  onReady (documentId: number, callback: () => void): void {
    const reference = this.iframes.get(documentId)
    if (!isNil(reference)) {
      if (reference.isReady) {
        // Already ready, execute immediately
        try {
          callback()
        } catch (error) {
          console.error(`Error executing immediate ready callback for document ${documentId}:`, error)
        }
      } else {
        // Not ready yet, add to pending callbacks
        reference.readyCallbacks.push(callback)
      }
    } else {
      throw new Error(`No iframe found for document ID ${documentId}`)
    }
  }
}

export const iframeDocumentEditorRegistry = new IframeDocumentEditorRegistry()
