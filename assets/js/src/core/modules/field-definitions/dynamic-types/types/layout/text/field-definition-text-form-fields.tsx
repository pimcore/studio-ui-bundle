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
import { Form, FormKit, TextArea } from '@sdk/components'
import React from 'react'

export const FieldDefinitionTextFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  return (
    <FormKit.Panel contentPadding={ { y: 'none', x: 'small' } }>
      <Form.Item
        label="html"
        name="html"
      >
        <TextArea />
      </Form.Item>
    </FormKit.Panel>
  )
}
