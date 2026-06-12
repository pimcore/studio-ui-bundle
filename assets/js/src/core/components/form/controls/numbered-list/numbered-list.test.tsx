/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */

import React, { useEffect } from 'react'
import { act, render, screen } from '@testing-library/react'
import { NumberedList, type NumberedListProps } from './numbered-list'
import { type NumberedListData } from './provider/numbered-list/numbered-list-provider'
import { useNumberedList } from './provider/numbered-list/use-numbered-list'
import { ItemProvider } from '../../item/provider/item/item-provider'
import { useFormGroupOptional } from '../../group/provider/use-form-group-optional'

// the form barrel transitively imports antd-style (untranspiled ESM) — NumberedList
// only needs Form.Group from it, which is a plain context provider
jest.mock('../../form', () => ({
  Form: {
    Group: jest.requireActual('../../group/group').Group
  }
}))

let operations: NumberedListData['operations']

const OperationsProbe = (): null => {
  operations = useNumberedList().operations
  return null
}

// mimics NumberedFormItemControl: child fields register their initial value
// (defaulting to null) on mount via update(..., isInitialValue = true)
const RegisteringField = ({ name, initialValue }: { name: string[], initialValue?: any }): null => {
  const { operations } = useNumberedList()
  const value = operations.getValue(name)

  useEffect(() => {
    if (value === undefined) {
      operations.update(name, initialValue ?? null, true)
    }
  }, [value])

  return null
}

// renders the group name path the iterated children are scoped to
const GroupNameProbe = (): React.JSX.Element => {
  const groupName = useFormGroupOptional()?.name as string[]
  return <div data-testid="numbered-list-entry">{groupName.join('.')}</div>
}

const numberedListUi = (props: Omit<NumberedListProps, 'children'>, children?: React.ReactNode): React.JSX.Element => (
  <ItemProvider item={ { name: 'attributes' } }>
    <NumberedList { ...props }>
      {children}
      <OperationsProbe />
    </NumberedList>
  </ItemProvider>
)

const renderNumberedList = (props: Omit<NumberedListProps, 'children'>, children?: React.ReactNode): ReturnType<typeof render> => (
  render(numberedListUi(props, children))
)

// the onChange effect is debounced by 10ms — flush it deterministically
const flushDebounce = (): void => { act(() => { jest.advanceTimersByTime(20) }) }

