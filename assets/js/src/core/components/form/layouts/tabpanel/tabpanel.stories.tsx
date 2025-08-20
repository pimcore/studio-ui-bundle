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
import { Panel } from '@Pimcore/components/panel/panel'
import { Form } from '../../form'

const FormKitTabpanel = FormKit.TabPanel

const meta: Meta<typeof FormKitTabpanel> = {
  title: 'Components/Data Entry/Form/Layouts/Tabpanel',
  component: FormKitTabpanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Use Tabpanel components to organize FormKit fields into tabbed sections. Supports collapsible behavior and different themes.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Tabpanel title displayed at the top'
    },
    border: {
      control: 'boolean',
      description: 'Whether to show a border around the tabpanel'
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether the tabpanel can be collapsed'
    },
    collapsed: {
      control: 'boolean',
      description: 'Whether the tabpanel starts collapsed (only works if collapsible is true)'
    },
    tabPosition: {
      control: 'radio',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Position of the tab navigation'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const SimpleFormKitTabpanelComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()

  const items = [
    {
      label: 'General',
      children: (
        <Panel>
          <Form.Item
            label="Username"
            name="username"
          >
            <Input placeholder="Enter username" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
          >
            <Input
              placeholder="Enter email"
              type="email"
            />
          </Form.Item>

          <Form.Item
            label="Active"
            name="active"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Panel>
      )
    },
    {
      label: 'Profile',
      children: (
        <Panel>
          <Form.Item
            label="Display Name"
            name="displayName"
          >
            <Input placeholder="Enter display name" />
          </Form.Item>

          <Form.Item
            label="Bio"
            name="bio"
          >
            <TextArea
              placeholder="Tell us about yourself"
              rows={ 4 }
            />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
          >
            <InputNumber
              max={ 100 }
              min={ 18 }
              placeholder="25"
              style={ { width: '100%' } }
            />
          </Form.Item>
        </Panel>
      )
    },
    {
      label: 'Preferences',
      children: (
        <Panel>
          <Form.Item
            label="Language"
            name="language"
          >
            <Select
              options={ [
                { value: 'en', label: 'English' },
                { value: 'de', label: 'German' },
                { value: 'fr', label: 'French' }
              ] }
              placeholder="Select language"
            />
          </Form.Item>

          <Form.Item
            label="Notifications"
            name="notifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Panel>
      )
    }
  ]

  return (
    <div style={ { maxWidth: '600px' } }>
      <FormKit formProps={ {
        form,
        layout: 'vertical'
      } }
      >
        <FormKitTabpanel
          items={ items }
          title="Configuration Tabs"
        />
      </FormKit>
    </div>
  )
}

export const SimpleFormKitTabpanel: Story = {
  render: () => <SimpleFormKitTabpanelComponent />
}

const CollapsibleTabpanelComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()

  const items = [
    {
      label: 'Basic Info',
      children: (
        <Panel>
          <Form.Item
            label="Name"
            name="name"
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
          >
            <Select
              options={ [
                { value: 'user', label: 'User' },
                { value: 'admin', label: 'Admin' }
              ] }
              placeholder="Select type"
            />
          </Form.Item>
        </Panel>
      )
    },
    {
      label: 'Advanced',
      children: (
        <Panel>
          <Form.Item
            label="API Endpoint"
            name="apiEndpoint"
          >
            <Input placeholder="Enter API endpoint" />
          </Form.Item>

          <Form.Item
            label="Timeout (ms)"
            name="timeout"
          >
            <InputNumber
              max={ 30000 }
              min={ 100 }
              placeholder="5000"
              style={ { width: '100%' } }
            />
          </Form.Item>

          <Form.Item
            label="Debug Mode"
            name="debug"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Panel>
      )
    }
  ]

  return (
    <div style={ { maxWidth: '600px' } }>
      <FormKit formProps={ {
        form,
        layout: 'vertical'
      } }
      >
        <FormKitTabpanel
          collapsed
          collapsible
          items={ items }
          title="Advanced Configuration"
        />
      </FormKit>
    </div>
  )
}

export const CollapsibleTabpanel: Story = {
  render: () => <CollapsibleTabpanelComponent />
}

const VerticalTabsComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()

  const items = [
    {
      label: 'User Info',
      children: (
        <Panel>
          <Form.Item
            label="First Name"
            name="firstName"
          >
            <Input placeholder="John" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
          >
            <Input placeholder="Doe" />
          </Form.Item>
        </Panel>
      )
    },
    {
      label: 'Contact',
      children: (
        <Panel>
          <Form.Item
            label="Phone"
            name="phone"
          >
            <Input placeholder="+1234567890" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
          >
            <TextArea
              placeholder="Enter address"
              rows={ 3 }
            />
          </Form.Item>
        </Panel>
      )
    }
  ]

  return (
    <div style={ { maxWidth: '600px' } }>
      <FormKit formProps={ {
        form,
        layout: 'vertical'
      } }
      >
        <FormKitTabpanel
          border
          items={ items }
          tabPosition="left"
          title="User Settings"
        />
      </FormKit>
    </div>
  )
}

export const VerticalTabs: Story = {
  render: () => <VerticalTabsComponent />
}
