/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { Input, Select, Form, type FormProps } from 'antd'
import React from 'react'

export interface CSVFormValues {
  delimiter: string
  header: 'name' | 'title' | 'no_header'
}

export interface CreateCSVFormProps extends FormProps {}

export const CreateCSVForm = ({ ...props }: CreateCSVFormProps): React.JSX.Element => {
  return (
    <Form
      layout='vertical'
      { ...props }
    >
      <Form.Item
        label='Delimiter'
        name={ 'delimiter' }
        rules={ [{ required: true, message: '' }] }
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Header'
        name={ 'header' }
        rules={ [{ required: true }] }
      >
        <Select
          options={
            [
              { value: 'name', label: 'System key' },
              { value: 'title', label: 'Label' },
              { value: 'no_header', label: 'No header' }
            ]
          }
        />
      </Form.Item>
    </Form>
  )
}
