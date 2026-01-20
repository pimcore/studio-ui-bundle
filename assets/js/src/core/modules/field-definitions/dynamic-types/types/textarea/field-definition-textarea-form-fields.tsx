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
import { Form, FormKit, Input, Switch, InputNumber } from '@sdk/components'
import React from 'react'

export const FieldDefinitionTextareaFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const isCustomLayout = props.context.area.includes('custom-layout')

  return (
    <>
      <FormKit.Panel title="Specific Settings">
        {!isCustomLayout}

        <Form.Item
          label="width"
          name="width"
          tooltip="width_tooltip"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="height"
          name="height"
          tooltip="height_tooltip"
        >
          <Input />
        </Form.Item>

        <Form.Item name="showCharCount">
          <Switch labelRight="show_char_count" />
        </Form.Item>

        <Form.Item
          label="max_length"
          name="maxLength"
          rules={ [{ min: 0, type: 'number' }] }
        >
          <InputNumber
            min={ 0 }
            precision={ 0 }
          />
        </Form.Item>

        <Form.Item name="excludeFromSearchIndex">
          <Switch labelRight="exclude_from_search_index" />
        </Form.Item>

        {!isCustomLayout && (
        <>

        </>
        )}
      </FormKit.Panel>
    </>
  )
}
