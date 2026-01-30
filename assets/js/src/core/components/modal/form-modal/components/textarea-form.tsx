/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { forwardRef, type RefObject } from 'react'
import { Input, type InputRef } from 'antd'
import { Form, type formInstanceType } from '@Pimcore/components/form/form'

export interface TextareaFormProps {
  form: formInstanceType<any>
  initialValues: object
  fieldName: string
  placeholder?: string
  label?: string
}

export const TextareaForm = forwardRef<InputRef, TextareaFormProps>(
  function TextareaForm (props: TextareaFormProps, ref: RefObject<InputRef>): React.JSX.Element {
    const { form, initialValues, fieldName, placeholder, label } = props

    return (
      <Form
        form={ form }
        initialValues={ initialValues }
        layout={ 'vertical' }
      >
        <Form.Item
          label={ label }
          name={ fieldName }
        >
          <Input.TextArea
            autoSize={ { minRows: 10, maxRows: 20 } }
            placeholder={ placeholder }
            ref={ ref }
          />
        </Form.Item>
      </Form>
    )
  }
)
