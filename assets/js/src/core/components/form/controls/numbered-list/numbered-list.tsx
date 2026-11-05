/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type NamePath } from 'antd/es/form/interface'
import { Form } from '../../form'
import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { type NumberedListData, NumberedListProvider } from './provider/numbered-list/numbered-list-provider'
import { NumberedListIterator } from './iterator/numbered-list-iterator'
import { cloneDeep, isEqual, set, get, isArray, isUndefined } from 'lodash'
import { useItem } from '../../item/provider/item/use-item'
import { useDebounce } from '@Pimcore/utils/hooks/use-debounce'
import { useFormGroupOptional } from '../../group/provider/use-form-group-optional'

export interface NumberedListProps {
  children: React.ReactNode
  value?: NumberedListData['values']
  onChange?: (value: NumberedListData['values']) => void
  onFieldChange?: (field: NamePath, value: any) => void
  getAdditionalComponentProps?: (name: NamePath) => Record<string, any>
}

const NumberedList = ({ children, value: baseValue, onChange: baseOnChange, onFieldChange, getAdditionalComponentProps }: NumberedListProps): React.JSX.Element => {
  const initialValue = baseValue ?? []
  const [value, setValue] = useState(cloneDeep(initialValue))
  // Mirror of the current value, kept in sync during render so the (referentially
  // stable) operations and the store can read the latest value without depending
  // on it — that is what keeps the provider context from changing on every keystroke.
  const valueRef = useRef(value)
  valueRef.current = value
  const listenersRef = useRef<Set<() => void>>(new Set())
  // Parents recreate these callbacks on every render. Routing them through refs
  // keeps `operations` and the provider context referentially stable.
  const baseOnChangeRef = useRef(baseOnChange)
  baseOnChangeRef.current = baseOnChange
  const onFieldChangeRef = useRef(onFieldChange)
  onFieldChangeRef.current = onFieldChange
  const getAdditionalComponentPropsRef = useRef(getAdditionalComponentProps)
  getAdditionalComponentPropsRef.current = getAdditionalComponentProps
  // the initial value enriched with the values the child fields register on mount,
  // so that those registrations are not reported as changes
  const baselineValue = useRef(cloneDeep(initialValue))
  const previousInitialValue = useRef(initialValue)
  // indexes of the entries added through add() since the last incoming value: their field registrations
  // (null or prefilled defaults) are content the user brought in, not part of the loaded state, so they
  // stay a change (an added entry whose fields all register null would otherwise look unchanged)
  const addedIndexesRef = useRef<Set<number>>(new Set())
  // current number of entries, kept in step with add() and remove() calls that are not rendered yet
  const lengthRef = useRef(value.length)
  lengthRef.current = value.length
  // the last value handed to onChange since the last incoming value: reverting to the baseline after that
  // report still has to be reported, otherwise the consumer keeps the reported state
  const lastReportedRef = useRef<NumberedListData['values'] | null>(null)
  const { name: tempItemName } = useItem()
  const bufferedValue = useDebounce(value, 10)

  const itemName = useMemo(() => isArray(tempItemName) ? tempItemName : [tempItemName], [tempItemName])
  const groupContext = useFormGroupOptional()

  const name = useMemo(() => {
    const parentLength = !isUndefined(groupContext) ? (isArray(groupContext.name) ? groupContext.name.length : 1) : 0
    const suffix = itemName.slice(parentLength)

    return suffix.length === 1 ? suffix[0] : suffix
  }, [itemName, groupContext])

  const onChange: NumberedListData['onChange'] = useCallback((newValue: NumberedListData['values']) => {
    setValue(() => newValue)
    baseOnChangeRef.current?.(newValue)
  }, [])

  useEffect(() => {
    // only react to actual content changes of the incoming value — this effect runs
    // after the child effects on mount, so an unconditional reset would wipe the
    // initial registrations the children already added to the value and the baseline
    if (isEqual(previousInitialValue.current, initialValue)) {
      return
    }

    previousInitialValue.current = initialValue
    addedIndexesRef.current.clear()
    lastReportedRef.current = null

    if (!isEqual(value, initialValue)) {
      setValue(() => initialValue)
    }
    baselineValue.current = cloneDeep(initialValue)
  }, [baseValue])

  const shiftAddedIndexes = useCallback((from: number, delta: 1 | -1): void => {
    addedIndexesRef.current = new Set([...addedIndexesRef.current].map((index) => index >= from ? index + delta : index))
  }, [])

  const add: NumberedListData['operations']['add'] = useCallback((newValue, key) => {
    const addedKey = key ?? lengthRef.current
    shiftAddedIndexes(addedKey, 1)
    addedIndexesRef.current.add(addedKey)
    lengthRef.current += 1

    setValue((currentValue) => {
      const currentKey = key ?? currentValue.length
      const _newValue = cloneDeep(currentValue)
      _newValue.splice(currentKey, 0, newValue)
      return _newValue
    })
  }, [])

  const remove: NumberedListData['operations']['remove'] = useCallback((key) => {
    addedIndexesRef.current.delete(key)
    shiftAddedIndexes(key + 1, -1)
    lengthRef.current -= 1

    setValue((currentValue) => {
      const newValue = cloneDeep(currentValue)
      newValue.splice(key, 1)
      return newValue
    })
  }, [])

  const update: NumberedListData['operations']['update'] = useCallback((subFieldname, newSubValue, isInitialValue) => {
    const currentName: string[] = itemName
    const currentSubFieldname: string[] = subFieldname
    const nameDifference: string[] = []

    for (let i = 0; i < currentSubFieldname.length; i++) {
      if (currentName[i] !== currentSubFieldname[i]) {
        nameDifference.push(currentSubFieldname[i])
      }
    }

    if (!isInitialValue) {
      onFieldChangeRef.current?.(currentSubFieldname, newSubValue)
    } else if (!addedIndexesRef.current.has(Number(nameDifference[0]))) {
      const newBaseline = cloneDeep(baselineValue.current)
      set(newBaseline, nameDifference, newSubValue)
      baselineValue.current = newBaseline
    }

    setValue((currentValue) => {
      const existing = nameDifference.length === 0 ? currentValue : get(currentValue, nameDifference)
      if (isEqual(existing, newSubValue)) {
        return currentValue
      }

      const newValue = cloneDeep(currentValue)
      set(newValue, nameDifference, newSubValue)
      return newValue
    })
  }, [itemName])

  const move: NumberedListData['operations']['move'] = useCallback((fromIndex, toIndex) => {
    const from = fromIndex
    // the destination is an index in the list after the removal, so it cannot exceed the last position
    const to = Math.max(0, Math.min(toIndex, lengthRef.current - 1))
    if (from === to) {
      return
    }

    addedIndexesRef.current = new Set([...addedIndexesRef.current].map((index) => {
      if (index === from) {
        return to
      }

      if (from < to && index > from && index <= to) {
        return index - 1
      }

      return from > to && index >= to && index < from ? index + 1 : index
    }))

    setValue((currentValue) => {
      const newValue = cloneDeep(currentValue)
      const [removed] = newValue.splice(from, 1)
      newValue.splice(to, 0, removed)
      return newValue
    })
  }, [])

  // Trigger onChange when value changes, but outside of setState
  useEffect(() => {
    if (isUndefined(value)) {
      return
    }

    const differsFromBaseline = !isEqual(value, baselineValue.current)
    const revertsReported = lastReportedRef.current !== null && !isEqual(value, lastReportedRef.current)
    if (differsFromBaseline || revertsReported) {
      // a return to baseline is reported once; keeping its snapshot would turn a later registration into a change
      lastReportedRef.current = differsFromBaseline ? cloneDeep(value) : null
      onChange(value)
    }
  }, [bufferedValue])

  const getValue = useCallback((subFieldNames: string[]): any => {
    const currentName: string[] = itemName
    const nameDifference: string[] = []

    for (let i = 0; i < subFieldNames.length; i++) {
      if (currentName[i] !== subFieldNames[i]) {
        nameDifference.push(subFieldNames[i])
      }
    }

    return get(valueRef.current, nameDifference)
  }, [itemName])

  const operations = useMemo(() => ({ add, remove, update, move, getValue }), [add, remove, update, move, getValue])

  // stable wrapper so the context identity is unaffected by the parent passing a
  // new getAdditionalComponentProps function on every render
  const stableGetAdditionalComponentProps = useCallback(
    (componentName: NamePath): Record<string, any> => getAdditionalComponentPropsRef.current?.(componentName) ?? {},
    []
  )

  // Stable external store: subscribers (per-item via useNumberedListValue) read the
  // current value through getSnapshot and are notified whenever it changes.
  const store = useMemo(() => ({
    subscribe: (listener: () => void): (() => void) => {
      listenersRef.current.add(listener)
      return () => {
        listenersRef.current.delete(listener)
      }
    },
    getSnapshot: () => valueRef.current
  }), [])

  useEffect(() => {
    listenersRef.current.forEach((listener) => { listener() })
  }, [value])

  return (
    <NumberedListProvider
      getAdditionalComponentProps={ stableGetAdditionalComponentProps }
      onChange={ onChange }
      operations={ operations }
      store={ store }
    >
      <Form.Group name={ name }>
        {children}
      </Form.Group>
    </NumberedListProvider>
  )
}

const memoedNumberedList = React.memo(NumberedList) as unknown as typeof NumberedList & {
  Iterator: typeof NumberedListIterator
}
memoedNumberedList.Iterator = NumberedListIterator

export { memoedNumberedList as NumberedList }
