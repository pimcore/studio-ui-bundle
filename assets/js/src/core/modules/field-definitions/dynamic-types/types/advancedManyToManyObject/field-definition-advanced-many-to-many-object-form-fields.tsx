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
import { Form, FormKit, Input, InputNumber, Select, Switch } from '@sdk/components'
import React, { useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useClassDefinitionOptions } from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-class-definition-options'
import { FieldDefinitionAllowedColumnsGrid } from '@Pimcore/modules/field-definitions/dynamic-types/components/field-definition-allowed-columns-grid/field-definition-allowed-columns-grid'
import { useVisibleFieldsOptions } from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-visible-fields-options'

export const FieldDefinitionAdvancedManyToManyObjectFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { options: classOptions, refetch: refetchClassOptions, isLoading: isLoadingClassOptions } = useClassDefinitionOptions()
  const form = Form.useFormInstance()
  const allowedClassId = Form.useWatch<string | undefined>('allowedClassId')

  const selectedClasses = useMemo(() => {
    return typeof allowedClassId === 'string' && allowedClassId.length > 0 ? [allowedClassId] : []
  }, [allowedClassId])

  const { options: visibleFieldsOptions, refetch: refetchVisibleFields, isLoading: isLoadingVisibleFields } = useVisibleFieldsOptions(selectedClasses)

  useEffect(() => {
    if (allowedClassId !== undefined) {
      refetchClassOptions()
      refetchVisibleFields()
    }
  }, [allowedClassId, refetchClassOptions, refetchVisibleFields])

  useEffect(() => {
    if (!isLoadingVisibleFields && typeof allowedClassId === 'string' && allowedClassId.length > 0) {
      const currentVisibleFieldsValue = form.getFieldValue('visibleFields') as string | undefined
      const currentVisibleFields = typeof currentVisibleFieldsValue === 'string' && currentVisibleFieldsValue.length > 0
        ? currentVisibleFieldsValue.split(',').filter(Boolean)
        : []

      if (currentVisibleFields.length > 0) {
        const validVisibleFields = currentVisibleFields.filter((field) =>
          visibleFieldsOptions.some((option) => option.value === field)
        )

        if (validVisibleFields.length !== currentVisibleFields.length) {
          form.setFieldValue('visibleFields', validVisibleFields.join(','))
        }
      }
    }
  }, [isLoadingVisibleFields, visibleFieldsOptions, form, allowedClassId])

  const isLoading = isLoadingClassOptions || isLoadingVisibleFields

  return (
    <FormKit.Panel title={ t('specific-settings') }>
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
          skeletonLoader={ isLoading }
        />
      </Form.Item>

      <Form.Item
        getValueFromEvent={ (value: string[]) => value.join(',') }
        getValueProps={ (value: string | string[]) => ({
          value: typeof value === 'string' ? value.split(',').filter(Boolean) : value
        }) }
        label={ t('visible-fields') }
        name="visibleFields"
      >
        <Select
          mode="multiple"
          options={ visibleFieldsOptions }
          showSearch
          skeletonLoader={ isLoading }
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

      <Form.Item
        name="optimizedAdminLoading"
        tooltip={ t('enable-async-load-in-admin-tooltip') }
      >
        <Switch labelRight={ t('enable-async-load-in-admin') } />
      </Form.Item>

    </FormKit.Panel>
  )
}
