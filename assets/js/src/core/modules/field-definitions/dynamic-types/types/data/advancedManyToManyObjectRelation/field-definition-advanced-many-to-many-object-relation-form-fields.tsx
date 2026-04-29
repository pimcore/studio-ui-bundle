/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FieldDefinitionAbstractFormFieldsProps } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import { Form, Input, InputNumber, Select, Switch } from '@sdk/components'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useClassDefinitionOptions } from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-class-definition-options'
import { FieldDefinitionAllowedColumnsGrid } from '@Pimcore/modules/field-definitions/dynamic-types/components/field-definition-allowed-columns-grid/field-definition-allowed-columns-grid'
import { useVisibleFieldsOptions } from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-visible-fields-options'
import { isString } from 'lodash'

export const FieldDefinitionAdvancedManyToManyObjectRelationFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { options: classOptions, isLoading: isLoadingClassOptions } = useClassDefinitionOptions()
  const form = Form.useFormInstance()
  const allowedClassId = Form.useWatch<string | undefined>('allowedClassId')
  const visibleFields = Form.useWatch<string | undefined>('visibleFields')
  const isCustomLayout = props.context.area.includes('custom-layout')

  const selectedClasses = useMemo(() => {
    return isString(allowedClassId) && allowedClassId.length > 0 ? [allowedClassId] : []
  }, [allowedClassId])

  const { options: visibleFieldsOptions, isLoading: isLoadingVisibleFields } = useVisibleFieldsOptions(selectedClasses)

  useEffect(() => {
    if (isLoadingVisibleFields) {
      return
    }

    const currentVisibleFields = isString(visibleFields) ? visibleFields.split(',').filter(Boolean) : []
    const availableFieldValues = new Set<string>(visibleFieldsOptions.map((option) => option.value))
    const filteredVisibleFields = currentVisibleFields.filter((field) => availableFieldValues.has(field))

    if (currentVisibleFields.length !== filteredVisibleFields.length) {
      form.setFieldValue('visibleFields', filteredVisibleFields.join(','))
    }
  }, [visibleFieldsOptions, isLoadingVisibleFields, visibleFields, form])

  const isLoading = isLoadingClassOptions || isLoadingVisibleFields

  return (
    <>
      <Form.Item
        label={ t('width') }
        name="width"
        tooltip={ t('width-tooltip') }
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('height') }
        name="height"
        tooltip={ t('height-tooltip') }
      >
        <Input />
      </Form.Item>

      {!isCustomLayout && (
      <>
        <Form.Item
          label={ t('maximum-items') }
          name="maxItems"
        >
          <InputNumber
            min={ 0 }
            precision={ 0 }
          />
        </Form.Item>

        <Form.Item
          label={ t('path-formatter-service') }
          name="pathFormatterClass"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={ t('allowed-class') }
          name="allowedClassId"
        >
          <Select
            options={ classOptions }
            showSearch
          />
        </Form.Item>

        <Form.Item
          getValueFromEvent={ (value: string[]) => value.join(',') }
          getValueProps={ (value: string | string[]) => ({
            value: isString(value) ? value.split(',').filter(Boolean) : value
          }) }
          label={ t('visible-fields') }
          name="visibleFields"
        >
          <Select
            loadingSkeleton={ isLoading }
            mode="multiple"
            options={ visibleFieldsOptions }
            showSearch
          />
        </Form.Item>

        <Form.Item
          label={ t('columns') }
          name="columns"
        >
          <FieldDefinitionAllowedColumnsGrid />
        </Form.Item>

        <Form.Item name="enableTextSelection">
          <Switch labelRight={ t('enable-text-selection') } />
        </Form.Item>

        <Form.Item name="enableBatchEdit">
          <Switch labelRight={ t('enable-batch-edit') } />
        </Form.Item>

        <Form.Item name="allowMultipleAssignments">
          <Switch labelRight={ t('allow-multiple-assignments') } />
        </Form.Item>

        <Form.Item name="allowToCreateNewObject">
          <Switch labelRight={ t('allow-to-create-new-object') } />
        </Form.Item>

        <Form.Item name="allowToClearRelation">
          <Switch labelRight={ t('allow-to-clear-relation') } />
        </Form.Item>

        <Form.Item name="optimizedAdminLoading">
          <Switch
            labelRight={ t('enable-async-load-in-admin') }
            tooltip={ t('enable-async-load-in-admin-tooltip') }
          />
        </Form.Item>
      </>
      )}
    </>
  )
}
