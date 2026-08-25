/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { type AbstractObjectDataDefinition } from '../../dynamic-type-object-data-abstract'
import { Form } from '@Pimcore/components/form/form'
import { ObjectBrickContent } from './object-brick-content'
import { useInheritanceState } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/use-inheritance-state'
import { type NamePath } from 'antd/es/form/interface'
import { forEach, get, isEmpty, isEqual, isPlainObject, isUndefined, keys, union } from 'lodash'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'
import { DELETED, filterInheritedFields, getMergedValue } from './utils/brick-value'

export interface ObjectBrickProps extends AbstractObjectDataDefinition {
  border?: boolean
  maxItems?: number
  allowedTypes: string[]
  value: any
  onChange: (value: any) => void
}

const getOriginalValue = (value: any, name: NamePath): object => {
  const originalValue = get(value, name, {})
  return isPlainObject(originalValue) ? originalValue : {}
}

export const ObjectBrick = (props: ObjectBrickProps): React.JSX.Element => {
  const valueRef = useRef(props.value)
  const deletedBricksRef = useRef(new Set<string>())
  const inheritanceState = useInheritanceState()
  const changedFieldsRef = useRef<Set<string>>(new Set())
  const restoredFieldsRef = useRef<Set<string>>(new Set())
  const { id } = useContext(DataObjectContext)
  const { dataObject } = useDataObjectDraft(id)

  if (dataObject !== undefined && !('objectData' in dataObject)) {
    throw new Error('Data Object data is undefined in Object Brick')
  }

  const objectData = dataObject?.objectData ?? {}
  const originalValue = getOriginalValue(objectData, props.name)
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
    const fullFieldNamePath = [...props.name, ...name.split('.')]
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

    const allBrickNames = union([...keys(originalValue), ...keys(valueRef.current)])
    forEach(allBrickNames, key => {
      if (isUndefined(filteredValue[key])) {
        deletedBricksRef.current.add(key)
      } else {
        deletedBricksRef.current.delete(key)
      }
    })

    forEach(Array.from(deletedBricksRef.current.keys()), key => {
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

    // newValue encodes inherited fields as null, while the incoming value carries the
    // resolved inherited values — the comparison must use the same encoding, otherwise
    // an unchanged brick is always reported as changed on objects with inheritance
    const currentFilteredValue = filterInheritedFields(mergedValue, isInherited)
    const currentValue = isEmpty(currentFilteredValue) ? [] : currentFilteredValue

    if (!isEqual(newValue, currentValue) && !isEqual(newValue, valueRef.current)) {
      emit(newValue)
    }
  }

  /**
   * Puts a field back to the value it was loaded with. The value itself needs no
   * write: once the field counts as inherited again, getMergedValue reads it from the
   * loaded data. The payload is emitted directly, because the guards in onChange
   * compare against the same encoding and would drop it as unchanged.
   */
  const onFieldRestore = (field: NamePath): void => {
    const fieldName = fieldNameToString(field)

    changedFieldsRef.current.delete(fieldName)
    restoredFieldsRef.current.add(fieldName)

    emit(buildPayload(mergedValue))
  }

  const mergedValue = useMemo(
    () => getMergedValue(valueRef.current, originalValue, props.value, isInherited)
    , [valueRef.current, originalValue]
  )

  useEffect(() => {
    valueRef.current = props.value
  }, [props.value])

  return (
    <Form.KeyedList
      getAdditionalComponentProps={ getAdditionalComponentProps }
      onChange={ onChange }
      onFieldChange={ onFieldChange }
      onFieldRestore={ onFieldRestore }
      value={ mergedValue }
    >
      <ObjectBrickContent { ...props } />
    </Form.KeyedList>
  )
}
