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

import type { Meta } from '@storybook/react'
import React from 'react'
import { Form } from './form'
import { DatePicker, Input, InputNumber, Select } from 'antd'
import { Button } from '../button/button'

// @todo Component needs refactoring because it contains business logic
const config: Meta = {
  title: 'Components/Controls/Form',
  component: () => {
    return (
      <Form layout='vertical'>
        <Form.Item
          label="Input"
          name="Input"
          rules={ [{ required: true, message: 'Please input!' }] }
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="InputNumber"
          name="InputNumber"
          rules={ [{ required: true, message: 'Please input!' }] }
        >
          <InputNumber style={ { width: '100%' } } />
        </Form.Item>

        <Form.Item
          label="TextArea"
          name="TextArea"
          rules={ [{ required: true, message: 'Please input!' }] }
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Select"
          name="Select"
          rules={ [{ required: true, message: 'Please input!' }] }
        >
          <Select />
        </Form.Item>

        <Form.Item
          label="DatePicker"
          name="DatePicker"
          rules={ [{ required: true, message: 'Please input!' }] }
        >
          <DatePicker />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  },
  tags: ['autodocs']
}

export default config

export const _default = {
}
