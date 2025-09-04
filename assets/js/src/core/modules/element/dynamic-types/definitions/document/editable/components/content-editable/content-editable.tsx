/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useRef, useEffect } from 'react'
import { isNil, isNull, isString } from 'lodash'
import { escapeHtml, pasteHtmlAtCaret, stripTags } from '@Pimcore/utils/html'
import { useStyles } from './content-editable.styles'
import { InheritanceOverlay, type InheritanceOverlayProps } from '../inheritance-overlay/inheritance-overlay'
import cn from 'classnames'

export interface ContentEditableProps {
  value?: string | null
  onChange?: (newValue: string | null) => void
  placeholder?: string
  required?: boolean
  width?: number
  height?: number
  nowrap?: boolean
  allowMultiLine?: boolean
  className?: string
  disabled?: boolean
  inherited?: boolean
}

const ContentEditable = ({
  value,
  onChange,
  placeholder,
  required,
  width,
  height,
  nowrap,
  allowMultiLine = false,
  className,
  disabled = false,
  inherited = false
}: ContentEditableProps): JSX.Element => {
  const { styles } = useStyles()
  const contentRef = useRef<HTMLDivElement>(null)
  const currentValueRef = useRef<string | null | undefined>(value ?? null)

  const valueToHtml = (val: string | null | undefined): string => {
    if (isNil(val) || val === '') {
      return ''
    }

    if (allowMultiLine) {
      return val.replace(/\r\n|\n/g, '<br>')
    }

    return val
  }

  const htmlToValue = (html: string): string => {
    if (html === '') {
      return ''
    }

    let cleanValue = stripTags(html, ['br'])

    if (allowMultiLine) {
      cleanValue = cleanValue.replace(/<br\s*\/?>/gi, '\n')
    } else {
      cleanValue = cleanValue.replace(/<br\s*\/?>/gi, ' ')
    }

    return cleanValue.trim()
  }

  useEffect(() => {
    if (!isNull(contentRef.current)) {
      const htmlContent = valueToHtml(value)
      if (contentRef.current.innerHTML !== htmlContent) {
        contentRef.current.innerHTML = htmlContent
      }
      currentValueRef.current = value
    }
  }, [value, allowMultiLine, inherited])

  const handleContentChange = (): void => {
    if (isNull(contentRef.current)) {
      return
    }

    const html = contentRef.current.innerHTML
    const newValue = htmlToValue(html)

    if (newValue !== currentValueRef.current) {
      currentValueRef.current = newValue
      onChange?.(isString(newValue) ? newValue : '')
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>): void => {
    e.preventDefault()
    const currentWindow = contentRef.current?.ownerDocument.defaultView
    if (isNil(currentWindow) || isNil(contentRef.current)) {
      return
    }

    let text = ''
    if (!isNil(e.clipboardData)) {
      text = e.clipboardData.getData('text/plain')
    } else if (!isNil((currentWindow as any).clipboardData)) {
      text = ((currentWindow as any).clipboardData).getData('Text')
    }

    text = escapeHtml(text)

    if (!allowMultiLine) {
      text = text.replace(/\r\n|\n/g, ' ').trim()
    } else {
      text = text.replace(/\r\n|\n/g, '<br>').trim()
    }

    pasteHtmlAtCaret(text, currentWindow)
    setTimeout(handleContentChange, 0)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter') {
      if (!allowMultiLine) {
        e.preventDefault()
      } else {
        e.preventDefault()

        if (!isNil(window.getSelection)) {
          const selection = window.getSelection()
          if (!isNull(selection) && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0)
            const br = document.createElement('br')
            const textNode = document.createTextNode('\u00a0')

            range.deleteContents()
            range.insertNode(br)
            range.collapse(false)
            range.insertNode(textNode)
            range.selectNodeContents(textNode)

            selection.removeAllRanges()
            selection.addRange(range)
          }
        }

        setTimeout(handleContentChange, 0)
      }
    }
  }

  const isEmpty = isNil(currentValueRef.current) || currentValueRef.current === ''

  const getStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {}

    if (allowMultiLine) {
      if (!isNil(width) || !isNil(height)) {
        styles.display = 'inline-block'
        styles.overflow = 'auto'
      }
      if (!isNil(width)) {
        styles.width = `${width}px`
      }
      if (!isNil(height)) {
        styles.height = `${height}px`
      }
    } else {
      if (!isNil(width)) {
        styles.display = 'inline-block'
        styles.width = `${width}px`
        styles.overflow = 'auto hidden'
        styles.whiteSpace = 'nowrap'
      }
    }

    if (!isNil(nowrap) && nowrap) {
      styles.whiteSpace = 'nowrap'
      styles.overflow = 'auto hidden'
    }

    return styles
  }

  const computedStyles = getStyles()

  const getDisplayType = (): InheritanceOverlayProps['display'] => {
    return computedStyles.display as InheritanceOverlayProps['display'] ?? 'inline'
  }

  const handleOverwrite = (): void => {
    onChange?.(value ?? '')
  }

  return (
    <InheritanceOverlay
      display={ getDisplayType() }
      isInherited={ inherited }
      onOverwrite={ handleOverwrite }
    >
      <div
        className={ cn(styles.contentEditable, className) }
        contentEditable={ !disabled }
        data-empty={ isEmpty }
        data-placeholder={ placeholder }
        data-required={ required }
        onInput={ disabled ? undefined : handleContentChange }
        onKeyDown={ disabled ? undefined : handleKeyDown }
        onPaste={ disabled ? undefined : handlePaste }
        ref={ contentRef }
        role="none"
        style={ computedStyles }
      />
    </InheritanceOverlay>
  )
}

export default ContentEditable
