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
import { EditableEmptyPlaceholder, type EditableEmptyPlaceholderProps } from './editable-empty-placeholder'
import { action } from '@storybook/addon-actions'
import { fn } from '@storybook/test'

const meta = {
  title: 'Components/General/Placeholder/EditableEmptyPlaceholder',
  component: EditableEmptyPlaceholder,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A reusable empty state placeholder component for document editables like video, embed, and other content types. Provides consistent styling and interaction patterns across all editable types.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'The descriptive text shown in the placeholder'
    },
    buttonText: {
      control: 'text',
      description: 'The text displayed on the action button'
    },
    onClick: {
      description: 'Callback function triggered when the placeholder is clicked'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the placeholder is disabled (prevents interaction)'
    },
    icon: {
      control: 'object',
      description: 'Icon props object with value property for the button icon'
    },
    fullHeight: {
      control: 'boolean',
      description: 'Whether the placeholder should take 100% height of its container'
    }
  },
  args: {
    onClick: fn(action('placeholder-clicked'))
  } satisfies Partial<EditableEmptyPlaceholderProps>
} satisfies Meta<typeof EditableEmptyPlaceholder>

export default meta
type Story = StoryObj<typeof meta>

// Default story showing basic usage
export const Default: Story = {
  args: {
    text: 'No content available - Click to add content',
    buttonText: 'Add Content'
  } satisfies Partial<EditableEmptyPlaceholderProps>
}

// Disabled state
export const Disabled: Story = {
  args: {
    text: 'Content is inherited - Cannot modify',
    buttonText: 'Inherited',
    disabled: true,
    icon: { value: 'lock' }
  } satisfies Partial<EditableEmptyPlaceholderProps>,
  parameters: {
    docs: {
      description: {
        story: 'Disabled placeholder showing inherited content state with lock icon.'
      }
    }
  }
}

// Full height variant in a container
export const FullHeight: Story = {
  args: {
    text: 'No video content available - Click to add a video',
    buttonText: 'Add Video',
    icon: { value: 'video' },
    fullHeight: true
  } satisfies Partial<EditableEmptyPlaceholderProps>,
  parameters: {
    docs: {
      description: {
        story: 'Full height placeholder that expands to fill its container, used by video editables and other content areas that need to match their container dimensions. The dashed blue border represents the wrapper container.'
      }
    }
  },
  decorators: [
    (Story) => (
      <div style={ { position: 'relative' } }>
        {/* Wrapper container visualization */}
        <div style={ {
          width: '320px',
          height: '240px',
          border: '2px dashed #1890ff',
          borderRadius: '8px',
          position: 'relative'
        } }
        >
          <Story />
          {/* Label to indicate this is the wrapper */}
          <div style={ {
            position: 'absolute',
            top: '-12px',
            left: '8px',
            backgroundColor: '#1890ff',
            color: 'white',
            padding: '1px 6px',
            fontSize: '10px',
            borderRadius: '3px',
            fontWeight: 'bold'
          } }
          >
            Wrapper Container
          </div>
        </div>
      </div>
    )
  ]
}

// Different icon variations
export const IconVariations: Story = {
  args: {
    text: 'Icon variations',
    buttonText: 'Click me',
    onClick: fn(action('icon-variation-clicked'))
  } satisfies Partial<EditableEmptyPlaceholderProps>,
  render: () => (
    <div style={ { display: 'flex', gap: '16px', flexWrap: 'wrap' } }>
      <EditableEmptyPlaceholder
        buttonText="Add Document"
        icon={ { value: 'document' } }
        onClick={ action('document-clicked') }
        text="Document placeholder"
      />
      <EditableEmptyPlaceholder
        buttonText="Add Asset"
        icon={ { value: 'asset' } }
        onClick={ action('asset-clicked') }
        text="Asset placeholder"
      />
      <EditableEmptyPlaceholder
        buttonText="Add Audio"
        icon={ { value: 'audio' } }
        onClick={ action('audio-clicked') }
        text="Audio placeholder"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Various icon options for different content types.'
      }
    }
  }
}

// Long text content
export const LongText: Story = {
  args: {
    text: 'This is a very long placeholder text that demonstrates how the component handles longer descriptive content that might wrap to multiple lines',
    buttonText: 'Add Complex Content',
    icon: { value: 'add-something' }
  } satisfies Partial<EditableEmptyPlaceholderProps>,
  decorators: [
    (Story) => (
      <div style={ { width: '300px' } }>
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Placeholder with longer text content to test text wrapping behavior.'
      }
    }
  }
}

// Interactive example
export const Interactive: Story = {
  args: {
    text: 'Click me to see the interaction!',
    buttonText: 'Click Here',
    icon: { value: 'checkmark' },
    onClick: fn(() => {
      alert('Placeholder was clicked! This demonstrates the onClick interaction.')
    })
  } satisfies Partial<EditableEmptyPlaceholderProps>,
  parameters: {
    docs: {
      description: {
        story: 'Interactive placeholder that demonstrates the click behavior and hover states with an alert popup.'
      }
    }
  }
}
