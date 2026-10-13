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
import { KeyedList, type KeyedListProps } from '../keyed-list'
import { type KeyedListData } from '../provider/keyed-list/keyed-list-provider'
import { useKeyedList } from '../provider/keyed-list/use-keyed-list'
import { ItemProvider } from '../../../item/provider/item/item-provider'
import { useCommitKeyedListDefault } from './use-commit-keyed-list-default'

// `create-styles` transitively pulls in antd-style's ESM build, which jest cannot
// transform — the `Form.Group` used by `KeyedList` resolves it via the barrel below.
jest.mock('../../../form', () => ({
  Form: {
    Group: jest.requireActual('../../../group/group').Group
  }
}))

let operations: KeyedListData['operations']

const OperationsProbe = (): null => {
  operations = useKeyedList().operations
  return null
}

// Mimics a dynamic-type component (e.g. Trim) that used to rely on `Form.Item
// initialValue` for its default: it now commits the default via the hook instead.
const FieldWithDefault = ({ field, value }: { field: string, value: unknown }): null => {
  useCommitKeyedListDefault(field, value)
  return null
}

const keyedListUi = (props: Omit<KeyedListProps, 'children'>, children?: React.ReactNode): React.JSX.Element => (
  <ItemProvider item={ { name: 'config' } }>
    <KeyedList { ...props }>
      {children}
      <OperationsProbe />
    </KeyedList>
  </ItemProvider>
)

const renderKeyedList = (props: Omit<KeyedListProps, 'children'>, children?: React.ReactNode): ReturnType<typeof render> => (
  render(keyedListUi(props, children))
)

// the onChange effect is debounced by 10ms — flush it deterministically
const flushDebounce = (): void => { act(() => { jest.advanceTimersByTime(20) }) }

describe('useCommitKeyedListDefault', () => {
  beforeEach(() => { jest.useFakeTimers() })
  afterEach(() => { jest.useRealTimers() })

  // regression: a pipeline item (transformer/source field) added and left untouched must
  // still save with a complete config — `Form.Item initialValue` alone never reaches the
  // parent form (see pimcore/platform-version#296 for the first instance of this bug).
  it('commits a default value that was never in the incoming config', () => {
    const onChange = jest.fn()

    renderKeyedList({ value: {}, onChange }, <FieldWithDefault
      field="mode"
      value="all"
                                             />)
    flushDebounce()

    expect(onChange).toHaveBeenCalledWith({ mode: 'all' })
    expect(operations.getValue(['config', 'mode'])).toBe('all')
  })

  it('does not override an already-set value with the default', () => {
    const onChange = jest.fn()

    renderKeyedList({ value: { mode: 'characters' }, onChange }, <FieldWithDefault
      field="mode"
      value="all"
                                                                 />)
    flushDebounce()

    onChange.mock.calls.forEach(([reportedValue]) => {
      expect(reportedValue).toEqual(expect.objectContaining({ mode: 'characters' }))
    })
    expect(operations.getValue(['config', 'mode'])).toBe('characters')
  })

  it('is a no-op when the type declares no default', () => {
    const onChange = jest.fn()

    renderKeyedList({ value: {}, onChange }, <FieldWithDefault
      field="mode"
      value={ undefined }
                                             />)
    flushDebounce()

    expect(onChange).not.toHaveBeenCalled()
    expect(operations.getValue(['config', 'mode'])).toBeUndefined()
  })
})
