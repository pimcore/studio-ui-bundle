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
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useClassDefinitionOptions } from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-class-definition-options'
import { useVisibleFieldsOptions } from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-visible-fields-options'

export const FieldDefinitionManyToManyObjectFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const classOptions = useClassDefinitionOptions(true)
  const form = Form.useFormInstance()
  const displayMode = Form.useWatch('displayMode')
  const classes = Form.useWatch('classes')

  const selectedClasses = useMemo(() => {
    if (Array.isArray(classes)) {
      return classes.map((item: { classes: string }) => item.classes).filter((className: string) => className !== 'folder')
    }
    return []
  }, [classes])

  const visibleFieldsOptions = useVisibleFieldsOptions(selectedClasses)

  useEffect(() => {
    if (displayMode === null) {
      form.setFieldValue('displayMode', 'grid')
    }
  }, [displayMode, form])

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
        getValueFromEvent={ (value: string[]) => value.map(val => ({ classes: val })) }
        getValueProps={ (value: Array<{ classes: string }>) => ({
          value: Array.isArray(value) ? value.map(item => item.classes) : []
        }) }
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
        getValueFromEvent={ (value: string[]) => value.map(val => ({ visibleFields: val })) }
        getValueProps={ (value: Array<{ visibleFields: string }>) => ({
          value: Array.isArray(value) ? value.map(item => item.visibleFields) : []
        }) }
        label={ t('visible-fields') }
        name="visibleFields"
      >
        <Select
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
            { label: t('display-mode-display'), value: 'grid' },
            { label: t('display-mode-inline-search'), value: 'dropdown' }
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
    </FormKit.Panel>
  )
}
