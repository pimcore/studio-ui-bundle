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
import { KeyedList, type KeyedListProps } from './keyed-list'
import { type KeyedListData } from './provider/keyed-list/keyed-list-provider'
import { useKeyedList } from './provider/keyed-list/use-keyed-list'
import { ItemProvider } from '../../item/provider/item/item-provider'
import { useFormGroupOptional } from '../../group/provider/use-form-group-optional'

// the form barrel transitively imports antd-style (untranspiled ESM) — KeyedList
// only needs Form.Group from it, which is a plain context provider
jest.mock('../../form', () => ({
  Form: {
    Group: jest.requireActual('../../group/group').Group
  }
}))

let operations: KeyedListData['operations']

const OperationsProbe = (): null => {
  operations = useKeyedList().operations
  return null
}

// mimics KeyedFormItemControl: child fields register their initial value
// (defaulting to null) on mount via update(..., isInitialValue = true)
const RegisteringField = ({ name, initialValue }: { name: string[], initialValue?: any }): null => {
  const { operations } = useKeyedList()
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
  return <div data-testid="keyed-list-entry">{groupName.join('.')}</div>
}

const keyedListUi = (props: Omit<KeyedListProps, 'children'>, children?: React.ReactNode): React.JSX.Element => (
  <ItemProvider item={ { name: 'attributes' } }>
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

describe('KeyedList', () => {
  beforeEach(() => { jest.useFakeTimers() })
  afterEach(() => { jest.useRealTimers() })

  describe('initial field registrations (regression #3716)', () => {
    it('does not leak registrations of fields mounting together with the list into a change', () => {
      const onChange = jest.fn()

      renderKeyedList(
        { value: { myBrick: { name: 'test' } }, onChange },
        <>
          <RegisteringField name={ ['attributes', 'myBrick', 'cargoCapacity'] } />
          <RegisteringField name={ ['attributes', 'myBrick', 'topSpeed'] } />
        </>
      )

      flushDebounce()

      // a residual mount-time fire may report the UNMODIFIED incoming value (consumers
      // like ObjectBrick discard content-equal reports) — what must never happen is a
      // report whose content differs from the incoming value without a user change
      onChange.mock.calls.forEach(([reportedValue]) => {
        expect(reportedValue).toEqual({ myBrick: { name: 'test' } })
      })
    })

    it('does not report registrations of fields mounting after the list as a change', () => {
      // the common case in the editor: fields mount once the form data arrives
      const onChange = jest.fn()
      const props = { value: { myBrick: { name: 'test' } }, onChange }

      const { rerender } = renderKeyedList(props)
      flushDebounce()

      rerender(keyedListUi(props, <RegisteringField name={ ['attributes', 'myBrick', 'cargoCapacity'] } />))
      flushDebounce()

      expect(onChange).not.toHaveBeenCalled()
      expect(operations.getValue(['attributes', 'myBrick', 'cargoCapacity'])).toBeNull()
      expect(operations.getValue(['attributes', 'myBrick', 'name'])).toBe('test')
    })

    it('does not report registrations of fields with a default value as a change', () => {
      // e.g. quantity value fields register their default unit as { value: null, unitId: ... }
      const onChange = jest.fn()
      const props = { value: { myBrick: { name: 'test' } }, onChange }

      const { rerender } = renderKeyedList(props)
      flushDebounce()

      rerender(keyedListUi(props, (
        <RegisteringField
          initialValue={ { value: null, unitId: 'l' } }
          name={ ['attributes', 'myBrick', 'cargoCapacity'] }
        />
      )))
      flushDebounce()

      expect(onChange).not.toHaveBeenCalled()
      expect(operations.getValue(['attributes', 'myBrick', 'cargoCapacity'])).toEqual({ value: null, unitId: 'l' })
    })

    it('normalizes an empty array value to an object and stays silent on mount', () => {
      // the API sends [] when no brick is set yet
      const onChange = jest.fn()

      renderKeyedList(
        { value: [] as unknown as KeyedListData['values'], onChange },
        <RegisteringField name={ ['attributes', 'myBrick', 'cargoCapacity'] } />
      )

      flushDebounce()

      expect(onChange).not.toHaveBeenCalled()
    })

    it('keeps the registration baseline when re-rendered with a content-equal value', () => {
      // a parent may recompute the value with a new identity on every render — resetting
      // the internal state in that case would wipe the registrations from the baseline
      // and report them as changes afterwards
      const onChange = jest.fn()
      const children = <RegisteringField name={ ['attributes', 'myBrick', 'cargoCapacity'] } />

      const { rerender } = renderKeyedList({ value: { myBrick: { name: 'test' } }, onChange })
      flushDebounce()
      rerender(keyedListUi({ value: { myBrick: { name: 'test' } }, onChange }, children))
      flushDebounce()

      // content-equal value, but a new object identity
      rerender(keyedListUi({ value: { myBrick: { name: 'test' } }, onChange }, children))
      flushDebounce()

      expect(onChange).not.toHaveBeenCalled()
      expect(operations.getValue(['attributes', 'myBrick', 'cargoCapacity'])).toBeNull()
    })

    it('adopts a value with new content without reporting it as a change', () => {
      // after save/reload the parent passes the persisted value back in
      const onChange = jest.fn()
      const children = <RegisteringField name={ ['attributes', 'myBrick', 'cargoCapacity'] } />

      const { rerender } = renderKeyedList({ value: { myBrick: { name: 'test' } }, onChange })
      flushDebounce()
      rerender(keyedListUi({ value: { myBrick: { name: 'test' } }, onChange }, children))
      flushDebounce()

      rerender(keyedListUi({ value: { myBrick: { name: 'updated' } }, onChange }, children))
      flushDebounce()

      expect(onChange).not.toHaveBeenCalled()
      expect(operations.getValue(['attributes', 'myBrick', 'name'])).toBe('updated')
      expect(operations.getValue(['attributes', 'myBrick', 'cargoCapacity'])).toBeNull()
    })
  })

  describe('user changes', () => {
    it('reports a user change with the full merged value', () => {
      const onChange = jest.fn()
      const props = { value: { myBrick: { name: 'test' } }, onChange }

      const { rerender } = renderKeyedList(props)
      flushDebounce()
      rerender(keyedListUi(props, <RegisteringField name={ ['attributes', 'myBrick', 'cargoCapacity'] } />))
      flushDebounce()

      act(() => {
        operations.update(['attributes', 'myBrick', 'cargoCapacity'], { value: 5, unitId: 'l' }, false)
      })
      flushDebounce()

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith({ myBrick: { name: 'test', cargoCapacity: { value: 5, unitId: 'l' } } })
    })

    it('coalesces rapid successive changes into a single onChange', () => {
      const onChange = jest.fn()

      renderKeyedList({ value: { myBrick: { name: 'test' } }, onChange })
      flushDebounce()

      act(() => {
        operations.update(['attributes', 'myBrick', 'name'], 'a', false)
        operations.update(['attributes', 'myBrick', 'name'], 'ab', false)
        operations.update(['attributes', 'myBrick', 'name'], 'abc', false)
      })
      flushDebounce()

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith({ myBrick: { name: 'abc' } })
    })

    it('reports each settled change separately', () => {
      const onChange = jest.fn()

      renderKeyedList({ value: { myBrick: { name: 'test' } }, onChange })
      flushDebounce()

      act(() => { operations.update(['attributes', 'myBrick', 'name'], 'first', false) })
      flushDebounce()
      act(() => { operations.update(['attributes', 'myBrick', 'name'], 'second', false) })
      flushDebounce()

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith({ myBrick: { name: 'second' } })
    })

    it('does not report a transient change reverted within the debounce window', () => {
      const onChange = jest.fn()

      renderKeyedList({ value: { myBrick: { name: 'test' } }, onChange })
      flushDebounce()

      act(() => {
        operations.update(['attributes', 'myBrick', 'name'], 'changed', false)
        operations.update(['attributes', 'myBrick', 'name'], 'test', false)
      })
      flushDebounce()

      expect(onChange).not.toHaveBeenCalled()
    })

    it('updates its state without an onChange handler', () => {
      renderKeyedList({ value: { myBrick: { name: 'test' } } })
      flushDebounce()

      act(() => { operations.update(['attributes', 'myBrick', 'name'], 'changed', false) })
      flushDebounce()

      expect(operations.getValue(['attributes', 'myBrick', 'name'])).toBe('changed')
    })

    it('calls onFieldChange for user changes but not for initial registrations', () => {
      const onFieldChange = jest.fn()

      renderKeyedList(
        { value: { myBrick: { name: 'test' } }, onChange: jest.fn(), onFieldChange },
        <RegisteringField name={ ['attributes', 'myBrick', 'cargoCapacity'] } />
      )
      flushDebounce()

      expect(onFieldChange).not.toHaveBeenCalled()

      act(() => {
        operations.update(['attributes', 'myBrick', 'name'], 'changed', false)
      })

      expect(onFieldChange).toHaveBeenCalledTimes(1)
      expect(onFieldChange).toHaveBeenCalledWith(['attributes', 'myBrick', 'name'], 'changed')
    })
  })

  describe('operations', () => {
    it('add() adds a new entry and reports it as a change', () => {
      const onChange = jest.fn()

      renderKeyedList({ value: { existing: { name: 'a' } }, onChange })
      flushDebounce()

      act(() => { operations.add('added', { name: 'b' }) })
      flushDebounce()

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith({ existing: { name: 'a' }, added: { name: 'b' } })
    })

    it('add() does not overwrite an existing key', () => {
      const onChange = jest.fn()

      renderKeyedList({ value: { existing: { name: 'a' } }, onChange })
      flushDebounce()

      act(() => { operations.add('existing', { name: 'overwritten' }) })
      flushDebounce()

      expect(onChange).not.toHaveBeenCalled()
      expect(operations.getValue(['attributes', 'existing', 'name'])).toBe('a')
    })

    it('remove() removes an entry and reports it as a change', () => {
      const onChange = jest.fn()

      renderKeyedList({ value: { first: { name: 'a' }, second: { name: 'b' } }, onChange })
      flushDebounce()

      act(() => { operations.remove('second') })
      flushDebounce()

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith({ first: { name: 'a' } })
    })

    it('update() creates intermediate structures for nested paths', () => {
      const onChange = jest.fn()

      renderKeyedList({ value: {}, onChange })
      flushDebounce()

      act(() => { operations.update(['attributes', 'newBrick', 'credentials', 'username'], 'admin', false) })
      flushDebounce()

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith({ newBrick: { credentials: { username: 'admin' } } })
    })

    it('remove() of the last remaining entry is not reported (empty values stay silent)', () => {
      // the empty-value guard also suppresses this case — consumers handling deletions
      // (like ObjectBrick) track them through their own deletion markers instead
      const onChange = jest.fn()

      renderKeyedList({ value: { only: { name: 'a' } }, onChange })
      flushDebounce()

      act(() => { operations.remove('only') })
      flushDebounce()

      expect(onChange).not.toHaveBeenCalled()
      expect(operations.getValue(['attributes', 'only'])).toBeUndefined()
    })

    it('getValue() resolves names relative to the item name', () => {
      renderKeyedList({ value: { myBrick: { name: 'test' } }, onChange: jest.fn() })

      expect(operations.getValue(['attributes', 'myBrick'])).toEqual({ name: 'test' })
      expect(operations.getValue(['attributes', 'myBrick', 'name'])).toBe('test')
      expect(operations.getValue(['attributes', 'myBrick', 'unknown'])).toBeUndefined()
    })

    it('exposes getAdditionalComponentProps to consumers', () => {
      // ObjectBrick uses this to flag inherited fields on the rendered components
      const getAdditionalComponentProps = jest.fn((name: unknown) => ({ inherited: true }))
      let receivedProps: Record<string, any> | undefined

      const PropsProbe = (): null => {
        receivedProps = useKeyedList().getAdditionalComponentProps?.(['attributes', 'myBrick', 'name'])
        return null
      }

      renderKeyedList(
        { value: { myBrick: { name: 'test' } }, onChange: jest.fn(), getAdditionalComponentProps },
        <PropsProbe />
      )

      expect(receivedProps).toEqual({ inherited: true })
      expect(getAdditionalComponentProps).toHaveBeenCalledWith(['attributes', 'myBrick', 'name'])
    })
  })

  describe('Iterator', () => {
    it('renders the iterated children once per entry, scoped to a group per key', () => {
      renderKeyedList(
        { value: { first: { name: 'a' }, second: { name: 'b' } }, onChange: jest.fn() },
        <KeyedList.Iterator>
          <GroupNameProbe />
        </KeyedList.Iterator>
      )

      const entries = screen.getAllByTestId('keyed-list-entry').map((entry) => entry.textContent)
      expect(entries).toEqual(['attributes.first', 'attributes.second'])
    })

    it('re-renders the iteration when entries are added or removed', () => {
      renderKeyedList(
        { value: { first: { name: 'a' } }, onChange: jest.fn() },
        <KeyedList.Iterator>
          <GroupNameProbe />
        </KeyedList.Iterator>
      )

      act(() => { operations.add('second', { name: 'b' }) })
      flushDebounce()

      expect(screen.getAllByTestId('keyed-list-entry').map((entry) => entry.textContent))
        .toEqual(['attributes.first', 'attributes.second'])

      act(() => { operations.remove('first') })
      flushDebounce()

      expect(screen.getAllByTestId('keyed-list-entry').map((entry) => entry.textContent))
        .toEqual(['attributes.second'])
    })
  })
})
