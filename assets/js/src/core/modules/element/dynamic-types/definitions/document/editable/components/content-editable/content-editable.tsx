import React, { useRef, useEffect } from 'react'
import { useStyle } from './content-editable.styles'
import { isNil } from 'lodash'
import { escapeHtml, pasteHtmlAtCaret, stripTags } from '@Pimcore/utils/html'

export interface ContentEditableProps {
  value?: string | null
  onChange?: (newValue: string | null) => void
  placeholder?: string
  required?: boolean
  width?: number
  height?: number 
  nowrap?: boolean
  allowMultiLine?: boolean 
}

const ContentEditable = ({
  value,
  onChange,
  placeholder,
  required,
  width,
  height,
  nowrap,
  allowMultiLine = false
}: ContentEditableProps): JSX.Element => {
  const contentRef = useRef<HTMLDivElement>(null)
  const valueRef = useRef<string | null>(value ?? null)

  useEffect(() => {
    if (!contentRef.current) return
    const html = allowMultiLine 
      ? (valueRef.current ?? '').replace(/\r\n|\n/g, '<br>') 
      : (valueRef.current ?? '') + '<br>'

    if (contentRef.current.innerHTML !== html) {
      contentRef.current.innerHTML = html
    }
  }, [allowMultiLine])

  const getValue = (): string => {
    if (!contentRef.current) return ''
    let newValue = contentRef.current.innerHTML ?? ''
    newValue = stripTags(newValue, ['br'])
    newValue = newValue.replace(/<br>/g, '\n').trim()
    return newValue
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>): void => {
    e.preventDefault()
    const currentWindow = contentRef.current?.ownerDocument.defaultView
    if (!currentWindow || !contentRef.current) return

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

    const newValue = getValue()
    valueRef.current = newValue
    onChange?.(newValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (!allowMultiLine && e.key === 'Enter') { 
      e.preventDefault()
    }
  }

  const handleInput = (): void => {
    const newValue = getValue()
    valueRef.current = newValue

    if (required === true && newValue.length < 1) {
      contentRef.current?.classList.add('empty')
    } else {
      contentRef.current?.classList.remove('empty')
    }

    onChange?.(newValue)
  }

  return (
    <div
      className="pimcorestudio_content-editable"
      contentEditable={true}
      data-placeholder={placeholder}
      ref={contentRef}
      role="none"
      onPaste={handlePaste}
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      style={{
        display: !isNil(width) || !isNil(height) ? 'inline-block' : undefined,
        width: !isNil(width) ? `${width}px` : undefined,
        height: !isNil(height) ? `${height}px` : undefined,
        overflow: (!isNil(nowrap) && nowrap) || !isNil(width) || !isNil(height) ? 'auto' : undefined,
        whiteSpace: !isNil(nowrap) && nowrap ? 'nowrap' : undefined
      }}
    />
  )
}

export default ContentEditable