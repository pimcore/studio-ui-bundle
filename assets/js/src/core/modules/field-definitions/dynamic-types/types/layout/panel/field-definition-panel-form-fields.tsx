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
import { Form, IconSelector, InputNumber, Switch } from '@sdk/components'
import React from 'react'
import { t } from 'i18next'
import { Select } from 'antd'

export const FieldDefinitionPanelFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  return (
    <>
      <Form.Item
        label={ t('layout') }
        name="layout"
      >
        <Select
          options={ [
            { label: t('default'), value: 'default' },
            { label: t('fit'), value: 'fit' }
          ] }
        />
      </Form.Item>

      <Form.Item name="border">
        <Switch labelRight={ t('border') } />
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
        label={ t('icon') }
        name="icon"
      >
        <IconSelector />
      </Form.Item>
    </>
  )
}
