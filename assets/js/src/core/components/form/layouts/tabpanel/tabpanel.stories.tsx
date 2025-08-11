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
import { Tabpanel } from '@Pimcore/components/tabpanel/tabpanel'
import { FormKit } from '../../form-kit'
import { Input } from '@Pimcore/components/input/input'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { InputNumber } from '@Pimcore/components/input-number/input-number'
import { Select } from '@Pimcore/components/select/select'
import { Switch } from '@Pimcore/components/switch/switch'

const meta: Meta<typeof Tabpanel> = {
  title: 'Components/Data Entry/Form/Layouts/Tabpanel',
  component: Tabpanel,
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
    },
    hasStickyHeader: {
      control: 'boolean',
      description: 'Whether the tab header should stick when scrolling'
    },
    extraPosition: {
      control: 'radio',
      options: ['start', 'end'],
      description: 'Position of extra content in the header'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Simple Tabpanel with FormKit Fields
const SimpleFormKitTabpanelComponent = (): React.JSX.Element => {
  const [form] = FormKit.useForm()

  const tabData = [
    {
      title: 'General',
      type: 'general'
    },
    {
      title: 'Contact',
      type: 'contact'
    },
    {
      title: 'Settings',
      type: 'settings'
    }
  ]

  const renderTabContent = (tab: any): React.ReactNode => {
    switch (tab.type) {
      case 'general':
        return (
          <>
            <FormKit.Item
              label="Company Name"
              name="companyName"
              rules={[{ required: true, message: 'Please enter company name' }]}
            >
              <Input placeholder="Enter company name" />
            </FormKit.Item>
            
            <FormKit.Item
              label="Description"
              name="description"
            >
              <TextArea placeholder="Enter description" rows={3} />
            </FormKit.Item>
          </>
        )
      case 'contact':
        return (
          <>
            <FormKit.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input placeholder="Enter email address" />
            </FormKit.Item>
            
            <FormKit.Item
              label="Phone"
              name="phone"
            >
              <Input placeholder="Enter phone number" />
            </FormKit.Item>
            
            <FormKit.Item
              label="Website"
              name="website"
            >
              <Input placeholder="Enter website URL" />
            </FormKit.Item>
          </>
        )
      case 'settings':
        return (
          <>
            <FormKit.Item
              label="Priority"
              name="priority"
            >
              <Select
                placeholder="Select priority"
                options={[
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' }
                ]}
              />
            </FormKit.Item>
            
            <FormKit.Item
              label="Max Items"
              name="maxItems"
            >
              <InputNumber min={1} max={1000} placeholder="100" style={{ width: '100%' }} />
            </FormKit.Item>
            
            <FormKit.Item
              label="Enable Notifications"
              name="notifications"
              valuePropName="checked"
            >
              <Switch />
            </FormKit.Item>
          </>
        )
      default:
        return <div>No content</div>
    }
  }

  return (
    <div style={{ maxWidth: '600px' }}>
      <FormKit formProps={{
        form: form,
        layout: 'vertical',
      }}>
        <Tabpanel
          title="Configuration Tabs"
          children={tabData}
          renderChild={renderTabContent}
        />
      </FormKit>
    </div>
  )
}

export const SimpleFormKitTabpanel: Story = {
  render: () => <SimpleFormKitTabpanelComponent />
}

// Collapsible Tabpanel Example
const CollapsibleTabpanelComponent = (): React.JSX.Element => {
  const [form] = FormKit.useForm()

  const tabData = [
    {
      title: 'Basic Info',
      type: 'basic'
    },
    {
      title: 'Advanced',
      type: 'advanced'
    }
  ]

  const renderTabContent = (tab: any): React.ReactNode => {
    switch (tab.type) {
      case 'basic':
        return (
          <>
            <FormKit.Item label="Name" name="name">
              <Input placeholder="Enter name" />
            </FormKit.Item>
            
            <FormKit.Item label="Type" name="type">
              <Select
                placeholder="Select type"
                options={[
                  { value: 'user', label: 'User' },
                  { value: 'admin', label: 'Admin' }
                ]}
              />
            </FormKit.Item>
          </>
        )
      case 'advanced':
        return (
          <>
            <FormKit.Item label="API Endpoint" name="apiEndpoint">
              <Input placeholder="Enter API endpoint" />
            </FormKit.Item>
            
            <FormKit.Item label="Timeout (ms)" name="timeout">
              <InputNumber min={100} max={30000} placeholder="5000" style={{ width: '100%' }} />
            </FormKit.Item>
            
            <FormKit.Item label="Debug Mode" name="debug" valuePropName="checked">
              <Switch />
            </FormKit.Item>
          </>
        )
      default:
        return <div>No content</div>
    }
  }

  return (
    <div style={{ maxWidth: '600px' }}>
      <FormKit formProps={{
        form: form,
        layout: 'vertical',
      }}>
        <Tabpanel
          title="Advanced Configuration"
          collapsible
          collapsed
          children={tabData}
          renderChild={renderTabContent}
        />
      </FormKit>
    </div>
  )
}

export const CollapsibleTabpanel: Story = {
  render: () => <CollapsibleTabpanelComponent />
}

// Vertical Tabs Example
const VerticalTabpanelComponent = (): React.JSX.Element => {
  const [form] = FormKit.useForm()

  const tabData = [
    {
      title: 'Profile',
      type: 'profile'
    },
    {
      title: 'Security',
      type: 'security'
    },
    {
      title: 'Preferences',
      type: 'preferences'
    }
  ]

  const renderTabContent = (tab: any): React.ReactNode => {
    switch (tab.type) {
      case 'profile':
        return (
          <>
            <FormKit.Item label="First Name" name="firstName">
              <Input placeholder="Enter first name" />
            </FormKit.Item>
            
            <FormKit.Item label="Last Name" name="lastName">
              <Input placeholder="Enter last name" />
            </FormKit.Item>
            
            <FormKit.Item label="Bio" name="bio">
              <TextArea placeholder="Enter bio" rows={4} />
            </FormKit.Item>
          </>
        )
      case 'security':
        return (
          <>
            <FormKit.Item label="Current Password" name="currentPassword">
              <Input type="password" placeholder="Enter current password" />
            </FormKit.Item>
            
            <FormKit.Item label="New Password" name="newPassword">
              <Input type="password" placeholder="Enter new password" />
            </FormKit.Item>
            
            <FormKit.Item label="Two-Factor Auth" name="twoFactor" valuePropName="checked">
              <Switch />
            </FormKit.Item>
          </>
        )
      case 'preferences':
        return (
          <>
            <FormKit.Item label="Language" name="language">
              <Select
                placeholder="Select language"
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'de', label: 'German' },
                  { value: 'fr', label: 'French' }
                ]}
              />
            </FormKit.Item>
            
            <FormKit.Item label="Theme" name="theme">
              <Select
                placeholder="Select theme"
                options={[
                  { value: 'light', label: 'Light' },
                  { value: 'dark', label: 'Dark' },
                  { value: 'auto', label: 'Auto' }
                ]}
              />
            </FormKit.Item>
            
            <FormKit.Item label="Email Notifications" name="emailNotifications" valuePropName="checked">
              <Switch />
            </FormKit.Item>
          </>
        )
      default:
        return <div>No content</div>
    }
  }

  return (
    <div style={{ maxWidth: '800px' }}>
      <FormKit formProps={{
        form: form,
        layout: 'vertical',
      }}>
        <Tabpanel
          title="User Settings"
          border
          tabPosition="left"
          children={tabData}
          renderChild={renderTabContent}
        />
      </FormKit>
    </div>
  )
}

