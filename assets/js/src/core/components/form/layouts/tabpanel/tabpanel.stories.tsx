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
import { Panel } from '@Pimcore/components/panel/panel'

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
          <Panel>
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
          </Panel>
        )
      case 'contact':
        return (
          <Panel>
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
          </Panel>
        )
      case 'settings':
        return (
          <Panel>
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
          </Panel>
        )
      default:
        return <Panel><div>No content</div></Panel>
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
          <Panel>
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
          </Panel>
        )
      case 'advanced':
        return (
          <Panel>
            <FormKit.Item label="API Endpoint" name="apiEndpoint">
              <Input placeholder="Enter API endpoint" />
            </FormKit.Item>
            
            <FormKit.Item label="Timeout (ms)" name="timeout">
              <InputNumber min={100} max={30000} placeholder="5000" style={{ width: '100%' }} />
            </FormKit.Item>
            
            <FormKit.Item label="Debug Mode" name="debug" valuePropName="checked">
              <Switch />
            </FormKit.Item>
          </Panel>
        )
      default:
        return <Panel><div>No content</div></Panel>
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
          <Panel>
            <FormKit.Item label="First Name" name="firstName">
              <Input placeholder="Enter first name" />
            </FormKit.Item>
            
            <FormKit.Item label="Last Name" name="lastName">
              <Input placeholder="Enter last name" />
            </FormKit.Item>
            
            <FormKit.Item label="Bio" name="bio">
              <TextArea placeholder="Enter bio" rows={4} />
            </FormKit.Item>
          </Panel>
        )
      case 'security':
        return (
          <Panel>
            <FormKit.Item label="Current Password" name="currentPassword">
              <Input type="password" placeholder="Enter current password" />
            </FormKit.Item>
            
            <FormKit.Item label="New Password" name="newPassword">
              <Input type="password" placeholder="Enter new password" />
            </FormKit.Item>
            
            <FormKit.Item label="Two-Factor Auth" name="twoFactor" valuePropName="checked">
              <Switch />
            </FormKit.Item>
          </Panel>
        )
      case 'preferences':
        return (
          <Panel>
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
          </Panel>
        )
      default:
        return <Panel><div>No content</div></Panel>
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
          <Panel>
            <FormKit.Item label="System Name" name="systemName">
              <Input placeholder="Enter system name" disabled={!isEnabled} />
            </FormKit.Item>
            
            <FormKit.Item label="Max Users" name="maxUsers">
              <InputNumber min={1} max={10000} placeholder="1000" disabled={!isEnabled} style={{ width: '100%' }} />
            </FormKit.Item>
            
            <FormKit.Item label="Maintenance Mode" name="maintenanceMode" valuePropName="checked">
              <Switch disabled={!isEnabled} />
            </FormKit.Item>
          </Panel>
        )
      case 'preferences':
        return (
          <Panel>
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
          </Panel>
        )
      default:
        return <Panel><div>No content</div></Panel>
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

// Simple Tabpanel without Title
const NoTitleFormKitTabpanelComponent = (): React.JSX.Element => {
  const [form] = FormKit.useForm()

  const tabData = [
    {
      title: 'Basic',
      type: 'basic'
    },
    {
      title: 'Advanced',
      type: 'advanced'  
    },
    {
      title: 'Security',
      type: 'security'
    }
  ]

  const renderTabContent = (tab: any): React.ReactNode => {
    switch (tab.type) {
      case 'basic':
        return (
          <Panel>
            <FormKit.Item label="Application Name" name="appName" rules={[{ required: true }]}>
              <Input placeholder="Enter application name" />
            </FormKit.Item>
            
            <FormKit.Item label="Version" name="version">
              <Input placeholder="1.0.0" />
            </FormKit.Item>
            
            <FormKit.Item label="Environment" name="environment">
              <Select
                placeholder="Select environment"
                options={[
                  { value: 'development', label: 'Development' },
                  { value: 'staging', label: 'Staging' },
                  { value: 'production', label: 'Production' }
                ]}
              />
            </FormKit.Item>
          </Panel>
        )
      case 'advanced':
        return (
          <Panel>
            <FormKit.Item label="Database URL" name="databaseUrl">
              <Input placeholder="Enter database URL" />
            </FormKit.Item>
            
            <FormKit.Item label="Cache TTL (seconds)" name="cacheTtl">
              <InputNumber min={1} max={86400} placeholder="3600" style={{ width: '100%' }} />
            </FormKit.Item>
            
            <FormKit.Item label="Enable Logging" name="enableLogging" valuePropName="checked">
              <Switch />
            </FormKit.Item>
          </Panel>
        )
      case 'security':
        return (
          <Panel>
            <FormKit.Item label="Secret Key" name="secretKey" rules={[{ required: true }]}>
              <Input type="password" placeholder="Enter secret key" />
            </FormKit.Item>
            
            <FormKit.Item label="JWT Expiration (hours)" name="jwtExpiration">
              <InputNumber min={1} max={168} placeholder="24" style={{ width: '100%' }} />
            </FormKit.Item>
            
            <FormKit.Item label="Enable CORS" name="enableCors" valuePropName="checked">
              <Switch />
            </FormKit.Item>
          </Panel>
        )
      default:
        return <Panel><div>No content</div></Panel>
    }
  }

  return (
    <div style={{ maxWidth: '600px' }}>
      <FormKit formProps={{
        form: form,
        layout: 'vertical',
      }}>
        <Tabpanel
          border
          children={tabData}
          renderChild={renderTabContent}
        />
      </FormKit>
    </div>
  )
}