describe('NumberedList', () => {
  beforeEach(() => { jest.useFakeTimers() })
  afterEach(() => { jest.useRealTimers() })

  describe('initial field registrations (regression #3716)', () => {
    it('does not leak registrations of fields mounting together with the list into a change', () => {
      const onChange = jest.fn()

      renderNumberedList(
        { value: [{ name: 'test' }], onChange },
        <>
          <RegisteringField name={ ['attributes', '0', 'cargoCapacity'] } />
          <RegisteringField name={ ['attributes', '0', 'topSpeed'] } />
        </>
      )

      flushDebounce()

      // a residual mount-time fire may report the UNMODIFIED incoming value — what must
      // never happen is a report whose content differs without a user change
      onChange.mock.calls.forEach(([reportedValue]) => {
        expect(reportedValue).toEqual([{ name: 'test' }])
      })
    })

    it('does not report registrations of fields mounting after the list as a change', () => {
      // the common case in the editor: fields mount once the form data arrives
      const onChange = jest.fn()
      const props = { value: [{ name: 'test' }], onChange }

      const { rerender } = renderNumberedList(props)
      flushDebounce()

      rerender(numberedListUi(props, <RegisteringField name={ ['attributes', '0', 'cargoCapacity'] } />))
      flushDebounce()

      expect(onChange).not.toHaveBeenCalled()
      expect(operations.getValue(['attributes', '0', 'cargoCapacity'])).toBeNull()
      expect(operations.getValue(['attributes', '0', 'name'])).toBe('test')
    })

    it('does not report registrations of fields with a default value as a change', () => {
      // e.g. quantity value fields register their default unit as { value: null, unitId: ... }
      const onChange = jest.fn()
      const props = { value: [{ name: 'test' }], onChange }

      const { rerender } = renderNumberedList(props)
      flushDebounce()

      rerender(numberedListUi(props, (
        <RegisteringField
          initialValue={ { value: null, unitId: 'l' } }
          name={ ['attributes', '0', 'cargoCapacity'] }
        />
      )))
      flushDebounce()

      expect(onChange).not.toHaveBeenCalled()
      expect(operations.getValue(['attributes', '0', 'cargoCapacity'])).toEqual({ value: null, unitId: 'l' })
    })

    it('keeps the registration baseline when re-rendered with a content-equal value', () => {
      // a parent may recompute the value with a new identity on every render — resetting
      // the internal state in that case would wipe the registrations from the baseline
      // and report them as changes afterwards
      const onChange = jest.fn()
      const children = <RegisteringField name={ ['attributes', '0', 'cargoCapacity'] } />

      const { rerender } = renderNumberedList({ value: [{ name: 'test' }], onChange })
      flushDebounce()
      rerender(numberedListUi({ value: [{ name: 'test' }], onChange }, children))
      flushDebounce()

      // content-equal value, but a new array identity
      rerender(numberedListUi({ value: [{ name: 'test' }], onChange }, children))
      flushDebounce()

      expect(onChange).not.toHaveBeenCalled()
      expect(operations.getValue(['attributes', '0', 'cargoCapacity'])).toBeNull()
    })

    it('adopts a value with new content without reporting it as a change', () => {
      // after save/reload the parent passes the persisted value back in
      const onChange = jest.fn()
      const children = <RegisteringField name={ ['attributes', '0', 'cargoCapacity'] } />

      const { rerender } = renderNumberedList({ value: [{ name: 'test' }], onChange })
      flushDebounce()
      rerender(numberedListUi({ value: [{ name: 'test' }], onChange }, children))
      flushDebounce()

      rerender(numberedListUi({ value: [{ name: 'updated' }], onChange }, children))
      flushDebounce()

      expect(onChange).not.toHaveBeenCalled()
      expect(operations.getValue(['attributes', '0', 'name'])).toBe('updated')
      expect(operations.getValue(['attributes', '0', 'cargoCapacity'])).toBeNull()
    })
  })

  describe('user changes', () => {
    it('reports a user change with the full merged value', () => {
      const onChange = jest.fn()
      const props = { value: [{ name: 'test' }], onChange }

      const { rerender } = renderNumberedList(props)
      flushDebounce()
      rerender(numberedListUi(props, <RegisteringField name={ ['attributes', '0', 'cargoCapacity'] } />))
      flushDebounce()

      act(() => {
        operations.update(['attributes', '0', 'cargoCapacity'], { value: 5, unitId: 'l' }, false)
      })
      flushDebounce()

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([{ name: 'test', cargoCapacity: { value: 5, unitId: 'l' } }])
    })

    it('coalesces rapid successive changes into a single onChange', () => {
      const onChange = jest.fn()

      renderNumberedList({ value: [{ name: 'test' }], onChange })
      flushDebounce()

      act(() => {
        operations.update(['attributes', '0', 'name'], 'a', false)
        operations.update(['attributes', '0', 'name'], 'ab', false)
        operations.update(['attributes', '0', 'name'], 'abc', false)
      })
      flushDebounce()

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([{ name: 'abc' }])
    })

    it('does not report a transient change reverted within the debounce window', () => {
      const onChange = jest.fn()

      renderNumberedList({ value: [{ name: 'test' }], onChange })
      flushDebounce()

      act(() => {
        operations.update(['attributes', '0', 'name'], 'changed', false)
        operations.update(['attributes', '0', 'name'], 'test', false)
      })
      flushDebounce()

      expect(onChange).not.toHaveBeenCalled()
    })

    it('updates its state without an onChange handler', () => {
      renderNumberedList({ value: [{ name: 'test' }] })
      flushDebounce()

      act(() => { operations.update(['attributes', '0', 'name'], 'changed', false) })
      flushDebounce()

      expect(operations.getValue(['attributes', '0', 'name'])).toBe('changed')
    })

    it('calls onFieldChange for user changes but not for initial registrations', () => {
      const onFieldChange = jest.fn()

      renderNumberedList(
        { value: [{ name: 'test' }], onChange: jest.fn(), onFieldChange },
        <RegisteringField name={ ['attributes', '0', 'cargoCapacity'] } />
      )
      flushDebounce()

      expect(onFieldChange).not.toHaveBeenCalled()

      act(() => {
        operations.update(['attributes', '0', 'name'], 'changed', false)
      })

      expect(onFieldChange).toHaveBeenCalledTimes(1)
      expect(onFieldChange).toHaveBeenCalledWith(['attributes', '0', 'name'], 'changed')
    })
  })

  describe('operations', () => {
    it('add() appends a new entry and reports it as a change', () => {
      const onChange = jest.fn()

      renderNumberedList({ value: [{ name: 'a' }], onChange })
      flushDebounce()

      act(() => { operations.add({ name: 'b' }) })
      flushDebounce()

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([{ name: 'a' }, { name: 'b' }])
    })

    it('add() inserts at a given index', () => {
      const onChange = jest.fn()

      renderNumberedList({ value: [{ name: 'a' }, { name: 'b' }], onChange })
      flushDebounce()

      act(() => { operations.add({ name: 'inserted' }, 1) })
      flushDebounce()

      expect(onChange).toHaveBeenCalledWith([{ name: 'a' }, { name: 'inserted' }, { name: 'b' }])
    })

    it('remove() removes an entry and reports it as a change', () => {
      const onChange = jest.fn()

      renderNumberedList({ value: [{ name: 'a' }, { name: 'b' }], onChange })
      flushDebounce()

      act(() => { operations.remove(1) })
      flushDebounce()

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([{ name: 'a' }])
    })

    it('remove() of the last remaining entry reports an empty list', () => {
      // unlike KeyedList, an empty array is still reported — only undefined is suppressed
      const onChange = jest.fn()

      renderNumberedList({ value: [{ name: 'a' }], onChange })
      flushDebounce()

      act(() => { operations.remove(0) })
      flushDebounce()

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([])
    })

    it('move() reorders entries and reports it as a change', () => {
      const onChange = jest.fn()

      renderNumberedList({ value: [{ name: 'a' }, { name: 'b' }, { name: 'c' }], onChange })
      flushDebounce()

      act(() => { operations.move(0, 2) })
      flushDebounce()

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([{ name: 'b' }, { name: 'c' }, { name: 'a' }])
    })

    it('update() creates intermediate structures for nested paths', () => {
      const onChange = jest.fn()

      renderNumberedList({ value: [], onChange })
      flushDebounce()

      act(() => { operations.update(['attributes', '0', 'credentials', 'username'], 'admin', false) })
      flushDebounce()

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([{ credentials: { username: 'admin' } }])
    })

    it('getValue() resolves names relative to the item name', () => {
      renderNumberedList({ value: [{ name: 'test' }], onChange: jest.fn() })

      expect(operations.getValue(['attributes', '0'])).toEqual({ name: 'test' })
      expect(operations.getValue(['attributes', '0', 'name'])).toBe('test')
      expect(operations.getValue(['attributes', '0', 'unknown'])).toBeUndefined()
    })
  })

  describe('Iterator', () => {
    it('renders the iterated children once per entry, scoped to a group per index', () => {
      renderNumberedList(
        { value: [{ name: 'a' }, { name: 'b' }], onChange: jest.fn() },
        <NumberedList.Iterator>
          <GroupNameProbe />
        </NumberedList.Iterator>
      )

      const entries = screen.getAllByTestId('numbered-list-entry').map((entry) => entry.textContent)
      expect(entries).toEqual(['attributes.0', 'attributes.1'])
    })

    it('re-renders the iteration when entries are added or removed', () => {
      renderNumberedList(
        { value: [{ name: 'a' }], onChange: jest.fn() },
        <NumberedList.Iterator>
          <GroupNameProbe />
        </NumberedList.Iterator>
      )

      act(() => { operations.add({ name: 'b' }) })
      flushDebounce()

      expect(screen.getAllByTestId('numbered-list-entry').map((entry) => entry.textContent))
        .toEqual(['attributes.0', 'attributes.1'])

      act(() => { operations.remove(0) })
      flushDebounce()

      expect(screen.getAllByTestId('numbered-list-entry').map((entry) => entry.textContent))
        .toEqual(['attributes.0'])
    })
  })
})
