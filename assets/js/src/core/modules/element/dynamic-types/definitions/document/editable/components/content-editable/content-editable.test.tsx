/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import ContentEditable from './content-editable'

jest.mock('./content-editable.styles', () => ({
  useStyles: () => ({ styles: { contentEditable: 'content-editable' } })
}))

jest.mock('../editable-overlay/editable-overlay', () => ({
  EditableOverlay: ({ children }: { children: React.ReactNode }) => <>{ children }</>
}))

const placeCaret = (node: Node, offset: number): void => {
  const range = document.createRange()
  range.setStart(node, offset)
  range.collapse(true)
  const selection = window.getSelection()!
  selection.removeAllRanges()
  selection.addRange(range)
}

describe('ContentEditable Enter key (multi line)', () => {
  it('inserts a <br> at the end of the content and leaves a collapsed caret behind it', () => {
    const { container } = render(<ContentEditable
      allowMultiLine
      value="abc"
                                 />)
    const editable = container.querySelector('[contenteditable]')!
    placeCaret(editable.firstChild!, 3)

    fireEvent.keyDown(editable, { key: 'Enter' })

    expect(editable.innerHTML).toBe('abc<br><br>')
    const range = window.getSelection()!.getRangeAt(0)
    expect(range.collapsed).toBe(true)
    expect(range.startContainer).toBe(editable)
    expect(range.startOffset).toBe(2)
  })

  it('does not select a placeholder node, so typing cannot replace the <br>', () => {
    const { container } = render(<ContentEditable
      allowMultiLine
      value="abc"
                                 />)
    const editable = container.querySelector('[contenteditable]')!
    placeCaret(editable.firstChild!, 3)

    fireEvent.keyDown(editable, { key: 'Enter' })

    expect(window.getSelection()!.toString()).toBe('')
    expect(editable.textContent).not.toContain('\u00A0')
  })

  it('adds no extra <br> when the line break is inserted in the middle of the content', () => {
    const { container } = render(<ContentEditable
      allowMultiLine
      value="abcdef"
                                 />)
    const editable = container.querySelector('[contenteditable]')!
    placeCaret(editable.firstChild!, 3)

    fireEvent.keyDown(editable, { key: 'Enter' })

    expect(editable.innerHTML).toBe('abc<br>def')
  })

  it('adds one <br> when the caret is at the end of a line that has more text after it', () => {
    const { container } = render(<ContentEditable
      allowMultiLine
      value={ 'abc\ndef' }
                                 />)
    const editable = container.querySelector('[contenteditable]')!
    placeCaret(editable.firstChild!, 3)

    fireEvent.keyDown(editable, { key: 'Enter' })

    expect(editable.innerHTML).toBe('abc<br><br>def')
  })

  it('adds one <br> inside an inline element when text follows it', () => {
    const { container } = render(<ContentEditable
      allowMultiLine
      value="x"
                                 />)
    const editable = container.querySelector('[contenteditable]')!
    editable.innerHTML = '<b>abc</b>def'
    placeCaret(editable.querySelector('b')!.firstChild!, 3)

    fireEvent.keyDown(editable, { key: 'Enter' })

    expect(editable.querySelectorAll('br')).toHaveLength(1)
  })

  it('keeps the typed content when the value is fed back after Enter at the end and typing', () => {
    const Controlled = (): JSX.Element => {
      const [value, setValue] = React.useState<string | null>('abc')

      return (
        <ContentEditable
          allowMultiLine
          onChange={ setValue }
          value={ value }
        />
      )
    }
    const { container } = render(<Controlled />)
    const editable = container.querySelector('[contenteditable]')!
    placeCaret(editable.firstChild!, 3)

    fireEvent.keyDown(editable, { key: 'Enter' })
    const range = window.getSelection()!.getRangeAt(0)
    const typed = document.createTextNode('x')
    range.insertNode(typed)
    fireEvent.input(editable)

    expect(typed.isConnected).toBe(true)
    expect(editable.innerHTML).toBe('abc<br>x<br>')
  })

  it('does not insert a line break when multi line is off', () => {
    const { container } = render(<ContentEditable value="abc" />)
    const editable = container.querySelector('[contenteditable]')!
    placeCaret(editable.firstChild!, 3)

    fireEvent.keyDown(editable, { key: 'Enter' })

    expect(editable.innerHTML).toBe('abc')
  })
})
