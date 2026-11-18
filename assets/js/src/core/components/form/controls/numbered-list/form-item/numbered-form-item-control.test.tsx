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
import { act, fireEvent, render, screen } from '@testing-library/react'
import { Input } from 'antd'
import { NumberedList } from '../numbered-list'
import { NumberedFormItemControl } from './numbered-form-item-control'
import { ItemProvider } from '../../../item/provider/item/item-provider'

// the form barrel transitively imports antd-style (untranspiled ESM) — NumberedList
// only needs Form.Group from it, which is a plain context provider
jest.mock('../../../form', () => ({
  Form: {
    Group: jest.requireActual('../../../group/group').Group
  }
}))

// The real control, not a stand-in: antd's TextArea re-renders to re-measure for
// `autoSize` — the same props `DynamicTypeObjectDataTextarea` gives it — and that render is
// the one that writes the stale value back. A plain `<input>` passes whether or not the
// defect is present (see the object brick regression, #4362).
const BlockTextArea = ({ value, onChange }: {
  value?: string | null
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
}): React.JSX.Element => (
  <Input.TextArea
    autoSize={ { minRows: 3 } }
    data-testid="block-textarea"
    onChange={ onChange }
    value={ value ?? '' }
  />
)

// wired to the numbered list exactly the way NumberedFormItem wires a field of a block item:
// the value is read from the list store and the keystroke goes back through operations.update
const blockUi = (value: any[], onChange: jest.Mock, strict: boolean): React.JSX.Element => {
  const ui = (
    <ItemProvider item={ { name: 'block' } }>
      <NumberedList
        onChange={ onChange }
        value={ value }
      >
        <ItemProvider item={ { name: ['block', 0, 'text'] } }>
          <NumberedFormItemControl>
            <BlockTextArea />
          </NumberedFormItemControl>
        </ItemProvider>
      </NumberedList>
    </ItemProvider>
  )

  // the app renders under StrictMode (app-view.tsx): effects mount, unmount and mount
  // again, so every field registers twice and every store subscription is renewed
  return strict ? <React.StrictMode>{ui}</React.StrictMode> : ui
}

// the NumberedList onChange effect is debounced by 10ms — flush it deterministically
const flushDebounce = (): void => { act(() => { jest.advanceTimersByTime(20) }) }

// types a character the way a browser does: by the time React sees the event the DOM
// already carries the new value and the caret sits right behind what was typed. The value
// is written through the prototype setter so React's value tracker still reports a change.
const typeCharacter = (textarea: HTMLTextAreaElement, nextValue: string, caret: number): void => {
  const setDomValue = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set

  act(() => {
    setDomValue?.call(textarea, nextValue)
    textarea.setSelectionRange(caret, caret)
    fireEvent.input(textarea)
  })
}

describe('NumberedFormItemControl in a block', () => {
  beforeEach(() => { jest.useFakeTimers() })
  afterEach(() => { jest.useRealTimers() })

  it.each([
    ['', false],
    [' under StrictMode, as the app renders', true]
  ])('keeps the caret where the character was typed%s (regression service-operations#1667)', (_, strict) => {
    const onChange = jest.fn()

    render(blockUi([{ text: 'ab' }], onChange, strict))
    flushDebounce()
    // mounting the field registers nothing new: its value is the loaded one
    expect(onChange).not.toHaveBeenCalled()

    const textarea: HTMLTextAreaElement = screen.getByTestId('block-textarea')
    expect(textarea.value).toBe('ab')

    // 'X' typed between 'a' and 'b'
    typeCharacter(textarea, 'aXb', 2)
    flushDebounce()

    expect(textarea.value).toBe('aXb')
    // The field has to carry the typed value already in the commit of the keystroke itself.
    // Reaching it one commit later leaves the textarea rendered with the previous value, so
    // React restores that stale value into the DOM and writes the typed one on top of it —
    // and every assignment to textarea.value puts the caret at the end of the text.
    expect(textarea.selectionStart).toBe(2)
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith([{ text: 'aXb' }])
  })

  it('shows a value replaced from outside after the user typed', () => {
    const onChange = jest.fn()

    const { rerender } = render(blockUi([{ text: 'ab' }], onChange, false))
    flushDebounce()

    const textarea: HTMLTextAreaElement = screen.getByTestId('block-textarea')
    typeCharacter(textarea, 'abc', 3)
    flushDebounce()
    expect(textarea.value).toBe('abc')

    rerender(blockUi([{ text: 'replaced' }], onChange, false))
    flushDebounce()

    expect(textarea.value).toBe('replaced')
  })
})
