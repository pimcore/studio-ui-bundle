/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Meta, type StoryObj } from '@storybook/react/*'
import { FormKit } from './form-kit'
import { ConfigLayout } from '../predefined-layouts/config/config-layout'
import React, { useState } from 'react'
import { Form } from './form'
import { Input } from '../input/input'
import { ContentLayout } from '../content-layout/content-layout'
import { Content } from '../content/content'
import { Toolbar } from '../toolbar/toolbar'
import { Button } from '../button/button'
import { Icon } from '../icon/icon'
import { TreeElement, type TreeDataItem } from '../tree-element/tree-element'
import { Select } from '../select/select'
import { TextArea } from '../textarea/textarea'
import { Switch } from '../switch/switch'
import { IconButton } from '../icon-button/icon-button'
import { Checkbox } from './controls/checkbox/checkbox'
import { ColorPicker } from '../color-picker/color-picker'
import { CreatableSelect } from '../creatable-select/creatable-select'
import { DatePicker } from '../date-picker/date-picker'
import { DateRangePicker } from '../date-picker/date-range-picker'
import { TimePicker } from '../date-picker/time-picker'
import { InputNumber } from '../input-number/input-number'
import { InputPassword } from '../input-password/input-password'
import { KeyedList } from './controls/keyed-list/keyed-list'
import { NumberedList } from './controls/numbered-list/numbered-list'
import { Segmented } from '../segmented/segmented'
import { Slider } from '../slider/slider'
import { NumericRange } from '../numeric-range/numeric-range'

const config: Meta<typeof FormKit> = {
  title: 'Components/Data Entry/Form/FormKit',
  component: FormKit,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `FormKit is an advanced form layout system that provides structured panels, tabs, and enhanced form controls. It's designed for complex forms with multiple sections and advanced layouts.

**📊 Compare with Standard Form:** [Form vs FormKit Comparison](?path=/docs/components-data-entry-form-form-vs-formkit--docs) - See side-by-side comparisons and decide which approach fits your use case.`
      }
    }
  },
  tags: ['autodocs']
}

// Form data interface
interface FormData {
  title: string
  description: string
  status: string
  featured: boolean
  metaTitle: string
  metaDescription: string
  keywords: string
  canonicalUrl: string
  template: string
  cacheLifetime: string
  customClasses: string
  hideInNavigation: boolean
}

// Sample tree data for the left panel
const treeData: TreeDataItem[] = [
  {
    title: 'Documents',
    key: '0',
    icon: <Icon value="document" />,
    children: [
      {
        title: 'Homepage',
        key: '0-0',
        icon: <Icon value="page" />
      },
      {
        title: 'Products',
        key: '0-1',
        icon: <Icon value="folder" />,
        children: [
          {
            title: 'Product A',
            key: '0-1-0',
            icon: <Icon value="page" />
          },
          {
            title: 'Product B',
            key: '0-1-1',
            icon: <Icon value="page" />
          }
        ]
      },
      {
        title: 'News',
        key: '0-2',
        icon: <Icon value="folder" />,
        children: [
          {
            title: 'Latest Updates',
            key: '0-2-0',
            icon: <Icon value="page" />
          }
        ]
      }
    ]
  }
]

const LeftItem = (): React.JSX.Element => {
  return (
    <ContentLayout
      renderToolbar={ (
        <Toolbar justify="flex-end">
          <IconButton
            icon={ { value: 'refresh' } }
            title="Refresh"
          />
        </Toolbar>
      ) }
    >
      <Content padded>
        <TreeElement
          defaultExpandedKeys={ ['0', '0-1'] }
          onSelected={ (key) => { console.log('Selected:', key) } }
          treeData={ treeData }
          withCustomSwitcherIcon
        />
      </Content>
    </ContentLayout>
  )
}

const GeneralTab = ({ formData, setFormData }: { formData: FormData, setFormData: (data: FormData) => void }): React.JSX.Element => (
  <div>
    <FormKit.Panel title="Basic Information">
      <Form.Item
        label="Title"
        required
      >
        <Input
          onChange={ (e) => { setFormData({ ...formData, title: e.target.value }) } }
          placeholder="Enter page title..."
          value={ formData.title }
        />
      </Form.Item>

      <Form.Item label="Description">
        <TextArea
          onChange={ (e) => { setFormData({ ...formData, description: e.target.value }) } }
          placeholder="Enter page description..."
          rows={ 3 }
          value={ formData.description }
        />
      </Form.Item>
    </FormKit.Panel>

    <FormKit.Panel
      theme="card-with-highlight"
      title="Publishing Settings"
    >
      <Form.Item label="Status">
        <Select
          onChange={ (value) => { setFormData({ ...formData, status: value }) } }
          options={ [
            { value: 'published', label: 'Published' },
            { value: 'draft', label: 'Draft' },
            { value: 'archived', label: 'Archived' }
          ] }
          placeholder="Select status"
          style={ { width: 200 } }
          value={ formData.status }
        />
      </Form.Item>

      <Form.Item label="Featured">
        <Switch
          checked={ formData.featured }
          labelRight="Mark as featured content"
          onChange={ (checked) => { setFormData({ ...formData, featured: checked }) } }
        />
      </Form.Item>
    </FormKit.Panel>
  </div>
)

