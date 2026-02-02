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
import { Form, FormKit, Input, InputNumber, Switch, Select } from '@sdk/components'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FieldDefinitionSelectOptionsGrid } from '@Pimcore/modules/field-definitions/dynamic-types/components/field-definition-select-options-grid/field-definition-select-options-grid'
import { useClassSelectOptionGetTreeQuery } from '@sdk/api/class-definition'

export const FieldDefinitionSelectFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const isCustomLayout = props.context.area.includes('custom-layout')

  const { data: selectOptionsTree } = useClassSelectOptionGetTreeQuery({ withGroup: true })

  const selectOptions = useMemo(() => {
    const options: Array<{ label: string, value: string }> = []

    const walk = (items: any[]): void => {
      items.forEach((item) => {
        if (Array.isArray(item.children) && item.children.length > 0) {
          walk(item.children as any[])
        } else {
          options.push({ label: item.name, value: item.id })
        }
      })
    }

    if (selectOptionsTree?.items !== undefined) {
      walk(selectOptionsTree.items)
    }

    return options
  }, [selectOptionsTree])

  return (
    <FormKit.Panel title={ t('specific-settings') }>
      <Form.Item
        label={ t('width') }
        name="width"
        tooltip={ t('width-tooltip') }
      >
        <Input />
      </Form.Item>

      {!isCustomLayout && (
        <>

          <Form.Item
            label={ t('column-length') }
            name="columnLength"
            rules={ [{ min: 0, type: 'number' }] }
          >
            <InputNumber
              min={ 0 }
              precision={ 0 }
            />
          </Form.Item>

          <FormKit.Panel
            border
            theme="fieldset"
            title={ t('default-values-settings') }
          >
            <Form.Item
              label={ t('default-value') }
              name="defaultValue"
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              label={ t('default-value-generator') }
              name="defaultValueGenerator"
            >
              <Input />
            </Form.Item>
          </FormKit.Panel>

          <Form.Item
            name="enforceValidation"
            tooltip={ t('enforce-validation-tooltip') }
          >
            <Switch labelRight={ t('enforce-validation') } />
          </Form.Item>

          <Form.Item
            label={ t('options-source') }
            name="optionsProviderType"
          >
            <Select
              options={ [
                { label: t('options-source-configure'), value: 'configure' },
                { label: t('options-source-select-options'), value: 'select_options' },
                { label: t('options-source-options-provider'), value: 'class' }
              ] }
            />
          </Form.Item>

          <Form.Conditional condition={ (values) => values.optionsProviderType === 'configure' || values.optionsProviderType === undefined || values.optionsProviderType === '' }>
            <Form.Item
              label={ t('selection-options') }
              name="options"
            >
              <FieldDefinitionSelectOptionsGrid />
            </Form.Item>
          </Form.Conditional>

          <Form.Conditional condition={ (values) => values.optionsProviderType === 'select_options' }>
            <Form.Item
              label={ t('options') }
              name="optionsProviderData"
            >
              <Select options={ selectOptions } />
            </Form.Item>
          </Form.Conditional>

          <Form.Conditional condition={ (values) => values.optionsProviderType === 'class' }>
            <>
              <Form.Item
                label={ t('options-provider-class') }
                name="optionsProviderClass"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={ t('options-provider-data') }
                name="optionsProviderData"
              >
                <Input />
              </Form.Item>
            </>
          </Form.Conditional>
        </>
      )}

    </FormKit.Panel>
  )
}
