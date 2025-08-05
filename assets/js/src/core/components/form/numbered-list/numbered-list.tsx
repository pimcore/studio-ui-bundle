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
import { Form } from '../form'
import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { type NumberedListData, NumberedListProvider } from './provider/numbered-list/numbered-list-provider'
import { NumberedListIterator } from './iterator/numbered-list-iterator'
import { cloneDeep, isEqual, set, get, isArray, isUndefined } from 'lodash'
import { useItem } from '../item/provider/item/use-item'
import { useDebounce } from '@Pimcore/utils/hooks/use-debounce'

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
  const { name: tempItemName } = useItem()
  const bufferedValue = useDebounce(value, 10)

  const itemName = useMemo(() => isArray(tempItemName) ? tempItemName : [tempItemName], [tempItemName])
  const name = useMemo(() => itemName[itemName.length - 1], [itemName])

  const onChange: NumberedListData['onChange'] = useCallback((newValue: NumberedListData['values']) => {
    setValue(() => newValue)
    baseOnChange !== undefined && baseOnChange(newValue)
  }, [baseOnChange])

  useEffect(() => {
    if (!isEqual(value, initialValue)) {
      setValue(() => initialValue)
    }
  }, [baseValue])

  const add: NumberedListData['operations']['add'] = useCallback((newValue, key) => {
    let currentKey = key
    currentKey ??= value.length

    setValue((currentValue) => {
      const _newValue = cloneDeep(currentValue)
      _newValue.splice(currentKey, 0, newValue)
      return _newValue
    })
  }, [value.length])

  const remove: NumberedListData['operations']['remove'] = useCallback((key) => {
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
      onFieldChange?.(currentSubFieldname, newSubValue)
    }

    setValue((currentValue) => {
      const newValue = cloneDeep(currentValue)
      set(newValue, nameDifference, newSubValue)
      return newValue
    })
  }, [itemName, onFieldChange])

  const move: NumberedListData['operations']['move'] = useCallback((from, to) => {
    setValue((currentValue) => {
      const newValue = cloneDeep(currentValue)
      const [removed] = newValue.splice(from, 1)
      newValue.splice(to, 0, removed)
      return newValue
    })
  }, [])

  // Trigger onChange when value changes, but outside of setState
  useEffect(() => {
    if (!isEqual(value, initialValue) && !isUndefined(value)) {
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

    return get(value, nameDifference)
  }, [itemName, value])

  const operations = useMemo(() => ({ add, remove, update, move, getValue }), [add, remove, update, move, getValue])

  return (
    <NumberedListProvider
      getAdditionalComponentProps={ getAdditionalComponentProps }
      onChange={ onChange }
      operations={ operations }
      values={ value ?? {} }
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