const SEOTab = ({ formData, setFormData }: { formData: FormData, setFormData: (data: FormData) => void }): React.JSX.Element => (
  <div>
    <FormKit.Panel
      theme="card-with-highlight"
      title="Meta Information"
    >
      <Form.Item label="Meta Title">
        <Input
          onChange={ (e) => { setFormData({ ...formData, metaTitle: e.target.value }) } }
          placeholder="SEO title for search engines..."
          value={ formData.metaTitle }
        />
      </Form.Item>

      <Form.Item label="Meta Description">
        <TextArea
          onChange={ (e) => { setFormData({ ...formData, metaDescription: e.target.value }) } }
          placeholder="SEO description for search engines..."
          rows={ 2 }
          value={ formData.metaDescription }
        />
      </Form.Item>
    </FormKit.Panel>

    <FormKit.Panel
      theme="fieldset"
      title="Search Optimization"
    >
      <Form.Item label="Keywords">
        <Input
          onChange={ (e) => { setFormData({ ...formData, keywords: e.target.value }) } }
          placeholder="Comma-separated keywords..."
          value={ formData.keywords }
        />
      </Form.Item>

      <Form.Item label="Canonical URL">
        <Input
          onChange={ (e) => { setFormData({ ...formData, canonicalUrl: e.target.value }) } }
          placeholder="https://example.com/canonical-url"
          value={ formData.canonicalUrl }
        />
      </Form.Item>
    </FormKit.Panel>
  </div>
)

const AdvancedTab = ({ formData, setFormData }: { formData: FormData, setFormData: (data: FormData) => void }): React.JSX.Element => (
  <div>
    <FormKit.Panel title="Template Configuration">
      <Form.Item label="Template">
        <Select
          onChange={ (value) => { setFormData({ ...formData, template: value }) } }
          options={ [
            { value: 'default', label: 'Default Template' },
            { value: 'landing', label: 'Landing Page' },
            { value: 'article', label: 'Article Template' }
          ] }
          placeholder="Select template"
          style={ { width: 250 } }
          value={ formData.template }
        />
      </Form.Item>

      <Form.Item label="Custom CSS Classes">
        <Input
          onChange={ (e) => { setFormData({ ...formData, customClasses: e.target.value }) } }
          placeholder="custom-class another-class"
          value={ formData.customClasses }
        />
      </Form.Item>
    </FormKit.Panel>

    <FormKit.Panel
      theme="fieldset"
      title="System Settings"
    >
      <Form.Item label="Cache Lifetime (seconds)">
        <Input
          onChange={ (e) => { setFormData({ ...formData, cacheLifetime: e.target.value }) } }
          placeholder="3600"
          type="number"
          value={ formData.cacheLifetime }
        />
      </Form.Item>

      <Form.Item label="Hide in Navigation">
        <Switch
          checked={ formData.hideInNavigation }
          onChange={ (checked) => { setFormData({ ...formData, hideInNavigation: checked }) } }
        />
      </Form.Item>
    </FormKit.Panel>
  </div>
)

const RightItem = (): React.JSX.Element => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    status: '',
    featured: false,
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    canonicalUrl: '',
    template: '',
    cacheLifetime: '',
    customClasses: '',
    hideInNavigation: false
  })

  const handleSave = (): void => {
    console.log('📝 Form Values:', formData)
    console.table(formData)
  }

  const handlePreview = (): void => {
    console.log('👁️ Preview with current data:', formData)
  }

  return (
    <ContentLayout
      renderToolbar={ (
        <Toolbar justify="space-between">
          <IconButton
            icon={ { value: 'refresh' } }
            title="Refresh"
          />
          <div>
            <Button
              onClick={ handlePreview }
              style={ { marginRight: 8 } }
              type="default"
            >Preview</Button>
            <Button
              onClick={ handleSave }
              type="primary"
            >Save</Button>
          </div>
        </Toolbar>
      ) }
    >
      <Content
        padded
        padding={ { x: 'small', y: 'none' } }
      >
        <FormKit>
          <FormKit.TabPanel
            hasStickyHeader
            items={ [
              {
                key: 'general',
                label: 'General',
                icon: <Icon value="edit" />,
                children: <GeneralTab
                  formData={ formData }
                  setFormData={ setFormData }
                          />
              },
              {
                key: 'seo',
                label: 'SEO',
                icon: <Icon value="search" />,
                children: <SEOTab
                  formData={ formData }
                  setFormData={ setFormData }
                          />
              },
              {
                key: 'advanced',
                label: 'Advanced',
                icon: <Icon value="settings" />,
                children: <AdvancedTab
                  formData={ formData }
                  setFormData={ setFormData }
                          />
              }
            ] }
            size="middle"
          />
        </FormKit>
      </Content>
    </ContentLayout>
  )
}

const Example = (): React.JSX.Element => (
  <ContentLayout>
    <ConfigLayout
      leftItem={ {
        children: <LeftItem />
      } }

      rightItem={ {
        children: <RightItem />
      } }
    />
  </ContentLayout>
)

export default config
type Story = StoryObj<typeof config>

