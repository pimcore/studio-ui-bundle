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
import React, { useEffect, useMemo, useCallback, useRef } from 'react'
import { type KeyedListData, KeyedListProvider } from './provider/keyed-list/keyed-list-provider'
import { KeyedListIterator } from './iterator/keyed-list-iterator'
import { cloneDeep, isArray, isEqual, isNil, isObject, get, isUndefined, setWith, isEmpty } from 'lodash'
import { useItem } from '../../item/provider/item/use-item'
import { useDebounce } from '@Pimcore/utils/hooks/use-debounce'
import { useKeyedListValue } from './hooks/use-keyed-list-value'

export interface KeyedListProps {
  children: React.ReactNode
  value?: KeyedListData['values']
  onChange?: (value: KeyedListData['values']) => void
  onFieldChange?: (field: NamePath, value: any) => void
  getAdditionalComponentProps?: (name: NamePath) => Record<string, any>
}

// one registration can overwrite what another wrote when either path contains the
// other: `myBrick` covers `myBrick.length`, and writing one after the other is not
// the same as writing them the other way round.
//
// Segments are compared as strings because a NamePath permits numbers and lodash
// addresses `1` and `'1'` as one property. Comparing them as written would let the
// same path spelled two ways look like two paths, which is exactly the overlap this
// has to catch.
const pathsOverlap = (a: NamePath[], b: NamePath[]): boolean => {
  const [shorter, longer] = a.length <= b.length ? [a, b] : [b, a]

  return shorter.every((segment, index) => String(segment) === String(longer[index]))
}

const KeyedList = ({ children, value: baseValue, onChange: baseOnChange, onFieldChange, getAdditionalComponentProps }: KeyedListProps): React.JSX.Element => {
  const initialValue = useMemo<KeyedListData['values']>(() => isArray(baseValue) ? {} : baseValue ?? {}, [baseValue])
  const { value, valueRef, setValue, store } = useKeyedListValue(initialValue)
  // The value as of the last render, which is the schedule the registration bookkeeping
  // below is written against: a registration is queued against the value it was made in
  // and absorbed into the baseline once that value has been replaced by a committed one.
  // Distinct from `valueRef`, which runs ahead of the commit (see useKeyedListValue).
  const committedValueRef = useRef(value)
  committedValueRef.current = value
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
  // the initial value enriched with the values the child fields register on mount,
  // so that those registrations are not reported as changes
  const baselineValue = useRef(cloneDeep(initialValue))
  // registrations whose value has not been committed yet. The baseline must never run
  // ahead of the value: it is a ref and moves synchronously, the value is state and
  // moves a commit later, and the compare effect in between would read the difference
  // as something the user typed. They are applied once the value carrying them lands.
  const pendingRegistrations = useRef<Array<{ path: string[], value: any, queuedAgainst: KeyedListData['values'] }>>([])
  const previousInitialValue = useRef(initialValue)
  // keys added through add() since the last incoming value: their field registrations (e.g. prefilled
  // defaults) are content the user brought in, not part of the loaded state, so they stay a change
  const addedKeysRef = useRef<Set<string>>(new Set())
  // the last value handed to onChange since the last incoming value: reverting to the baseline after that
  // report still has to be reported, otherwise the consumer keeps the reported state
  const lastReportedRef = useRef<KeyedListData['values'] | null>(null)
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
    addedKeysRef.current.clear()
    lastReportedRef.current = null
    // queued registrations describe the value that is being replaced
    pendingRegistrations.current = []

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

      addedKeysRef.current.add(key)
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
      addedKeysRef.current.delete(key)
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
      // a null intermediate (e.g. localized fields without any value) would stop setWith from writing at all;
      // registrations keep it, otherwise they would differ from the loaded value and be reported as a change
      if (isInitialValue ? isUndefined(obj) : isNil(obj)) {
        return {}
      }

      return obj
    }

    if (isInitialValue && !addedKeysRef.current.has(nameDifference[0])) {
      // registrations that can overwrite one another have to reach the baseline in
      // the order they were made. The two branches below apply on different
      // schedules — one now, one once the value commits — so a registration
      // overlapping one that is already waiting joins the queue instead of
      // overtaking it. Without that the earlier queued one lands after the later
      // immediate one and puts the baseline back to a value the field has already
      // moved off, which the compare effect then reads as content somebody typed.
      const overlapsPending = pendingRegistrations.current.some(
        ({ path }) => pathsOverlap(path, nameDifference)
      )

      const committed = nameDifference.length === 0 ? committedValueRef.current : get(committedValueRef.current, nameDifference)

      if (!overlapsPending && isEqual(committed, newSubValue)) {
        // the value already carries this registration, so taking it into the baseline
        // now moves the baseline towards the value and can never get ahead of it
        const newBaseline = cloneDeep(baselineValue.current)
        // cloned for the same reason the queued branch clones: the baseline must not
        // end up holding an object the caller can still write to
        setWith(newBaseline, nameDifference, cloneDeep(newSubValue), setAsObject)
        baselineValue.current = newBaseline
      } else {
        pendingRegistrations.current.push({ path: nameDifference, value: newSubValue, queuedAgainst: committedValueRef.current })
      }
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

  // Absorb the registrations the current value has caught up with. A registration is
  // queued against the value of the commit it was made in, so a value that is still
  // that one does not carry it yet — only once the reference has moved on is taking it
  // into the baseline guaranteed not to put the baseline ahead. Declared above the
  // compare effect on purpose: effects run in order, so the baseline is up to date by
  // the time the comparison below reads it.
  useEffect(() => {
    const landed = pendingRegistrations.current.filter(({ queuedAgainst }) => queuedAgainst !== value)
    if (landed.length === 0) {
      return
    }

    pendingRegistrations.current = pendingRegistrations.current.filter(({ queuedAgainst }) => queuedAgainst === value)

    const newBaseline = cloneDeep(baselineValue.current)
    landed.forEach(({ path, value: registered }) => {
      // cloned on the way in: inserting by reference would put the caller's own
      // object into the baseline, and writing a child path later in this same loop
      // would then reach back into it — altering both what the field still holds and
      // the registration it is about to make again
      setWith(newBaseline, path, cloneDeep(registered), (obj) => isUndefined(obj) ? {} : obj)
    })
    baselineValue.current = newBaseline
  }, [value])

  // Trigger onChange when value changes, but outside of setState
  useEffect(() => {
    // a list that came in empty and is still empty has nothing to report: registrations of
    // mounting fields only touch the baseline. Emptying a list that came in with entries (removing its last
    // entry) is a real change, consumers derive their deletion markers from it.
    const differsFromBaseline = !isEqual(value, baselineValue.current) && !(isEmpty(value) && isEmpty(initialValue))
    const revertsReported = lastReportedRef.current !== null && !isEqual(value, lastReportedRef.current)
    if (differsFromBaseline || revertsReported) {
      lastReportedRef.current = cloneDeep(value)
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

  return (
    <KeyedListProvider
      getAdditionalComponentProps={ stableGetAdditionalComponentProps }
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
