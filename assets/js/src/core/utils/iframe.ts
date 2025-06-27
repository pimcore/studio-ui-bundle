/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'

const iframeCache = new Map<Document, HTMLIFrameElement | null>()

export const getIframeOffset = (view: Window): { x: number, y: number } => {
  const viewDocument = view.document
  if (viewDocument === window.parent.document) {
    return { x: 0, y: 0 }
  }

  if (!iframeCache.has(viewDocument)) {
    const iframes = window.parent.document.querySelectorAll('iframe')
    const matchingIframe = Array.from(iframes).find(iframe => iframe.contentDocument === viewDocument)
    iframeCache.set(viewDocument, matchingIframe ?? null)
  }

  const cachedIframe = iframeCache.get(viewDocument)
  if (!isNil(cachedIframe)) {
    const iframeRect = cachedIframe.getBoundingClientRect()
    return { x: iframeRect.left, y: iframeRect.top }
  }

  return { x: 0, y: 0 }
}