// Simple FormKit Panel Example
const SimpleFormKitExample = (): React.JSX.Element => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    priority: 'normal',
    subscribe: false
  })

  return (
    <div style={ { maxWidth: '600px' } }>
      <FormKit>
        {/* Basic panel without title for seamless content */}
        <FormKit.Panel>
          <Form.Item
            label="Name"
            required
          >
            <Input
              onChange={ (e) => { setFormData({ ...formData, name: e.target.value }) } }
              placeholder="Enter your name"
              value={ formData.name }
            />
          </Form.Item>

          <Form.Item
            label="Email"
            required
          >
            <Input
              onChange={ (e) => { setFormData({ ...formData, email: e.target.value }) } }
              placeholder="Enter your email"
              type="email"
              value={ formData.email }
            />
          </Form.Item>
        </FormKit.Panel>

        {/* Panel with title and extra content */}
        <FormKit.Panel
          extra={
            <Select
              onChange={ (value) => { setFormData({ ...formData, priority: value }) } }
              options={ [
                { value: 'low', label: 'Low Priority' },
                { value: 'normal', label: 'Normal' },
                { value: 'high', label: 'High Priority' }
              ] }
              size="small"
              value={ formData.priority }
            />
          }
          theme="card-with-highlight"
          title="Message Details"
        >
          <Form.Item label="Message">
            <TextArea
              onChange={ (e) => { setFormData({ ...formData, message: e.target.value }) } }
              placeholder="Enter your message"
              rows={ 4 }
              value={ formData.message }
            />
          </Form.Item>
        </FormKit.Panel>

        {/* Collapsible panel for optional settings */}
        <FormKit.Panel
          collapsed
          collapsible
          theme="fieldset"
          title="Optional Settings"
        >
          <Form.Item label="Newsletter">
            <Switch
              checked={ formData.subscribe }
              labelRight="Subscribe to our newsletter"
              onChange={ (checked) => { setFormData({ ...formData, subscribe: checked }) } }
            />
          </Form.Item>
        </FormKit.Panel>
      </FormKit>

      <div style={ { marginTop: '16px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '6px' } }>
        <strong>Current Values:</strong>
        <pre style={ { fontSize: '12px', margin: '8px 0 0 0' } }>
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export const BasicFormKit: Story = {
  render: () => <SimpleFormKitExample />,
  parameters: {
    docs: {
      description: {
        story: 'Enhanced FormKit usage showcasing different panel configurations: panels without titles for seamless content flow, panels with extra header content (like priority selection), and collapsible panels for optional settings. Demonstrates the flexible panel system for organizing form content.'
      }
    }
  }
}

export const ComplexFormLayout: Story = {
  render: () => <Example />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'A complex form layout example showing FormKit with TabPanel, integrated navigation tree, and multiple form sections. This demonstrates the advanced capabilities of FormKit for creating structured admin interfaces. Notice how different panel themes are used within tabs to create visual hierarchy - default panels for basic content, card-with-highlight for important sections, and fieldset theme for grouped settings.'
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

const AllControlsExample = (): React.JSX.Element => {
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

  const handleSave = (): void => {
    console.log('📝 All Form Controls Values:', formData)
    console.table(formData)
  }

  return (
    <ContentLayout
      renderToolbar={ (
        <Toolbar justify="space-between">
          <div>
            <Button
              onClick={ () => {
                // Reset form
                setFormData({
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
                })
              } }
              type="default"
            >Reset</Button>
          </div>
          <div>
            <Button
              onClick={ handleSave }
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
        <FormKit>
          <FormKit.Panel
            theme="card-with-highlight"
            title="Text Controls"
          >
            <Form.Item
              label="Basic Input"
              tooltip="Standard text input with default width"
            >
              <Input
                onChange={ (e) => { handleFormChange('basicInput', e.target.value) } }
                placeholder="Enter text..."
                value={ formData.basicInput }
              />
            </Form.Item>

            <Form.Item
              label="Password Input"
              tooltip="Password input with default width"
            >
              <InputPassword
                onChange={ (e) => { handleFormChange('inputPassword', e.target.value) } }
                placeholder="Enter password..."
                value={ formData.inputPassword }
              />
            </Form.Item>

            <Form.Item
              label="Text Area"
              tooltip="Multi-line text input with default width"
            >
              <TextArea
                onChange={ (e) => { handleFormChange('textArea', e.target.value) } }
                placeholder="Enter multi-line text..."
                rows={ 3 }
                value={ formData.textArea }
              />
            </Form.Item>

            <Form.Item
              label="Input Number"
              tooltip="Numeric input with default width"
            >
              <InputNumber
                onChange={ (value) => { handleFormChange('inputNumber', value ?? 0) } }
                placeholder="Enter number..."
                value={ formData.inputNumber }
              />
            </Form.Item>
          </FormKit.Panel>

          <FormKit.Panel
            theme="card-with-highlight"
            title="Selection Controls"
          >
            <Form.Item
              label="Basic Select"
              tooltip="Standard dropdown select with default width"
            >
              <Select
                onChange={ (value) => { handleFormChange('basicSelect', value) } }
                options={ [
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                  { value: 'option3', label: 'Option 3' }
                ] }
                placeholder="Select an option..."
                value={ formData.basicSelect }
              />
            </Form.Item>

            <Form.Item
              label="Multi Select"
              tooltip="Multiple selection dropdown with default width"
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
                value={ formData.multiSelect }
              />
            </Form.Item>

            <Form.Item
              label="Creatable Select"
              tooltip="Select that allows creating new options with default width"
            >
              <CreatableSelect
                onChange={ (value) => { handleFormChange('creatableSelect', value) } }
                options={ [
                  { value: 'existing1', label: 'Existing Option 1' },
                  { value: 'existing2', label: 'Existing Option 2' }
                ] }
                placeholder="Select or create new option..."
                value={ formData.creatableSelect }
              />
            </Form.Item>

            <Form.Item
              label="Segmented Control"
              tooltip="Segmented button control with default width"
            >
              <Segmented
                onChange={ (value) => { handleFormChange('segmented', value) } }
                options={ [
                  { label: 'Option 1', value: 'option1' },
                  { label: 'Option 2', value: 'option2' },
                  { label: 'Option 3', value: 'option3' }
                ] }
                value={ formData.segmented }
              />
            </Form.Item>
          </FormKit.Panel>

          <FormKit.Panel title="Boolean Controls">
            <Form.Item
              label="Switch Control"
              tooltip="Toggle switch with fixed width"
            >
              <Switch
                checked={ formData.switch }
                labelRight="Enable this feature"
                onChange={ (checked) => { handleFormChange('switch', checked) } }
              />
            </Form.Item>

            <Form.Item
              label="Checkbox Control"
              tooltip="Single checkbox with fixed width"
            >
              <Checkbox
                checked={ formData.checkbox }
                onChange={ (e) => { handleFormChange('checkbox', e.target.checked) } }
              >
                Check this option
              </Checkbox>
            </Form.Item>
          </FormKit.Panel>

          <FormKit.Panel
            theme="fieldset"
            title="Date, Time & Color Controls"
          >
            <Form.Item
              label="Date Picker"
              tooltip="Date selection with default width"
            >
              <DatePicker
                onChange={ (value) => { handleFormChange('datePicker', value?.format('YYYY-MM-DD') ?? '') } }
                placeholder="Select date..."
              />
            </Form.Item>

            <Form.Item
              label="Date Range Picker"
              tooltip="Date range selection with default width"
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
              />
            </Form.Item>

            <Form.Item
              label="Time Picker"
              tooltip="Time selection with default width"
            >
              <TimePicker
                onChange={ (value) => {
                  const timeValue = typeof value === 'string' ? value : ''
                  handleFormChange('timePicker', timeValue)
                } }
                placeholder="Select time..."
              />
            </Form.Item>

            <Form.Item
              label="Color Picker"
              tooltip="Color selection with default width"
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
                value={ formData.colorPicker }
              />
            </Form.Item>
          </FormKit.Panel>

          <FormKit.Panel
            theme="fieldset"
            title="Lists & Range Controls"
          >
            <Form.Item
              label="Keyed List"
              tooltip="Dynamic key-value list with default width"
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
              tooltip="Dynamic numbered list with default width"
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
              tooltip="Range slider with default width"
            >
              <Slider
                max={ 100 }
                min={ 0 }
                onChange={ (value) => { handleFormChange('slider', value ?? 0) } }
                showValue
                value={ formData.slider }
              />
            </Form.Item>

            <Form.Item
              label="Numeric Range"
              tooltip="Min-Max numeric range input with default width"
            >
              <NumericRange
                onChange={ (value) => { handleFormChange('numericRange', value) } }
                placeholder="Enter range..."
                value={ formData.numericRange as any }
              />
            </Form.Item>
          </FormKit.Panel>
        </FormKit>

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
  render: () => <AllControlsExample />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase of all available form controls within FormKit panels. This example demonstrates consistent styling and behavior of input components when used within the FormKit system.'
      }
    }
  }
}

// Panel Themes Showcase
const PanelThemesExample = (): React.JSX.Element => {
  const [formData, setFormData] = useState({
    defaultTheme: {
      title: 'Sample Document',
      description: 'This is a sample description'
    },
    cardWithHighlight: {
      email: 'user@example.com',
      newsletter: true
    },
    fieldsetTheme1: {
      seoTitle: 'SEO Optimized Title',
      keywords: 'pimcore, cms, content management'
    },
    fieldsetTheme2: {
      cacheEnabled: true,
      cacheLifetime: '3600',
      debugMode: false
    }
  })

  const handleChange = (theme: string, field: string, value: any): void => {
    setFormData(prev => ({
      ...prev,
      [theme]: {
        ...prev[theme as keyof typeof prev],
        [field]: value
      }
    }))
  }

  return (
    <ContentLayout
      renderToolbar={ (
        <Toolbar justify="space-between">
          <div>
            <strong>Panel Theme Variations</strong>
          </div>
          <div>
            <Button
              onClick={ () => {
                console.log('📝 Panel Themes Form Data:', formData)
                console.table(formData)
              } }
              type="primary"
            >View All Values</Button>
          </div>
        </Toolbar>
      ) }
    >
      <Content
        padded
        padding={ { x: 'small', y: 'none' } }
      >
        <FormKit>
          <FormKit.Panel
            title="Default Theme (Card with Highlight)"
          >
            <Form.Item
              label="Document Title"
              tooltip="Default FormKit panel theme - clean card appearance with highlight"
            >
              <Input
                onChange={ (e) => { handleChange('defaultTheme', 'title', e.target.value) } }
                placeholder="Enter document title..."
                value={ formData.defaultTheme.title }
              />
            </Form.Item>

            <Form.Item label="Description">
              <TextArea
                onChange={ (e) => { handleChange('defaultTheme', 'description', e.target.value) } }
                placeholder="Enter description..."
                rows={ 2 }
                value={ formData.defaultTheme.description }
              />
            </Form.Item>
          </FormKit.Panel>

          <FormKit.Panel
            theme="card-with-highlight"
            title="Card with Highlight Theme"
          >
            <Form.Item
              label="Email Address"
              tooltip="Panel with primary color highlight border on header (explicit theme)"
            >
              <Input
                onChange={ (e) => { handleChange('cardWithHighlight', 'email', e.target.value) } }
                placeholder="Enter email address..."
                type="email"
                value={ formData.cardWithHighlight.email }
              />
            </Form.Item>

            <Form.Item label="Newsletter Subscription">
              <Switch
                checked={ formData.cardWithHighlight.newsletter }
                labelRight="Subscribe to our newsletter"
                onChange={ (checked) => { handleChange('cardWithHighlight', 'newsletter', checked) } }
              />
            </Form.Item>
          </FormKit.Panel>

          <FormKit.Panel
            theme="fieldset"
            title="Fieldset Theme - SEO Settings"
          >
            <Form.Item
              label="SEO Title"
              tooltip="Fieldset theme with background color and left border accent"
            >
              <Input
                onChange={ (e) => { handleChange('fieldsetTheme1', 'seoTitle', e.target.value) } }
                placeholder="Enter SEO title..."
                value={ formData.fieldsetTheme1.seoTitle }
              />
            </Form.Item>

            <Form.Item label="Keywords">
              <Input
                onChange={ (e) => { handleChange('fieldsetTheme1', 'keywords', e.target.value) } }
                placeholder="Enter keywords, separated by commas..."
                value={ formData.fieldsetTheme1.keywords }
              />
            </Form.Item>
          </FormKit.Panel>

          <FormKit.Panel
            theme="fieldset"
            title="Fieldset Theme - System Configuration"
          >
            <Form.Item
              label="Cache Enabled"
              tooltip="Another fieldset example - ideal for grouped configuration settings"
            >
              <Switch
                checked={ formData.fieldsetTheme2.cacheEnabled }
                labelRight="Enable caching for this page"
                onChange={ (checked) => { handleChange('fieldsetTheme2', 'cacheEnabled', checked) } }
              />
            </Form.Item>

            <Form.Item label="Cache Lifetime">
              <InputNumber
                min={ 0 }
                onChange={ (value) => { handleChange('fieldsetTheme2', 'cacheLifetime', value?.toString() ?? '0') } }
                placeholder="Enter cache lifetime in seconds"
                style={ { width: 200 } }
                value={ parseInt(formData.fieldsetTheme2.cacheLifetime) }
              />
            </Form.Item>

            <Form.Item label="Debug Mode">
              <Switch
                checked={ formData.fieldsetTheme2.debugMode }
                labelRight="Enable debug mode"
                onChange={ (checked) => { handleChange('fieldsetTheme2', 'debugMode', checked) } }
              />
            </Form.Item>
          </FormKit.Panel>
        </FormKit>

        <div style={ {
          marginTop: '24px',
          padding: '16px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          fontSize: '12px',
          fontFamily: 'monospace'
        } }
        >
          <h4 style={ { margin: '0 0 12px 0', fontFamily: 'inherit' } }>Available FormKit Panel Themes:</h4>
          <ul style={ { margin: '0', paddingLeft: '16px', fontFamily: 'inherit', fontSize: '13px' } }>
            <li><strong>Default (card-with-highlight):</strong> Clean card appearance with primary color highlight on header border</li>
            <li><strong>Fieldset:</strong> Background color with left border accent, perfect for grouped settings and configurations</li>
          </ul>
          <p style={ { margin: '12px 0 0 0', fontFamily: 'inherit', fontSize: '13px', color: '#666' } }>
            <em>Note: FormKit panels are optimized for forms and use the card-with-highlight theme as default.</em>
          </p>
        </div>
      </Content>
    </ContentLayout>
  )
}

export const PanelThemes: Story = {
  render: () => <PanelThemesExample />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Showcase of different FormKit panel themes. FormKit panels support two main themes: the default "card-with-highlight" (clean card with primary color header highlight) and "fieldset" (background color with left border accent, ideal for grouped configuration settings). Use themes to create visual hierarchy and organize form sections effectively.'
      }
    }
  }
}

// Advanced Panel Options Showcase
const AdvancedPanelOptionsExample = (): React.JSX.Element => {
  const [formData, setFormData] = useState({
    basicSettings: {
      name: 'My Document',
      enabled: true
    },
    advancedSettings: {
      caching: false,
      compression: true,
      debugMode: false
    },
    userPreferences: {
      theme: 'light',
      language: 'en',
      notifications: true
    },
    nestedConfig: {
      api: {
        endpoint: 'https://api.example.com',
        timeout: 5000
      },
      database: {
        host: 'localhost',
        port: 3306
      }
    }
  })

  const handleChange = (section: string, subsection: string | null, field: string, value: any): void => {
    setFormData(prev => {
      if (subsection !== null && subsection !== '') {
        return {
          ...prev,
          [section]: {
            ...prev[section as keyof typeof prev],
            [subsection]: {
              ...(prev[section as keyof typeof prev] as any)[subsection],
              [field]: value
            }
          }
        }
      } else {
        return {
          ...prev,
          [section]: {
            ...prev[section as keyof typeof prev],
            [field]: value
          }
        }
      }
    })
  }

  return (
    <ContentLayout
      renderToolbar={ (
        <Toolbar justify="space-between">
          <div>
            <strong>Advanced Panel Options Showcase</strong>
          </div>
          <div>
            <Button
              onClick={ () => {
                console.log('📝 Advanced Panel Form Data:', formData)
                console.table(formData)
              } }
              type="primary"
            >View All Values</Button>
          </div>
        </Toolbar>
      ) }
    >
      <Content
        padded
        padding={ { x: 'small', y: 'none' } }
      >
        <FormKit>
          {/* Panel without title */}
          <FormKit.Panel>
            <Form.Item
              label="Document Name"
              tooltip="Panel without title - clean and minimal"
            >
              <Input
                onChange={ (e) => { handleChange('basicSettings', null, 'name', e.target.value) } }
                placeholder="Enter document name..."
                value={ formData.basicSettings.name }
              />
            </Form.Item>

            <Form.Item label="Enabled">
              <Switch
                checked={ formData.basicSettings.enabled }
                labelRight="Enable this document"
                onChange={ (checked) => { handleChange('basicSettings', null, 'enabled', checked) } }
              />
            </Form.Item>
          </FormKit.Panel>

          {/* Panel with border */}
          <FormKit.Panel
            border
            theme="card-with-highlight"
            title="Panel with Border"
          >
            <Form.Item
              label="Enable Caching"
              tooltip="Panel with explicit border styling"
            >
              <Switch
                checked={ formData.advancedSettings.caching }
                labelRight="Enable page caching"
                onChange={ (checked) => { handleChange('advancedSettings', null, 'caching', checked) } }
              />
            </Form.Item>

            <Form.Item label="Enable Compression">
              <Switch
                checked={ formData.advancedSettings.compression }
                labelRight="Enable gzip compression"
                onChange={ (checked) => { handleChange('advancedSettings', null, 'compression', checked) } }
              />
            </Form.Item>
          </FormKit.Panel>

          {/* Collapsible Panel */}
          <FormKit.Panel
            collapsed={ false }
            collapsible
            theme="fieldset"
            title="Collapsible Advanced Settings"
          >
            <Form.Item
              label="Debug Mode"
              tooltip="Collapsible panel for advanced/optional settings"
            >
              <Switch
                checked={ formData.advancedSettings.debugMode }
                labelRight="Enable debug output"
                onChange={ (checked) => { handleChange('advancedSettings', null, 'debugMode', checked) } }
              />
            </Form.Item>

            <Form.Item label="Additional Settings">
              <TextArea
                placeholder="Enter additional configuration options..."
                rows={ 3 }
              />
            </Form.Item>
          </FormKit.Panel>

          {/* Panel with Extra Content */}
          <FormKit.Panel
            extra={
              <div>
                <IconButton
                  icon={ { value: 'refresh' } }
                  title="Refresh settings"
                />
                <IconButton
                  icon={ { value: 'settings' } }
                  title="Advanced options"
                />
              </div>
            }
            theme="card-with-highlight"
            title="Panel with Extra Actions"
          >
            <Form.Item
              label="Theme Selection"
              tooltip="Panel with action buttons in the header"
            >
              <Select
                onChange={ (value) => { handleChange('userPreferences', null, 'theme', value) } }
                options={ [
                  { value: 'light', label: 'Light Theme' },
                  { value: 'dark', label: 'Dark Theme' },
                  { value: 'auto', label: 'Auto (System)' }
                ] }
                value={ formData.userPreferences.theme }
              />
            </Form.Item>

            <Form.Item label="Language">
              <Select
                onChange={ (value) => { handleChange('userPreferences', null, 'language', value) } }
                options={ [
                  { value: 'en', label: 'English' },
                  { value: 'de', label: 'Deutsch' },
                  { value: 'fr', label: 'Français' }
                ] }
                value={ formData.userPreferences.language }
              />
            </Form.Item>
          </FormKit.Panel>

          {/* Panel with Tabs Inside */}
          <FormKit.Panel
            theme="fieldset"
            title="Panel with Nested Tabs"
          >
            <FormKit.TabPanel
              items={ [
                {
                  key: 'api-config',
                  label: 'API Configuration',
                  icon: <Icon value="api" />,
                  children: (
                    <div>
                      <Form.Item label="API Endpoint">
                        <Input
                          onChange={ (e) => { handleChange('nestedConfig', 'api', 'endpoint', e.target.value) } }
                          placeholder="Enter API endpoint URL..."
                          value={ formData.nestedConfig.api.endpoint }
                        />
                      </Form.Item>

                      <Form.Item label="Timeout (ms)">
                        <InputNumber
                          min={ 1000 }
                          onChange={ (value) => { handleChange('nestedConfig', 'api', 'timeout', value ?? 5000) } }
                          placeholder="Request timeout in milliseconds"
                          value={ formData.nestedConfig.api.timeout }
                        />
                      </Form.Item>
                    </div>
                  )
                },
                {
                  key: 'db-config',
                  label: 'Database',
                  icon: <Icon value="database" />,
                  children: (
                    <div>
                      <Form.Item label="Database Host">
                        <Input
                          onChange={ (e) => { handleChange('nestedConfig', 'database', 'host', e.target.value) } }
                          placeholder="Enter database host..."
                          value={ formData.nestedConfig.database.host }
                        />
                      </Form.Item>

                      <Form.Item label="Port">
                        <InputNumber
                          max={ 65535 }
                          min={ 1 }
                          onChange={ (value) => { handleChange('nestedConfig', 'database', 'port', value ?? 3306) } }
                          placeholder="Database port"
                          value={ formData.nestedConfig.database.port }
                        />
                      </Form.Item>
                    </div>
                  )
                }
              ] }
              size="small"
            />
          </FormKit.Panel>

          {/* Nested Panels Structure */}
          <FormKit.Panel
            theme="card-with-highlight"
            title="Nested Panel Structure"
          >
            <FormKit.Panel
              theme="fieldset"
              title="Connection Settings"
            >
              <Form.Item label="Enable SSL">
                <Switch
                  labelRight="Use SSL/TLS encryption"
                />
              </Form.Item>
            </FormKit.Panel>

            <FormKit.Panel
              border
              title="Authentication"
            >
              <Form.Item label="Username">
                <Input placeholder="Enter username..." />
              </Form.Item>

              <Form.Item label="Password">
                <InputPassword placeholder="Enter password..." />
              </Form.Item>
            </FormKit.Panel>
          </FormKit.Panel>

          {/* Panel with different extra positions */}
          <FormKit.Panel
            extra={ <Button
              size="small"
              type="link"
                    >Configure</Button> }
            extraPosition="start"
            title="Panel with Extra at Start"
          >
            <Form.Item label="Quick Configuration">
              <Switch
                labelRight="Use quick setup wizard"
              />
            </Form.Item>
          </FormKit.Panel>
        </FormKit>

        <div style={ {
          marginTop: '24px',
          padding: '16px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          fontSize: '12px',
          fontFamily: 'monospace'
        } }
        >
          <h4 style={ { margin: '0 0 12px 0', fontFamily: 'inherit' } }>Advanced Panel Options Demonstrated:</h4>
          <ul style={ { margin: '0', paddingLeft: '16px', fontFamily: 'inherit', fontSize: '13px' } }>
            <li><strong>No Title:</strong> Clean panels without header for seamless content flow</li>
            <li><strong>With Border:</strong> Explicit border styling for enhanced visual separation</li>
            <li><strong>Collapsible:</strong> Expandable panels for optional/advanced settings</li>
            <li><strong>Extra Content:</strong> Action buttons and controls in panel headers</li>
            <li><strong>Nested Tabs:</strong> TabPanel components inside regular panels</li>
            <li><strong>Nested Panels:</strong> Multiple levels of panel organization</li>
            <li><strong>Extra Positioning:</strong> Control placement of header extra content</li>
          </ul>
        </div>
      </Content>
    </ContentLayout>
  )
}

export const AdvancedPanelOptions: Story = {
  render: () => <AdvancedPanelOptionsExample />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase of advanced FormKit panel options and configurations. Demonstrates panels without titles, with borders, collapsible functionality, extra header content, nested tabs, and multi-level panel structures. These advanced options provide maximum flexibility for creating complex, hierarchical form layouts.'
      }
    }
  }
}

