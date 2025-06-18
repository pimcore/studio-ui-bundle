/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import DOMPurify from 'dompurify'
import { isNil } from 'lodash'

export const stripTags = (input: string, allowedTags: string[] = []): string => {
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: allowedTags })
}

export const escapeHtml = (input: string): string => {
  const div = document.createElement('div')
  div.textContent = input
  return div.innerHTML
}

export const pasteHtmlAtCaret = (html: string, currentWindow: Window = window): void => {
  let range: Range

  const sel = currentWindow.getSelection()
  if (!isNil(sel) && !isNil(sel.getRangeAt) && sel.rangeCount > 0) {
    range = sel.getRangeAt(0)
    range.deleteContents()

    const el = currentWindow.document.createElement('div')
    el.innerHTML = html
    const frag = currentWindow.document.createDocumentFragment()
    let node: ChildNode | null = null
    let lastNode: ChildNode | null = null

    while (!isNil(el.firstChild)) {
      node = el.firstChild
      lastNode = frag.appendChild(node)
    }

    range.insertNode(frag)

    // Preserve the selection
    if (!isNil(lastNode)) {
      range = range.cloneRange()
      range.setStartAfter(lastNode)
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
    }
  }
}
