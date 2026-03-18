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
import { Form, FormKit, Input, Select, Switch } from '@sdk/components'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useClassDefinitionOptions } from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-class-definition-options'
import {
  useClassRelationFieldsOptions
} from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-class-relation-fields-options'
import { relationSelectFormItemTransformation } from '@Pimcore/modules/field-definitions/dynamic-types/utils/relations-helper'
import {
  useVisibleFieldsOptions
} from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-visible-fields-options'
import { isString } from 'lodash'

export const FieldDefinitionReverseObjectRelationFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { options: classOptions, isLoading: isLoadingClassOptions } = useClassDefinitionOptions()
  const form = Form.useFormInstance()
  const ownerClassName = Form.useWatch<string | undefined>('ownerClassName')
  const ownerFieldName = Form.useWatch<string | undefined>('ownerFieldName')
  const visibleFields = Form.useWatch<string | undefined>('visibleFields')
  const isCustomLayout = props.context.area.includes('custom-layout')

  const { options: ownerFieldNameOptions, isLoading: isLoadingOwnerFieldName } = useClassRelationFieldsOptions(ownerClassName)
  const { options: visibleFieldsOptions, isLoading: isLoadingVisibleFields } = useVisibleFieldsOptions([ownerClassName ?? ''])

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

  useEffect(() => {
    if (isLoadingOwnerFieldName) {
      return
    }

    const availableFieldValues = new Set<string>(ownerFieldNameOptions.map((option) => option.value))

    if (ownerFieldName !== undefined && !availableFieldValues.has(ownerFieldName)) {
      form.setFieldValue('ownerFieldName', undefined)
    }
  }, [ownerFieldNameOptions, isLoadingOwnerFieldName, ownerFieldName, form])

  const isLoading = isLoadingClassOptions || isLoadingVisibleFields || isLoadingOwnerFieldName

  return (
    <>
      <Form.Item name="allowToCreateNewObject">
        <Switch labelRight={ t('allow-to-create-new-object') } />
      </Form.Item>

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
          label={ t('path-formatter-service') }
          name="pathFormatterClass"
        >
          <Input />
        </Form.Item>

        <FormKit.Panel
          border
          theme="fieldset"
          title={ t('owner') }
          tooltip={ t('reverse-object-relation.tooltip') }
        >

          <Form.Item
            label={ t('owner-class') }
            name="ownerClassName"
          >
            <Select
              loadingSkeleton={ isLoadingClassOptions }
              options={ classOptions }
              showSearch
            />
          </Form.Item>

          <Form.Item
            label={ t('owner-field-name') }
            name="ownerFieldName"
          >
            <Select
              loadingSkeleton={ isLoadingOwnerFieldName }
              options={ ownerFieldNameOptions }
              showSearch
            />
          </Form.Item>
          <Form.Item
            { ...relationSelectFormItemTransformation('visibleFields') }
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
        </FormKit.Panel>

        <Form.Item
          name="optimizedAdminLoading"
          tooltip={ t('enable-async-load-in-admin-tooltip') }
        >
          <Switch labelRight={ t('enable-async-load-in-admin') } />
        </Form.Item>
      </>
      )}
    </>
  )
}
