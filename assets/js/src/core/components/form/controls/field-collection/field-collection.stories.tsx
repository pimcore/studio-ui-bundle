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
import { FieldCollection } from './field-collection'
import { FieldCollectionRegistry } from './field-collection-registry'
import { Form } from '../../form'
import { Input } from '../../../input/input'
import { TextArea } from '../../../textarea/textarea'
import { InputNumber } from '../../../input-number/input-number'
import { Select } from '../../../select/select'
import { Switch } from '../../../switch/switch'
import { DatePicker } from '../../../date-picker/date-picker'
import { ColorPicker } from '../../../color-picker/color-picker'
import { Content } from '../../../content/content'
import { Panel } from '../../../panel'
import { Button } from '../../../button/button'

const config: Meta<typeof FieldCollection> = {
  title: 'Components/Data Entry/Form/Controls/FieldCollection',
  component: FieldCollection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `The FieldCollection component provides a flexible way to create dynamic collections of different field types. Users can add, remove, and reorder items where each item can have a different type based on a registry system.

**Key Features:**
- **Dynamic field types**: Register different field components that can be used in the collection
- **Type-based rendering**: Each collection item can be a different registered field type
- **Flexible configuration**: Support for disabling reordering, add/remove actions, and setting maximum items
- **Form integration**: Built on top of Form.NumberedList for seamless form integration

**Registry System:**
The component uses a registry pattern where different field types can be registered with their own rendering components. This allows for extensible field collections where new field types can be added without modifying the core component.`
      }
    }
  },
  tags: ['autodocs']
}

export default config
type Story = StoryObj<typeof config>

// Create sample field components for the registry
const TextFieldComponent = (): React.JSX.Element => (
  <Form.Item
    label="Text Value"
    name="text"
    rules={ [{ required: true, message: 'Please enter text' }] }
  >
    <Input placeholder="Enter text..." />
  </Form.Item>
)

const NumberFieldComponent = (): React.JSX.Element => (
  <Form.Item
    label="Number Value"
    name="number"
    rules={ [{ required: true, message: 'Please enter a number' }] }
  >
    <InputNumber
      placeholder="Enter number..."
      style={ { width: '100%' } }
    />
  </Form.Item>
)

const TextAreaFieldComponent = (): React.JSX.Element => (
  <Form.Item
    label="Description"
    name="description"
  >
    <TextArea
      placeholder="Enter description..."
      rows={ 3 }
    />
  </Form.Item>
)

const SelectFieldComponent = (): React.JSX.Element => (
  <Form.Item
    label="Category"
    name="category"
    rules={ [{ required: true, message: 'Please select a category' }] }
  >
    <Select
      options={ [
        { value: 'news', label: 'News' },
        { value: 'blog', label: 'Blog' },
        { value: 'event', label: 'Event' },
        { value: 'announcement', label: 'Announcement' }
      ] }
      placeholder="Select category..."
    />
  </Form.Item>
)

const BooleanFieldComponent = (): React.JSX.Element => (
  <Form.Item
    label="Active Status"
    name="active"
    valuePropName="checked"
  >
    <Switch />
  </Form.Item>
)

const DateFieldComponent = (): React.JSX.Element => (
  <Form.Item
    label="Date"
    name="date"
  >
    <DatePicker
      placeholder="Select date..."
      style={ { width: '100%' } }
    />
  </Form.Item>
)

const ColorFieldComponent = (): React.JSX.Element => (
  <Form.Item
    label="Color"
    name="color"
  >
    <ColorPicker showText />
  </Form.Item>
)

// Complex field component with multiple fields
const PersonFieldComponent = (): React.JSX.Element => (
  <Panel>
    <Form.Item
      label="First Name"
      name="firstName"
      rules={ [{ required: true, message: 'Please enter first name' }] }
    >
      <Input placeholder="Enter first name..." />
    </Form.Item>
    <Form.Item
      label="Last Name"
      name="lastName"
      rules={ [{ required: true, message: 'Please enter last name' }] }
    >
      <Input placeholder="Enter last name..." />
    </Form.Item>
    <Form.Item
      label="Age"
      name="age"
    >
      <InputNumber
        max={ 150 }
        min={ 0 }
        placeholder="Enter age..."
        style={ { width: '100%' } }
      />
    </Form.Item>
    <Form.Item
      label="Email"
      name="email"
      rules={ [
        { type: 'email', message: 'Please enter a valid email' }
      ] }
    >
      <Input placeholder="Enter email..." />
    </Form.Item>
  </Panel>
)

