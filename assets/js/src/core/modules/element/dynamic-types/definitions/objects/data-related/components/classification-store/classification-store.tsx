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
import { useClassDefinitions } from '@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions'
import { useLanguageSelection } from '@Pimcore/components/language-selection'

export interface ClassificationStoreProps extends AbstractObjectDataDefinition {
  storeId: number
  allowedGroupIds: string[]
  localized: boolean
  hideEmptyData?: boolean
  value: any
  onChange: (value: any) => void
}

const getOriginalValue = (value: any, name: NamePath): object => {
  const originalValue: Record<string, any> = get(value, name, {})

  return isPlainObject(originalValue) ? originalValue : {}
}

export const ClassificationStore = (props: ClassificationStoreProps): React.JSX.Element => {
  const { name: classificationStoreName, localized, value } = props
  const { hasLocalizedFields, setHasLocalizedFields } = useLanguageSelection()

  useEffect(() => {
    if (localized && !hasLocalizedFields) setHasLocalizedFields(true)
  }, [])

  const valueRef = useRef(value)
  const deletedGroupsRef = useRef(new Set<string>())
  const changedFieldsRef = useRef<Set<string>>(new Set())
  const restoredFieldsRef = useRef<Set<string>>(new Set())

  const { id } = useElementContext()
  const { dataObject } = useDataObjectDraft(id)

  if (dataObject !== undefined && !('objectData' in dataObject)) {
    throw new Error('Data Object data is undefined in Classification Store')
  }

  const objectData = dataObject?.objectData ?? {}
  const originalValue = getOriginalValue(objectData, classificationStoreName)
  const inheritanceState = useInheritanceState()
  const fieldName = isArray(classificationStoreName) ? classificationStoreName[classificationStoreName.length - 1] : classificationStoreName
  const classDefinitions = useClassDefinitions()

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
    const fieldName = fullFieldNamePath.join('.')

    if (changedFieldsRef.current.has(fieldName)) {
      return false
    }

    // A restore counts right away: restoreInheritance only schedules a state update,
    // which the payload built below must not wait for.
    return restoredFieldsRef.current.has(fieldName) ||
      inheritanceState?.getInheritanceState(fullFieldNamePath)?.inherited === true
  }

  const buildPayload = (rawValue: any): any => {
    const filteredValue = filterInheritedFields(rawValue, isInherited)
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

    return isEmpty(filteredValue) ? [] : filteredValue
  }

  const emit = (newValue: any): void => {
    props.onChange(newValue)
    valueRef.current = newValue
  }

  const onChange = (changedValue: any): void => {
    const newValue = buildPayload(changedValue)

    if (!isEqual(newValue, valueRef.current)) {
      emit(newValue)
    }
  }

  /**
   * Puts a key back to the value it was loaded with. The value itself needs no write:
   * once the key counts as inherited again, getMergedValue reads it from the loaded
   * data. The payload is emitted directly, because restoring writes no value and the
   * change effect of the keyed list would therefore never report it.
   */
  const onFieldRestore = (field: NamePath): void => {
    const fieldName = fieldNameToString(field)

    changedFieldsRef.current.delete(fieldName)
    restoredFieldsRef.current.add(fieldName)

    emit(buildPayload(mergedValue))
  }

  const mergedValue = useMemo(
    () => getMergedValue(valueRef.current, originalValue, value, isInherited)
    , [valueRef.current, originalValue]
  )

  useEffect(() => {
    valueRef.current = value
  }, [value])

  if (dataObject === undefined) {
    return <></>
  }

  const classId = classDefinitions.getByName(dataObject.className)?.id
  if (classId === undefined) {
    return <></>
  }

  return (
    <ClassificationStoreProvider>
      <Form.KeyedList
        getAdditionalComponentProps={ getAdditionalComponentProps }
        onChange={ onChange }
        onFieldChange={ onFieldChange }
        onFieldRestore={ onFieldRestore }
        value={ mergedValue }
      >
        <ClassificationStoreContent { ...props } />
        <ClassificationStoreModal
          classId={ classId }
          fieldName={ fieldName }
          objectId={ dataObject.id }
          { ...props }
        />
      </Form.KeyedList>
    </ClassificationStoreProvider>
  )
}
