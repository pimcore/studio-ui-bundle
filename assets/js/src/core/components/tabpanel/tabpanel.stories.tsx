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
import { Tabpanel, type TabpanelItem } from './tabpanel'
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
const sampleItems: TabpanelItem[] = [
  {
    label: 'General',
    children: (
      <div>
        <p>This is the general tab content. It contains basic information and settings.</p>
      </div>
    )
  },
  {
    label: 'Advanced',
    children: (
      <div>
        <p>This is the advanced tab content. It contains more complex configuration options.</p>
      </div>
    )
  },
  {
    label: 'Security',
    children: (
      <div>
        <p>This is the security tab content. It contains security-related settings and permissions.</p>
      </div>
    )
  }
]

export const Default: Story = {
  args: {
    title: 'Configuration Tabs',
    items: sampleItems
  }
}

export const WithBorder: Story = {
  args: {
    title: 'Tabpanel with Border',
    border: true,
    items: sampleItems
  }
}

export const Collapsible: Story = {
  args: {
    title: 'Collapsible Tabpanel',
    collapsible: true,
    items: sampleItems
  }
}

export const CollapsibleCollapsed: Story = {
  args: {
    title: 'Initially Collapsed Tabpanel',
    collapsible: true,
    collapsed: true,
    items: sampleItems
  }
}

export const VerticalTabs: Story = {
  args: {
    title: 'Vertical Tabs',
    border: true,
    tabPosition: 'left',
    items: sampleItems
  }
}

export const WithStickyHeader: Story = {
  args: {
    title: 'Tabpanel with Sticky Header',
    border: true,
    hasStickyHeader: true,
    items: sampleItems
  }
}

export const NoTitle: Story = {
  args: {
    items: sampleItems
  }
}

// Complex content example
const complexItems: TabpanelItem[] = [
  {
    label: 'Settings',
    children: (
      <div>
        <h4>Application Settings</h4>
        <div style={ { marginBottom: '16px' } }>
          <label style={ { display: 'block', marginBottom: '4px' } }>Enable notifications</label>
          <Switch size="small" />
        </div>
        <div style={ { marginBottom: '16px' } }>
          <label style={ { display: 'block', marginBottom: '4px' } }>Dark mode</label>
          <Switch size="small" />
        </div>
        <div>
          <label style={ { display: 'block', marginBottom: '4px' } }>Auto save</label>
          <Switch size="small" />
        </div>
      </div>
    )
  },
  {
    label: 'Preferences',
    children: (
      <div>
        <h4>User Preferences</h4>
        <p>Configure your personal preferences here.</p>
        <ul>
          <li>Language settings</li>
          <li>Time zone</li>
          <li>Date format</li>
        </ul>
      </div>
    )
  }
]

export const ComplexContent: Story = {
  args: {
    title: 'Complex Content Example',
    items: complexItems,
    border: true
  }
}
