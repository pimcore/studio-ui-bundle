/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tabpanel } from './tabpanel'
import { Switch } from '@Pimcore/components/switch/switch'

const meta: Meta<typeof Tabpanel> = {
  title: 'Components/Layout/Tabpanel',
  component: Tabpanel,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text'
    },
    border: {
      control: 'boolean'
    },
    collapsible: {
      control: 'boolean'
    },
    collapsed: {
      control: 'boolean'
    },
    tabPosition: {
      control: 'radio',
      options: ['top', 'right', 'bottom', 'left']
    },
    hasStickyHeader: {
      control: 'boolean'
    },
    extraPosition: {
      control: 'radio',
      options: ['start', 'end']
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Sample data for stories
const sampleChildrenData = [
  {
    title: 'General',
    content: 'This is the general tab content. It contains basic information and settings.'
  },
  {
    title: 'Advanced',
    content: 'This is the advanced tab content. It contains more complex configuration options.'
  },
  {
    title: 'Security',
    content: 'This is the security tab content. It contains security-related settings and permissions.'
  }
]

const renderChild = (child: any): React.ReactNode => (
  <div>
    <p>{child.content}</p>
  </div>
)

// Component wrapper to avoid Storybook serialization issues
const TabpanelWrapper = (props: any) => (
  <Tabpanel 
    {...props} 
    children={sampleChildrenData}
    renderChild={renderChild}
  />
)

export const Default: Story = {
  render: () => (
    <TabpanelWrapper title="Configuration Tabs" />
  )
}

export const WithBorder: Story = {
  render: () => (
    <TabpanelWrapper 
      title="Tabpanel with Border"
      border={true}
    />
  )
}

export const Collapsible: Story = {
  render: () => (
    <TabpanelWrapper 
      title="Collapsible Tabpanel"
      collapsible={true}
    />
  )
}

export const CollapsibleCollapsed: Story = {
  render: () => (
    <TabpanelWrapper 
      title="Initially Collapsed Tabpanel"
      collapsible={true}
      collapsed={true}
    />
  )
}

export const VerticalTabs: Story = {
  render: () => (
    <TabpanelWrapper 
      title="Vertical Tabs"
      border={true}
      tabPosition="left"
    />
  )
}

export const WithStickyHeader: Story = {
  render: () => (
    <TabpanelWrapper 
      title="Tabpanel with Sticky Header"
      border={true}
      hasStickyHeader={true}
    />
  )
}

export const NoTitle: Story = {
  render: () => (
    <TabpanelWrapper />
  )
}

// Tabpanel with Extra Content
const TabpanelWithExtraContentComponent = (): React.JSX.Element => {
  const tabData = [
    {
      title: 'Settings',
      content: 'This tabpanel has extra content in the header with action buttons.'
    },
    {
      title: 'Advanced',
      content: 'The extra content remains visible regardless of which tab is active.'
    }
  ]

  const renderChild = (child: any): React.ReactNode => (
    <div>
      <p>{child.content}</p>
    </div>
  )

  return (
    <TabpanelWrapper 
      title="Configuration Panel"
      border={true}
      extra={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ 
            fontSize: '12px', 
            color: '#666',
            padding: '2px 6px',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px'
          }}>
            Status: Active
          </span>
          <Switch defaultChecked size="small" />
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
            Options
          </button>
        </div>
      }
      children={tabData}
      renderChild={renderChild}
    />
  )
}

export const WithExtraContent: Story = {
  render: () => <TabpanelWithExtraContentComponent />
}

// Collapsible Tabpanel with Extra Content
const CollapsibleTabpanelWithExtraContentComponent = (): React.JSX.Element => {
  const tabData = [
    {
      title: 'Main',
      content: 'This collapsible tabpanel has extra content that remains visible even when collapsed.'
    },
    {
      title: 'Details',
      content: 'The extra content provides quick access to important actions and status information.'
    }
  ]

  const renderTabContent = (child: any): React.ReactNode => (
    <div style={{ padding: '4px 0' }}>
      <p>{child.content}</p>
    </div>
  )

  return (
    <TabpanelWrapper 
      title="Advanced Configuration"
      collapsible={true}
      extra={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#666' }}>2 tabs</span>
          <Switch size="small" />
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
            Export
          </button>
        </div>
      }
      children={tabData}
      renderChild={renderTabContent}
    />
  )
}

export const CollapsibleWithExtraContent: Story = {
  render: () => <CollapsibleTabpanelWithExtraContentComponent />
}

// Closable Tabs Story
const ClosableTabsComponent = (): React.JSX.Element => {
  const [tabs, setTabs] = React.useState([
    {
      title: 'Tab 1 (Closable)',
      content: 'This tab can be closed by clicking the X button or middle-clicking on the tab.'
      // closable by default when onClose is provided
    },
    {
      title: 'Tab 2 (Fixed)',
      content: 'This tab cannot be closed - it has no close button.',
      closable: false // explicitly non-closable
    },
    {
      title: 'Tab 3 (Closable)',
      content: 'Another closable tab. Try middle-clicking on the tab to close it.'
      // closable by default when onClose is provided
    },
    {
      title: 'Tab 4 (Closable)',
      content: 'This tab is also closable.'
      // closable by default when onClose is provided
    }
  ])

  const handleTabClose = (tabKey: string): void => {
    const tabIndex = parseInt(tabKey, 10)
    setTabs(prevTabs => prevTabs.filter((_, index) => index !== tabIndex))
  }

  const renderTabContent = (child: any): React.ReactNode => (
    <div>
      <p>{child.content}</p>
      {child.closable && (
        <p style={{ fontSize: '12px', color: '#666', marginTop: '16px' }}>
          💡 <strong>Tip:</strong> You can close this tab by clicking the X button or middle-clicking on the tab header.
        </p>
      )}
    </div>
  )

  const addNewTab = (): void => {
    const newTabIndex = tabs.length + 1
    setTabs(prevTabs => [
      ...prevTabs,
      {
        title: `New Tab ${newTabIndex}`,
        content: `This is dynamically added tab ${newTabIndex}. It's closable by default.`
        // closable by default when onClose is provided
      }
    ])
  }

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <button 
          type="button" 
          onClick={addNewTab}
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
          Add New Tab
        </button>
        <span style={{ marginLeft: '12px', fontSize: '12px', color: '#666' }}>
          Current tabs: {tabs.length}
        </span>
      </div>
      
      <Tabpanel 
        title="Closable Tabs Example"
        border={true}
        children={tabs}
        renderChild={renderTabContent}
        onClose={handleTabClose}
      />
    </div>
  )
}

export const ClosableTabs: Story = {
  render: () => <ClosableTabsComponent />,
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates closable tabs functionality:

- **Tabs are closable by default** when an \`onClose\` handler is provided
- **Fixed tabs** can be created by setting \`closable: false\` to prevent closing
- **Middle-click support** allows closing tabs by middle-clicking on the tab header
- **Dynamic tab management** allows adding and removing tabs programmatically

Provide an \`onClose\` handler to enable closable tabs, and set \`closable: false\` on individual tabs that should not be closable.
        `
      }
    }
  }
}
