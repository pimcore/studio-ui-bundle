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
import { type KeyedListData, KeyedListProvider } from './provider/keyed-list/keyed-list-provider'
import { KeyedListIterator } from './iterator/keyed-list-iterator'
import { cloneDeep, isArray, isEqual, isObject, get, isUndefined, setWith, isEmpty } from 'lodash'
import { useItem } from '../../item/provider/item/use-item'
import { useDebounce } from '@Pimcore/utils/hooks/use-debounce'

export interface KeyedListProps {
  children: React.ReactNode
  value?: KeyedListData['values']
  onChange?: (value: KeyedListData['values']) => void
  onFieldChange?: (field: NamePath, value: any) => void
  getAdditionalComponentProps?: (name: NamePath) => Record<string, any>
  /** Counterpart of onFieldChange: puts a field back to the value it was loaded with. */
  onFieldRestore?: (field: NamePath) => void
}

const KeyedList = ({ children, value: baseValue, onChange: baseOnChange, onFieldChange, getAdditionalComponentProps, onFieldRestore }: KeyedListProps): React.JSX.Element => {
  const initialValue = useMemo(() => isArray(baseValue) ? {} : baseValue ?? {}, [baseValue])
  const [value, setValue] = useState(cloneDeep(initialValue))
  // Mirror of the current value, kept in sync during render so the (referentially
  // stable) operations and the store can read the latest value without depending
  // on it — that is what keeps the provider context from changing on every keystroke.
  const valueRef = useRef(value)
  valueRef.current = value
  const listenersRef = useRef<Set<() => void>>(new Set())
  // Parents (e.g. ClassificationStore) recreate these callbacks on every render.
  // Routing them through refs keeps `operations` and the provider context
  // referentially stable, so a re-render of the parent no longer re-renders every
  // field consuming the context.
  const baseOnChangeRef = useRef(baseOnChange)
  baseOnChangeRef.current = baseOnChange
  const onFieldChangeRef = useRef(onFieldChange)
  onFieldChangeRef.current = onFieldChange
  const getAdditionalComponentPropsRef = useRef(getAdditionalComponentProps)
  getAdditionalComponentPropsRef.current = getAdditionalComponentProps
  const onFieldRestoreRef = useRef(onFieldRestore)
  onFieldRestoreRef.current = onFieldRestore
  const supportsFieldRestore = onFieldRestore !== undefined
  // the initial value enriched with the values the child fields register on mount,
  // so that those registrations are not reported as changes
  const baselineValue = useRef(cloneDeep(initialValue))
  const previousInitialValue = useRef(initialValue)
  const { name: tempItemName } = useItem()
  const itemName = useMemo(() => isArray(tempItemName) ? tempItemName : [tempItemName], [tempItemName])
  const name = useMemo(() => itemName[itemName.length - 1], [itemName])
  const bufferedValue = useDebounce(value, 10)

  const onChange: KeyedListData['onChange'] = useCallback((newValue: KeyedListData['values']) => {
    if (baseOnChangeRef.current !== undefined) {
      setValue(() => newValue)
      baseOnChangeRef.current(newValue)
    }
  }, [])

  useEffect(() => {
    // only react to actual content changes of the incoming value — this effect runs
    // after the child effects on mount, so an unconditional reset would wipe the
    // initial registrations the children already added to the value and the baseline
    if (isEqual(previousInitialValue.current, initialValue)) {
      return
    }

    previousInitialValue.current = initialValue

    if (!isEqual(value, initialValue)) {
      setValue(() => initialValue)
    }
    baselineValue.current = cloneDeep(initialValue)
  }, [initialValue])

  const add: KeyedListData['operations']['add'] = useCallback((key, newValue = {}) => {
    setValue((currentValue) => {
      if (isObject(currentValue) && currentValue[key] !== undefined) {
        return currentValue
      }

      const _newValue = cloneDeep(currentValue)
      _newValue[key] = newValue
      return _newValue
    })
  }, [])

  const remove: KeyedListData['operations']['remove'] = useCallback((key) => {
    setValue((currentValue) => {
      const newValue = cloneDeep(currentValue)
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete newValue[key]
      return newValue
    })
  }, [])

  const update: KeyedListData['operations']['update'] = useCallback((subFieldname, newSubValue, isInitialValue) => {
    const currentName: string[] = isArray(itemName) ? itemName : [itemName]
    const currentSubFieldname: string[] = isArray(subFieldname) ? subFieldname : [subFieldname]

    const nameDifference: string[] = []

    for (let i = 0; i < currentSubFieldname.length; i++) {
      if (currentName[i] !== currentSubFieldname[i]) {
        nameDifference.push(currentSubFieldname[i])
      }
    }

    if (!isInitialValue) {
      onFieldChangeRef.current?.(currentSubFieldname, newSubValue)
    }

    const setAsObject = (obj): object => {
      if (isUndefined(obj)) {
        return {}
      }

      return obj
    }

    if (isInitialValue) {
      const newBaseline = cloneDeep(baselineValue.current)
      setWith(newBaseline, nameDifference, newSubValue, setAsObject)
      baselineValue.current = newBaseline
    }

    setValue((currentValue) => {
      // bail out when the content is unchanged: cloning would otherwise hand back a
      // new reference on every call, which keeps the provider context (and the whole
      // editor) re-rendering even though nothing actually changed.
      const existing = nameDifference.length === 0 ? currentValue : get(currentValue, nameDifference)
      if (isEqual(existing, newSubValue)) {
        return currentValue
      }

      const newValue = cloneDeep(currentValue)
      setWith(newValue, nameDifference, newSubValue, setAsObject)
      return newValue
    })
  }, [itemName])

  // Trigger onChange when value changes, but outside of setState
  useEffect(() => {
    if (!isEqual(value, baselineValue.current) && !isEmpty(value)) {
      onChange(value)
    }
  }, [bufferedValue])

  const getValue = useCallback((subFieldNames: string[]): any => {
    const currentName: string[] = isArray(itemName) ? itemName : [itemName]
    const nameDifference: string[] = []

    for (let i = 0; i < subFieldNames.length; i++) {
      if (currentName[i] !== subFieldNames[i]) {
        nameDifference.push(subFieldNames[i])
      }
    }

    return get(valueRef.current, nameDifference)
  }, [itemName])

  const operations = useMemo(() => ({ add, remove, update, getValue }), [add, remove, update, getValue])

  // stable wrapper so the context identity is unaffected by the parent passing a
  // new getAdditionalComponentProps function on every render
  const stableGetAdditionalComponentProps = useCallback(
    (componentName: NamePath): Record<string, any> => getAdditionalComponentPropsRef.current?.(componentName) ?? {},
    []
  )

  const stableOnFieldRestore = useCallback(
    (field: NamePath): void => { onFieldRestoreRef.current?.(field) },
    []
  )

  // Stable external store: subscribers (per-field via useKeyedListValue) read the
  // current value through getSnapshot and are notified whenever it changes.
  const store = useMemo(() => ({
    subscribe: (listener: () => void): (() => void) => {
      listenersRef.current.add(listener)
      return () => {
        listenersRef.current.delete(listener)
      }
    },
    // must return a stable reference when nothing changed (useSyncExternalStore
    // invariant); `value` is always an object, so valueRef.current is stable.
    getSnapshot: () => valueRef.current
  }), [])

  useEffect(() => {
    listenersRef.current.forEach((listener) => { listener() })
  }, [value])

  return (
    <KeyedListProvider
      getAdditionalComponentProps={ stableGetAdditionalComponentProps }
      onFieldRestore={ supportsFieldRestore ? stableOnFieldRestore : undefined }
      operations={ operations }
      store={ store }
    >
      <Form.Group name={ name }>
        {children}
      </Form.Group>
    </KeyedListProvider>
  )
}

const memoedKeyedList = React.memo(KeyedList) as unknown as typeof KeyedList & {
  Iterator: typeof KeyedListIterator
}
memoedKeyedList.Iterator = KeyedListIterator

export { memoedKeyedList as KeyedList }
