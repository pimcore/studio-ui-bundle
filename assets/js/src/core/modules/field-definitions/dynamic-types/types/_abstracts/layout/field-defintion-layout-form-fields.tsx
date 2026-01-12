/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { FieldDefinitionAbstractFormFieldsProps } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import { isParent } from '@Pimcore/modules/field-definitions/utils/context-helpers'
import { Form, FormKit, Input, Select, Switch } from '@sdk/components'
import React from 'react'

export const FieldDefinitionLayoutFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { context } = props
  const isRegion = isParent('region', context)

  return (
    <>
      <FormKit.Panel
        contentPadding={ { bottom: 'none', top: 'small', x: 'small' } }
        title="panel"
      >
        <Form.Item
          label="name"
          name="name"
        >
          <Input />
        </Form.Item>

        {isRegion && (
        <Form.Item
          label="region"
          name="region"
        >
          <Select options={ [
            { label: 'center', value: 'center' },
            { label: 'north', value: 'north' },
            { label: 'south', value: 'south' },
            { label: 'east', value: 'east' },
            { label: 'west', value: 'west' }
          ] }
          />
        </Form.Item>
        )}

        <Form.Item
          label="title"
          name="title"
        >
          <Input />
        </Form.Item>

        <Form.Item name="collapsible">
          <Switch labelRight="collapsible" />
        </Form.Item>

        <Form.Item name="collapsed">
          <Switch labelRight="collapsed" />
        </Form.Item>
      </FormKit.Panel>
    </>
  )
}
