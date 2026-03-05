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
import { Form, type FormProps } from '@Pimcore/components/form/form'

export interface UploadFormProps {
  form: FormProps['form']
  initialValues: object
  fieldName: string
  label?: string
  rules?: Rule[]
  accept?: string
}

export const UploadForm = forwardRef<InputRef, UploadFormProps>(
  function UploadForm (props: UploadFormProps, ref: RefObject<InputRef>): React.JSX.Element {
    const { form, initialValues, fieldName, label, rules, accept } = props

    return (
      <Form
        form={ form }
        initialValues={ initialValues }
        layout={ 'vertical' }
      >
        <Form.Item
          label={ label }
          name={ fieldName }
          rules={ rules }
        >
          <Input
            accept={ accept }
            ref={ ref }
            type="file"
          />
        </Form.Item>
      </Form>
    )
  }
)
