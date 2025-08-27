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
import { Input, Select } from 'antd'
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
- **Dynamic Titles**: Real-time title generation based on current form values
- **Form Integration**: Seamless integration with Pimcore Form system
- **Flexible Content**: Support for any form fields within each block
- **Accessibility**: Proper ARIA support and keyboard navigation

**Key Features:**
- Add/remove blocks with visual feedback
- Drag-free reordering with up/down arrows  
- Dynamic toolbar titles that update with form values
- Collapsible sections to save screen space
- Maximum item limits and permission controls
- Rich form field support within each block

**Dynamic Titles:**
Use the \`getItemTitle\` callback to generate meaningful titles for each block item:
- Titles update in real-time as users type
- Can combine multiple field values
- Provides fallback logic for empty fields
- Improves user experience and content organization

**Use Cases:**
- Content management systems (page sections, articles)
- Product catalogs (features, specifications)
- FAQ sections (question/answer pairs)
- Step-by-step guides (instructions, tutorials)
- Contact directories and team management
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
    },
    getItemTitle: {
      control: false,
      description: 'Callback function to generate dynamic titles for each block item based on current form values. Receives (itemValue, index) and returns ReactNode.'
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
                border
                collapsible
                getItemTitle={ (itemValue, index) => {
                  const title = (itemValue?.title !== null && itemValue?.title !== undefined && itemValue?.title !== '') ? itemValue.title : `Section ${index + 1}`
                  const type = (itemValue?.type !== null && itemValue?.type !== undefined && itemValue?.type !== '') ? ` (${itemValue.type})` : ''
                  return `${title}${type}`
                } }
                title="Content Sections"
              >
                <Form.Item
                  label="Section Title"
                  name="title"
                  rules={ [{ required: true, message: 'Title is required' }] }
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
                  rules={ [{ required: true, message: 'Content is required' }] }
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
                border
                collapsible
                getItemTitle={ (itemValue, index) => {
                  const name = (itemValue?.name !== null && itemValue?.name !== undefined && itemValue?.name !== '') ? itemValue.name : `Feature ${index + 1}`
                  const priority = (itemValue?.priority !== null && itemValue?.priority !== undefined && itemValue?.priority !== '') ? ` • Priority ${itemValue.priority}` : ''
                  return `${name}${priority}`
                } }
                title="Feature List"
              >
                <Form.Item
                  label="Feature Name"
                  name="name"
                  rules={ [{ required: true, message: 'Feature name is required' }] }
                >
                  <Input placeholder="Enter feature name" />
                </Form.Item>

                <div style={ { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' } }>
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
                  rules={ [{ required: true, message: 'Description is required' }] }
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
              <div
                key={ index }
                style={ {
                  background: 'white',
                  border: '1px solid #e8e8e8',
                  borderRadius: '6px',
                  padding: '12px',
                  marginBottom: '8px'
                } }
              >
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
        onValuesChange={ (_, allValues) => { setFormValues(allValues as ConfigFormValues) } }
      >
        <div style={ { display: 'grid', gap: '20px' } }>
          {/* Limited Items Example */}
          <Form.Item
            label="Limited Settings (Max 3)"
            name="settings"
          >
            <Block
              border
              collapsed={ false }
              collapsible
              getItemTitle={ (itemValue, index) => {
                const key = (itemValue?.key !== null && itemValue?.key !== undefined && itemValue?.key !== '') ? itemValue.key : `Setting ${index + 1}`
                const type = (itemValue?.type !== null && itemValue?.type !== undefined && itemValue?.type !== '') ? ` [${itemValue.type}]` : ''
                const required = (itemValue?.required !== null && itemValue?.required !== undefined && itemValue?.required !== '') ? ' *' : ''
                return `${key}${type}${required}`
              } }
              maxItems={ 3 }
              title="API Configuration"
            >
              <div style={ { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' } }>
                <Form.Item
                  label="Config Key"
                  name="key"
                  rules={ [{ required: true, message: 'Key is required' }] }
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
                rules={ [{ required: true, message: 'Value is required' }] }
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
          <li><strong>title=&quot;API Configuration&quot;</strong> - Sets the header title</li>
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
        onValuesChange={ (_, allValues) => { setFormValues(allValues as RestrictedFormValues) } }
      >
        <div style={ { display: 'grid', gap: '24px' } }>
          {/* Read-only Block */}
          <Form.Item
            label="Completed Tasks (Read-only)"
            name="completedTasks"
          >
            <Block
              border
              collapsible
              noteditable
              title="Completed Tasks"
            >
              <Form.Item
                label="Task Title"
                name="title"
              >
                <Input disabled />
              </Form.Item>

              <div style={ { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' } }>
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
              border
              collapsible
              disallowAddRemove
              disallowReorder
              title="Active Tasks"
            >
              <Form.Item
                label="Task Title"
                name="title"
              >
                <Input placeholder="Enter task title" />
              </Form.Item>

              <div style={ { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' } }>
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

// Dynamic Titles Example
interface ContactInfo {
  name: string
  email: string
  phone: string
  department: string
  role: string
}

interface ContactFormValues {
  contacts: ContactInfo[]
}

const DynamicTitlesComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState<ContactFormValues>({
    contacts: [
      { name: 'John Doe', email: 'john.doe@company.com', phone: '+1-555-0123', department: 'Engineering', role: 'Senior Developer' },
      { name: 'Jane Smith', email: 'jane.smith@company.com', phone: '+1-555-0124', department: 'Design', role: 'UX Designer' },
      { name: '', email: '', phone: '', department: 'Sales', role: 'Account Manager' }
    ]
  })

  const onValuesChange = (changedValues: Partial<ContactFormValues>, allValues: ContactFormValues): void => {
    setFormValues(allValues)
  }

  return (
    <div style={ { maxWidth: '1000px', padding: '20px' } }>
      <h3>Dynamic Titles Example</h3>
      <p style={ { marginBottom: '20px', color: '#666' } }>
        This example shows how block titles can be dynamically generated based on the current form values.
        The titles in the toolbar update in real-time as you type.
      </p>
      <div style={ { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' } }>
        <div>
          <Form
            form={ form }
            initialValues={ formValues }
            layout="vertical"
            onFinish={ (values) => { console.log('Contact form submitted:', values) } }
            onValuesChange={ onValuesChange }
          >
            <Form.Item
              label="Team Contacts"
              name="contacts"
            >
              <Block
                border
                collapsible
                getItemTitle={ (itemValue, index) => {
                  // Generate dynamic title based on current form values
                  const name = itemValue?.name?.trim()
                  const department = itemValue?.department
                  const role = itemValue?.role

                  if (name !== null && name !== undefined && name !== '') {
                    // If name is provided, show: "John Doe • Engineering"
                    return (department !== null && department !== undefined && department !== '') ? `${name} • ${department}` : name
                  } else if ((role !== null && role !== undefined && role !== '') || (department !== null && department !== undefined && department !== '')) {
                    // If no name but has role/department: "UX Designer (Design)" or just "Sales"
                    if ((role !== null && role !== undefined && role !== '') && (department !== null && department !== undefined && department !== '')) {
                      return `${role} (${department})`
                    }
                    return (role !== null && role !== undefined && role !== '') ? role : (department ?? '')
                  } else {
                    // Fallback to index-based title
                    return `Contact ${index + 1}`
                  }
                } }
                title="Contact Directory"
              >
                <div style={ { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' } }>
                  <Form.Item
                    label="Full Name"
                    name="name"
                    rules={ [{ required: true, message: 'Name is required' }] }
                  >
                    <Input placeholder="Enter full name" />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={ [
                      { required: true, message: 'Email is required' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ] }
                  >
                    <Input placeholder="Enter email address" />
                  </Form.Item>
                </div>

                <div style={ { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' } }>
                  <Form.Item
                    label="Phone"
                    name="phone"
                  >
                    <Input placeholder="Enter phone number" />
                  </Form.Item>

                  <Form.Item
                    label="Department"
                    name="department"
                  >
                    <Select
                      options={ [
                        { label: 'Engineering', value: 'Engineering' },
                        { label: 'Design', value: 'Design' },
                        { label: 'Product', value: 'Product' },
                        { label: 'Sales', value: 'Sales' },
                        { label: 'Marketing', value: 'Marketing' },
                        { label: 'Support', value: 'Support' }
                      ] }
                      placeholder="Select department"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Role"
                    name="role"
                  >
                    <Input placeholder="Enter job title" />
                  </Form.Item>
                </div>
              </Block>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
              >
                Save Contacts
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div>
          <h4>Live Data:</h4>
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

          <div style={ { marginTop: '16px', padding: '12px', background: '#e8f4fd', borderRadius: '6px', border: '1px solid #91caff' } }>
            <h5 style={ { margin: '0 0 8px 0', fontSize: '13px' } }>Dynamic Title Logic:</h5>
            <ul style={ { fontSize: '11px', margin: '0', paddingLeft: '16px', color: '#666' } }>
              <li><strong>Has name:</strong> &quot;Name • Department&quot;</li>
              <li><strong>No name, has role &amp; dept:</strong> &quot;Role (Department)&quot;</li>
              <li><strong>No name, has role OR dept:</strong> &quot;Role&quot; or &quot;Department&quot;</li>
              <li><strong>Empty fields:</strong> &quot;Contact X&quot; (fallback)</li>
            </ul>
            <p style={ { fontSize: '11px', margin: '8px 0 0 0', color: '#666' } }>
              <strong>Try it:</strong> Clear a name field to see the title change, or modify departments and roles!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const DynamicTitles: Story = {
  render: () => <DynamicTitlesComponent />
}
