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
import { useVisibleFieldsOptions } from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-visible-fields-options'
import { relationSelectFormItemTransformation } from '@Pimcore/modules/field-definitions/dynamic-types/utils/relations-helper'
import { isArray, isString } from 'lodash'

export const FieldDefinitionManyToManyObjectRelationFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { options: classOptions, isLoading: isLoadingClassOptions } = useClassDefinitionOptions(false)
  const form = Form.useFormInstance()
  const displayMode = Form.useWatch('displayMode')
  const classes = Form.useWatch<Array<{ classes: string }> | undefined>('classes')
  const visibleFields = Form.useWatch<string | undefined>('visibleFields')
  const isCustomLayout = props.context.area.includes('custom-layout')

  const selectedClasses = useMemo(() => {
    if (isArray(classes)) {
      return classes.map((item) => item.classes).filter((id) => id !== 'folder')
    }
    return []
  }, [classes])

  const { options: visibleFieldsOptions, isLoading: isLoadingVisibleFields } = useVisibleFieldsOptions(selectedClasses)

  useEffect(() => {
    if (displayMode === null) {
      form.setFieldValue('displayMode', 'grid')
    }
  }, [displayMode, form])

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
          { ...relationSelectFormItemTransformation('classes') }
          label={ t('allowed-classes') }
          name="classes"
        >
          <Select
            mode="multiple"
            options={ classOptions }
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

        <Form.Item
          label={ t('display-mode') }
          name="displayMode"
        >
          <Select
            options={ [
              { label: t('display-mode-grid-view'), value: 'grid' },
              { label: t('display-mode-tag-field'), value: 'combo' }
            ] }
          />
        </Form.Item>

        <Form.Item name="enableTextSelection">
          <Switch labelRight={ t('enable-text-selection') } />
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
      </>
      )}
    </>
  )
}
