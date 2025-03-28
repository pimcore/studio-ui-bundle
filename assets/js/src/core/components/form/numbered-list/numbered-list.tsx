/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { type NamePath } from 'antd/es/form/interface'
import { Form } from '../form'
import React, { useEffect, useMemo, useState } from 'react'
import { type NumberedListData, NumberedListProvider } from './provider/numbered-list/numbered-list-provider'
import { NumberedListIterator } from './iterator/numbered-list-iterator'
import { cloneDeep, isEqual, set, get, isArray } from 'lodash'
import { useItem } from '../item/provider/item/use-item'

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

  const itemName = useMemo(() => isArray(tempItemName) ? tempItemName : [tempItemName], [tempItemName])
  const name = useMemo(() => itemName[itemName.length - 1], [itemName])

  const onChange: NumberedListData['onChange'] = (newValue) => {
    baseOnChange !== undefined && baseOnChange(newValue)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isEqual(value, initialValue)) {
        onChange(value)
      }
    }, 300)

    return () => { clearTimeout(timeoutId) }
  }, [value])

  useEffect(() => {
    if (!isEqual(value, initialValue)) {
      setValue(initialValue)
    }
  }, [baseValue])

  const add: NumberedListData['operations']['add'] = (newValue = {}, key) => {
    let currentKey = key

    if (currentKey === undefined) {
      currentKey = value.length
    }

    setValue((currentValue) => {
      const _newValue = cloneDeep(currentValue)
      _newValue.splice(currentKey, 0, newValue)
      return _newValue
    })
  }

  const remove: NumberedListData['operations']['remove'] = (key) => {
    const newValue = cloneDeep(value)
    newValue.splice(key, 1)

    setValue(() => newValue)
  }

  const update: NumberedListData['operations']['update'] = (subFieldname, newSubValue, isInitialValue) => {
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
  }

  const move: NumberedListData['operations']['move'] = (from, to) => {
    setValue((currentValue) => {
      const newValue = cloneDeep(currentValue)
      const [removed] = newValue.splice(from, 1)
      newValue.splice(to, 0, removed)
      return newValue
    })
  }

  const getValue = (subFieldNames: string[]): any => {
    const currentName: string[] = itemName
    const nameDifference: string[] = []

    for (let i = 0; i < subFieldNames.length; i++) {
      if (currentName[i] !== subFieldNames[i]) {
        nameDifference.push(subFieldNames[i])
      }
    }

    return get(value, nameDifference)
  }

  return useMemo(() => (
    <NumberedListProvider
      getAdditionalComponentProps={ getAdditionalComponentProps }
      onChange={ onChange }
      operations={ { add, remove, update, move, getValue } }
      values={ value ?? {} }
    >
      <Form.Group name={ name }>
        {children}
      </Form.Group>
    </NumberedListProvider>
  ), [name, value, children, onChange, add, remove, update, getValue])
}

NumberedList.Iterator = NumberedListIterator

export { NumberedList }
