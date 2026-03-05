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
import { type Rule } from 'antd/lib/form'
import { Form, type formInstanceType } from '@Pimcore/components/form/form'

export interface InputFormProps {
  form: formInstanceType<any>
  initialValues: object
  fieldName: string
  label?: string
  rules?: Rule[]
  onSubmitCapture?: () => Promise<void>
}

export const InputForm = forwardRef<InputRef, InputFormProps>(
  function InputForm (props: InputFormProps, ref: RefObject<InputRef>): React.JSX.Element {
    const { form, initialValues, fieldName, label, rules, onSubmitCapture } = props

    return (
      <Form
        form={ form }
        initialValues={ initialValues }
        layout={ 'vertical' }
        onSubmitCapture={ onSubmitCapture }
      >
        <Form.Item
          label={ label }
          name={ fieldName }
          rules={ rules }
        >
          <Input ref={ ref } />
        </Form.Item>
      </Form>
    )
  }
)
