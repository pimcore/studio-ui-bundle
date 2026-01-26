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
import { Panel } from './panel'

const meta: Meta<typeof Panel> = {
  title: 'Components/Layout/Panel',
  component: Panel,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text'
    },
    theme: {
      control: 'radio',
      options: ['default', 'fieldset', 'card-with-highlight', 'border-highlight']
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
    name: {
      control: 'text'
    },
    extraPosition: {
      control: 'radio',
      options: ['start', 'end']
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Default Panel',
    theme: 'card-with-highlight',
    children: 'This is the panel content. It can contain any React components or text.'
  }
}

export const WithBorder: Story = {
  args: {
    title: 'Panel with Border',
    theme: 'card-with-highlight',
    border: true,
    children: 'This panel has a border around it.'
  }
}

export const Collapsible: Story = {
  args: {
    title: 'Collapsible Panel',
    theme: 'card-with-highlight',
    collapsible: true,
    children: 'This panel can be collapsed and expanded.'
  }
}

export const CollapsibleCollapsed: Story = {
  args: {
    title: 'Initially Collapsed Panel',
    theme: 'card-with-highlight',
    collapsible: true,
    collapsed: true,
    children: 'This panel starts in a collapsed state.'
  }
}

export const WithTooltip: Story = {
  args: {
    title: 'Panel with Tooltip',
    tooltip: 'This is helpful information about the panel.',
    theme: 'card-with-highlight',
    children: 'Hover over the question mark icon next to the title to see the tooltip.'
  }
}

export const FieldsetTheme: Story = {
  args: {
    title: 'Fieldset Theme Panel',
    theme: 'fieldset',
    border: true,
    children: 'This panel uses the fieldset theme styling.'
  }
}

export const DefaultTheme: Story = {
  args: {
    title: 'Default Theme Panel',
    theme: 'default',
    border: true,
    children: 'This panel uses the default theme styling.'
  }
}

export const BorderHighlightTheme: Story = {
  args: {
    title: 'Border Highlight Theme Panel',
    theme: 'border-highlight',
    border: true,
    children: 'This panel uses the border highlight theme styling.'
  }
}

export const AllThemesComparison: Story = {
  render: () => (
    <div style={ { display: 'grid', gap: '16px' } }>
      <Panel
        border
        theme="card-with-highlight"
        title="Card with Highlight (Default)"
      >
        Card with highlight theme - this is the default theme for panels.
      </Panel>
      <Panel
        border
        theme="default"
        title="Default Theme"
      >
        Default theme - basic styling without special highlights.
      </Panel>
      <Panel
        border
        theme="fieldset"
        title="Fieldset Theme"
      >
        Fieldset theme - styled to look like a form fieldset.
      </Panel>
      <Panel
        border
        theme="border-highlight"
        title="Border Highlight Theme"
      >
        Border highlight theme - emphasizes the border with highlighting.
      </Panel>
    </div>
  )
}

export const NoTitle: Story = {
  args: {
    theme: 'card-with-highlight',
    children: 'This panel has no title, just content.'
  }
}

export const MainPanel: Story = {
  args: {
    name: 'pimcore_root',
    title: 'Main Panel',
    theme: 'card-with-highlight',
    children: 'This is a main panel (pimcore_root) which gets special padding styling.'
  }
}

export const ComplexContent: Story = {
  args: {
    title: 'Panel with Complex Content',
    theme: 'card-with-highlight',
    border: true,
    children: (
      <div>
        <p>This panel contains more complex content:</p>
        <ul>
          <li>Lists</li>
          <li>Multiple paragraphs</li>
          <li>Other elements</li>
        </ul>
        <button type="button">Interactive Elements</button>
      </div>
    )
  }
}

export const WithExtraContent: Story = {
  args: {
    title: 'Panel with Extra Content',
    theme: 'card-with-highlight',
    border: true,
    extra: (
      <div style={ { display: 'flex', gap: '8px' } }>
        <button type="button">Action</button>
        <button type="button">Settings</button>
      </div>
    ),
    children: 'This panel has extra content (buttons) displayed in the header area alongside the title.'
  }
}

export const CollapsibleWithExtraContent: Story = {
  args: {
    title: 'Collapsible Panel with Extra Content',
    theme: 'card-with-highlight',
    collapsible: true,
    extra: (
      <div style={ { display: 'flex', gap: '8px', alignItems: 'center' } }>
        <span style={ { fontSize: '12px', color: '#666' } }>3 items</span>
        <button type="button">Edit</button>
      </div>
    ),
    children: 'This collapsible panel has extra content (item count and edit button) in the header. The extra content remains visible even when collapsed.'
  }
}
