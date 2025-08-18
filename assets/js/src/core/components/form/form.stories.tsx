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

// Form example using FormKit
interface FormValues {
  firstName: string
  lastName: string
  email: string
  age: number | undefined
  description: string
}

const FormExampleComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    email: '',
    age: undefined,
    description: ''
  })

  const onFinish = (values: FormValues): void => {
    console.log('Form submitted:', values)
  }

  const onValuesChange = (changedValues: Partial<FormValues>, allValues: FormValues): void => {
    setFormValues(allValues)
  }

  return (
    <div style={ { maxWidth: '600px' } }>
      <Form
        layout='vertical'
        initialValues={formValues}
        form={form}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={ [{ required: true, message: 'Please input your first name!' }] }
        >
          <Input placeholder="Enter your first name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={ [{ required: true, message: 'Please input your last name!' }] }
        >
          <Input placeholder="Enter your last name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={ [
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ] }
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
        >
          <InputNumber
            max={ 120 }
            min={ 0 }
            placeholder="Enter your age"
            style={ { width: '100%' } }
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <TextArea
            placeholder="Tell us about yourself..."
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
            <Button
              onClick={ () => { form.resetFields() } }
            >
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <div style={ { marginTop: '20px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '6px' } }>
        <h4>Current Form Values:</h4>
        <pre style={ { fontSize: '12px', margin: 0 } }>
          {JSON.stringify(formValues, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export const BasicForm: Story = {
  render: () => <FormExampleComponent />
}
