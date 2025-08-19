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
  title: 'Components/Data Entry/Form/Examples',
  component: FormKit,
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
  <FormKit.Panel>
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
)

const SEOTab = ({ formData, setFormData }: { formData: FormData, setFormData: (data: FormData) => void }): React.JSX.Element => (
  <FormKit.Panel>
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
)

const AdvancedTab = ({ formData, setFormData }: { formData: FormData, setFormData: (data: FormData) => void }): React.JSX.Element => (
  <FormKit.Panel>
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

    <Form.Item label="Cache Lifetime (seconds)">
      <Input
        onChange={ (e) => { setFormData({ ...formData, cacheLifetime: e.target.value }) } }
        placeholder="3600"
        type="number"
        value={ formData.cacheLifetime }
      />
    </Form.Item>

    <Form.Item label="Custom CSS Classes">
      <Input
        onChange={ (e) => { setFormData({ ...formData, customClasses: e.target.value }) } }
        placeholder="custom-class another-class"
        value={ formData.customClasses }
      />
    </Form.Item>

    <Form.Item label="Hide in Navigation">
      <Switch
        checked={ formData.hideInNavigation }
        onChange={ (checked) => { setFormData({ ...formData, hideInNavigation: checked }) } }
      />
    </Form.Item>
  </FormKit.Panel>
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

export const _default: Story = {
  render: () => <Example />,
  parameters: {
    layout: 'fullscreen'
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
          <FormKit.Panel title="Text Controls">
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

          <FormKit.Panel title="Selection Controls">
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

          <FormKit.Panel title="Date, Time & Color Controls">
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

          <FormKit.Panel title="Lists & Range Controls">
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
    layout: 'fullscreen'
  }
}