// Product field component with multiple complex fields
const ProductFieldComponent = (): React.JSX.Element => (
  <Panel>
    <Form.Item
      label="Product Name"
      name="name"
      rules={ [{ required: true, message: 'Please enter product name' }] }
    >
      <Input placeholder="Enter product name..." />
    </Form.Item>
    <Form.Item
      label="Description"
      name="description"
    >
      <TextArea
        placeholder="Enter product description..."
        rows={ 2 }
      />
    </Form.Item>
    <Form.Item
      label="Price"
      name="price"
      rules={ [{ required: true, message: 'Please enter price' }] }
    >
      <InputNumber
        formatter={ (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }
        min={ 0 }
        parser={ (value) => value?.replace(/\$\s?|(,*)/g, '') as any }
        placeholder="Enter price..."
        precision={ 2 }
        step={ 0.01 }
        style={ { width: '100%' } }
      />
    </Form.Item>
    <Form.Item
      label="Category"
      name="category"
      rules={ [{ required: true, message: 'Please select category' }] }
    >
      <Select
        options={ [
          { value: 'electronics', label: 'Electronics' },
          { value: 'clothing', label: 'Clothing' },
          { value: 'books', label: 'Books' },
          { value: 'home', label: 'Home & Garden' },
          { value: 'sports', label: 'Sports & Outdoors' }
        ] }
        placeholder="Select category..."
      />
    </Form.Item>
    <Form.Item
      label="In Stock"
      name="inStock"
      valuePropName="checked"
    >
      <Switch />
    </Form.Item>
    <Form.Item
      label="Launch Date"
      name="launchDate"
    >
      <DatePicker
        placeholder="Select launch date..."
        style={ { width: '100%' } }
      />
    </Form.Item>
  </Panel>
)

// Create registry with sample field types
const createSampleRegistry = (): FieldCollectionRegistry => {
  const registry = new FieldCollectionRegistry()

  registry.register({
    type: 'text',
    key: 'text-field',
    translationKey: 'field-collection.types.text',
    component: <TextFieldComponent />
  })

  registry.register({
    type: 'number',
    key: 'number-field',
    translationKey: 'field-collection.types.number',
    component: <NumberFieldComponent />
  })

  registry.register({
    type: 'textarea',
    key: 'textarea-field',
    translationKey: 'field-collection.types.textarea',
    component: <TextAreaFieldComponent />
  })

  registry.register({
    type: 'select',
    key: 'select-field',
    translationKey: 'field-collection.types.select',
    component: <SelectFieldComponent />
  })

  registry.register({
    type: 'boolean',
    key: 'boolean-field',
    translationKey: 'field-collection.types.boolean',
    component: <BooleanFieldComponent />
  })

  registry.register({
    type: 'date',
    key: 'date-field',
    translationKey: 'field-collection.types.date',
    component: <DateFieldComponent />
  })

  registry.register({
    type: 'color',
    key: 'color-field',
    translationKey: 'field-collection.types.color',
    component: <ColorFieldComponent />
  })

  registry.register({
    type: 'person',
    key: 'person-field',
    translationKey: 'field-collection.types.person',
    component: <PersonFieldComponent />
  })

  registry.register({
    type: 'product',
    key: 'product-field',
    translationKey: 'field-collection.types.product',
    component: <ProductFieldComponent />
  })

  return registry
}

interface FieldCollectionExampleProps {
  disallowReorder?: boolean
  disallowAddRemove?: boolean
  maxItems?: number
  initialValue?: any[]
}

const FieldCollectionExample = ({
  disallowReorder = false,
  disallowAddRemove = false,
  maxItems,
  initialValue = []
}: FieldCollectionExampleProps): React.JSX.Element => {
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState({ fieldCollection: initialValue })
  const registry = createSampleRegistry()

  const handleFormSubmit = (values: any): void => {
    console.log('Form submitted with values:', values)
  }

  const handleValuesChange = (changedValues: any, allValues: any): void => {
    console.log('Field collection changed:', allValues.fieldCollection)
    setFormValues(allValues as { fieldCollection: any[] })
  }

  return (
    <Content padded>
      <Form
        form={ form }
        initialValues={ formValues }
        layout="vertical"
        onFinish={ handleFormSubmit }
        onValuesChange={ handleValuesChange }
      >
        <Form.Item
          name="fieldCollection"
        >
          <FieldCollection
            disallowAddRemove={ disallowAddRemove }
            disallowReorder={ disallowReorder }
            maxItems={ maxItems }
            registry={ registry }
            title='Dynamic Field Collection'
          />
        </Form.Item>

        <div style={ { marginTop: '24px' } }>
          <h4>Current Collection Value:</h4>
          <pre style={ {
            backgroundColor: '#f5f5f5',
            padding: '12px',
            borderRadius: '4px',
            fontSize: '12px',
            overflow: 'auto'
          } }
          >
            {JSON.stringify(formValues.fieldCollection ?? [], null, 2)}
          </pre>
        </div>
      </Form>
    </Content>
  )
}

export const Default: Story = {
  render: () => <FieldCollectionExample />,
  parameters: {
    docs: {
      description: {
        story: 'Basic field collection with all field types available. Users can add different types of fields, reorder them, and remove them as needed.'
      }
    }
  }
}

export const WithInitialData: Story = {
  render: () => (
    <FieldCollectionExample
      initialValue={ [
        {
          type: 'text',
          data: {
            text: 'Sample text field'
          }
        },
        {
          type: 'number',
          data: {
            number: 42
          }
        },
        {
          type: 'select',
          data: {
            category: 'news'
          }
        }
      ] }
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field collection with pre-populated data showing different field types with their values.'
      }
    }
  }
}

