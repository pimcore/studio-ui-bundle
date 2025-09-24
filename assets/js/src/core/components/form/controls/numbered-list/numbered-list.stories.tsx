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
import { NumberedList } from './numbered-list'
import { Input, InputNumber, Select } from 'antd'
import { Button } from '../../../button/button'

const config: Meta<typeof NumberedList> = {
  title: 'Components/Data Entry/Form/Controls/Composite/NumberedList',
  component: NumberedList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**NumberedList** is a low-level form component that helps create complex data structures with array-based forms.

It provides a way to manage dynamic arrays of form data where each item has a numeric index. This component is particularly useful for:

- Building complex forms with repeating sections
- Managing ordered lists of structured data
- Creating dynamic form fields that can be added/removed
- Handling nested form data structures

The component integrates seamlessly with the Pimcore Form system and provides callbacks for field changes, making it suitable for building higher-level form components and data entry interfaces.

**Note**: This is a foundational component - most users will interact with higher-level components built on top of NumberedList rather than using it directly.
        `
      }
    }
  },
  tags: ['autodocs']
}

export default config
type Story = StoryObj<typeof config>

// Basic numbered list example
interface BasicItem {
  name: string
  quantity: number
}

interface BasicFormValues {
  items: BasicItem[]
}

const BasicExampleComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState<BasicFormValues>({
    items: [
      { name: 'Item 1', quantity: 5 },
      { name: 'Item 2', quantity: 10 }
    ]
  })

  const onFinish = (values: BasicFormValues): void => {
    console.log('Form values:', values)
  }

  const onValuesChange = (changedValues: Partial<BasicFormValues>, allValues: BasicFormValues): void => {
    console.log('Values changed:', { changedValues, allValues })
    setFormValues(allValues)
  }

  return (
    <div style={ { maxWidth: '800px', padding: '20px' } }>
      <h3>Basic NumberedList Example</h3>
      <div style={ { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' } }>
        <div>
          <Form
            form={ form }
            initialValues={ formValues }
            layout="vertical"
            onFinish={ onFinish }
            onValuesChange={ onValuesChange }
          >
            <Form.Item
              label="Items List"
              name="items"
            >
              <NumberedList>
                <NumberedList.Iterator>
                  <Form.Item
                    label="Item Name"
                    name="name"
                  >
                    <Input placeholder="Enter item name" />
                  </Form.Item>

                  <Form.Item
                    label="Quantity"
                    name="quantity"
                  >
                    <InputNumber
                      min={ 1 }
                      placeholder="Enter quantity"
                      style={ { width: '100%' } }
                    />
                  </Form.Item>
                </NumberedList.Iterator>
              </NumberedList>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
              >
                Submit Form
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div>
          <h4>Current Form Values:</h4>
          <div style={ {
            background: '#f5f5f5',
            padding: '16px',
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '12px',
            whiteSpace: 'pre-wrap'
          } }
          >
            {JSON.stringify(formValues, null, 2)}
          </div>
        </div>
      </div>
    </div>
  )
}

export const BasicExample: Story = {
  render: () => <BasicExampleComponent />
}

// Advanced example with nested fields
interface AdvancedProduct {
  product: string
  category: string
  details: {
    price: number
    description: string
  }
}

interface AdvancedFormValues {
  products: AdvancedProduct[]
}

const AdvancedExampleComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState<AdvancedFormValues>({
    products: [
      {
        product: 'Laptop',
        category: 'electronics',
        details: {
          price: 999,
          description: 'High-performance laptop'
        }
      },
      {
        product: 'Book',
        category: 'books',
        details: {
          price: 25,
          description: 'Programming guide'
        }
      }
    ]
  })

  const onValuesChange = (changedValues: Partial<AdvancedFormValues>, allValues: AdvancedFormValues): void => {
    console.log('Advanced values changed:', { changedValues, allValues })
    setFormValues(allValues)
  }

  return (
    <div style={ { maxWidth: '1000px', padding: '20px' } }>
      <h3>Advanced NumberedList with Nested Fields</h3>
      <div style={ { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' } }>
        <div>
          <Form
            form={ form }
            initialValues={ formValues }
            layout="vertical"
            onFinish={ (values) => { console.log('Advanced form values:', values) } }
            onValuesChange={ onValuesChange }
          >
            <Form.Item
              label="Product Catalog"
              name="products"
            >
              <NumberedList>
                <NumberedList.Iterator>
                  <Form.Item
                    label="Product Name"
                    name="product"
                  >
                    <Input placeholder="Enter product name" />
                  </Form.Item>

                  <Form.Item
                    label="Category"
                    name="category"
                  >
                    <Select
                      options={ [
                        { label: 'Electronics', value: 'electronics' },
                        { label: 'Books', value: 'books' },
                        { label: 'Clothing', value: 'clothing' },
                        { label: 'Home & Garden', value: 'home' },
                        { label: 'Sports', value: 'sports' }
                      ] }
                      placeholder="Select category"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Price ($)"
                    name={ ['details', 'price'] }
                  >
                    <InputNumber
                      min={ 0 }
                      placeholder="0.00"
                      precision={ 2 }
                      style={ { width: '100%' } }
                    />
                  </Form.Item>

                  <Form.Item
                    label="Description"
                    name={ ['details', 'description'] }
                  >
                    <Input.TextArea
                      placeholder="Enter product description..."
                      rows={ 2 }
                    />
                  </Form.Item>
                </NumberedList.Iterator>
              </NumberedList>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
              >
                Save Product Catalog
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div>
          <h4>Current Form Values:</h4>
          <div style={ {
            background: '#f5f5f5',
            padding: '16px',
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '11px',
            whiteSpace: 'pre-wrap',
            maxHeight: '500px',
            overflowY: 'auto'
          } }
          >
            {JSON.stringify(formValues, null, 2)}
          </div>
        </div>
      </div>
    </div>
  )
}

export const AdvancedExample: Story = {
  render: () => <AdvancedExampleComponent />
}

// Example showing field change handling
interface FieldChange {
  field: any
  value: any
  timestamp: string
}

interface Task {
  title: string
  priority: string
  completed: boolean
}

interface TaskFormValues {
  tasks: Task[]
}

const FieldChangeHandlingComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const [fieldChanges, setFieldChanges] = useState<FieldChange[]>([])
  const [formValues, setFormValues] = useState<TaskFormValues>({
    tasks: [
      { title: 'Review code', priority: 'high', completed: false },
      { title: 'Write tests', priority: 'medium', completed: true }
    ]
  })

  const handleFieldChange = (field: any, value: any): void => {
    const change: FieldChange = { field, value, timestamp: new Date().toISOString() }
    setFieldChanges(prev => [change, ...prev].slice(0, 10)) // Keep last 10 changes
  }

  const onValuesChange = (changedValues: Partial<TaskFormValues>, allValues: TaskFormValues): void => {
    setFormValues(allValues)
  }

  return (
    <div style={ { maxWidth: '1000px', padding: '20px' } }>
      <h3>NumberedList with Field Change Tracking</h3>
      <div style={ { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' } }>
        <div>
          <h4>Form</h4>
          <Form
            form={ form }
            initialValues={ formValues }
            layout="vertical"
            onValuesChange={ onValuesChange }
          >
            <Form.Item
              label="Task List"
              name="tasks"
            >
              <NumberedList onFieldChange={ handleFieldChange }>
                <NumberedList.Iterator>
                  <Form.Item
                    label="Task Title"
                    name="title"
                    style={ { marginBottom: '12px' } }
                  >
                    <Input placeholder="Enter task title" />
                  </Form.Item>

                  <Form.Item
                    label="Priority"
                    name="priority"
                    style={ { marginBottom: '12px' } }
                  >
                    <Select
                      options={ [
                        { label: 'Low', value: 'low' },
                        { label: 'Medium', value: 'medium' },
                        { label: 'High', value: 'high' }
                      ] }
                    />
                  </Form.Item>

                  <Form.Item
                    label="Completed"
                    name="completed"
                    style={ { marginBottom: '16px' } }
                  >
                    <Select
                      options={ [
                        { label: 'Not completed', value: false },
                        { label: 'Completed', value: true }
                      ] }
                    />
                  </Form.Item>
                </NumberedList.Iterator>
              </NumberedList>
            </Form.Item>
          </Form>
        </div>

        <div>
          <h4>Current Form Values:</h4>
          <div style={ {
            background: '#f5f5f5',
            padding: '12px',
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '11px',
            whiteSpace: 'pre-wrap',
            maxHeight: '400px',
            overflowY: 'auto'
          } }
          >
            {JSON.stringify(formValues, null, 2)}
          </div>
        </div>

        <div>
          <h4>Recent Field Changes:</h4>
          <div style={ {
            background: '#f9f9f9',
            padding: '12px',
            borderRadius: '6px',
            maxHeight: '400px',
            overflowY: 'auto'
          } }
          >
            {fieldChanges.length === 0
              ? (
                <p style={ { color: '#666', margin: 0, fontSize: '12px' } }>No changes yet. Start editing the form!</p>
                )
              : (
                  fieldChanges.map((change) => (
                    <div
                      key={ change.timestamp }
                      style={ {
                        marginBottom: '8px',
                        padding: '8px',
                        background: 'white',
                        borderRadius: '4px',
                        fontSize: '11px'
                      } }
                    >
                      <strong>Field:</strong> {JSON.stringify(change.field)}<br />
                      <strong>Value:</strong> {JSON.stringify(change.value)}<br />
                      <strong>Time:</strong> {new Date(change.timestamp).toLocaleTimeString()}
                    </div>
                  ))
                )}
          </div>
        </div>
      </div>
    </div>
  )
}

export const FieldChangeHandling: Story = {
  render: () => <FieldChangeHandlingComponent />
}

// Components for SimpleOperations example
interface ItemsWithControlsProps {
  formValues: any
  form: any
  setFormValues: (values: any) => void
}

const ItemsWithControls = ({ formValues, form, setFormValues }: ItemsWithControlsProps): React.JSX.Element => {
  return (
    <NumberedList
      onChange={ (newValue) => {
        const updatedValues = { ...formValues, items: newValue }
        setFormValues(updatedValues)
        form.setFieldsValue(updatedValues)
      } }
      value={ formValues.items }
    >
      <div style={ { marginBottom: '16px' } }>
        <Button
          onClick={ () => {
            const newValues = [...formValues.items, { name: 'New Item', value: 'new' }]
            const updatedValues = { ...formValues, items: newValues }
            form.setFieldsValue(updatedValues)
            setFormValues(updatedValues)
          } }
          style={ { marginRight: '8px' } }
          type="dashed"
        >
          Add Item
        </Button>
        <Button
          disabled={ formValues.items.length === 0 }
          onClick={ () => {
            if (formValues.items.length > 0) {
              const newValues = formValues.items.slice(0, -1)
              const updatedValues = { ...formValues, items: newValues }
              form.setFieldsValue(updatedValues)
              setFormValues(updatedValues)
            }
          } }
        >
          Remove Last Item
        </Button>
      </div>

      <NumberedList.Iterator>
        <Form.Item
          label="Name"
          name="name"
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          label="Value"
          name="value"
        >
          <Input placeholder="Enter value" />
        </Form.Item>
      </NumberedList.Iterator>
    </NumberedList>
  )
}

// Simple Operations Example
interface SimpleItem {
  name: string
  value: string
}

interface SimpleFormValues {
  items: SimpleItem[]
}

const SimpleOperationsComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState<SimpleFormValues>({
    items: [
      { name: 'First Item', value: 'item1' },
      { name: 'Second Item', value: 'item2' }
    ]
  })

  const onValuesChange = (changedValues: Partial<SimpleFormValues>, allValues: SimpleFormValues): void => {
    setFormValues(allValues)
  }

  return (
    <div style={ { maxWidth: '800px', padding: '20px' } }>
      <h3>Simple Operations Example</h3>
      <p style={ { marginBottom: '20px', color: '#666' } }>
        This example shows how to add/remove items programmatically.
        Use the buttons above the list to add or remove items.
      </p>
      <div style={ { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' } }>
        <div>
          <Form
            form={ form }
            initialValues={ formValues }
            layout="vertical"
            onFinish={ (values) => { console.log('Form submitted:', values) } }
            onValuesChange={ onValuesChange }
          >
            <Form.Item
              label="Items List"
              name="items"
            >
              <ItemsWithControls
                form={ form }
                formValues={ formValues }
                setFormValues={ setFormValues }
              />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
              >
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div>
          <h4>Current Form Values:</h4>
          <div style={ {
            background: '#f5f5f5',
            padding: '16px',
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '12px',
            whiteSpace: 'pre-wrap'
          } }
          >
            {JSON.stringify(formValues, null, 2)}
          </div>
          <p style={ { fontSize: '12px', color: '#666', marginTop: '8px' } }>
            Items: {formValues.items.length}
          </p>
        </div>
      </div>
    </div>
  )
}

export const SimpleOperations: Story = {
  render: () => <SimpleOperationsComponent />
}
