/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode, useEffect, useMemo } from 'react'
import { type ObjectComponentProps } from './object-component'
import { Form } from '@Pimcore/components/form/form'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { Alert, type FormInstance } from 'antd'
import { useFormList } from '../providers/form-list-provider/use-form-list'
import ErrorBoundary from '@Pimcore/modules/app/error-boundary/error-boundary'
import DataComponentFormItem
  from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/data-component/form-item'
import {
  useInheritanceState
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/use-inheritance-state'
import {
  useEditFormContext
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider'
import { useFormGroupOptional } from '@Pimcore/components/form/group/provider/use-form-group-optional'
import { useLocalizedFields } from '@Pimcore/components/form/localisation/localized-fields/provider/localized-fields-provider/use-localized-fields'
import { isArray } from 'lodash'
import { useFieldWidth } from '../../../../../../../../element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'
import { useCombinedFieldName } from '../providers/combined-field-name-provider/use-combined-field-name'
import { useKeyedListOptional } from '@Pimcore/components/form/controls/keyed-list/provider/keyed-list/use-keyed-list-optional'
import { useNumberedListOptional } from '@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list-optional'
import { type NamePath } from 'antd/es/form/interface'

export interface DataComponentProps extends ObjectComponentProps {
  datatype: 'data'
  fieldType?: string
  fieldtype?: string
  [p: string]: any
}

export const DataComponent = (props: DataComponentProps): React.JSX.Element => {
  const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])
  const { name, fieldType, fieldtype } = props
  const formList = useFormList()
  const hasFormList = formList !== undefined
  let formFieldName: Array<number | string> = [name]
  const title = props.title as ReactNode
  const inheritanceState = useInheritanceState()
  const form = Form.useFormInstance()
  const { disabled } = useEditFormContext()
  const fieldWidth = useFieldWidth()
  let virtualFieldName: Array<number | string> = [name]
  const groupContext = useFormGroupOptional()
  const localizedContext = useLocalizedFields()
  const combinedParentName = useCombinedFieldName()
  const combinedFieldName: string[] = combinedParentName !== undefined ? [...combinedParentName.combinedFieldNameParent, name] : [name]

  if (groupContext !== undefined) {
    virtualFieldName = [...(isArray(groupContext.name) ? groupContext.name : [groupContext.name]), ...virtualFieldName]
  }

  if (localizedContext !== undefined) {
    virtualFieldName = [...virtualFieldName, localizedContext.locales[0]]
  }

  if (hasFormList) {
    formFieldName = [...formList.getComputedFieldName(), name]
  }

  // @todo unify to one fieldType after api is updated completely
  const currentFieldType = fieldType ?? fieldtype ?? 'unknown'

  if (!objectDataRegistry.hasDynamicType(currentFieldType)) {
    return (
      <Alert
        message={ `Unknown data type: ${currentFieldType}` }
        type="warning"
      />
    )
  }

  const objectDataType = objectDataRegistry.getDynamicType(currentFieldType)
  const inheritanceStateValue = inheritanceState?.getInheritanceState(virtualFieldName)
  const keyedList = useKeyedListOptional()
  const numberedList = useNumberedListOptional()
  // KeyedList and NumberedList providers reset each other's context, so at most one is set: the innermost list
  const listOperations = (keyedList ?? numberedList)?.operations

  const _props = {
    ...props,
    title,
    defaultFieldWidth: fieldWidth,
    name: formFieldName,
    combinedFieldName: combinedFieldName.join('.'),
    inherited: inheritanceStateValue?.inherited === true,
    noteditable: props.noteditable === true || disabled
  }

  // Inside a Form.KeyedList (e.g. the classification-store editor) or a
  // Form.NumberedList (e.g. field collections and blocks) Form.Items read/write
  // via the list state through KeyedFormItemControl / NumberedFormItemControl,
  // so writes to the Ant Form store via form.setFieldValue are invisible to them.
  // Route handleDefaultValue's reads/writes through the list operations instead.
  const defaultValueForm = useMemo<FormInstance>(() => {
    if (listOperations === undefined) {
      return form
    }
    const toPath = (path: NamePath): Array<string | number> => (isArray(path) ? path : [path as string | number])
    return Object.assign(Object.create(form) as FormInstance, {
      getFieldValue: (path: NamePath) => listOperations.getValue(toPath(path)),
      setFieldValue: (path: NamePath, value: unknown) => {
        listOperations.update(toPath(path), value, true)
      }
    })
  }, [form, listOperations])

  useEffect(() => {
    if (!objectDataType.isCollectionType) {
      objectDataType.handleDefaultValue(_props, defaultValueForm, virtualFieldName)
    }
  }, [defaultValueForm])

  if (!objectDataType.isCollectionType) {
    return (
      <DataComponentFormItem
        _props={ _props }
        formFieldName={ formFieldName }
        objectDataType={ objectDataType }
      />
    )
  }

  return (
    <ErrorBoundary>
      {objectDataType.getObjectDataComponent(_props)}
    </ErrorBoundary>
  )
}