export const DisallowReorder: Story = {
  render: () => (
    <FieldCollectionExample
      disallowReorder
      initialValue={ [
        {
          type: 'text',
          data: { text: 'First item (cannot be reordered)' }
        },
        {
          type: 'number',
          data: { number: 123 }
        }
      ] }
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field collection with reordering disabled. Items can still be added and removed, but their order is fixed.'
      }
    }
  }
}

export const DisallowAddRemove: Story = {
  render: () => (
    <FieldCollectionExample
      disallowAddRemove
      initialValue={ [
        {
          type: 'text',
          data: { text: 'Fixed item 1' }
        },
        {
          type: 'select',
          data: { category: 'blog' }
        },
        {
          type: 'boolean',
          data: { active: true }
        }
      ] }
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field collection with adding and removing disabled. Items can only be edited and reordered (if reordering is allowed).'
      }
    }
  }
}

export const WithMaxItems: Story = {
  render: () => (
    <FieldCollectionExample
      initialValue={ [
        {
          type: 'text',
          data: { text: 'Item 1 of max 3' }
        },
        {
          type: 'number',
          data: { number: 100 }
        }
      ] }
      maxItems={ 3 }
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field collection with a maximum limit of 3 items. Once the limit is reached, the add button will be disabled.'
      }
    }
  }
}

export const FullyRestricted: Story = {
  render: () => (
    <FieldCollectionExample
      disallowAddRemove
      disallowReorder
      initialValue={ [
        {
          type: 'text',
          data: { text: 'Read-only collection item 1' }
        },
        {
          type: 'textarea',
          data: { description: 'This collection is fully restricted - no add, remove, or reorder' }
        },
        {
          type: 'color',
          data: { color: '#ff6b6b' }
        }
      ] }
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field collection with all restrictions enabled. Items can only be edited in-place, making this effectively a read-only structure with editable content.'
      }
    }
  }
}

// Showcase all field types
export const AllFieldTypes: Story = {
  render: () => (
    <FieldCollectionExample
      initialValue={ [
        {
          type: 'text',
          data: { text: 'Sample text input' }
        },
        {
          type: 'number',
          data: { number: 42 }
        },
        {
          type: 'textarea',
          data: { description: 'This is a longer text description that spans multiple lines and demonstrates the textarea field type.' }
        },
        {
          type: 'select',
          data: { category: 'news' }
        },
        {
          type: 'boolean',
          data: { active: true }
        },
        {
          type: 'date',
          data: { date: '2024-01-15' }
        },
        {
          type: 'color',
          data: { color: '#1677ff' }
        }
      ] }
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all available field types in the registry: text, number, textarea, select, boolean, date, and color fields.'
      }
    }
  }
}

// Complex field types with multiple data fields
export const ComplexFieldTypes: Story = {
  render: () => (
    <FieldCollectionExample
      initialValue={ [
        {
          type: 'person',
          data: {
            firstName: 'John',
            lastName: 'Doe',
            age: 30,
            email: 'john.doe@example.com'
          }
        },
        {
          type: 'product',
          data: {
            name: 'Wireless Headphones',
            description: 'High-quality wireless headphones with noise cancellation',
            price: 199.99,
            category: 'electronics',
            inStock: true,
            launchDate: '2024-03-01'
          }
        },
        {
          type: 'person',
          data: {
            firstName: 'Jane',
            lastName: 'Smith',
            age: 28,
            email: 'jane.smith@example.com'
          }
        }
      ] }
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates complex field types where each collection item contains multiple form fields in its data object. This shows how field collection can handle sophisticated data structures with nested form fields, validation, and complex field interactions.'
      }
    }
  }
}