// Real-world Configuration Example
const ConfigurationFormExample = (): React.JSX.Element => {
  const [config, setConfig] = useState({
    general: {
      siteName: 'My Pimcore Site',
      timezone: 'Europe/Berlin',
      maintenance: false
    },
    performance: {
      caching: true,
      compression: true,
      minification: false,
      cacheLifetime: 3600
    },
    email: {
      smtp: {
        enabled: false,
        host: '',
        port: 587,
        encryption: 'tls'
      },
      templates: {
        footer: 'Best regards,\nYour Team'
      }
    },
    security: {
      twoFactor: false,
      sessionTimeout: 1800,
      passwordPolicy: 'medium'
    }
  })

  const handleConfigChange = (section: string, subsection: string | null, field: string, value: any): void => {
    setConfig(prev => {
      if (subsection !== null && subsection !== '') {
        return {
          ...prev,
          [section]: {
            ...prev[section as keyof typeof prev],
            [subsection]: {
              ...(prev[section as keyof typeof prev] as any)[subsection],
              [field]: value
            }
          }
        }
      } else {
        return {
          ...prev,
          [section]: {
            ...prev[section as keyof typeof prev],
            [field]: value
          }
        }
      }
    })
  }

  return (
    <ContentLayout
      renderToolbar={ (
        <Toolbar justify="space-between">
          <div>
            <strong>System Configuration</strong>
          </div>
          <div>
            <Button
              onClick={ () => { console.log('💾 Saving configuration...', config) } }
              type="primary"
            >Save Configuration</Button>
          </div>
        </Toolbar>
      ) }
    >
      <Content
        padded
        padding={ { x: 'small', y: 'none' } }
      >
        <FormKit>
          {/* Quick settings without title for immediate access */}
          <FormKit.Panel>
            <Form.Item
              label="Site Name"
              tooltip="Quick access to essential settings"
            >
              <Input
                onChange={ (e) => { handleConfigChange('general', null, 'siteName', e.target.value) } }
                value={ config.general.siteName }
              />
            </Form.Item>

            <Form.Item label="Maintenance Mode">
              <Switch
                checked={ config.general.maintenance }
                labelRight="Enable maintenance mode"
                onChange={ (checked) => { handleConfigChange('general', null, 'maintenance', checked) } }
              />
            </Form.Item>
          </FormKit.Panel>

          {/* Performance settings with monitoring actions */}
          <FormKit.Panel
            extra={
              <div>
                <Button
                  size="small"
                  type="link"
                >View Stats</Button>
                <IconButton
                  icon={ { value: 'refresh' } }
                  size="small"
                  title="Clear cache"
                />
              </div>
            }
            theme="card-with-highlight"
            title="Performance Settings"
          >
            <FormKit.Panel
              theme="fieldset"
              title="Caching Options"
            >
              <Form.Item label="Enable Caching">
                <Switch
                  checked={ config.performance.caching }
                  labelRight="Enable application caching"
                  onChange={ (checked) => { handleConfigChange('performance', null, 'caching', checked) } }
                />
              </Form.Item>

              <Form.Item label="Cache Lifetime (seconds)">
                <InputNumber
                  min={ 300 }
                  onChange={ (value) => { handleConfigChange('performance', null, 'cacheLifetime', value ?? 3600) } }
                  value={ config.performance.cacheLifetime }
                />
              </Form.Item>
            </FormKit.Panel>

            <FormKit.Panel
              border
              title="Optimization"
            >
              <Form.Item label="Enable Compression">
                <Switch
                  checked={ config.performance.compression }
                  labelRight="Enable gzip compression"
                  onChange={ (checked) => { handleConfigChange('performance', null, 'compression', checked) } }
                />
              </Form.Item>

              <Form.Item label="Minify Assets">
                <Switch
                  checked={ config.performance.minification }
                  labelRight="Minify CSS and JavaScript files"
                  onChange={ (checked) => { handleConfigChange('performance', null, 'minification', checked) } }
                />
              </Form.Item>
            </FormKit.Panel>
          </FormKit.Panel>

          {/* Email configuration with nested tabs */}
          <FormKit.Panel
            border
            theme="fieldset"
          >
            <FormKit.TabPanel
              items={ [
                {
                  key: 'smtp',
                  label: 'SMTP Settings',
                  icon: <Icon value="mail" />,
                  children: (
                    <div>
                      <Form.Item label="Enable SMTP">
                        <Switch
                          checked={ config.email.smtp.enabled }
                          labelRight="Use SMTP for email delivery"
                          onChange={ (checked) => { handleConfigChange('email', 'smtp', 'enabled', checked) } }
                        />
                      </Form.Item>

                      { config.email.smtp.enabled && (
                        <>
                          <Form.Item label="SMTP Host">
                            <Input
                              onChange={ (e) => { handleConfigChange('email', 'smtp', 'host', e.target.value) } }
                              placeholder="smtp.example.com"
                              value={ config.email.smtp.host }
                            />
                          </Form.Item>

                          <Form.Item label="Port">
                            <InputNumber
                              max={ 65535 }
                              min={ 1 }
                              onChange={ (value) => { handleConfigChange('email', 'smtp', 'port', value ?? 587) } }
                              value={ config.email.smtp.port }
                            />
                          </Form.Item>

                          <Form.Item label="Encryption">
                            <Select
                              onChange={ (value) => { handleConfigChange('email', 'smtp', 'encryption', value) } }
                              options={ [
                                { value: 'none', label: 'None' },
                                { value: 'tls', label: 'TLS' },
                                { value: 'ssl', label: 'SSL' }
                              ] }
                              value={ config.email.smtp.encryption }
                            />
                          </Form.Item>
                        </>
                      )}
                    </div>
                  )
                },
                {
                  key: 'templates',
                  label: 'Templates',
                  icon: <Icon value="template" />,
                  children: (
                    <div>
                      <Form.Item label="Email Footer">
                        <TextArea
                          onChange={ (e) => { handleConfigChange('email', 'templates', 'footer', e.target.value) } }
                          placeholder="Enter default email footer..."
                          rows={ 3 }
                          value={ config.email.templates.footer }
                        />
                      </Form.Item>
                    </div>
                  )
                }
              ] }
              size="small"
            />
          </FormKit.Panel>

          {/* Collapsible security settings */}
          <FormKit.Panel
            collapsed
            collapsible
            extra={
              <IconButton
                icon={ { value: 'shield' } }
                size="small"
                title="Security audit"
              />
            }
            theme="card-with-highlight"
            title="Security Settings"
          >
            <Form.Item label="Two-Factor Authentication">
              <Switch
                checked={ config.security.twoFactor }
                labelRight="Require 2FA for admin users"
                onChange={ (checked) => { handleConfigChange('security', null, 'twoFactor', checked) } }
              />
            </Form.Item>

            <Form.Item label="Session Timeout (seconds)">
              <InputNumber
                max={ 86400 }
                min={ 300 }
                onChange={ (value) => { handleConfigChange('security', null, 'sessionTimeout', value ?? 1800) } }
                value={ config.security.sessionTimeout }
              />
            </Form.Item>

            <Form.Item label="Password Policy">
              <Select
                onChange={ (value) => { handleConfigChange('security', null, 'passwordPolicy', value) } }
                options={ [
                  { value: 'weak', label: 'Weak - No requirements' },
                  { value: 'medium', label: 'Medium - Basic requirements' },
                  { value: 'strong', label: 'Strong - Complex requirements' }
                ] }
                value={ config.security.passwordPolicy }
              />
            </Form.Item>
          </FormKit.Panel>
        </FormKit>

        <div style={ {
          marginTop: '24px',
          padding: '16px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          fontSize: '12px',
          fontFamily: 'monospace'
        } }
        >
          <h4 style={ { margin: '0 0 12px 0', fontFamily: 'inherit' } }>Real-world Panel Usage Pattern:</h4>
          <ul style={ { margin: '0', paddingLeft: '16px', fontFamily: 'inherit', fontSize: '13px' } }>
            <li><strong>Quick Settings:</strong> No title for immediate, essential settings</li>
            <li><strong>Feature Sections:</strong> Titles with action buttons for monitoring/management</li>
            <li><strong>Grouped Options:</strong> Nested panels within main sections</li>
            <li><strong>Complex Configuration:</strong> Tabs within panels for multi-faceted settings</li>
            <li><strong>Advanced Features:</strong> Collapsible panels for optional/expert settings</li>
            <li><strong>Conditional Fields:</strong> Dynamic form fields based on toggle states</li>
          </ul>
        </div>
      </Content>
    </ContentLayout>
  )
}

export const ConfigurationForm: Story = {
  render: () => <ConfigurationFormExample />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Real-world example of a system configuration form demonstrating practical usage of advanced panel features. Shows how to combine panels without titles for quick settings, nested panels for grouped options, tabs within panels for complex configuration, collapsible panels for advanced settings, and conditional form fields. This pattern is ideal for admin interfaces and configuration screens.'
      }
    }
  }
}
