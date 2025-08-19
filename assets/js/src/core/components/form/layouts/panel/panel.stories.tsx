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
import { FormKit } from '../../form-kit'
import { Input } from '@Pimcore/components/input/input'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { InputNumber } from '@Pimcore/components/input-number/input-number'
import { Select } from '@Pimcore/components/select/select'
import { Switch } from '@Pimcore/components/switch/switch'
import { Form } from '../../form'

const meta: Meta = {
  title: 'Components/Data Entry/Form/Layouts/Panel',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Use Panel components within FormKit to organize fields into logical sections. Supports collapsible behavior and different themes.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Panel title displayed at the top',
      defaultValue: 'Panel Title'
    },
    theme: {
      control: 'radio',
      options: ['fieldset', 'card-with-highlight'],
      description: 'Visual theme for the panel',
      defaultValue: 'card-with-highlight'
    },
    border: {
      control: 'boolean',
      description: 'Whether to show a border around the panel',
      defaultValue: false
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether the panel can be collapsed',
      defaultValue: false
    },
    collapsed: {
      control: 'boolean',
      description: 'Whether the panel starts collapsed (only works if collapsible is true)',
      defaultValue: false
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Base component for reusable panel content
const PanelStoryComponent = (args: any): React.JSX.Element => {
  const [form] = Form.useForm()

  return (
    <div style={ { maxWidth: '600px' } }>
      <FormKit formProps={ {
        form,
        layout: 'vertical'
      } }
      >
        <FormKit.Panel { ...args }>
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
        </FormKit.Panel>
      </FormKit>
    </div>
  )
}

// Default story
export const Default: Story = {
  args: {
    title: 'Personal Information'
  },
  render: (args) => <PanelStoryComponent { ...args } />
}

// Collapsible panel
export const Collapsible: Story = {
  args: {
    title: 'Advanced Settings',
    collapsible: true,
    collapsed: true,
    theme: 'card-with-highlight'
  },
  render: (args) => <PanelStoryComponent { ...args } />
}

// Fieldset theme with border
export const FieldsetTheme: Story = {
  args: {
    title: 'User Details',
    theme: 'fieldset',
    border: true
  },
  render: (args) => <PanelStoryComponent { ...args } />
}

// Card theme
export const CardTheme: Story = {
  args: {
    title: 'Account Settings',
    theme: 'card-with-highlight'
  },
  render: (args) => <PanelStoryComponent { ...args } />
}

// Multiple panels example
const MultiplePanelsComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()

  return (
    <div style={ { maxWidth: '600px' } }>
      <FormKit formProps={ {
        form,
        layout: 'vertical'
      } }
      >
        <FormKit.Panel
          border
          theme="fieldset"
          title="Basic Information"
        >
          <Form.Item
            label="Company Name"
            name="company"
          >
            <Input placeholder="Enter company name" />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
          >
            <Input placeholder="Enter username" />
          </Form.Item>
        </FormKit.Panel>

        <FormKit.Panel
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
        </FormKit.Panel>

        <FormKit.Panel
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
        </FormKit.Panel>
      </FormKit>
    </div>
  )
}

export const MultiplePanels: Story = {
  render: () => <MultiplePanelsComponent />
}

// Panel with extra content
const WithExtraContentComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const [isEditMode, setIsEditMode] = React.useState(false)

  return (
    <div style={ { maxWidth: '600px' } }>
      <FormKit formProps={ {
        form,
        layout: 'vertical'
      } }
      >
        <FormKit.Panel
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
        </FormKit.Panel>
      </FormKit>
    </div>
  )
}

export const WithExtraContent: Story = {
  render: () => <WithExtraContentComponent />
}