// Validation story – demonstrates inline error/warning messages on Field Collection items
const RequiredTextFieldComponent = (): React.JSX.Element => (
  <Form.Item
    label="Text Value"
    name="text"
    rules={ [{ required: true, message: 'Text value is required' }] }
  >
    <Input placeholder="Enter text…" />
  </Form.Item>
)

const ValidatedEmailFieldComponent = (): React.JSX.Element => (
  <Form.Item
    label="Email"
    name="email"
    rules={ [
      { required: true, message: 'Email is required' },
      { type: 'email', message: 'Must be a valid email address' }
    ] }
  >
    <Input placeholder="Enter email…" />
  </Form.Item>
)

const MinLengthFieldComponent = (): React.JSX.Element => (
  <Form.Item
    label="Username"
    name="username"
    rules={ [
      { required: true, message: 'Username is required' },
      { min: 3, message: 'Username must be at least 3 characters' }
    ] }
  >
    <Input placeholder="At least 3 characters" />
  </Form.Item>
)

const createValidationRegistry = (): FieldCollectionRegistry => {
  const registry = new FieldCollectionRegistry()

  registry.register({
    type: 'text',
    key: 'required-text-field',
    translationKey: 'field-collection.types.text',
    component: <RequiredTextFieldComponent />
  })

  registry.register({
    type: 'email',
    key: 'validated-email-field',
    translationKey: 'field-collection.types.email',
    component: <ValidatedEmailFieldComponent />
  })

  registry.register({
    type: 'username',
    key: 'min-length-field',
    translationKey: 'field-collection.types.username',
    component: <MinLengthFieldComponent />
  })

  return registry
}

const WithValidationComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const [submitResult, setSubmitResult] = useState<string | null>(null)
  const registry = createValidationRegistry()

  const handleFinish = (values: any): void => {
    setSubmitResult(JSON.stringify(values, null, 2))
  }

  const handleFinishFailed = (): void => {
    setSubmitResult('Validation failed – fix the errors above and try again.')
  }

  return (
    <Content padded>
      <p style={ { marginBottom: 16, color: '#555' } }>
        Add items, leave fields empty or enter invalid values, then click
        <strong> Validate &amp; Submit</strong> to see inline error messages appear below each control.
      </p>
      <Form
        form={ form }
        initialValues={ { fieldCollection: [] } }
        layout="vertical"
        onFinish={ handleFinish }
        onFinishFailed={ handleFinishFailed }
      >
        <Form.Item name="fieldCollection">
          <FieldCollection
            registry={ registry }
            title='Validated Field Collection'
          />
        </Form.Item>

        <Form.Item style={ { marginTop: 16 } }>
          <Button
            htmlType="submit"
            type="primary"
          >
            Validate &amp; Submit
          </Button>
        </Form.Item>
      </Form>

      {submitResult !== null && (
        <div style={ { marginTop: 16 } }>
          <h4>Result:</h4>
          <pre style={ {
            backgroundColor: '#f5f5f5',
            padding: '12px',
            borderRadius: '4px',
            fontSize: '12px',
            overflow: 'auto'
          } }
          >
            {submitResult}
          </pre>
        </div>
      )}
    </Content>
  )
}

export const WithValidation: Story = {
  render: () => <WithValidationComponent />,
  parameters: {
    docs: {
      description: {
        story: `Demonstrates **inline field validation** on FieldCollection items.

Add one or more items (text, email, username), leave fields empty or enter invalid values,
then click **Validate & Submit** to trigger validation. Each item shows error messages directly
below the offending control – matching the AntD Form.Item style – without requiring a full
AntD form context around each virtual item.

**Rules exercised:**
- \`required\` – fires when the field is empty
- \`type: 'email'\` – fires when the value is not a valid e-mail address
- \`min\` – fires when the string is shorter than the given length`
      }
    }
  }
}

// Mixed simple and complex field types
export const MixedComplexity: Story = {
  render: () => (
    <FieldCollectionExample
      initialValue={ [
        {
          type: 'text',
          data: { text: 'Simple text field' }
        },
        {
          type: 'person',
          data: {
            firstName: 'Alice',
            lastName: 'Johnson',
            age: 25,
            email: 'alice@example.com'
          }
        },
        {
          type: 'select',
          data: { category: 'blog' }
        },
        {
          type: 'product',
          data: {
            name: 'Smart Watch',
            description: 'Feature-rich smartwatch with health monitoring',
            price: 299.00,
            category: 'electronics',
            inStock: false,
            launchDate: '2024-06-15'
          }
        },
        {
          type: 'boolean',
          data: { active: true }
        }
      ] }
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'A mixed collection showing both simple field types (text, select, boolean) and complex field types (person, product) with multiple data fields. This demonstrates the flexibility of the field collection system to handle varying levels of complexity within the same collection.'
      }
    }
  }
}
