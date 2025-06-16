/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo, useRef } from 'react'
import { forEach, get, isArray, isEmpty, isEqual, isPlainObject, isUndefined, keys, union } from 'lodash'
import { type NamePath } from 'antd/es/form/interface'
import { type AbstractObjectDataDefinition } from '../../dynamic-type-object-data-abstract'
import { Form } from '@Pimcore/components/form/form'
import { ClassificationStoreContent } from './classification-store-content'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { useInheritanceState } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/use-inheritance-state'
import { DELETED, filterInheritedFields, getMergedValue } from './utils/group-value'
import { ClassificationStoreModal } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/components/classification-store-modal/classification-store-modal'
import { ClassificationStoreProvider } from './provider'

export interface ClassificationStoreProps extends AbstractObjectDataDefinition {
  storeId: number
  allowedGroupIds: string[]
  localized: boolean
  value: any
  onChange: (value: any) => void
}

const getOriginalValue = (value: any, name: NamePath): object => {
  const originalValue: Record<string, any> = get(value, name, {})

  return isPlainObject(originalValue) ? originalValue : {}
}

export const ClassificationStore = (props: ClassificationStoreProps): React.JSX.Element => {
  const { name: classificationStoreName, value } = props

  const valueRef = useRef(value)
  const deletedGroupsRef = useRef(new Set<string>())
  const changedFieldsRef = useRef<Set<string>>(new Set())

  const { id } = useElementContext()
  const { dataObject } = useDataObjectDraft(id)
  const objectData = dataObject?.objectData ?? {}
  const originalValue = getOriginalValue(objectData, classificationStoreName)
  const inheritanceState = useInheritanceState()
  const fieldName = isArray(classificationStoreName) ? classificationStoreName[classificationStoreName.length - 1] : classificationStoreName

  const fieldNameToString = (field: NamePath): string => {
    return Array.isArray(field) ? field.join('.') : field
  }

  const onFieldChange = (field: NamePath, value: any): void => {
    const fieldName = fieldNameToString(field)
    changedFieldsRef.current.add(fieldName)
    if (inheritanceState?.getInheritanceState(field)?.inherited === true) {
      inheritanceState?.breakInheritance(field)
    }
  }

  const getAdditionalComponentProps = (name: NamePath): Record<string, any> => {
    return {
      inherited: inheritanceState?.getInheritanceState(name)?.inherited === true
    }
  }

  const isInherited = (name: string): boolean => {
    const fullFieldNamePath = [...classificationStoreName, ...name.split('.')]
    return !changedFieldsRef.current.has(fullFieldNamePath.join('.')) && inheritanceState?.getInheritanceState(fullFieldNamePath)?.inherited === true
  }

  const onChange = (changedValue: any): void => {
    const filteredValue = filterInheritedFields(changedValue, isInherited)
    const allGroupNames = union([...keys(originalValue), ...keys(valueRef.current)])

    forEach(allGroupNames, key => {
      if (isUndefined(filteredValue[key])) {
        deletedGroupsRef.current.add(key)
      } else {
        deletedGroupsRef.current.delete(key)
      }
    })

    forEach(Array.from(deletedGroupsRef.current.keys()), key => {
      filteredValue[key] = { action: DELETED }
    })

    const newValue = isEmpty(filteredValue) ? [] : filteredValue

    if (!isEqual(newValue, valueRef.current)) {
      props.onChange(newValue)
      valueRef.current = newValue
    }
  }

  const mergedValue = useMemo(
    () => getMergedValue(valueRef.current, originalValue, value, isInherited)
    , [valueRef.current, originalValue]
  )

  useEffect(() => {
    valueRef.current = value
  }, [value])

  return (
    <ClassificationStoreProvider>
      <Form.KeyedList
        getAdditionalComponentProps={ getAdditionalComponentProps }
        onChange={ onChange }
        onFieldChange={ onFieldChange }
        value={ mergedValue }
      >
        <ClassificationStoreContent { ...props } />
        <ClassificationStoreModal
          fieldName={ fieldName }
          objectId={ id }
          { ...props }
        />
      </Form.KeyedList>
    </ClassificationStoreProvider>
  )
}
