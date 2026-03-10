/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Form, FormKit, Input, Select } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FieldDefinitionSelectOptionsGrid } from '@Pimcore/modules/field-definitions/dynamic-types/components/field-definition-select-options-grid/field-definition-select-options-grid'
import { useClassSelectOptions } from '@Pimcore/modules/field-definitions/dynamic-types/hooks/use-class-select-options'

export interface FieldDefinitionOptionsSourceFieldsProps {
  renderAdditionalConfigureFields?: () => React.ReactNode
}

export const FieldDefinitionOptionsSourceFields = (props: FieldDefinitionOptionsSourceFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const selectOptions = useClassSelectOptions()

  return (
    <>
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
        <FormKit.Panel contentPadding={ { top: 'extra-small' } }>
          <Form.Item
            label={ t('select-options') }
            name="options"
          >
            <FieldDefinitionSelectOptionsGrid />
          </Form.Item>
          {props.renderAdditionalConfigureFields?.()}
        </FormKit.Panel>
      </Form.Conditional>

      <Form.Conditional condition={ (values) => values.optionsProviderType === 'select_options' }>
        <FormKit.Panel contentPadding={ { top: 'extra-small' } }>
          <Form.Item
            label={ t('select-options') }
            name="optionsProviderData"
          >
            <Select options={ selectOptions } />
          </Form.Item>
        </FormKit.Panel>
      </Form.Conditional>

      <Form.Conditional condition={ (values) => values.optionsProviderType === 'class' }>
        <FormKit.Panel
          contentPadding={ { top: 'extra-small' } }
        >
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
        </FormKit.Panel>
      </Form.Conditional>
    </>
  )
}
