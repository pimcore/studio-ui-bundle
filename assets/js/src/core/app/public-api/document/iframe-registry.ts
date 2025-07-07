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
      iframeRef
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
}

export const iframeDocumentEditorRegistry = new IframeDocumentEditorRegistry()
