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
import { Form } from './form'
import { Input } from '../input/input'
import { InputNumber } from '../input-number/input-number'
import { TextArea } from '../textarea/textarea'
import { Select } from '../select/select'
import { Switch } from '../switch/switch'
import { Button } from '../button/button'
import { Space } from '../space/space'
import { Checkbox } from './controls/checkbox/checkbox'
import { ColorPicker } from '../color-picker/color-picker'
import { CreatableSelect } from '../creatable-select/creatable-select'
import { DatePicker } from '../date-picker/date-picker'
import { DateRangePicker } from '../date-picker/date-range-picker'
import { TimePicker } from '../date-picker/time-picker'
import { InputPassword } from '../input-password/input-password'
import { KeyedList } from './controls/keyed-list/keyed-list'
import { NumberedList } from './controls/numbered-list/numbered-list'
import { Segmented } from '../segmented/segmented'
import { Slider } from '../slider/slider'
import { NumericRange } from '../numeric-range/numeric-range'
import { ContentLayout } from '../content-layout/content-layout'
import { Content } from '../content/content'
import { Toolbar } from '../toolbar/toolbar'

const config: Meta<typeof Form> = {
  title: 'Components/Data Entry/Form/Basic Form',
  component: Form,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Standard Form component built on top of Ant Design with Pimcore-specific enhancements. This is the basic form implementation suitable for simple form layouts.

**📊 Compare with FormKit:** [Form vs FormKit Comparison](?path=/docs/components-data-entry-form-form-vs-formkit--docs) - See side-by-side comparisons and decide which approach fits your use case.`
      }
    }
  },
  tags: ['autodocs']
}

export default config
type Story = StoryObj<typeof config>

// Form example using FormKit
interface FormValues {
  firstName: string
  lastName: string
  email: string
  age: number | undefined
  description: string
}

const FormExampleComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    email: '',
    age: undefined,
    description: ''
  })

  const onFinish = (values: FormValues): void => {
    console.log('Form submitted:', values)
  }

  const onValuesChange = (changedValues: Partial<FormValues>, allValues: FormValues): void => {
    setFormValues(allValues)
  }

  return (
    <div style={ { maxWidth: '600px' } }>
      <Form
        form={ form }
        initialValues={ formValues }
        layout='vertical'
        onFinish={ onFinish }
        onValuesChange={ onValuesChange }
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={ [{ required: true, message: 'Please input your first name!' }] }
        >
          <Input placeholder="Enter your first name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={ [{ required: true, message: 'Please input your last name!' }] }
        >
          <Input placeholder="Enter your last name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={ [
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ] }
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
        >
          <InputNumber
            max={ 120 }
            min={ 0 }
            placeholder="Enter your age"
            style={ { width: '100%' } }
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <TextArea
            placeholder="Tell us about yourself..."
            rows={ 4 }
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              htmlType="submit"
              type="primary"
            >
              Submit
            </Button>
            <Button
              onClick={ () => { form.resetFields() } }
            >
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <div style={ { marginTop: '20px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '6px' } }>
        <h4>Current Form Values:</h4>
        <pre style={ { fontSize: '12px', margin: 0 } }>
          {JSON.stringify(formValues, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export const BasicForm: Story = {
  render: () => <FormExampleComponent />,
  parameters: {
    docs: {
      description: {
        story: 'A basic form example using the standard Form component with validation, form state management, and live value preview.'
      }
    }
  }
}

// Inline form example
const InlineFormExample = (): React.JSX.Element => {
  const [form] = Form.useForm()

  const onFinish = (values: any): void => {
    console.log('Inline form submitted:', values)
  }

  return (
    <Form
      form={ form }
      layout="inline"
      onFinish={ onFinish }
    >
      <Form.Item
        name="search"
        rules={ [{ required: true, message: 'Please input search term!' }] }
      >
        <Input placeholder="Search..." />
      </Form.Item>

      <Form.Item
        name="category"
      >
        <Select
          options={ [
            { value: 'all', label: 'All Categories' },
            { value: 'news', label: 'News' },
            { value: 'blog', label: 'Blog' }
          ] }
          placeholder="Category"
          style={ { width: 120 } }
        />
      </Form.Item>

      <Form.Item>
        <Button
          htmlType="submit"
          type="primary"
        >
          Search
        </Button>
      </Form.Item>
    </Form>
  )
}

export const InlineForm: Story = {
  render: () => <InlineFormExample />,
  parameters: {
    docs: {
      description: {
        story: 'Inline form layout where form items are arranged horizontally. Useful for search bars and filter forms.'
      }
    }
  }
}

// Horizontal form example
const HorizontalFormExample = (): React.JSX.Element => {
  const [form] = Form.useForm()

  const onFinish = (values: any): void => {
    console.log('Horizontal form submitted:', values)
  }

  return (
    <Form
      form={ form }
      labelCol={ { span: 6 } }
      layout="horizontal"
      onFinish={ onFinish }
      wrapperCol={ { span: 16 } }
    >
      <Form.Item
        label="Username"
        name="username"
        rules={ [{ required: true, message: 'Please input your username!' }] }
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={ [
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Please enter a valid email!' }
        ] }
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Role"
        name="role"
      >
        <Select
          options={ [
            { value: 'admin', label: 'Administrator' },
            { value: 'editor', label: 'Editor' },
            { value: 'viewer', label: 'Viewer' }
          ] }
          placeholder="Select role"
        />
      </Form.Item>

      <Form.Item
        label="Active"
        name="active"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item wrapperCol={ { offset: 6, span: 16 } }>
        <Button
          htmlType="submit"
          type="primary"
        >
          Create User
        </Button>
      </Form.Item>
    </Form>
  )
}

export const HorizontalForm: Story = {
  render: () => <HorizontalFormExample />,
  parameters: {
    docs: {
      description: {
        story: 'Horizontal form layout with labels positioned to the left of form controls. Good for forms with consistent label widths.'
      }
    }
  }
}

interface AllControlsFormData {
  // Text Inputs
  basicInput: string
  inputPassword: string
  textArea: string
  inputNumber: number

  // Selection Controls
  basicSelect: string
  multiSelect: string[]
  creatableSelect: string
  segmented: string

  // Boolean Controls
  switch: boolean
  checkbox: boolean

  // Date Controls
  datePicker: string
  dateRangePicker: string[]
  timePicker: string

  // Color Control
  colorPicker: string

  // Complex List Controls
  keyedList: Record<string, any>
  numberedList: any[]

  // Range Control
  slider: number
  numericRange: { minimum: number | null, maximum: number | null } | null
}

const AllControlsFormExample = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const [formData, setFormData] = useState<AllControlsFormData>({
    // Text Inputs
    basicInput: '',
    inputPassword: '',
    textArea: '',
    inputNumber: 0,

    // Selection Controls
    basicSelect: '',
    multiSelect: [],
    creatableSelect: '',
    segmented: 'option1',

    // Boolean Controls
    switch: false,
    checkbox: false,

    // Date Controls
    datePicker: '',
    dateRangePicker: [],
    timePicker: '',

    // Color Control
    colorPicker: '#1677FF',

    // Complex List Controls
    keyedList: {},
    numberedList: [],

    // Range Control
    slider: 50,
    numericRange: { minimum: 10, maximum: 90 }
  })

  const handleFormChange = (field: keyof AllControlsFormData, value: any): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const onFinish = (values: AllControlsFormData): void => {
    console.log('📝 All Form Controls Values:', values)
    console.table(values)
  }

  const onValuesChange = (changedValues: Partial<AllControlsFormData>, allValues: AllControlsFormData): void => {
    setFormData(allValues)
  }

  const handleReset = (): void => {
    const resetData = {
      basicInput: '',
      inputPassword: '',
      textArea: '',
      inputNumber: 0,
      basicSelect: '',
      multiSelect: [],
      creatableSelect: '',
      segmented: 'option1',
      switch: false,
      checkbox: false,
      datePicker: '',
      dateRangePicker: [],
      timePicker: '',
      colorPicker: '#1677FF',
      keyedList: {},
      numberedList: [],
      slider: 50,
      numericRange: { minimum: 10, maximum: 90 }
    }
    setFormData(resetData)
    form.setFieldsValue(resetData)
  }

  return (
    <ContentLayout
      renderToolbar={ (
        <Toolbar justify="space-between">
          <div>
            <Button
              onClick={ handleReset }
              type="default"
            >Reset All</Button>
          </div>
          <div>
            <Button
              onClick={ () => { void form.validateFields().then(onFinish) } }
              type="primary"
            >Save All Controls</Button>
          </div>
        </Toolbar>
      ) }
    >
      <Content
        padded
        padding={ { x: 'small', y: 'none' } }
      >
        <Form
          form={ form }
          initialValues={ formData }
          layout="vertical"
          onFinish={ onFinish }
          onValuesChange={ onValuesChange }
        >
          {/* Text Controls Section */}
          <div style={ { marginBottom: '32px' } }>
            <Form.Item
              label="Basic Input"
              name="basicInput"
              tooltip="Standard text input"
            >
              <Input
                onChange={ (e) => { handleFormChange('basicInput', e.target.value) } }
                placeholder="Enter text..."
              />
            </Form.Item>

            <Form.Item
              label="Password Input"
              name="inputPassword"
              tooltip="Password input with visibility toggle"
            >
              <InputPassword
                onChange={ (e) => { handleFormChange('inputPassword', e.target.value) } }
                placeholder="Enter password..."
              />
            </Form.Item>

            <Form.Item
              label="Text Area"
              name="textArea"
              tooltip="Multi-line text input"
            >
              <TextArea
                onChange={ (e) => { handleFormChange('textArea', e.target.value) } }
                placeholder="Enter multi-line text..."
                rows={ 3 }
              />
            </Form.Item>

            <Form.Item
              label="Input Number"
              name="inputNumber"
              tooltip="Numeric input with controls"
            >
              <InputNumber
                onChange={ (value) => { handleFormChange('inputNumber', value ?? 0) } }
                placeholder="Enter number..."
                style={ { width: '100%' } }
              />
            </Form.Item>
          </div>

          {/* Selection Controls Section */}
          <div style={ { marginBottom: '32px' } }>
            <Form.Item
              label="Basic Select"
              name="basicSelect"
              tooltip="Standard dropdown select"
            >
              <Select
                onChange={ (value) => { handleFormChange('basicSelect', value) } }
                options={ [
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                  { value: 'option3', label: 'Option 3' }
                ] }
                placeholder="Select an option..."
              />
            </Form.Item>

            <Form.Item
              label="Multi Select"
              name="multiSelect"
              tooltip="Multiple selection dropdown"
            >
              <Select
                mode="multiple"
                onChange={ (value) => { handleFormChange('multiSelect', value) } }
                options={ [
                  { value: 'multi1', label: 'Multi Option 1' },
                  { value: 'multi2', label: 'Multi Option 2' },
                  { value: 'multi3', label: 'Multi Option 3' },
                  { value: 'multi4', label: 'Multi Option 4' }
                ] }
                placeholder="Select multiple options..."
              />
            </Form.Item>

            <Form.Item
              label="Creatable Select"
              name="creatableSelect"
              tooltip="Select that allows creating new options"
            >
              <CreatableSelect
                onChange={ (value) => { handleFormChange('creatableSelect', value) } }
                options={ [
                  { value: 'existing1', label: 'Existing Option 1' },
                  { value: 'existing2', label: 'Existing Option 2' }
                ] }
                placeholder="Select or create new option..."
              />
            </Form.Item>

            <Form.Item
              label="Segmented Control"
              name="segmented"
              tooltip="Segmented button control"
            >
              <Segmented
                onChange={ (value) => { handleFormChange('segmented', value) } }
                options={ [
                  { label: 'Option 1', value: 'option1' },
                  { label: 'Option 2', value: 'option2' },
                  { label: 'Option 3', value: 'option3' }
                ] }
              />
            </Form.Item>
          </div>

          {/* Boolean Controls Section */}
          <div style={ { marginBottom: '32px' } }>
            <Form.Item
              label="Switch Control"
              name="switch"
              tooltip="Toggle switch"
              valuePropName="checked"
            >
              <Switch
                onChange={ (checked) => { handleFormChange('switch', checked) } }
              />
            </Form.Item>

            <Form.Item
              label="Checkbox Control"
              name="checkbox"
              tooltip="Single checkbox"
              valuePropName="checked"
            >
              <Checkbox
                onChange={ (e) => { handleFormChange('checkbox', e.target.checked) } }
              >
                Check this option
              </Checkbox>
            </Form.Item>
          </div>

          {/* Date, Time & Color Controls Section */}
          <div style={ { marginBottom: '32px' } }>
            <Form.Item
              label="Date Picker"
              name="datePicker"
              tooltip="Date selection"
            >
              <DatePicker
                onChange={ (value) => { handleFormChange('datePicker', value?.format('YYYY-MM-DD') ?? '') } }
                placeholder="Select date..."
                style={ { width: '100%' } }
              />
            </Form.Item>

            <Form.Item
              label="Date Range Picker"
              name="dateRangePicker"
              tooltip="Date range selection"
            >
              <DateRangePicker
                onChange={ (value) => {
                  const dateRange = value !== null && value !== undefined
                    ? [
                        value[0]?.format('YYYY-MM-DD') ?? '',
                        value[1]?.format('YYYY-MM-DD') ?? ''
                      ]
                    : []
                  handleFormChange('dateRangePicker', dateRange)
                } }
                placeholder={ ['Start date', 'End date'] }
                style={ { width: '100%' } }
              />
            </Form.Item>

            <Form.Item
              label="Time Picker"
              name="timePicker"
              tooltip="Time selection"
            >
              <TimePicker
                onChange={ (value) => {
                  const timeValue = typeof value === 'string' ? value : ''
                  handleFormChange('timePicker', timeValue)
                } }
                placeholder="Select time..."
                style={ { width: '100%' } }
              />
            </Form.Item>

            <Form.Item
              label="Color Picker"
              name="colorPicker"
              tooltip="Color selection"
            >
              <ColorPicker
                format="hex"
                onChange={ (value) => {
                  let hexValue = '#1677FF'
                  if (typeof value === 'string') {
                    hexValue = value
                  } else if (value !== null && value !== undefined && typeof value === 'object' && 'toHexString' in value && typeof value.toHexString === 'function') {
                    hexValue = value.toHexString()
                  }
                  handleFormChange('colorPicker', hexValue)
                } }
                showText
              />
            </Form.Item>
          </div>

          {/* Lists & Range Controls Section */}
          <div style={ { marginBottom: '32px' } }>
            <Form.Item
              label="Keyed List"
              name="keyedList"
              tooltip="Dynamic key-value list"
            >
              <KeyedList
                onChange={ (value) => { handleFormChange('keyedList', value) } }
                value={ formData.keyedList }
              >
                <KeyedList.Iterator>
                  <Form.Item
                    label="Value"
                    name="value"
                  >
                    <Input placeholder="Enter value" />
                  </Form.Item>
                </KeyedList.Iterator>
              </KeyedList>
            </Form.Item>

            <Form.Item
              label="Numbered List"
              name="numberedList"
              tooltip="Dynamic numbered list"
            >
              <NumberedList
                onChange={ (value) => { handleFormChange('numberedList', value) } }
                value={ formData.numberedList }
              >
                <NumberedList.Iterator>
                  <Form.Item
                    label="Item Name"
                    name="name"
                  >
                    <Input placeholder="Enter item name" />
                  </Form.Item>
                </NumberedList.Iterator>
              </NumberedList>
            </Form.Item>

            <Form.Item
              label="Slider"
              name="slider"
              tooltip="Range slider"
            >
              <Slider
                max={ 100 }
                min={ 0 }
                onChange={ (value) => { handleFormChange('slider', value ?? 0) } }
                showValue
              />
            </Form.Item>

            <Form.Item
              label="Numeric Range"
              name="numericRange"
              tooltip="Min-Max numeric range input"
            >
              <NumericRange
                onChange={ (value) => { handleFormChange('numericRange', value) } }
                placeholder="Enter range..."
                value={ formData.numericRange as any }
              />
            </Form.Item>
          </div>
        </Form>

        <div style={ {
          marginTop: '24px',
          padding: '16px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          fontSize: '12px',
          fontFamily: 'monospace'
        } }
        >
          <h4 style={ { margin: '0 0 12px 0', fontFamily: 'inherit' } }>Current Form Values:</h4>
          <pre style={ { margin: 0, whiteSpace: 'pre-wrap' } }>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </Content>
    </ContentLayout>
  )
}

export const AllControlsShowcase: Story = {
  render: () => <AllControlsFormExample />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `Comprehensive showcase of all available form controls within the standard Form component. This example demonstrates how to use all form controls with standard Form functionality, providing a comparison point with the FormKit AllControlsShowcase.

**Controls Demonstrated:**
- **Text Inputs**: Input, InputPassword, TextArea, InputNumber
- **Selection Controls**: Select, Multi-Select, CreatableSelect, Segmented
- **Boolean Controls**: Switch, Checkbox  
- **Date/Time Controls**: DatePicker, DateRangePicker, TimePicker
- **Color Control**: ColorPicker with hex format
- **Complex Lists**: KeyedList, NumberedList
- **Range Controls**: Slider, NumericRange

**Standard Form Characteristics:**
- **Manual styling**: Requires explicit width and spacing management (notice \`style={{ width: '100%' }}\` on some controls)
- **Section organization**: Manual section headers and spacing with custom styles
- **Form validation**: Standard Ant Design form validation and submission handling
- **State management**: Combination of Form state and local state for complex controls
- **Full control**: Complete flexibility over form behavior and appearance

Compare this with the FormKit AllControlsShowcase to see the differences in structure, styling, and developer experience.`
      }
    }
  }
}
