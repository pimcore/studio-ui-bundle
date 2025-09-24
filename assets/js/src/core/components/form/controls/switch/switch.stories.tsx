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
import { Switch } from '@Pimcore/components/switch/switch'
import { Form } from '../../form'

const config: Meta = {
  title: 'Components/Data Entry/Form/Controls/Basic/Switch',
  component: Switch
}

export default config

// Form example
interface FormValues {
  isEnabled: boolean
  isPublic: boolean
  notifications: boolean
}

const FormExampleComponent = (): React.JSX.Element => {
  const [formValues, setFormValues] = useState<FormValues>({
    isEnabled: true,
    isPublic: false,
    notifications: true
  })

  const onValuesChange = (changedValues: Partial<FormValues>, allValues: FormValues): void => {
    setFormValues(allValues)
  }

  return (
    <div style={ { maxWidth: '600px', padding: '20px' } }>
      <div style={ { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' } }>
        <div>
          <Form
            initialValues={ formValues }
            layout="vertical"
            onValuesChange={ onValuesChange }
          >
            <Form.Item
              label="Enable Feature"
              name="isEnabled"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              label="Public Access"
              name="isPublic"
              valuePropName="checked"
            >
              <Switch
                labelLeft="Private"
                labelRight="Public"
              />
            </Form.Item>

            <Form.Item
              label="Email Notifications"
              name="notifications"
              valuePropName="checked"
            >
              <Switch
                labelRight="Receive notifications"
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