export const VerticalTabpanel: Story = {
  render: () => <VerticalTabpanelComponent />
}

// Tabpanel with Extra Content in FormKit
const TabpanelWithExtraContentComponent = (): React.JSX.Element => {
  const [form] = FormKit.useForm()
  const [isEnabled, setIsEnabled] = React.useState(true)

  const tabData = [
    {
      title: 'System Settings',
      type: 'system'
    },
    {
      title: 'User Preferences',
      type: 'preferences'
    }
  ]

  const renderTabContent = (tab: any): React.ReactNode => {
    switch (tab.type) {
      case 'system':
        return (
          <>
            <FormKit.Item label="System Name" name="systemName">
              <Input placeholder="Enter system name" disabled={!isEnabled} />
            </FormKit.Item>
            
            <FormKit.Item label="Max Users" name="maxUsers">
              <InputNumber min={1} max={10000} placeholder="1000" disabled={!isEnabled} style={{ width: '100%' }} />
            </FormKit.Item>
            
            <FormKit.Item label="Maintenance Mode" name="maintenanceMode" valuePropName="checked">
              <Switch disabled={!isEnabled} />
            </FormKit.Item>
          </>
        )
      case 'preferences':
        return (
          <>
            <FormKit.Item label="Default Language" name="defaultLanguage">
              <Select
                placeholder="Select language"
                disabled={!isEnabled}
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'de', label: 'German' },
                  { value: 'fr', label: 'French' }
                ]}
              />
            </FormKit.Item>
            
            <FormKit.Item label="Session Timeout (minutes)" name="sessionTimeout">
              <InputNumber min={5} max={480} placeholder="30" disabled={!isEnabled} style={{ width: '100%' }} />
            </FormKit.Item>
          </>
        )
      default:
        return <div>No content</div>
    }
  }

  return (
    <div style={{ maxWidth: '600px' }}>
      <FormKit formProps={{
        form: form,
        layout: 'vertical',
      }}>
        <Tabpanel
          title="System Configuration"
          border
          extra={
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ 
                fontSize: '12px', 
                color: '#666',
                padding: '2px 6px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px'
              }}>
                {isEnabled ? 'Enabled' : 'Disabled'}
              </span>
              <Switch 
                checked={isEnabled}
                onChange={setIsEnabled}
                size="small"
              />
              <button 
                type="button" 
                style={{ 
                  padding: '4px 8px', 
                  fontSize: '12px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '4px',
                  background: 'white',
                  cursor: 'pointer'
                }}
              >
                Reset
              </button>
            </div>
          }
          children={tabData}
          renderChild={renderTabContent}
        />
      </FormKit>
    </div>
  )
}

export const TabpanelWithExtraContent: Story = {
  render: () => <TabpanelWithExtraContentComponent />
}
