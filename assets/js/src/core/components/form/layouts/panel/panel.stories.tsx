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
import React from 'react'
import { Panel } from '@Pimcore/components/panel/panel'
import { Form } from '../../form'
import { Input } from '@Pimcore/components/input/input'
import { InputNumber } from '@Pimcore/components/input-number/input-number'
import { Select } from '@Pimcore/components/select/select'
import { Switch } from '@Pimcore/components/switch/switch'

const meta: Meta<typeof Panel> = {
  title: 'Components/Data Entry/Form/Layouts/Panel',
  component: Panel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Use Panel components to organize form fields into logical sections. Supports collapsible behavior and different themes.'
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
