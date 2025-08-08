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
      options: ['fieldset', 'card-with-highlight']
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
    noteditable: {
      control: 'boolean'
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

export const FieldsetTheme: Story = {
  args: {
    title: 'Fieldset Theme Panel',
    theme: 'fieldset',
    border: true,
    children: 'This panel uses the fieldset theme styling.'
  }
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
