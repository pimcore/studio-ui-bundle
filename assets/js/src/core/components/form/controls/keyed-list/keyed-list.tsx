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
import React, { useEffect, useMemo, useState, useCallback } from 'react'
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
}

const KeyedList = ({ children, value: baseValue, onChange: baseOnChange, onFieldChange, getAdditionalComponentProps }: KeyedListProps): React.JSX.Element => {
  const initialValue = useMemo(() => isArray(baseValue) ? {} : baseValue ?? {}, [baseValue])
  const [value, setValue] = useState(cloneDeep(initialValue))
  const { name: tempItemName } = useItem()
  const itemName = useMemo(() => isArray(tempItemName) ? tempItemName : [tempItemName], [tempItemName])
  const name = useMemo(() => itemName[itemName.length - 1], [itemName])
  const bufferedValue = useDebounce(value, 10)

  const onChange: KeyedListData['onChange'] = useCallback((newValue: KeyedListData['values']) => {
    if (baseOnChange !== undefined) {
      setValue(() => newValue)
      baseOnChange(newValue)
    }
  }, [baseOnChange])

  useEffect(() => {
    if (!isEqual(value, initialValue)) {
      setValue(() => initialValue)
    }
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
      return newValue
    })
  }, [itemName, onFieldChange])

  // Trigger onChange when value changes, but outside of setState
  useEffect(() => {
    if (!isEqual(value, initialValue) && !isEmpty(value)) {
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

    return get(value, nameDifference)
  }, [itemName, value])

  const operations = useMemo(() => ({ add, remove, update, getValue }), [add, remove, update, getValue])

  return (
    <KeyedListProvider
      getAdditionalComponentProps={ getAdditionalComponentProps }
      operations={ operations }
      values={ value ?? {} }
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
