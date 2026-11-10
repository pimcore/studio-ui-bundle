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
import { act, render } from '@testing-library/react'
import { ObjectBrick } from './object-brick'
import { ItemProvider } from '@Pimcore/components/form/item/provider/item/item-provider'
import { useKeyedList } from '@Pimcore/components/form/controls/keyed-list/provider/keyed-list/use-keyed-list'
import { type KeyedListData } from '@Pimcore/components/form/controls/keyed-list/provider/keyed-list/keyed-list-provider'

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

jest.mock('./object-brick-content', () => ({
  ObjectBrickContent: () => {
    operations = useKeyedList().operations
    return null
  }
}))

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

describe('ObjectBrick', () => {
  beforeEach(() => { jest.useFakeTimers() })
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
})
