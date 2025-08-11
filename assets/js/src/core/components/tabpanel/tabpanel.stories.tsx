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
