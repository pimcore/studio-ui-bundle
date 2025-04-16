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
  const { id } = useContext(DataObjectContext)
  const { dataObject } = useDataObjectDraft(id)
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
    return !changedFieldsRef.current.has(fullFieldNamePath.join('.')) && inheritanceState?.getInheritanceState(fullFieldNamePath)?.inherited === true
  }

  const onChange = (changedValue: any): void => {
    const filteredValue = filterInheritedFields(changedValue, isInherited)

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

    const newValue = isEmpty(filteredValue) ? [] : filteredValue

    console.log({ newValue, old: valueRef.current })

    if (!isEqual(newValue, valueRef.current)) {
      props.onChange(newValue)
      valueRef.current = newValue
    }
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
      value={ mergedValue }
    >
      <ObjectBrickContent { ...props } />
    </Form.KeyedList>
  )
}
