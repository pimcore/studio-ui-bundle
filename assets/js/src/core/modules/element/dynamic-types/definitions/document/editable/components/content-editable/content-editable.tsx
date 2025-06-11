/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useRef } from 'react'
import { useStyle } from './content-editable.styles'
import { isNil } from 'lodash'

export interface ContentEditableProps {
  value?: string | null
  onChange?: (newValue: string | null) => void
  className?: string
  placeholder?: string
  required?: boolean
  width?: number
  nowrap?: boolean
}

const pasteHtmlAtCaret = function (html: string): void {
  let range: Range

  const sel = window.getSelection()
  if (!isNil(sel) && !isNil(sel.getRangeAt) && sel.rangeCount > 0) {
    range = sel.getRangeAt(0)
    range.deleteContents()

    const el = document.createElement('div')
    el.innerHTML = html
    const frag = document.createDocumentFragment()
    let node: ChildNode | null = null
    let lastNode: ChildNode | null = null

    while (!isNil(el.firstChild)) {
      node = el.firstChild;
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

const ContentEditable = ({ value, onChange, className, placeholder, required, width, nowrap }: ContentEditableProps): JSX.Element => {
  const contentRef = useRef<HTMLDivElement>(null)

  const { styles } = useStyle()

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>): void => {
    e.preventDefault()

    let text = ''
    if (!isNil(e.clipboardData)) {
      text = e.clipboardData.getData('text/plain')
    } else if (!isNil(window.clipboardData)) {
      text = (window.clipboardData as any).getData('Text')
    }

    text = text.replace(/\r\n|\n/g, ' ').trim()

    pasteHtmlAtCaret(text)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  const handleKeyUp = (): void => {
    const textContent = contentRef.current?.textContent?.trim() ?? ''
    if (required === true && textContent.length < 1) {
      contentRef.current?.classList.add('empty')
    } else {
      contentRef.current?.classList.remove('empty')
    }
    onChange?.(textContent)
  }

  return (
    <div
      className={ `${className} ${styles.contentEditable}` }
      contentEditable="true"
      dangerouslySetInnerHTML={ { __html: (value ?? '') + '<br>' } }
      data-placeholder={ placeholder }
      onKeyDown={ handleKeyDown }
      onKeyUp={ handleKeyUp }
      onPaste={ handlePaste }
      ref={ contentRef }
      role="none"
      style={ {
        display: !isNil(width) ? 'inline-block' : undefined,
        width: !isNil(width) ? `${width}px` : undefined,
        overflow: (!isNil(nowrap) && nowrap) || !isNil(width) ? 'auto' : undefined,
        whiteSpace: !isNil(nowrap) && nowrap ? 'nowrap' : undefined
      } }
    />
  )
}

export default ContentEditable
