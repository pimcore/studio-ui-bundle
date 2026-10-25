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
    expect(editable.textContent).not.toContain(' ')
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

  it('does not insert a line break when multi line is off', () => {
    const { container } = render(<ContentEditable value="abc" />)
    const editable = container.querySelector('[contenteditable]')!
    placeCaret(editable.firstChild!, 3)

    fireEvent.keyDown(editable, { key: 'Enter' })

    expect(editable.innerHTML).toBe('abc')
  })
})
