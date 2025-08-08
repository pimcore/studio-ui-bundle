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
import { Panel } from '@Pimcore/components/panel/panel'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { InputNumber } from '@Pimcore/components/input-number/input-number'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { Select } from '@Pimcore/components/select/select'
import { DatePicker } from '@Pimcore/components/date-picker/date-picker'
import { Switch } from '@Pimcore/components/switch/switch'
import { Button } from '@Pimcore/components/button/button'
import { Space } from '@Pimcore/components/space/space'

const meta: Meta<typeof Panel> = {
  title: 'Components/Layout/Panel/Form Examples',
  component: Panel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Panel Component for Forms

The Panel component is a versatile layout component that works excellently for organizing form fields into logical sections. 
This page demonstrates specific examples of using Panel components within forms.

## Form Integration
The Panel component is available as \`Form.Panel\` for convenience, but it's the same as the core Panel component.
Both \`<Panel>\` and \`<Form.Panel>\` work identically.

## Key Features for Forms
- **Sectioned Forms**: Group related form fields together
- **Collapsible Sections**: Allow users to expand/collapse form sections
- **Theme Support**: Fieldset and card-with-highlight themes
- **Form Integration**: Works seamlessly with Form.Item components
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Responsive**: Adapts to different screen sizes

## Use Cases
- Multi-step forms with logical sections
- Settings pages with grouped configurations  
- Profile forms with personal/professional sections
- Complex data entry forms with optional sections

## Best Practices
- Use descriptive titles for each panel
- Group logically related fields together
- Consider using collapsible panels for less frequently used fields
- Provide clear visual hierarchy with consistent theming
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Panel title displayed at the top'
    },
    theme: {
      control: 'radio',
      options: ['fieldset', 'card-with-highlight'],
      description: 'Visual theme for the panel'
    },
    border: {
      control: 'boolean',
      description: 'Whether to show a border around the panel'
    },
    collapsible: {
      control: 'boolean', 
      description: 'Whether the panel can be collapsed'
    },
    collapsed: {
      control: 'boolean',
      description: 'Whether the panel starts collapsed (only works if collapsible is true)'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Simple Panel with Form Fields
const SimpleFormPanelComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()

  return (
    <div style={{ maxWidth: '600px' }}>
      <Form form={form} layout="vertical">
        <Panel title="Personal Information">
          <Form.Item
            label="First Name"
            name="firstName" 
            rules={[{ required: true, message: 'Please enter your first name' }]}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>
          
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please enter your last name' }]}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>
          
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>
        </Panel>
      </Form>
    </div>
  )
}

export const SimpleFormPanel: Story = {
  render: () => <SimpleFormPanelComponent />
}

// Collapsible Panel Example
const CollapsiblePanelComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()

  return (
    <div style={{ maxWidth: '600px' }}>
      <Form form={form} layout="vertical">
        <Panel title="Basic Information" theme="card-with-highlight">
          <Form.Item label="Company Name" name="company">
            <Input placeholder="Enter company name" />
          </Form.Item>
        </Panel>
        
        <Panel title="Advanced Settings" collapsible collapsed theme="card-with-highlight">
          <Form.Item label="API Key" name="apiKey">
            <Input placeholder="Enter API key" />
          </Form.Item>
          
          <Form.Item label="Webhook URL" name="webhookUrl">
            <Input placeholder="Enter webhook URL" />
          </Form.Item>
          
          <Form.Item label="Timeout (seconds)" name="timeout">
            <InputNumber min={1} max={300} placeholder="30" style={{ width: '100%' }} />
          </Form.Item>
        </Panel>
      </Form>
    </div>
  )
}

export const CollapsiblePanel: Story = {
  render: () => <CollapsiblePanelComponent />
}

// Multiple Panels with Different Themes
const MultipleThemePanelsComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()

  return (
    <div style={{ maxWidth: '600px' }}>
      <Form form={form} layout="vertical">
        <Panel title="User Details" theme="fieldset" border>
          <Form.Item label="Username" name="username">
            <Input placeholder="Enter username" />
          </Form.Item>
          
          <Form.Item label="Display Name" name="displayName">
            <Input placeholder="Enter display name" />
          </Form.Item>
        </Panel>
        
        <Panel title="Account Settings" theme="card-with-highlight">
          <Form.Item label="Account Type" name="accountType">
            <Select
              placeholder="Select account type"
              options={[
                { value: 'standard', label: 'Standard' },
                { value: 'premium', label: 'Premium' },
                { value: 'enterprise', label: 'Enterprise' }
              ]}
            />
          </Form.Item>
          
          <Form.Item label="Enable Notifications" name="notifications" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Panel>
      </Form>
    </div>
  )
}

export const MultipleThemePanels: Story = {
  render: () => <MultipleThemePanelsComponent />
}

// Complex Form with Interactive Example
const ComplexFormComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState({
    personalInfo: {},
    contactInfo: {},
    preferences: {}
  })

  const onValuesChange = (changedValues: any, allValues: any): void => {
    setFormValues(allValues)
  }

  const onFinish = (values: any): void => {
    console.log('Form submitted:', values)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', maxWidth: '1000px' }}>
      <div>
        <Form
          form={form}
          layout="vertical"
          onValuesChange={onValuesChange}
          onFinish={onFinish}
        >
          <Panel title="Personal Information" theme="card-with-highlight">
            <Form.Item label="First Name" name={['personalInfo', 'firstName']}>
              <Input placeholder="Enter first name" />
            </Form.Item>
            
            <Form.Item label="Last Name" name={['personalInfo', 'lastName']}>
              <Input placeholder="Enter last name" />
            </Form.Item>
            
            <Form.Item label="Date of Birth" name={['personalInfo', 'dateOfBirth']}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.Item label="Bio" name={['personalInfo', 'bio']}>
              <TextArea rows={3} placeholder="Tell us about yourself..." />
            </Form.Item>
          </Panel>

          <Panel title="Contact Information" theme="card-with-highlight" collapsible>
            <Form.Item label="Email" name={['contactInfo', 'email']}>
              <Input placeholder="Enter email address" />
            </Form.Item>
            
            <Form.Item label="Phone" name={['contactInfo', 'phone']}>
              <Input placeholder="Enter phone number" />
            </Form.Item>
            
            <Form.Item label="Address" name={['contactInfo', 'address']}>
              <TextArea rows={2} placeholder="Enter address" />
            </Form.Item>
          </Panel>

          <Panel title="Preferences" theme="fieldset" border collapsible collapsed>
            <Form.Item label="Language" name={['preferences', 'language']}>
              <Select
                placeholder="Select language"
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'de', label: 'German' },
                  { value: 'fr', label: 'French' },
                  { value: 'es', label: 'Spanish' }
                ]}
              />
            </Form.Item>
            
            <Form.Item label="Timezone" name={['preferences', 'timezone']}>
              <Select
                placeholder="Select timezone"
                options={[
                  { value: 'UTC', label: 'UTC' },
                  { value: 'GMT+1', label: 'GMT+1 (Central European Time)' },
                  { value: 'GMT-5', label: 'GMT-5 (Eastern Time)' },
                  { value: 'GMT-8', label: 'GMT-8 (Pacific Time)' }
                ]}
              />
            </Form.Item>
            
            <Form.Item label="Email Notifications" name={['preferences', 'emailNotifications']} valuePropName="checked">
              <Switch />
            </Form.Item>
          </Panel>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Save Profile
              </Button>
              <Button htmlType="reset">
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
      
      <div>
        <div style={{ position: 'sticky', top: '20px' }}>
          <h4>Form Values</h4>
          <div style={{ 
            background: '#f5f5f5', 
            padding: '16px', 
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '11px',
            whiteSpace: 'pre-wrap',
            maxHeight: '500px',
            overflow: 'auto'
          }}>
            {JSON.stringify(formValues, null, 2)}
          </div>
        </div>
      </div>
    </div>
  )
}

export const ComplexFormExample: Story = {
  render: () => <ComplexFormComponent />
}

// Settings Page Example
const SettingsPageComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()

  return (
    <div style={{ maxWidth: '700px' }}>
      <h2 style={{ marginBottom: '24px', color: '#262626' }}>Application Settings</h2>
      
      <Form form={form} layout="vertical">
        <Panel title="General Settings" theme="card-with-highlight">
          <Form.Item label="Application Name" name="appName">
            <Input placeholder="Enter application name" />
          </Form.Item>
          
          <Form.Item label="Default Language" name="defaultLanguage">
            <Select
              placeholder="Select default language"
              options={[
                { value: 'en', label: 'English' },
                { value: 'de', label: 'Deutsch' },
                { value: 'fr', label: 'Français' }
              ]}
            />
          </Form.Item>
          
          <Form.Item label="Maintenance Mode" name="maintenanceMode" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Panel>

        <Panel title="Security Settings" theme="card-with-highlight" collapsible>
          <Form.Item label="Session Timeout (minutes)" name="sessionTimeout">
            <InputNumber min={5} max={1440} placeholder="30" style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item label="Max Login Attempts" name="maxLoginAttempts">
            <InputNumber min={1} max={10} placeholder="3" style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item label="Require 2FA" name="require2FA" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Panel>

        <Panel title="Advanced Configuration" theme="fieldset" border collapsible collapsed>
          <Form.Item label="Debug Mode" name="debugMode" valuePropName="checked">
            <Switch />
          </Form.Item>
          
          <Form.Item label="Log Level" name="logLevel">
            <Select
              placeholder="Select log level"
              options={[
                { value: 'error', label: 'Error' },
                { value: 'warning', label: 'Warning' },
                { value: 'info', label: 'Info' },
                { value: 'debug', label: 'Debug' }
              ]}
            />
          </Form.Item>
          
          <Form.Item label="Cache TTL (seconds)" name="cacheTTL">
            <InputNumber min={0} placeholder="3600" style={{ width: '100%' }} />
          </Form.Item>
        </Panel>

        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Save Settings
            </Button>
            <Button>
              Reset to Defaults
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  )
}

export const SettingsPageExample: Story = {
  render: () => <SettingsPageComponent />
}
