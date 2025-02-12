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

import React, { type ReactNode, useEffect } from 'react'
import { type ObjectComponentProps } from './object-component'
import { Form } from '@Pimcore/components/form/form'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/dynamic-type-object-data-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { Alert } from 'antd'
import { useFormList } from '../providers/form-list-provider/use-form-list'
import { useLocalizedFields } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/localized-fields/provider/localized-fields-provider/use-localized-fields'
import { useLanguageSelection } from '@Pimcore/modules/data-object/editor/toolbar/language-selection/provider/use-language-selection'
import { Text } from '@Pimcore/components/text/text'
import ErrorBoundary from '@Pimcore/modules/app/error-boundary/error-boundary'
import DataComponentFormItem
  from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/data-component/form-item'
import {
  useInheritanceState
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/use-inheritance-state'
import {
  useEditFormContext
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider'

export interface DataComponentProps extends ObjectComponentProps {
  datatype: 'data'
  fieldType?: string
  fieldtype?: string
  [p: string]: any
}

export const DataComponent = (props: DataComponentProps): React.JSX.Element => {
  const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])
  const localizedFields = useLocalizedFields()
  const { name, fieldType, fieldtype } = props
  const formList = useFormList()
  const hasFormList = formList !== undefined
  const hasLocalizedFields = localizedFields !== undefined
  let formFieldName: Array<number | string> = [name]
  let title = props.title as ReactNode
  const { currentLanguage } = useLanguageSelection()
  const inheritanceState = useInheritanceState()
  const form = Form.useFormInstance()
  const { disabled } = useEditFormContext()

  if (hasFormList) {
    formFieldName = [...formList.getComputedFieldName(), name]
  }

  if (hasLocalizedFields) {
    // @todo should handle multiple locales
    formFieldName = ['localizedfields', name, localizedFields.locales[0]]

    if (hasFormList) {
      formFieldName = [...formList.getComputedFieldName(), ...formFieldName]
    }

    title = (
      <>
        {title} <Text type='secondary'>({currentLanguage.toUpperCase()})</Text>
      </>
    )
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
  const inheritanceStateValue = inheritanceState?.getInheritanceState(formFieldName)

  const _props = {
    ...props,
    title,
    name: formFieldName,
    inherited: inheritanceStateValue?.inherited === true,
    noteditable: Boolean(props.noteditable) || disabled
  }

  useEffect(() => {
    if (!objectDataType.isCollectionType) {
      objectDataType.handleDefaultValue(_props, form, formFieldName)
    }
  }, [form])

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
