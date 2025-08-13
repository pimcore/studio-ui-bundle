/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Form } from './form'
import { Input } from '../input/input'
import { InputNumber } from '../input-number/input-number'
import { TextArea } from '../textarea/textarea'
import { Button } from '../button/button'
import { Space } from '../space/space'
import { FormKit } from './form-kit'

const config: Meta<typeof Form> = {
  title: 'Components/Data Entry/Form',
  component: Form,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Form component built on top of Ant Design with Pimcore-specific enhancements.'
      }
    }
  },
  tags: ['autodocs']
}

export default config
type Story = StoryObj<typeof config>

// Basic Form Example
const BasicFormComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: undefined,
    description: ''
  })

  const onFinish = (values: any): void => {
    console.log('Form submitted:', values)
  }

  const onValuesChange = (changedValues: any, allValues: any): void => {
    setFormValues(allValues)
  }

  return (
    <div style={ { maxWidth: '600px' } }>
      <FormKit
        formProps={ {
          layout: 'vertical',
          initialValues: formValues,
          onFinish,
          onValuesChange,
          form
        } }
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={ [{ required: true, message: 'Please enter your first name' }] }
        >
          <Input placeholder="Enter first name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={ [{ required: true, message: 'Please enter your last name' }] }
        >
          <Input placeholder="Enter last name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={ [
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email address' }
          ] }
        >
          <Input placeholder="Enter email address" />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
        >
          <InputNumber
            max={ 120 }
            min={ 18 }
            placeholder="Enter age"
            style={ { width: '100%' } }
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <TextArea
            placeholder="Enter description..."
            rows={ 4 }
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              htmlType="submit"
              type="primary"
            >
              Submit
            </Button>
            <Button htmlType="reset">
              Reset
            </Button>
          </Space>
        </Form.Item>
      </FormKit>
    </div>
  )
}

export const BasicForm: Story = {
  render: () => <BasicFormComponent />
}
