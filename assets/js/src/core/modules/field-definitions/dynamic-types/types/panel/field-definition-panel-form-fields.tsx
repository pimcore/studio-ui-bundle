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
import { Form, FormKit, IconSelector, Switch } from '@sdk/components'
import React from 'react'

export const FieldDefinitionPanelFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  return (
    <>
      <FormKit.Panel contentPadding={ { y: 'none', x: 'small' } }>
        <Form.Item name="border">
          <Switch labelRight="border" />
        </Form.Item>

        <Form.Item
          label="icon"
          name="icon"
        >
          <IconSelector />
        </Form.Item>
      </FormKit.Panel>
    </>
  )
}
