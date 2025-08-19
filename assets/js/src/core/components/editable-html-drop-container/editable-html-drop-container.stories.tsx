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
import { EditableHtmlDropContainer, type EditableHtmlDropContainerProps } from './editable-html-drop-container'
import { action } from '@storybook/addon-actions'
import { fn } from '@storybook/test'
import { Icon } from '@Pimcore/components/icon/icon'
import { Text } from '@Pimcore/components/text/text'

const meta = {
  title: 'Components/General/Placeholder/EditableHtmlDropContainer',
  component: EditableHtmlDropContainer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A reusable container component for document editables that support drag-and-drop functionality. Used by snippet, renderlet, and other similar editables. Provides consistent drop zone styling, loading states, error handling, and context menu support.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    hasContent: {
      control: 'boolean',
      description: 'Whether the container currently has content'
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the container is in a loading state'
    },
    error: {
      control: 'object',
      description: 'Error element to display when there is an error'
    },
    dropZoneText: {
      control: 'text',
      description: 'Text displayed in the drop zone when empty'
    },
    renderedContent: {
      control: 'object',
      description: 'The content to render when hasContent is true'
    },
    contextMenuItems: {
      control: 'object',
      description: 'Array of menu items for the right-click context menu'
    },
    width: {
      control: 'text',
      description: 'Width of the container (CSS value or number)'
    },
    height: {
      control: 'text',
      description: 'Height of the container (CSS value or number)'
    },
    defaultHeight: {
      control: 'number',
      description: 'Default height when no height is specified'
    }
  }
} satisfies Meta<typeof EditableHtmlDropContainer>

export default meta
type Story = StoryObj<typeof meta>

// Basic empty state
export const Empty: Story = {
  args: {
    hasContent: false,
    isLoading: false,
    dropZoneText: 'Drag a snippet here',
    contextMenuItems: [
      {
        key: 'search',
        label: 'Search',
        icon: <Icon value="search" />,
        onClick: fn(action('search-clicked'))
      }
    ],
    width: 400,
    height: 200
  } satisfies Partial<EditableHtmlDropContainerProps>
}

// Loading state
export const Loading: Story = {
  args: {
    hasContent: false,
    isLoading: true,
    dropZoneText: 'Drag a snippet here',
    contextMenuItems: [
      {
        key: 'search',
        label: 'Search',
        icon: <Icon value="search" />,
        onClick: fn(action('search-clicked'))
      }
    ],
    width: 400,
    height: 200
  } satisfies Partial<EditableHtmlDropContainerProps>
}

// Error state
export const Error: Story = {
  args: {
    hasContent: false,
    isLoading: false,
    error: (
      <div style={ { padding: '16px', textAlign: 'center', color: '#ff4d4f' } }>
        <Icon value="warning" />
        <Text style={ { marginLeft: '8px' } }>Failed to load content</Text>
      </div>
    ),
    dropZoneText: 'Drag a snippet here',
    contextMenuItems: [
      {
        key: 'retry',
        label: 'Retry',
        icon: <Icon value="reload" />,
        onClick: fn(action('retry-clicked'))
      }
    ],
    width: 400,
    height: 200
  } satisfies Partial<EditableHtmlDropContainerProps>
}

// With content
export const WithContent: Story = {
  args: {
    hasContent: true,
    isLoading: false,
    dropZoneText: 'Drag a snippet here',
    renderedContent: (
      <div style={ { padding: '20px', background: '#f0f0f0', borderRadius: '4px' } }>
        <h3 style={ { margin: '0 0 10px 0', color: '#333' } }>Sample Snippet Content</h3>
        <p style={ { margin: '0', color: '#666' } }>
          This is some sample content that would be rendered inside the container.
          It could be HTML from a snippet, renderlet, or any other editable type.
        </p>
      </div>
    ),
    contextMenuItems: [
      {
        key: 'empty',
        label: 'Empty',
        icon: <Icon value="trash" />,
        onClick: fn(action('empty-clicked'))
      },
      {
        key: 'open',
        label: 'Open',
        icon: <Icon value="open-folder" />,
        onClick: fn(action('open-clicked'))
      },
      {
        key: 'search',
        label: 'Search',
        icon: <Icon value="search" />,
        onClick: fn(action('search-clicked'))
      }
    ],
    width: 400
  } satisfies Partial<EditableHtmlDropContainerProps>
}
