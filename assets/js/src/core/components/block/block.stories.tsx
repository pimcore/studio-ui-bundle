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
import { Block } from './block'
import React from 'react'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { Text } from '@Pimcore/components/text/text'

const meta: Meta<typeof Block> = {
  title: 'Components/Data Display/Block',
  component: Block,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'undefined' }
      }
    },
    collapsed: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' }
      }
    },
    collapsible: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' }
      }
    },
    disallowReorder: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' }
      }
    },
    disallowAddRemove: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' }
      }
    },
    maxItems: {
      control: 'number',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' }
      }
    },
    title: {
      control: 'text',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'undefined' }
      }
    },
    border: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' }
      }
    },
    noteditable: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' }
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Wrapper component to provide Form context
const BlockWrapper = (props: any): React.JSX.Element => {
  return (
    <div style={{ width: '600px' }}>
      <Form>
        <Form.Item name="block">
          <Block {...props} />
        </Form.Item>
      </Form>
    </div>
  )
}

export const Default: Story = {
  args: {
    title: 'Block Component',
    children: (
      <>
        <Form.Item
          label="Item Name"
          name="name"
        >
          <Input placeholder="Enter item name" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
        >
          <Input placeholder="Enter description" />
        </Form.Item>
      </>
    ),
    value: [{ name: 'Item 1', description: 'First item' }, { name: 'Item 2', description: 'Second item' }]
  },
  render: (args) => <BlockWrapper {...args} />
}

export const WithTitle: Story = {
  args: {
    title: 'Content Block',
    border: true,
    children: (
      <>
        <Form.Item
          label="Title"
          name="title"
        >
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
        >
          <TextArea placeholder="Enter content" rows={3} />
        </Form.Item>
      </>
    ),
    value: [{ title: 'Sample Title', content: 'Sample content text' }]
  },
  render: (args) => <BlockWrapper {...args} />
}

export const Collapsible: Story = {
  args: {
    title: 'Collapsible Block',
    collapsible: true,
    collapsed: false,
    border: true,
    children: (
      <>
        <Form.Item
          label="Section Title"
          name="sectionTitle"
        >
          <Input placeholder="Enter section title" />
        </Form.Item>
        <Form.Item
          label="Section Content"
          name="sectionContent"
        >
          <TextArea placeholder="Enter section content" rows={2} />
        </Form.Item>
      </>
    ),
    value: [{ sectionTitle: 'Introduction', sectionContent: 'This is the introduction section' }]
  },
  render: (args) => <BlockWrapper {...args} />
}

export const WithMaxItems: Story = {
  args: {
    title: 'Limited Block (Max 3 items)',
    maxItems: 3,
    border: true,
    children: (
      <>
        <Form.Item
          label="Task Name"
          name="taskName"
        >
          <Input placeholder="Enter task name" />
        </Form.Item>
        <Form.Item
          label="Priority"
          name="priority"
        >
          <Input placeholder="Enter priority" />
        </Form.Item>
      </>
    ),
    value: [
      { taskName: 'Task 1', priority: 'High' }, 
      { taskName: 'Task 2', priority: 'Medium' }
    ]
  },
  render: (args) => <BlockWrapper {...args} />
}

export const NotEditable: Story = {
  args: {
    title: 'Read-only Block',
    noteditable: true,
    border: true,
    children: (
      <>
        <Form.Item
          label="Read-only Field"
          name="readOnlyField"
        >
          <Input placeholder="This is read-only" disabled />
        </Form.Item>
        <Form.Item
          label="Another Field"
          name="anotherField"
        >
          <Input placeholder="Also read-only" disabled />
        </Form.Item>
      </>
    ),
    value: [
      { readOnlyField: 'Static content 1', anotherField: 'Value 1' }, 
      { readOnlyField: 'Static content 2', anotherField: 'Value 2' }
    ]
  },
  render: (args) => <BlockWrapper {...args} />
}

export const DisallowReorder: Story = {
  args: {
    title: 'No Reordering',
    disallowReorder: true,
    border: true,
    children: (
      <>
        <Form.Item
          label="Fixed Position Item"
          name="fixedItem"
        >
          <Input placeholder="This item cannot be reordered" />
        </Form.Item>
        <Form.Item
          label="Order Number"
          name="orderNumber"
        >
          <Input placeholder="Position is fixed" />
        </Form.Item>
      </>
    ),
    value: [
      { fixedItem: 'First item', orderNumber: '1' }, 
      { fixedItem: 'Second item', orderNumber: '2' }, 
      { fixedItem: 'Third item', orderNumber: '3' }
    ]
  },
  render: (args) => <BlockWrapper {...args} />
}

export const DisallowAddRemove: Story = {
  args: {
    title: 'Fixed Items',
    disallowAddRemove: true,
    border: true,
    children: (
      <>
        <Form.Item
          label="Fixed Item Name"
          name="fixedItemName"
        >
          <Input placeholder="Cannot add or remove items" />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
        >
          <Input placeholder="Item status" />
        </Form.Item>
      </>
    ),
    value: [
      { fixedItemName: 'Permanent Item 1', status: 'Active' }, 
      { fixedItemName: 'Permanent Item 2', status: 'Inactive' }
    ]
  },
  render: (args) => <BlockWrapper {...args} />
}
