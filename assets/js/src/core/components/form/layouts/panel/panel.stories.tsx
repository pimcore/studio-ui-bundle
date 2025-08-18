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
import { FormKit } from '../../form-kit'
import { Input } from '@Pimcore/components/input/input'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { InputNumber } from '@Pimcore/components/input-number/input-number'
import { Select } from '@Pimcore/components/select/select'
import { Switch } from '@Pimcore/components/switch/switch'
import { Form } from '../../form'

const meta: Meta<typeof Panel> = {
  title: 'Components/Data Entry/Form/Layouts/Panel',
  component: Panel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Use Panel components to organize FormKit fields into logical sections. Supports collapsible behavior and different themes.'
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

// Simple Panel with FormKit Fields
const SimpleFormKitPanelComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()

  return (
    <div style={ { maxWidth: '600px' } }>
      <FormKit formProps={ {
        form,
        layout: 'vertical'
      } }
      >
        <Panel title="Personal Information">
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
              { type: 'email', message: 'Please enter a valid email' }
            ] }
          >
            <Input placeholder="Enter email address" />
          </Form.Item>
        </Panel>
      </FormKit>
    </div>
  )
}

export const SimpleFormKitPanel: Story = {
  render: () => <SimpleFormKitPanelComponent />
}

// Collapsible Panel Example
const CollapsiblePanelComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()

  return (
    <div style={ { maxWidth: '600px' } }>
      <FormKit formProps={ {
        form,
        layout: 'vertical'
      } }
      >
        <Panel
          theme="card-with-highlight"
          title="Basic Information"
        >
          <Form.Item
            label="Company Name"
            name="company"
          >
            <Input placeholder="Enter company name" />
          </Form.Item>
        </Panel>

        <Panel
          collapsed
          collapsible
          theme="card-with-highlight"
          title="Advanced Settings"
        >
          <Form.Item
            label="API Key"
            name="apiKey"
          >
            <Input placeholder="Enter API key" />
          </Form.Item>

          <Form.Item
            label="Webhook URL"
            name="webhookUrl"
          >
            <Input placeholder="Enter webhook URL" />
          </Form.Item>

          <Form.Item
            label="Timeout (seconds)"
            name="timeout"
          >
            <InputNumber
              max={ 300 }
              min={ 1 }
              placeholder="30"
              style={ { width: '100%' } }
            />
          </Form.Item>
        </Panel>
      </FormKit>
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
    <div style={ { maxWidth: '600px' } }>
      <FormKit formProps={ {
        form,
        layout: 'vertical'
      } }
      >
        <Panel
          border
          theme="fieldset"
          title="User Details"
        >
          <Form.Item
            label="Username"
            name="username"
          >
            <Input placeholder="Enter username" />
          </Form.Item>

          <Form.Item
            label="Display Name"
            name="displayName"
          >
            <Input placeholder="Enter display name" />
          </Form.Item>
        </Panel>

        <Panel
          theme="card-with-highlight"
          title="Account Settings"
        >
          <Form.Item
            label="Account Type"
            name="accountType"
          >
            <Select
              options={ [
                { value: 'standard', label: 'Standard' },
                { value: 'premium', label: 'Premium' },
                { value: 'enterprise', label: 'Enterprise' }
              ] }
              placeholder="Select account type"
            />
          </Form.Item>

          <Form.Item
            label="Enable Notifications"
            name="notifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Panel>
      </FormKit>
    </div>
  )
}

export const MultipleThemePanels: Story = {
  render: () => <MultipleThemePanelsComponent />
}

// Panel with Extra Content
const PanelWithExtraContentComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const [isEditMode, setIsEditMode] = React.useState(false)

  return (
    <div style={ { maxWidth: '600px' } }>
      <FormKit formProps={ {
        form,
        layout: 'vertical'
      } }
      >
        <Panel
          extra={
            <div style={ { display: 'flex', gap: '8px', alignItems: 'center' } }>
              <span style={ { fontSize: '12px', color: '#666' } }>
                {isEditMode ? 'Editing' : 'Read Only'}
              </span>
              <button
                onClick={ () => { setIsEditMode(!isEditMode) } }
                style={ {
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '4px',
                  background: isEditMode ? '#1890ff' : 'white',
                  color: isEditMode ? 'white' : 'black',
                  cursor: 'pointer'
                } }
                type="button"
              >
                {isEditMode ? 'Save' : 'Edit'}
              </button>
            </div>
          }
          theme="card-with-highlight"
          title="Project Configuration"
        >
          <Form.Item
            label="Project Name"
            name="projectName"
          >
            <Input
              disabled={ !isEditMode }
              placeholder="Enter project name"
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
          >
            <TextArea
              disabled={ !isEditMode }
              placeholder="Enter project description"
              rows={ 3 }
            />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
          >
            <Select
              disabled={ !isEditMode }
              options={ [
                { value: 'draft', label: 'Draft' },
                { value: 'active', label: 'Active' },
                { value: 'completed', label: 'Completed' }
              ] }
              placeholder="Select status"
            />
          </Form.Item>
        </Panel>
      </FormKit>
    </div>
  )
}

export const PanelWithExtraContent: Story = {
  render: () => <PanelWithExtraContentComponent />
}
