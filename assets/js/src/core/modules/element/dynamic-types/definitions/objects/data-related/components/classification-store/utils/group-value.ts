/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { forEach, get, isArray, isEmpty, isPlainObject, isUndefined, set, setWith } from 'lodash'
import { type NamePath } from 'antd/es/form/interface'

export const DELETED = 'deleted'

export const getMergedValue = (currentValue: any, originalValue: any, propsValue: any, isInherited: (name: string) => boolean): any => {
  const originalFieldList = getFieldList(originalValue)
  const newFieldList = getFieldList(currentValue)
  const combinedFieldList = Array.from(new Set([...originalFieldList, ...newFieldList]))

  const mergedValue: Record<string, any> = {}

  // ensure that numbered keys will injected as an object instead of an array, when calling lodash setWith
  const setAsObject = (objValue): object => {
    if (isUndefined(objValue)) {
      return {}
    }
    return objValue
  }

  forEach(combinedFieldList, fieldName => {
    const splittedFieldName = fieldName.split('.')
    const fieldNameLevel = splittedFieldName.length - 1
    const groupName = fieldName.split('.')[0]

    /* if (currentValue[groupName].action === DELETED) {
      return
    } */

    if (isInherited(fieldName)) {
      setWith(mergedValue, fieldName, get(originalValue, fieldName), setAsObject)
    } else {
      setWith(mergedValue, fieldName, get(currentValue, fieldName), setAsObject)
    }

    if (fieldNameLevel === 0 && isArray(get(currentValue, fieldName)) && isEmpty(currentValue[groupName])) {
      setWith(mergedValue, fieldName, {}, setAsObject)
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
  forEach(Object.keys(obj as object), groupKey => {
    const group = obj[groupKey]

    if (isPlainObject(group)) {
      forEach(Object.keys(group as object), languageKey => {
        const languageGroup = group[languageKey]

        if (isPlainObject(languageGroup)) {
          forEach(Object.keys(languageGroup as object), fieldName => {
            fieldList.push(fieldNameToString([groupKey, languageKey, fieldName]))
          })
        }
      })
    }

    if ((isArray(group) && group.length === 0) || ['activeGroups', 'groupCollectionMapping'].includes(groupKey)) {
      fieldList.push(fieldNameToString([groupKey]))
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

  const setAsObject = (objValue): object => {
    if (isUndefined(objValue)) {
      return {}
    }
    return objValue
  }

  forEach(getFieldList(obj), fieldName => {
    if (get(obj, fieldName) !== null) {
      setWith(result, fieldName, get(obj, fieldName), setAsObject)
    }
  })

  const { activeGroups, groupCollectionMapping, ...groups } = obj
  for (const [groupKey, groupValue] of Object.entries(groups as object)) {
    let isGroupEmpty = true

    for (const [languageKey, languageGroup] of Object.entries(groupValue as object)) {
      let isLanguageGroupEmpty = true

      for (const fieldValue of Object.entries(languageGroup as object)) {
        if (fieldValue[1] !== null) {
          isLanguageGroupEmpty = false
          isGroupEmpty = false
          break
        }
      }

      if (isLanguageGroupEmpty) {
        if (result[groupKey] !== undefined && result[groupKey][languageKey] !== undefined) {
          /* eslint-disable-next-line @typescript-eslint/no-dynamic-delete */
          delete result[groupKey][languageKey]
        }
      }
    }

    if (isGroupEmpty) {
      set(result, groupKey, [])
    }
  }

  return result
}
