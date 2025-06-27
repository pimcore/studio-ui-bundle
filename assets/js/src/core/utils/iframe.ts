import { isNil } from "lodash"

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