export const NoTitleFormKitTabpanel: Story = {
  render: () => <NoTitleFormKitTabpanelComponent />,
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates a FormKit tabpanel without a title:

**Key Features:**
- **No title prop** - The tabpanel renders without a header title
- **Border styling** - Uses border to provide visual separation
- **Clean layout** - Tabs are the primary navigation without additional header text
- **Full width usage** - Perfect for cases where the tabpanel is the main content area

**Use Cases:**
- Modal dialogs where the modal title serves as the main heading
- Sections where tabs are self-explanatory and don't need additional context
- Full-width content areas where a title would be redundant
- Embedded tabpanels within larger forms or interfaces
        `
      }
    }
  }
}

// Closable Tabs with FormKit
const ClosableTabsFormKitComponent = (): React.JSX.Element => {
  const [form] = FormKit.useForm()
  const [tabs, setTabs] = React.useState([
    {
      title: 'User Details',
      type: 'user'
      // closable by default when onClose is provided
    },
    {
      title: 'System Config (Fixed)',
      type: 'system',
      closable: false // explicitly non-closable
    },
    {
      title: 'API Settings',
      type: 'api'
      // closable by default when onClose is provided
    },
    {
      title: 'Notifications',
      type: 'notifications'
      // closable by default when onClose is provided
    }
  ])

  const handleTabClose = (tabKey: string): void => {
    const tabIndex = parseInt(tabKey, 10)
    setTabs(prevTabs => prevTabs.filter((_, index) => index !== tabIndex))
  }

  const addNewConfigTab = (): void => {
    const newTabIndex = tabs.length + 1
    setTabs(prevTabs => [
      ...prevTabs,
      {
        title: `Config ${newTabIndex}`,
        type: 'dynamic'
        // closable by default when onClose is provided
      }
    ])
  }

  const renderTabContent = (tab: any): React.ReactNode => {
    switch (tab.type) {
      case 'user':
        return (
          <Panel>
            <FormKit.Item label="Username" name="username" rules={[{ required: true }]}>
              <Input placeholder="Enter username" />
            </FormKit.Item>
            
            <FormKit.Item label="Email" name="email" rules={[{ type: 'email' }]}>
              <Input placeholder="Enter email address" />
            </FormKit.Item>
            
            <FormKit.Item label="Role" name="role">
              <Select
                placeholder="Select role"
                options={[
                  { value: 'user', label: 'User' },
                  { value: 'admin', label: 'Administrator' },
                  { value: 'moderator', label: 'Moderator' }
                ]}
              />
            </FormKit.Item>

            {tab.closable && (
              <div style={{ 
                marginTop: '16px', 
                padding: '12px', 
                backgroundColor: '#f6ffed', 
                border: '1px solid #b7eb8f',
                borderRadius: '6px'
              }}>
                <p style={{ margin: 0, fontSize: '12px', color: '#52c41a' }}>
                  ✨ This tab is closable - click the X button to close it.
                </p>
              </div>
            )}
          </Panel>
        )
      case 'system':
        return (
          <Panel>
            <FormKit.Item label="System Name" name="systemName">
              <Input placeholder="Enter system name" />
            </FormKit.Item>
            
            <FormKit.Item label="Max Connections" name="maxConnections">
              <InputNumber min={1} max={1000} placeholder="100" style={{ width: '100%' }} />
            </FormKit.Item>
            
            <FormKit.Item label="Debug Mode" name="debugMode" valuePropName="checked">
              <Switch />
            </FormKit.Item>

            <div style={{ 
              marginTop: '16px', 
              padding: '12px', 
              backgroundColor: '#fff2e8', 
              border: '1px solid #ffbb96',
              borderRadius: '6px'
            }}>
              <p style={{ margin: 0, fontSize: '12px', color: '#fa541c' }}>
                🔒 This tab is fixed and cannot be closed (system configuration).
              </p>
            </div>
          </Panel>
        )
      case 'api':
        return (
          <Panel>
            <FormKit.Item label="API Endpoint" name="apiEndpoint" rules={[{ required: true }]}>
              <Input placeholder="Enter API endpoint URL" />
            </FormKit.Item>
            
            <FormKit.Item label="API Key" name="apiKey">
              <Input type="password" placeholder="Enter API key" />
            </FormKit.Item>
            
            <FormKit.Item label="Timeout (seconds)" name="timeout">
              <InputNumber min={1} max={300} placeholder="30" style={{ width: '100%' }} />
            </FormKit.Item>

            <FormKit.Item label="Enable SSL" name="enableSsl" valuePropName="checked">
              <Switch />
            </FormKit.Item>
          </Panel>
        )
      case 'notifications':
        return (
          <Panel>
            <FormKit.Item label="Email Notifications" name="emailNotifications" valuePropName="checked">
              <Switch />
            </FormKit.Item>
            
            <FormKit.Item label="Push Notifications" name="pushNotifications" valuePropName="checked">
              <Switch />
            </FormKit.Item>
            
            <FormKit.Item label="Notification Email" name="notificationEmail">
              <Input placeholder="Enter notification email" />
            </FormKit.Item>

            <FormKit.Item label="Frequency" name="frequency">
              <Select
                placeholder="Select frequency"
                options={[
                  { value: 'immediate', label: 'Immediate' },
                  { value: 'hourly', label: 'Hourly' },
                  { value: 'daily', label: 'Daily' }
                ]}
              />
            </FormKit.Item>
          </Panel>
        )
      case 'dynamic':
        return (
          <Panel>
            <FormKit.Item label="Config Key" name="configKey">
              <Input placeholder="Enter configuration key" />
            </FormKit.Item>
            
            <FormKit.Item label="Config Value" name="configValue">
              <TextArea placeholder="Enter configuration value" rows={3} />
            </FormKit.Item>
            
            <FormKit.Item label="Active" name="active" valuePropName="checked">
              <Switch />
            </FormKit.Item>

            <div style={{ 
              marginTop: '16px', 
              padding: '12px', 
              backgroundColor: '#f0f5ff', 
              border: '1px solid #adc6ff',
              borderRadius: '6px'
            }}>
              <p style={{ margin: 0, fontSize: '12px', color: '#1890ff' }}>
                🔧 This is a dynamically added configuration tab.
              </p>
            </div>
          </Panel>
        )
      default:
        return <Panel><div>No content available</div></Panel>
    }
  }

  return (
    <div style={{ maxWidth: '700px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <button 
          type="button" 
          onClick={addNewConfigTab}
          style={{ 
            padding: '6px 12px', 
            fontSize: '14px',
            border: '1px solid #1890ff',
            borderRadius: '6px',
            background: '#1890ff',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Add Config Tab
        </button>
        <span style={{ fontSize: '12px', color: '#666' }}>
          Active tabs: {tabs.length} | Closable: {tabs.filter(t => t.closable).length}
        </span>
      </div>
      
      <FormKit formProps={{
        form: form,
        layout: 'vertical',
      }}>
        <Tabpanel
          title="Application Configuration"
          border
          children={tabs}
          renderChild={renderTabContent}
          onClose={handleTabClose}
        />
      </FormKit>
    </div>
  )
}

export const ClosableTabsWithFormKit: Story = {
  render: () => <ClosableTabsFormKitComponent />,
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates closable tabs functionality integrated with FormKit:

**Features:**
- **Mixed tab types**: Some tabs are closable, others are fixed (like system configuration)
- **FormKit integration**: Each tab contains FormKit form fields with validation
- **Dynamic tab management**: Add new configuration tabs dynamically
- **Visual indicators**: Different styling to indicate closable vs fixed tabs
- **Form validation**: Proper form validation across all tabs

**Usage in Forms:**
- **Tabs are closable by default** when an \`onClose\` handler is provided
- Set \`closable: false\` on tabs that should NOT be removable (essential tabs)
- Omit the \`closable\` property to use the default closable behavior
- Handle the \`onClose\` callback to update your form tabs state
- Perfect for configuration sections, multi-step forms, or dynamic content areas

**Best Practices:**
- Keep essential configuration tabs fixed by setting \`closable: false\`
- Allow most tabs to be closable by default for better user control
- Provide clear visual feedback about which tabs can be closed
        `
      }
    }
  }
}
