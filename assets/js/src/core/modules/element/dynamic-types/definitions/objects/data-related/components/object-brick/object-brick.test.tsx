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
import { ObjectBrick } from './object-brick'
import { ItemProvider } from '@Pimcore/components/form/item/provider/item/item-provider'
import { useKeyedList } from '@Pimcore/components/form/controls/keyed-list/provider/keyed-list/use-keyed-list'
import { type KeyedListData } from '@Pimcore/components/form/controls/keyed-list/provider/keyed-list/keyed-list-provider'
import { KeyedFormItemControl } from '@Pimcore/components/form/controls/keyed-list/form-item/keyed-form-item-control'
import { Input } from 'antd'

// the form barrel transitively imports antd-style (untranspiled ESM) — the brick only needs
// Form.KeyedList (which needs Form.Group); KeyedList is resolved lazily as it imports this barrel itself
jest.mock('@Pimcore/components/form/form', () => ({
  Form: {
    Group: jest.requireActual('@Pimcore/components/form/group/group').Group,
    get KeyedList () {
      return jest.requireActual('@Pimcore/components/form/controls/keyed-list/keyed-list').KeyedList
    }
  }
}))

jest.mock('@Pimcore/modules/data-object/data-object-provider', () => {
  const { createContext } = jest.requireActual('react')
  return { DataObjectContext: createContext({ id: 1 }) }
})

// the object as loaded from the server
let objectData: Record<string, any>

jest.mock('@Pimcore/modules/data-object/hooks/use-data-object-draft', () => ({
  useDataObjectDraft: () => ({ dataObject: { objectData } })
}))

let operations: KeyedListData['operations']

// the fields of the brick's tabs, mounted through the content below
let brickFields: React.ReactElement | null

jest.mock('./object-brick-content', () => ({
  ObjectBrickContent: () => {
    operations = useKeyedList().operations
    return brickFields
  }
}))

// The real control, not a stand-in. A plain `<input>` here passes whether or not the
// defect is present: React finds the DOM value already equal to what it renders and
// writes nothing, so the caret is never moved and the test cannot fail. antd's
// TextArea re-renders to re-measure for `autoSize` — the same props
// `DynamicTypeObjectDataTextarea` gives it — and that render is the one that writes
// the stale value back. Substituting it away is what hid #1664 from this file.
const BrickTextArea = ({ value, onChange }: {
  value?: string | null
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
}): React.JSX.Element => (
  <Input.TextArea
    autoSize={ { minRows: 3 } }
    data-testid="brick-input"
    onChange={ onChange }
    value={ value ?? '' }
  />
)

// wired to the keyed list exactly the way KeyedFormItem wires a field of a brick: the value
// is read from the list store and the keystroke goes back through operations.update
const BrickField = ({ name }: { name: string[] }): React.JSX.Element => (
  <ItemProvider item={ { name } }>
    <KeyedFormItemControl>
      <BrickTextArea />
    </KeyedFormItemControl>
  </ItemProvider>
)

const renderObjectBrick = (value: Record<string, any>, onChange: jest.Mock): void => {
  render(
    <ItemProvider item={ { name: ['objbrick'] } }>
      <ObjectBrick
        allowedTypes={ ['BrickA', 'BrickB'] }
        datatype="data"
        defaultFieldWidth={ {} as any }
        name={ ['objbrick'] as any }
        onChange={ onChange }
        value={ value }
      />
    </ItemProvider>
  )
}

// the KeyedList onChange effect is debounced by 10ms — flush it deterministically
const flushDebounce = (): void => { act(() => { jest.advanceTimersByTime(20) }) }

// types a character the way a browser does: by the time React sees the event the DOM
// already carries the new value and the caret sits right behind what was typed. The value
// is written through the prototype setter so React's value tracker still reports a change.
const typeCharacter = (input: HTMLTextAreaElement, nextValue: string, caret: number): void => {
  const setDomValue = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set

  act(() => {
    setDomValue?.call(input, nextValue)
    input.setSelectionRange(caret, caret)
    fireEvent.input(input)
  })
}

describe('ObjectBrick', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    brickFields = null
  })
  afterEach(() => { jest.useRealTimers() })

  it('reports a deletion marker when the only remaining brick is removed', () => {
    const onChange = jest.fn()
    objectData = { objbrick: { BrickA: { input: 'a' } } }

    renderObjectBrick({ BrickA: { input: 'a' } }, onChange)
    flushDebounce()
    expect(onChange).not.toHaveBeenCalled()

    act(() => { operations.remove('BrickA') })
    flushDebounce()

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith({ BrickA: { action: 'deleted' } })
  })

  it('reports the deletion marker next to the remaining brick when one of two is removed', () => {
    const onChange = jest.fn()
    objectData = { objbrick: { BrickA: { input: 'a' }, BrickB: { input: 'b' } } }

    renderObjectBrick({ BrickA: { input: 'a' }, BrickB: { input: 'b' } }, onChange)
    flushDebounce()

    act(() => { operations.remove('BrickA') })
    flushDebounce()

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith({ BrickA: { action: 'deleted' }, BrickB: { input: 'b' } })
  })

  it('keeps the caret where the character was typed in a brick field (regression #1664)', () => {
    const onChange = jest.fn()
    objectData = { objbrick: { BrickA: { input: 'ab' } } }
    brickFields = <BrickField name={ ['objbrick', 'BrickA', 'input'] } />

    renderObjectBrick({ BrickA: { input: 'ab' } }, onChange)
    flushDebounce()

    const input: HTMLTextAreaElement = screen.getByTestId('brick-input')
    expect(input.value).toBe('ab')

    // 'X' typed between 'a' and 'b'
    typeCharacter(input, 'aXb', 2)
    flushDebounce()

    expect(input.value).toBe('aXb')
    // The field has to carry the typed value already in the commit of the keystroke itself.
    // Reaching it one commit later leaves the input rendered with the previous value, so
    // React restores that stale value into the DOM and writes the typed one on top of it —
    // and every assignment to input.value puts the caret at the end of the text.
    expect(input.selectionStart).toBe(2)
  })
})
