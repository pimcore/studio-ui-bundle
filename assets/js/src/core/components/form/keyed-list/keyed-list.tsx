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
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { type KeyedListData, KeyedListProvider } from './provider/keyed-list/keyed-list-provider'
import { KeyedListIterator } from './iterator/keyed-list-iterator'
import { cloneDeep, isArray, isEqual, isObject, get, isUndefined, setWith, isEmpty } from 'lodash'
import { useItem } from '../item/provider/item/use-item'

export interface KeyedListProps {
  children: React.ReactNode
  value?: KeyedListData['values']
  onChange?: (value: KeyedListData['values']) => void
  onFieldChange?: (field: NamePath, value: any) => void
  getAdditionalComponentProps?: (name: NamePath) => Record<string, any>
}

const KeyedList = ({ children, value: baseValue, onChange: baseOnChange, onFieldChange, getAdditionalComponentProps }: KeyedListProps): React.JSX.Element => {
  const initialValue = isArray(baseValue) ? {} : baseValue ?? {}
  const [value, setValue] = useState(cloneDeep(initialValue))
  const { name: tempItemName } = useItem()
  const itemName = useMemo(() => isArray(tempItemName) ? tempItemName : [tempItemName], [tempItemName])
  const name = useMemo(() => itemName[itemName.length - 1], [itemName])
  const timer = useRef<NodeJS.Timeout | null>(null)

  const onChange: KeyedListData['onChange'] = (newValue) => {
    if (!isEmpty(timer.current)) {
      clearTimeout(timer.current)
    }

    if (baseOnChange !== undefined) {
      setValue(() => newValue)
      baseOnChange(newValue)
    }
  }

  useEffect(() => {
    if (!isEmpty(timer.current)) {
      clearTimeout(timer.current)
    }

    if (!isEqual(value, initialValue)) {
      timer.current = setTimeout(() => {
        setValue(() => initialValue)
      }, 100)
    }
  }, [baseValue])

  const triggerChange = (value: KeyedListProps['value']): void => {
    if (!isEqual(value, initialValue) && !isEmpty(value)) {
      onChange(value)
    }
  }

  const add: KeyedListData['operations']['add'] = (key, newValue = {}) => {
    setValue((currentValue) => {
      if (isObject(currentValue) && currentValue[key] !== undefined) {
        triggerChange(currentValue)
      }

      const _newValue = cloneDeep(currentValue)
      _newValue[key] = newValue
      triggerChange(_newValue)
      return _newValue
    })
  }

  const remove: KeyedListData['operations']['remove'] = (key) => {
    const newValue = cloneDeep(value)
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete newValue[key]

    setValue(() => {
      triggerChange(newValue)
      return newValue
    })
  }

  const update: KeyedListData['operations']['update'] = (subFieldname, newSubValue, isInitialValue) => {
    const currentName: string[] = isArray(itemName) ? itemName : [itemName]
    const currentSubFieldname: string[] = isArray(subFieldname) ? subFieldname : [subFieldname]

    const nameDifference: string[] = []

    for (let i = 0; i < currentSubFieldname.length; i++) {
      if (currentName[i] !== currentSubFieldname[i]) {
        nameDifference.push(currentSubFieldname[i])
      }
    }

    if (!isInitialValue) {
      onFieldChange?.(currentSubFieldname, newSubValue)
    }

    const setAsObject = (obj): object => {
      if (isUndefined(obj)) {
        return {}
      }

      return obj
    }

    setValue((currentValue) => {
      const newValue = cloneDeep(currentValue)
      setWith(newValue, nameDifference, newSubValue, setAsObject)
      triggerChange(newValue)
      return newValue
    })
  }

  const getValue = (subFieldNames: string[]): any => {
    const currentName: string[] = isArray(itemName) ? itemName : [itemName]
    const nameDifference: string[] = []

    for (let i = 0; i < subFieldNames.length; i++) {
      if (currentName[i] !== subFieldNames[i]) {
        nameDifference.push(subFieldNames[i])
      }
    }

    return get(value, nameDifference)
  }

  return useMemo(() => (
    <KeyedListProvider
      getAdditionalComponentProps={ getAdditionalComponentProps }
      onChange={ onChange }
      operations={ { add, remove, update, getValue } }
      values={ value ?? {} }
    >
      <Form.Group name={ name }>
        {children}
      </Form.Group>
    </KeyedListProvider>
  ), [name, value, children, onChange, add, remove, update, getValue])
}

KeyedList.Iterator = KeyedListIterator

export { KeyedList }
