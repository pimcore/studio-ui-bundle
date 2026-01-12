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

export const FieldDefinitionDataFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const isCustomLayout = props.context.area.includes('custom-layout')

  return (
    <>
      <FormKit.Panel title="Basic Information">
        <Form.Item
          label="name"
          name="name"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="title"
          name="title"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="tooltip"
          name="tooltip"
        >
          <TextArea />
        </Form.Item>

        <Form.Item name="index">
          <Switch labelRight="index" />
        </Form.Item>

        <Form.Item name="mandatory">
          <Switch labelRight="mandatoryfield" />
        </Form.Item>

        {/* @todo check behavior for unique fields */}
        <Form.Item name="unique">
          <Switch labelRight="unique" />
        </Form.Item>

        <Form.Item name="noteditable">
          <Switch labelRight="not_editable" />
        </Form.Item>

        <Form.Item name="invisible">
          <Switch labelRight="invisible" />
        </Form.Item>

        {!isCustomLayout && (
        <>
          <Form.Item name="visibleGridView">
            <Switch labelRight="visible_in_gridview" />
          </Form.Item>

          <Form.Item name="visibleSearch">
            <Switch labelRight="visible_in_searchresult" />
          </Form.Item>
        </>
        )}
      </FormKit.Panel>
    </>
  )
}
