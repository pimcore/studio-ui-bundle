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
import { Form } from '../../form'
import { KeyedList } from './keyed-list'
import { Input, InputNumber, Select } from 'antd'
import { Button } from '../../../button/button'

const config: Meta<typeof KeyedList> = {
  title: 'Components/Data Entry/Form/Controls/Composite/KeyedList',
  component: KeyedList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**KeyedList** is a low-level form component that helps create complex data structures with key-based (object) forms.

It provides a way to manage dynamic objects of form data where each item has a string-based key. This component is particularly useful for:

- Building complex forms with key-value pair structures
- Managing dynamic object properties that can be added/removed
- Creating configurable settings or metadata forms
- Handling nested form data with custom keys

The component integrates seamlessly with the Pimcore Form system and provides callbacks for field changes, making it suitable for building higher-level form components and data entry interfaces.

**Key difference from NumberedList**: While NumberedList manages arrays with numeric indices, KeyedList manages objects with string-based keys, making it ideal for dictionary-like data structures.

**Note**: This is a foundational component - most users will interact with higher-level components built on top of KeyedList rather than using it directly.
        `
      }
    }
  },
  tags: ['autodocs']
}

export default config
type Story = StoryObj<typeof config>

// Basic keyed list example
const BasicExampleComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState({
    settings: {
      theme: { value: 'dark', description: 'UI theme preference' },
      language: { value: 'en', description: 'Default language' }
    }
  })

  const onFinish = (values: any): void => {
    console.log('Form values:', values)
  }

  const onValuesChange = (changedValues: any, allValues: any): void => {
    console.log('Values changed:', { changedValues, allValues })
    setFormValues(allValues)
  }

  return (
    <div style={{ maxWidth: '800px', padding: '20px' }}>
      <h3>Basic KeyedList Example</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <Form
            form={form}
            initialValues={formValues}
            layout="vertical"
            onFinish={onFinish}
            onValuesChange={onValuesChange}
          >
            <Form.Item
              label="Settings"
              name="settings"
            >
              <KeyedList>
                <KeyedList.Iterator>
                  <Form.Item
                    label="Value"
                    name="value"
                  >
                    <Input placeholder="Enter setting value" />
                  </Form.Item>

                  <Form.Item
                    label="Description"
                    name="description"
                  >
                    <Input placeholder="Enter description" />
                  </Form.Item>
                </KeyedList.Iterator>
              </KeyedList>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit Form
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div>
          <h4>Current Form Values:</h4>
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

export const BasicExample: Story = {
  render: () => <BasicExampleComponent />
}

// Advanced example with nested fields
const AdvancedExampleComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState({
    configuration: {
      database: {
        host: 'localhost',
        port: 3306,
        credentials: {
          username: 'admin',
          password: '****'
        }
      },
      cache: {
        enabled: true,
        ttl: 3600,
        credentials: {
          username: 'cache_user',
          password: '****'
        }
      }
    }
  })

  const onValuesChange = (changedValues: any, allValues: any): void => {
    console.log('Advanced values changed:', { changedValues, allValues })
    setFormValues(allValues)
  }

  return (
    <div style={{ maxWidth: '1000px', padding: '20px' }}>
      <h3>Advanced KeyedList with Nested Fields</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div>
          <Form
            form={form}
            initialValues={formValues}
            layout="vertical"
            onFinish={(values) => console.log('Advanced form values:', values)}
            onValuesChange={onValuesChange}
          >
            <Form.Item
              label="System Configuration"
              name="configuration"
            >
              <KeyedList>
                <KeyedList.Iterator>
                  <Form.Item
                    label="Host"
                    name="host"
                  >
                    <Input placeholder="Enter host" />
                  </Form.Item>

                  <Form.Item
                    label="Port"
                    name="port"
                  >
                    <InputNumber
                      min={1}
                      max={65535}
                      style={{ width: '100%' }}
                      placeholder="Enter port"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Enabled"
                    name="enabled"
                  >
                    <Select
                      options={[
                        { label: 'Yes', value: true },
                        { label: 'No', value: false }
                      ]}
                    />
                  </Form.Item>

                  <Form.Item
                    label="TTL (seconds)"
                    name="ttl"
                  >
                    <InputNumber
                      min={0}
                      style={{ width: '100%' }}
                      placeholder="Time to live"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Username"
                    name={['credentials', 'username']}
                  >
                    <Input placeholder="Enter username" />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name={['credentials', 'password']}
                  >
                    <Input.Password placeholder="Enter password" />
                  </Form.Item>
                </KeyedList.Iterator>
              </KeyedList>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save Configuration
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div>
          <h4>Current Form Values:</h4>
          <div style={{ 
            background: '#f5f5f5', 
            padding: '16px', 
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '11px',
            whiteSpace: 'pre-wrap',
            maxHeight: '500px',
            overflowY: 'auto'
          }}>
            {JSON.stringify(formValues, null, 2)}
          </div>
        </div>
      </div>
    </div>
  )
}

export const AdvancedExample: Story = {
  render: () => <AdvancedExampleComponent />
}

// Example showing field change handling
interface FieldChange {
  field: any
  value: any
  timestamp: string
}

const FieldChangeHandlingComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const [fieldChanges, setFieldChanges] = useState<FieldChange[]>([])
  const [formValues, setFormValues] = useState({
    metadata: {
      title: { content: 'Page Title', required: true },
      description: { content: 'Page description', required: false },
      keywords: { content: 'seo, keywords', required: false }
    }
  })

  const handleFieldChange = (field: any, value: any): void => {
    const change: FieldChange = { field, value, timestamp: new Date().toISOString() }
    setFieldChanges(prev => [change, ...prev].slice(0, 10)) // Keep last 10 changes
  }

  const onValuesChange = (changedValues: any, allValues: any): void => {
    setFormValues(allValues)
  }

  return (
    <div style={{ maxWidth: '1000px', padding: '20px' }}>
      <h3>KeyedList with Field Change Tracking</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        <div>
          <h4>Form</h4>
          <Form
            form={form}
            initialValues={formValues}
            layout="vertical"
            onValuesChange={onValuesChange}
          >
            <Form.Item
              label="Page Metadata"
              name="metadata"
            >
              <KeyedList onFieldChange={handleFieldChange}>
                <KeyedList.Iterator>
                  <Form.Item
                    label="Content"
                    name="content"
                    style={{ marginBottom: '12px' }}
                  >
                    <Input placeholder="Enter content" />
                  </Form.Item>

                  <Form.Item
                    label="Required"
                    name="required"
                    style={{ marginBottom: '16px' }}
                  >
                    <Select
                      options={[
                        { label: 'Yes', value: true },
                        { label: 'No', value: false }
                      ]}
                    />
                  </Form.Item>
                </KeyedList.Iterator>
              </KeyedList>
            </Form.Item>
          </Form>
        </div>

        <div>
          <h4>Current Form Values:</h4>
          <div style={{ 
            background: '#f5f5f5', 
            padding: '12px', 
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '11px',
            whiteSpace: 'pre-wrap',
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            {JSON.stringify(formValues, null, 2)}
          </div>
        </div>

        <div>
          <h4>Recent Field Changes:</h4>
          <div style={{ 
            background: '#f9f9f9', 
            padding: '12px', 
            borderRadius: '6px',
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            {fieldChanges.length === 0 ? (
              <p style={{ color: '#666', margin: 0, fontSize: '12px' }}>No changes yet. Start editing the form!</p>
            ) : (
              fieldChanges.map((change) => (
                <div key={change.timestamp} style={{ 
                  marginBottom: '8px', 
                  padding: '8px',
                  background: 'white',
                  borderRadius: '4px',
                  fontSize: '11px'
                }}>
                  <strong>Field:</strong> {JSON.stringify(change.field)}<br/>
                  <strong>Value:</strong> {JSON.stringify(change.value)}<br/>
                  <strong>Time:</strong> {new Date(change.timestamp).toLocaleTimeString()}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export const FieldChangeHandling: Story = {
  render: () => <FieldChangeHandlingComponent />
}

// Components for SimpleOperations example
interface SettingsWithControlsProps {
  formValues: any
  form: any
  setFormValues: (values: any) => void
}

const SettingsWithControls = ({ formValues, form, setFormValues }: SettingsWithControlsProps): React.JSX.Element => {
  const addNewSetting = (): void => {
    const timestamp = Date.now().toString()
    const newKey = `setting_${timestamp}`
    const newSettings = {
      ...formValues.settings,
      [newKey]: { value: '', description: '' }
    }
    const updatedValues = { ...formValues, settings: newSettings }
    form.setFieldsValue(updatedValues)
    setFormValues(updatedValues)
  }

  const removeLastSetting = (): void => {
    const keys = Object.keys(formValues.settings)
    if (keys.length > 0) {
      const lastKey = keys[keys.length - 1]
      const newSettings = { ...formValues.settings }
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete newSettings[lastKey]
      const updatedValues = { ...formValues, settings: newSettings }
      form.setFieldsValue(updatedValues)
      setFormValues(updatedValues)
    }
  }

  return (
    <KeyedList 
      value={formValues.settings}
      onChange={(newValue) => {
        const updatedValues = { ...formValues, settings: newValue }
        setFormValues(updatedValues)
        form.setFieldsValue(updatedValues)
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        <Button 
          onClick={addNewSetting}
          type="dashed"
          style={{ marginRight: '8px' }}
        >
          Add Setting
        </Button>
        <Button 
          onClick={removeLastSetting}
          disabled={Object.keys(formValues.settings).length === 0}
        >
          Remove Last Setting
        </Button>
      </div>
      
      <KeyedList.Iterator>
        <Form.Item
          label="Value"
          name="value"
        >
          <Input placeholder="Enter setting value" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <Input placeholder="Enter description" />
        </Form.Item>
      </KeyedList.Iterator>
    </KeyedList>
  )
}

// Simple Operations Example for KeyedList
const SimpleOperationsComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState({
    settings: {
      theme: { value: 'dark', description: 'UI theme preference' },
      language: { value: 'en', description: 'Default language' }
    }
  })

  const onValuesChange = (changedValues: any, allValues: any): void => {
    setFormValues(allValues)
  }

  return (
    <div style={{ maxWidth: '800px', padding: '20px' }}>
      <h3>Simple Operations Example</h3>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        This example shows how to add/remove key-value pairs programmatically. 
        Use the buttons above the list to add or remove settings.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <Form
            form={form}
            initialValues={formValues}
            layout="vertical"
            onFinish={(values) => console.log('Form submitted:', values)}
            onValuesChange={onValuesChange}
          >
            <Form.Item
              label="Settings"
              name="settings"
            >
              <SettingsWithControls 
                formValues={formValues}
                form={form}
                setFormValues={setFormValues}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save Settings
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div>
          <h4>Current Form Values:</h4>
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
          <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
            Settings: {Object.keys(formValues.settings).length}
          </p>
        </div>
      </div>
    </div>
  )
}

export const SimpleOperations: Story = {
  render: () => <SimpleOperationsComponent />
}
