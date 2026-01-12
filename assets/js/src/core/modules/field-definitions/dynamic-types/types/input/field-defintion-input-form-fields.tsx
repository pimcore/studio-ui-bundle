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
import { Form, FormKit, Input, Switch } from '@sdk/components'
import React from 'react'

export const FieldDefinitionInputFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const isCustomLayout = props.context.area.includes('custom-layout')

  return (
    <>
      <FormKit.Panel title="Specific Settings">
        {!isCustomLayout && (
        <>
          <Form.Item
            label="default_value"
            name="defaultValue"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="default_value_generator"
            name="defaultValueGenerator"
          >
            <Input />
          </Form.Item>
        </>
        )}

        <Form.Item name="showCharCount">
          <Switch labelRight="show_char_count" />
        </Form.Item>

        {!isCustomLayout && (
        <>
          {/* @todo add regex validation */}
        </>
        )}
      </FormKit.Panel>
    </>
  )
}
