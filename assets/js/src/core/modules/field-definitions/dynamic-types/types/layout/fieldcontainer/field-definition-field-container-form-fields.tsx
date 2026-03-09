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
import { Form, Input, InputNumber } from '@sdk/components'
import React from 'react'
import { t } from 'i18next'
import { Select } from 'antd'

export const FieldDefinitionFieldContainerFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  return (
    <>
      <Form.Item
        label={ t('label') }
        name="fieldLabel"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('label-width') }
        name="labelWidth"
      >
        <InputNumber
          min={ 0 }
          precision={ 0 }
        />
      </Form.Item>

      <Form.Item
        label={ t('label-align') }
        name="labelAlign"
      >
        <Select
          options={ [
            { label: t('left'), value: 'left' },
            { label: t('top'), value: 'top' }
          ] }
        />
      </Form.Item>

      <Form.Item
        label={ t('layout') }
        name="layout"
      >
        <Select
          options={ [
            { label: t('vbox'), value: 'vbox' },
            { label: t('hbox'), value: 'hbox' }
          ] }
        />
      </Form.Item>
    </>
  )
}
