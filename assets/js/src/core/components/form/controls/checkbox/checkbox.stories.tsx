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
import { Checkbox } from '@Pimcore/components/checkbox/checkbox'
import { Form } from '../../form'

const config: Meta = {
  title: 'Components/Data Entry/Form/Controls/Basic/Checkbox',
  component: Checkbox
}

export default config

// Form example
const FormExampleComponent = (): React.JSX.Element => {
  const [formValues, setFormValues] = useState({
    acceptTerms: true,
    newsletter: false,
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    permissions: ['read', 'write']
  })

  const onValuesChange = (changedValues: any, allValues: any): void => {
    setFormValues(allValues)
  }

  return (
    <div style={{ maxWidth: '700px', padding: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <Form
            initialValues={formValues}
            layout="vertical"
            onValuesChange={onValuesChange}
          >
            <Form.Item
              name="acceptTerms"
              valuePropName="checked"
            >
              <Checkbox>Accept terms and conditions</Checkbox>
            </Form.Item>

            <Form.Item
              name="newsletter"
              valuePropName="checked"
            >
              <Checkbox>Subscribe to newsletter</Checkbox>
            </Form.Item>

            <Form.Item label="Notification Preferences">
              <Form.Item
                name={['notifications', 'email']}
                valuePropName="checked"
                style={{ marginBottom: '8px' }}
              >
                <Checkbox>Email notifications</Checkbox>
              </Form.Item>
              
              <Form.Item
                name={['notifications', 'sms']}
                valuePropName="checked"
                style={{ marginBottom: '8px' }}
              >
                <Checkbox>SMS notifications</Checkbox>
              </Form.Item>
              
              <Form.Item
                name={['notifications', 'push']}
                valuePropName="checked"
                style={{ marginBottom: 0 }}
              >
                <Checkbox>Push notifications</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item
              label="Permissions"
              name="permissions"
            >
              <Checkbox.Group
                options={[
                  { label: 'Read', value: 'read' },
                  { label: 'Write', value: 'write' },
                  { label: 'Delete', value: 'delete' },
                  { label: 'Admin', value: 'admin' }
                ]}
              />
            </Form.Item>
          </Form>
        </div>

        <div>
          <h4>Current Values</h4>
          <div style={{ 
            background: '#f5f5f5', 
            padding: '16px', 
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '12px',
            whiteSpace: 'pre-wrap'
          }}>
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
