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

import { forEach, get, isEmpty, isPlainObject, isUndefined, set } from 'lodash'
import { type NamePath } from 'antd/es/form/interface'

export const DELETED = 'deleted'

export const getMergedValue = (currentValue: any, originalValue: any, propsValue: any, isInherited: (name: string) => boolean): any => {
  const originalFieldList = getFieldList(originalValue)
  const newFieldList = getFieldList(currentValue)
  const combinedFieldList = Array.from(new Set([...originalFieldList, ...newFieldList]))

  const mergedValue: Record<string, any> = {}

  forEach(combinedFieldList, fieldName => {
    const brickName = fieldName.split('.')[0]

    if (isUndefined(currentValue[brickName]) || currentValue[brickName].action === DELETED) {
      return
    }
    if (isInherited(fieldName)) {
      set(mergedValue, fieldName, get(originalValue, fieldName))
    } else {
      set(mergedValue, fieldName, get(currentValue, fieldName))
    }
  })
  // Do not change the format of empty values
  if (isEmpty(mergedValue) && isEmpty(propsValue)) {
    return propsValue
  }

  return mergedValue
}

export const getFieldList = (obj: any): string[] => {
  if (!isPlainObject(obj)) {
    return []
  }

  const fieldList: string[] = []
  forEach(Object.keys(obj as object), brickKey => {
    const brick = obj[brickKey]
    if (isPlainObject(brick)) {
      forEach(Object.keys(brick as object), fieldKey => {
        fieldList.push(fieldNameToString([brickKey, fieldKey]))
      })
    }
  })

  return fieldList
}

export const fieldNameToString = (field: NamePath): string => {
  return Array.isArray(field) ? field.join('.') : field
}

export const filterInheritedFields = (obj: any, isInherited: (name: string) => boolean): Record<string, any> => {
  if (!isPlainObject(obj)) {
    return {}
  }

  const result: Record<string, any> = {}
  forEach(getFieldList(obj), fieldName => {
    set(result, fieldName, !isInherited(fieldName) ? get(obj, fieldName) : null)
  })

  return result
}
