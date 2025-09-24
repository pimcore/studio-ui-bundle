/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Meta } from '@storybook/react'
import React, { useState } from 'react'
import { InputPassword } from '@Pimcore/components/input-password/input-password'
import { Form } from '../../form'

const config: Meta = {
  title: 'Components/Data Entry/Form/Controls/Basic/InputPassword',
  component: InputPassword
}

export default config

// Form example
interface FormValues {
  password: string
  confirmPassword: string
}

const FormExampleComponent = (): React.JSX.Element => {
  const [formValues, setFormValues] = useState<FormValues>({
    password: '',
    confirmPassword: ''
  })

  const onValuesChange = (changedValues: Partial<FormValues>, allValues: FormValues): void => {
    setFormValues(allValues)
  }

  return (
    <div style={ { maxWidth: '700px', padding: '20px' } }>
      <div style={ { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' } }>
        <div>
          <Form
            initialValues={ formValues }
            layout="vertical"
            onValuesChange={ onValuesChange }
          >
            <Form.Item
              label="Password"
              name="password"
              rules={ [
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' }
              ] }
            >
              <InputPassword
                placeholder="Enter password"
              />
            </Form.Item>

            <Form.Item
              dependencies={ ['password'] }
              label="Confirm Password"
              name="confirmPassword"
              rules={ [
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  async validator (_, value) {
                    if (value === undefined || value === null || value === '' || getFieldValue('password') === value) {
                      await Promise.resolve(); return
                    }
                    return await Promise.reject(new Error('The passwords do not match!'))
                  }
                })
              ] }
            >
              <InputPassword
                placeholder="Confirm password"
              />
            </Form.Item>

            <Form.Item
              label="Admin Password (Large)"
              name="adminPassword"
            >
              <InputPassword
                placeholder="Enter admin password"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="API Key (Small)"
              name="apiKey"
            >
              <InputPassword
                placeholder="Enter API key"
                size="small"
              />
            </Form.Item>
          </Form>
        </div>

        <div>
          <h4>Current Values</h4>
          <div style={ {
            background: '#f5f5f5',
            padding: '16px',
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '12px',
            whiteSpace: 'pre-wrap'
          } }
          >
            {JSON.stringify(formValues, null, 2)}
          </div>
        </div>
      </div>
    </div>
  )
}

export const FormExample = {
  render: () => <FormExampleComponent />
}
