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
import React, { useState } from 'react'
import { Form } from '../../form'
import { Block } from '../../../block/block'
import { Input, InputNumber, Select } from 'antd'
import { Button } from '../../../button/button'
import { TextArea } from '../../../textarea/textarea'

const config: Meta<typeof Block> = {
  title: 'Components/Data Entry/Form/Controls/Block',
  component: Block,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Block** is a high-level form component built on top of NumberedList that provides a rich interface for managing repeatable content sections.

The Block component is designed for content management scenarios where users need to create, edit, and organize structured content blocks. It provides:

- **Visual Interface**: Bordered sections with collapsible headers and titles
- **Built-in Controls**: Toolbar with add, remove, and reorder operations
- **Form Integration**: Seamless integration with Pimcore Form system
- **Flexible Content**: Support for any form fields within each block
- **Accessibility**: Proper ARIA support and keyboard navigation

**Key Features:**
- Add/remove blocks with visual feedback
- Drag-free reordering with up/down arrows  
- Collapsible sections to save screen space
- Maximum item limits and permission controls
- Rich form field support within each block

**Use Cases:**
- Content management systems (page sections, articles)
- Product catalogs (features, specifications)
- FAQ sections (question/answer pairs)
- Step-by-step guides (instructions, tutorials)
- Any structured, repeatable content

**Built on NumberedList:** Block extends the core NumberedList functionality with enhanced UX and visual design suitable for end-user interfaces.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title displayed in the block header'
    },
    border: {
      control: 'boolean',
      description: 'Whether to show a border around the block'
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether the block can be collapsed'
    },
    collapsed: {
      control: 'boolean',
      description: 'Initial collapsed state (requires collapsible: true)'
    },
    maxItems: {
      control: 'number',
      description: 'Maximum number of items allowed'
    },
    disallowAddRemove: {
      control: 'boolean',
      description: 'Disable add/remove operations'
    },
    disallowReorder: {
      control: 'boolean',
      description: 'Disable reorder operations'
    },
    noteditable: {
      control: 'boolean',
      description: 'Make the entire block read-only'
    }
  }
}

export default config
type Story = StoryObj<typeof config>

// Basic Content Blocks Example
interface ContentBlock {
  title: string
  content: string
  type: string
}

interface ContentFormValues {
  sections: ContentBlock[]
}

const ContentBlocksComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState<ContentFormValues>({
    sections: [
      { title: 'Introduction', content: 'Welcome to our comprehensive guide...', type: 'intro' },
      { title: 'Getting Started', content: 'Follow these steps to begin...', type: 'guide' }
    ]
  })

  const onValuesChange = (changedValues: Partial<ContentFormValues>, allValues: ContentFormValues): void => {
    console.log('Content blocks changed:', { changedValues, allValues })
    setFormValues(allValues)
  }

  return (
    <div style={ { maxWidth: '900px', padding: '20px' } }>
      <h3>Content Management Blocks</h3>
      <div style={ { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' } }>
        <div>
          <Form
            form={ form }
            initialValues={ formValues }
            layout="vertical"
            onFinish={ (values) => { console.log('Content form submitted:', values) } }
            onValuesChange={ onValuesChange }
          >
            <Form.Item
              label="Page Sections"
              name="sections"
            >
              <Block 
                title="Content Sections"
                border
                collapsible
              >
                <Form.Item
                  label="Section Title"
                  name="title"
                  rules={[{ required: true, message: 'Title is required' }]}
                >
                  <Input placeholder="Enter section title" />
                </Form.Item>

                <Form.Item
                  label="Content Type"
                  name="type"
                >
                  <Select
                    options={ [
                      { label: 'Introduction', value: 'intro' },
                      { label: 'Guide/Tutorial', value: 'guide' },
                      { label: 'Feature Highlight', value: 'feature' },
                      { label: 'FAQ Item', value: 'faq' },
                      { label: 'Code Example', value: 'code' }
                    ] }
                    placeholder="Select content type"
                  />
                </Form.Item>

                <Form.Item
                  label="Content"
                  name="content"
                  rules={[{ required: true, message: 'Content is required' }]}
                >
                  <TextArea 
                    placeholder="Enter section content..."
                    rows={ 4 }
                  />
                </Form.Item>
              </Block>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
              >
                Save Content
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div>
          <h4>Live Preview:</h4>
          <div style={ {
            background: '#f5f5f5',
            padding: '16px',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '11px',
            whiteSpace: 'pre-wrap',
            maxHeight: '400px',
            overflowY: 'auto'
          } }
          >
            {JSON.stringify(formValues, null, 2)}
          </div>
          <div style={ { marginTop: '12px', fontSize: '12px', color: '#666' } }>
            <strong>Sections:</strong> {formValues.sections.length}
          </div>
        </div>
      </div>
    </div>
  )
}

export const ContentManagement: Story = {
  render: () => <ContentBlocksComponent />
}

// Product Catalog Example
interface ProductFeature {
  name: string
  description: string
  priority: number
  category: string
}

interface ProductFormValues {
  features: ProductFeature[]
}

const ProductCatalogComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState<ProductFormValues>({
    features: [
      { name: 'High Performance', description: 'Lightning-fast processing with optimized algorithms', priority: 1, category: 'performance' },
      { name: 'Easy Integration', description: 'Simple API with comprehensive documentation', priority: 2, category: 'developer' },
      { name: 'Security First', description: 'Enterprise-grade security with end-to-end encryption', priority: 1, category: 'security' }
    ]
  })

  const onValuesChange = (changedValues: Partial<ProductFormValues>, allValues: ProductFormValues): void => {
    setFormValues(allValues)
  }

  return (
    <div style={ { maxWidth: '900px', padding: '20px' } }>
      <h3>Product Feature Catalog</h3>
      <div style={ { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' } }>
        <div>
          <Form
            form={ form }
            initialValues={ formValues }
            layout="vertical"
            onValuesChange={ onValuesChange }
          >
            <Form.Item
              label="Product Features"
              name="features"
            >
              <Block 
                title="Feature List"
                border
                collapsible
              >
                <Form.Item
                  label="Feature Name"
                  name="name"
                  rules={[{ required: true, message: 'Feature name is required' }]}
                >
                  <Input placeholder="Enter feature name" />
                </Form.Item>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <Form.Item
                    label="Priority"
                    name="priority"
                  >
                    <Select
                      options={ [
                        { label: 'High Priority', value: 1 },
                        { label: 'Medium Priority', value: 2 },
                        { label: 'Low Priority', value: 3 }
                      ] }
                      placeholder="Select priority"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Category"
                    name="category"
                  >
                    <Select
                      options={ [
                        { label: 'Performance', value: 'performance' },
                        { label: 'Developer Experience', value: 'developer' },
                        { label: 'Security', value: 'security' },
                        { label: 'User Interface', value: 'ui' },
                        { label: 'Integration', value: 'integration' }
                      ] }
                      placeholder="Select category"
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  label="Description"
                  name="description"
                  rules={[{ required: true, message: 'Description is required' }]}
                >
                  <TextArea 
                    placeholder="Describe this feature in detail..."
                    rows={ 3 }
                  />
                </Form.Item>
              </Block>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
              >
                Save Product Features
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div>
          <h4>Feature Summary:</h4>
          <div style={ { marginBottom: '16px' } }>
            {formValues.features.map((feature, index) => (
              <div key={index} style={ {
                background: 'white',
                border: '1px solid #e8e8e8',
                borderRadius: '6px',
                padding: '12px',
                marginBottom: '8px'
              } }>
                <strong>{feature.name}</strong>
                <div style={ { fontSize: '12px', color: '#666', marginTop: '4px' } }>
                  Priority: {feature.priority} | Category: {feature.category}
                </div>
                <div style={ { fontSize: '12px', marginTop: '6px' } }>
                  {feature.description?.substring(0, 100)}
                  {feature.description?.length > 100 ? '...' : ''}
                </div>
              </div>
            ))}
          </div>
          <div style={ { fontSize: '12px', color: '#666' } }>
            Total Features: {formValues.features.length}
          </div>
        </div>
      </div>
    </div>
  )
}

export const ProductCatalog: Story = {
  render: () => <ProductCatalogComponent />
}

// Configuration Options Example
interface ConfigItem {
  key: string
  value: string
  type: string
  required: boolean
}

interface ConfigFormValues {
  settings: ConfigItem[]
}

const ConfigurationComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState<ConfigFormValues>({
    settings: [
      { key: 'api_endpoint', value: 'https://api.example.com', type: 'url', required: true },
      { key: 'timeout_seconds', value: '30', type: 'number', required: false }
    ]
  })

  return (
    <div style={ { maxWidth: '800px', padding: '20px' } }>
      <h3>Configuration Block Options</h3>
      <Form
        form={ form }
        initialValues={ formValues }
        layout="vertical"
        onValuesChange={ (_, allValues) => { setFormValues(allValues) } }
      >
        <div style={ { display: 'grid', gap: '20px' } }>
          {/* Limited Items Example */}
          <Form.Item
            label="Limited Settings (Max 3)"
            name="settings"
          >
            <Block 
              title="API Configuration"
              border
              maxItems={3}
              collapsible
              collapsed={false}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <Form.Item
                  label="Config Key"
                  name="key"
                  rules={[{ required: true, message: 'Key is required' }]}
                >
                  <Input placeholder="e.g. api_endpoint" />
                </Form.Item>

                <Form.Item
                  label="Data Type"
                  name="type"
                >
                  <Select
                    options={ [
                      { label: 'String', value: 'string' },
                      { label: 'Number', value: 'number' },
                      { label: 'Boolean', value: 'boolean' },
                      { label: 'URL', value: 'url' },
                      { label: 'Email', value: 'email' }
                    ] }
                    placeholder="Select type"
                  />
                </Form.Item>
              </div>

              <Form.Item
                label="Value"
                name="value"
                rules={[{ required: true, message: 'Value is required' }]}
              >
                <Input placeholder="Enter configuration value" />
              </Form.Item>

              <Form.Item
                label="Required Setting"
                name="required"
              >
                <Select
                  options={ [
                    { label: 'Optional', value: false },
                    { label: 'Required', value: true }
                  ] }
                />
              </Form.Item>
            </Block>
          </Form.Item>
        </div>
      </Form>

      <div style={ { marginTop: '20px', padding: '16px', background: '#f9f9f9', borderRadius: '6px' } }>
        <h4>Block Configuration:</h4>
        <ul style={ { fontSize: '12px', color: '#666', margin: '8px 0', paddingLeft: '20px' } }>
          <li><strong>maxItems={3}</strong> - Limits the number of configuration items</li>
          <li><strong>collapsible={true}</strong> - Allows the section to be collapsed</li>
          <li><strong>border={true}</strong> - Shows a border around the block</li>
          <li><strong>title="API Configuration"</strong> - Sets the header title</li>
        </ul>
      </div>
    </div>
  )
}

export const ConfigurationOptions: Story = {
  render: () => <ConfigurationComponent />
}

// Read-only and Restricted Example
interface TaskItem {
  title: string
  status: string
  assignee: string
  dueDate: string
}

interface RestrictedFormValues {
  completedTasks: TaskItem[]
  activeTasks: TaskItem[]
}

const RestrictedBlocksComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState<RestrictedFormValues>({
    completedTasks: [
      { title: 'Setup Development Environment', status: 'completed', assignee: 'John Doe', dueDate: '2024-01-15' },
      { title: 'Write Unit Tests', status: 'completed', assignee: 'Jane Smith', dueDate: '2024-01-18' }
    ],
    activeTasks: [
      { title: 'Code Review', status: 'in-progress', assignee: 'Bob Johnson', dueDate: '2024-01-25' },
      { title: 'Deploy to Staging', status: 'pending', assignee: 'Alice Brown', dueDate: '2024-01-28' }
    ]
  })

  return (
    <div style={ { maxWidth: '800px', padding: '20px' } }>
      <h3>Restricted Block Examples</h3>
      <Form
        form={ form }
        initialValues={ formValues }
        layout="vertical"
        onValuesChange={ (_, allValues) => { setFormValues(allValues) } }
      >
        <div style={ { display: 'grid', gap: '24px' } }>
          {/* Read-only Block */}
          <Form.Item
            label="Completed Tasks (Read-only)"
            name="completedTasks"
          >
            <Block 
              title="Completed Tasks"
              border
              noteditable={true}
              collapsible
            >
              <Form.Item
                label="Task Title"
                name="title"
              >
                <Input disabled />
              </Form.Item>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <Form.Item
                  label="Assignee"
                  name="assignee"
                >
                  <Input disabled />
                </Form.Item>

                <Form.Item
                  label="Due Date"
                  name="dueDate"
                >
                  <Input disabled />
                </Form.Item>
              </div>
            </Block>
          </Form.Item>

          {/* Fixed Items Block */}
          <Form.Item
            label="Active Tasks (Fixed Items)"
            name="activeTasks"
          >
            <Block 
              title="Active Tasks"
              border
              disallowAddRemove={true}
              disallowReorder={true}
              collapsible
            >
              <Form.Item
                label="Task Title"
                name="title"
              >
                <Input placeholder="Enter task title" />
              </Form.Item>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <Form.Item
                  label="Status"
                  name="status"
                >
                  <Select
                    options={ [
                      { label: 'Pending', value: 'pending' },
                      { label: 'In Progress', value: 'in-progress' },
                      { label: 'Review', value: 'review' },
                      { label: 'Completed', value: 'completed' }
                    ] }
                  />
                </Form.Item>

                <Form.Item
                  label="Assignee"
                  name="assignee"
                >
                  <Select
                    options={ [
                      { label: 'John Doe', value: 'John Doe' },
                      { label: 'Jane Smith', value: 'Jane Smith' },
                      { label: 'Bob Johnson', value: 'Bob Johnson' },
                      { label: 'Alice Brown', value: 'Alice Brown' }
                    ] }
                  />
                </Form.Item>
              </div>

              <Form.Item
                label="Due Date"
                name="dueDate"
              >
                <Input type="date" />
              </Form.Item>
            </Block>
          </Form.Item>
        </div>
      </Form>

      <div style={ { marginTop: '20px', padding: '16px', background: '#fff3cd', borderRadius: '6px', border: '1px solid #ffeaa7' } }>
        <h4>Restriction Examples:</h4>
        <ul style={ { fontSize: '12px', margin: '8px 0', paddingLeft: '20px' } }>
          <li><strong>noteditable={true}</strong> - Makes the entire block read-only (no toolbar, disabled fields)</li>
          <li><strong>disallowAddRemove={true}</strong> - Disables add/remove operations (fixed number of items)</li>
          <li><strong>disallowReorder={true}</strong> - Disables reordering operations (fixed order)</li>
        </ul>
      </div>
    </div>
  )
}

export const RestrictedBlocks: Story = {
  render: () => <RestrictedBlocksComponent />
}
