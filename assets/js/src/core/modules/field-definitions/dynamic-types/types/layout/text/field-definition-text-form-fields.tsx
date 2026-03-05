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
import { Form, FormKit, Input, Switch, TextArea } from '@sdk/components'
import React from 'react'
import { t } from 'i18next'

export const FieldDefinitionTextFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  return (
    <FormKit.Panel title={ t('specific-settings') }>
      <Form.Item name="border">
        <Switch labelRight={ t('border') } />
      </Form.Item>

      <Form.Item
        label={ t('rendering-class') }
        name="renderingClass"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('rendering-data') }
        name="renderingData"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('html') }
        name="html"
      >
        <TextArea rows={ 10 } />
      </Form.Item>
    </FormKit.Panel>
  )
}
