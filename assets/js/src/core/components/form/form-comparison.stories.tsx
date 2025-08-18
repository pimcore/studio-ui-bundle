/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is a  )
}

const FormControlsShowcaseExample = (): React.JSX.Element => {
  const [formData, setFormData] = useState<ComparisonFormData>({
    title: '',
    description: '',
    category: '',
    priority: 1,
    isPublic: false
  })

  return (
    <div>
      <h2>Standard Form Controls Showcase</h2>
      
      <Form layout="vertical">
        <h3>Text Input Controls</h3>
        
        <Form.Item label="Full Width Field" required>
          <Input
            onChange={(e) => { setFormData({ ...formData, title: e.target.value }) }}
            placeholder="Standard input with manual styling"
            value={formData.title}
          />
        </Form.Item>

        <Form.Item label="Text Area with Manual Spacing">
          <TextArea
            onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }}
            placeholder="Requires manual gap and alignment management"
            rows={3}
            value={formData.description}
          />
        </Form.Item>

        <h3>Selection and Number Controls</h3>
        
        <Form.Item label="Select Field">
          <Select
            onChange={(value) => { setFormData({ ...formData, category: value }) }}
            options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' }
            ]}
            placeholder="Manual width management required"
            value={formData.category}
          />
        </Form.Item>

        <Form.Item label="Number Input">
          <InputNumber
            onChange={(value) => { 
              let numValue = 1
              if (typeof value === 'number') {
                numValue = value
              }
              setFormData({ ...formData, priority: numValue }) 
            }}
            placeholder="Custom sizing needed"
            value={formData.priority}
          />
        </Form.Item>

        <h3>Toggle Controls</h3>
        
        <Form.Item label="Feature Toggle">
          <Switch
            checked={formData.isPublic}
            onChange={(checked) => { setFormData({ ...formData, isPublic: checked }) }}
          />
        </Form.Item>

        <Space>
          <Button>Cancel</Button>
          <Button type="primary">Save Changes</Button>
        </Space>
      </Form>
    </div>
  )
}

export const FormControlsShowcase: Story = {
  render: () => <FormControlsShowcaseExample />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `Comprehensive showcase of standard Form component with all common controls:

**Controls Demonstrated:**
- **Input**: Standard text input with manual placeholder and styling
- **TextArea**: Multi-line text input requiring manual row configuration
- **Select**: Dropdown selection with custom options array
- **InputNumber**: Numeric input with manual validation handling
- **Switch**: Toggle control with basic checked state management

**Characteristics of Standard Form:**
- **Manual styling**: Requires explicit layout and spacing management
- **Basic functionality**: Core Ant Design Form features without enhancements
- **Custom width management**: No automatic field width context system
- **Direct control**: Full control over every aspect of form behavior and appearance
- **Lightweight**: Minimal overhead, just core form functionality

This demonstrates the foundational form capabilities that FormKit builds upon.`
      }
    }
  }
}

const FormKitEnhancementsExample = (): React.JSX.Element => {able in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Form } from './form'
import { FormKit } from './form-kit'
import { Input } from '../input/input'
import { InputNumber } from '../input-number/input-number'
import { TextArea } from '../textarea/textarea'
import { Select } from '../select/select'
import { Switch } from '../switch/switch'
import { Button } from '../button/button'
import { Space } from '../space/space'
import { ContentLayout } from '../content-layout/content-layout'
import { Content } from '../content/content'
import { Toolbar } from '../toolbar/toolbar'

const config: Meta = {
  title: 'Components/Data Entry/Form/Comparison',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Side-by-side comparison of the standard Form component versus FormKit to help you choose the right approach for your use case.'
      }
    }
  },
  tags: ['autodocs']
}

export default config
type Story = StoryObj<typeof config>

interface ComparisonFormData {
  title: string
  description: string
  category: string
  priority: number
  isPublic: boolean
}

const BasicFormExample = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState<ComparisonFormData>({
    title: '',
    description: '',
    category: '',
    priority: 1,
    isPublic: false
  })

  const onFinish = (values: ComparisonFormData): void => {
    console.log('Basic Form submitted:', values)
  }

  const onValuesChange = (changedValues: Partial<ComparisonFormData>, allValues: ComparisonFormData): void => {
    setFormValues(allValues)
  }

  return (
    <div>
      <h3>Standard Form</h3>

      <Form
        form={form}
        initialValues={formValues}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input a title!' }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <TextArea
            placeholder="Enter description"
            rows={3}
          />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
        >
          <Select
            options={[
              { value: 'news', label: 'News' },
              { value: 'blog', label: 'Blog' },
              { value: 'page', label: 'Page' }
            ]}
            placeholder="Select category"
          />
        </Form.Item>

        <Form.Item
          label="Priority"
          name="priority"
        >
          <InputNumber
            max={10}
            min={1}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          label="Public"
          name="isPublic"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>

      <Space>
        <Button
          onClick={() => { form.validateFields().then(onFinish) }}
          type="primary"
        >
          Submit
        </Button>
        <Button onClick={() => { form.resetFields() }}>
          Reset
        </Button>
      </Space>
    </div>
  )
}

const FormKitExample = (): React.JSX.Element => {
  const [formData, setFormData] = useState<ComparisonFormData>({
    title: '',
    description: '',
    category: '',
    priority: 1,
    isPublic: false
  })

  const handleSave = (): void => {
    console.log('FormKit submitted:', formData)
  }

  const handleReset = (): void => {
    setFormData({
      title: '',
      description: '',
      category: '',
      priority: 1,
      isPublic: false
    })
  }

  return (
    <div>
      <h3>FormKit</h3>

      <FormKit>
        <Form.Item
          label="Title"
          required
        >
          <Input
            onChange={(e) => { setFormData({ ...formData, title: e.target.value }) }}
            placeholder="Enter title"
            value={formData.title}
          />
        </Form.Item>

        <Form.Item label="Description">
          <TextArea
            onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }}
            placeholder="Enter description"
            rows={3}
            value={formData.description}
          />
        </Form.Item>

        <Form.Item label="Category">
          <Select
            onChange={(value) => { setFormData({ ...formData, category: value }) }}
            options={[
              { value: 'news', label: 'News' },
              { value: 'blog', label: 'Blog' },
              { value: 'page', label: 'Page' }
            ]}
            placeholder="Select category"
            value={formData.category}
          />
        </Form.Item>

        <Form.Item label="Priority">
          <InputNumber
            max={10}
            min={1}
            onChange={(value) => { 
              let numValue = 1
              if (typeof value === 'number') {
                numValue = value
              } else if (typeof value === 'string') {
                numValue = parseInt(value, 10)
              }
              setFormData({ ...formData, priority: numValue }) 
            }}
            value={formData.priority}
          />
        </Form.Item>

        <Form.Item label="Public">
          <Switch
            checked={formData.isPublic}
            onChange={(checked) => { setFormData({ ...formData, isPublic: checked }) }}
          />
        </Form.Item>
      </FormKit>

      <Space>
        <Button
          onClick={handleSave}
          type="primary"
        >
          Submit
        </Button>
        <Button onClick={handleReset}>
          Reset
        </Button>
      </Space>
    </div>
  )
}

const ToggleComparisonExample = (): React.JSX.Element => {
  const [showFormKit, setShowFormKit] = useState(false)

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <Space size="large">
          <Button
            onClick={() => { setShowFormKit(false) }}
            type={!showFormKit ? 'primary' : 'default'}
          >
            Standard Form
          </Button>
          <Button
            onClick={() => { setShowFormKit(true) }}
            type={showFormKit ? 'primary' : 'default'}
          >
            FormKit
          </Button>
        </Space>
      </div>

      {!showFormKit ? <BasicFormExample /> : <FormKitExample />}
    </div>
  )
}

export const SideBySideComparison: Story = {
  render: () => <ToggleComparisonExample />,
  parameters: {
    docs: {
      description: {
        story: `Toggle between the two form approaches to see the differences:

**📖 Documentation Links:**
- [Standard Form Documentation](?path=/docs/components-data-entry-form-basic-form--docs)
- [FormKit Documentation](?path=/docs/components-data-entry-form-formkit--docs)

**🔄 Relationship:**
- **Standard Form:** Foundation component - pure Ant Design functionality with maximum flexibility
- **FormKit:** Enhanced version - includes all Form features + structured layouts, consistent styling, and admin UI patterns

**📋 Decision Guide:**

**Use Standard Form When:**
- **Inline forms** - Small forms within other components
- **Custom styling** - Need complete control over appearance
- **External integrations** - Working with third-party form libraries
- **Unique layouts** - Complex custom positioning requirements
- **Modal dialogs** - Simple forms in popups/modals
- **Quick prototypes** - Rapid development and testing

**Use FormKit When:**
- **Admin interfaces** - Standard Pimcore admin forms
- **Content editors** - Document, asset, data object forms
- **Settings pages** - Configuration and preference forms
- **Consistent styling** - Want predefined Pimcore styling
- **Multi-section forms** - Need panels or tabs for organization
- **Standard field widths** - Benefit from width context system

Use the toggle buttons above to switch between implementations and compare the differences in structure and styling.`
      }
    }
  }
}

const FormKitTabsExample = (): React.JSX.Element => {
  const [formData, setFormData] = useState<ComparisonFormData & { seoTitle: string, tags: string[] }>({
    title: '',
    description: '',
    category: '',
    priority: 1,
    isPublic: false,
    seoTitle: '',
    tags: []
  })

  return (
    <ContentLayout
      renderToolbar={(
        <Toolbar justify="space-between">
          <div style={{ fontSize: '14px', fontWeight: 600 }}>
            FormKit Advanced Layout
          </div>
          <Button type="primary">
            Save All Sections
          </Button>
        </Toolbar>
      )}
    >
      <Content
        padded
        padding={{ x: 'small', y: 'none' }}
      >
        <FormKit>
          <FormKit.TabPanel
            items={[
              {
                key: 'content',
                label: 'Content',
                children: (
                  <FormKit.Panel>
                    <Form.Item
                      label="Title"
                      required
                    >
                      <Input
                        onChange={(e) => { setFormData({ ...formData, title: e.target.value }) }}
                        placeholder="Enter title"
                        value={formData.title}
                      />
                    </Form.Item>

                    <Form.Item label="Description">
                      <TextArea
                        onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }}
                        placeholder="Enter description"
                        rows={4}
                        value={formData.description}
                      />
                    </Form.Item>

                    <Form.Item label="Category">
                      <Select
                        onChange={(value) => { setFormData({ ...formData, category: value }) }}
                        options={[
                          { value: 'news', label: 'News' },
                          { value: 'blog', label: 'Blog' },
                          { value: 'page', label: 'Page' }
                        ]}
                        placeholder="Select category"
                        value={formData.category}
                      />
                    </Form.Item>
                  </FormKit.Panel>
                )
              },
              {
                key: 'settings',
                label: 'Settings',
                children: (
                  <FormKit.Panel>
                    <Form.Item label="Priority">
                      <InputNumber
                        max={10}
                        min={1}
                        onChange={(value) => { 
                          let numValue = 1
                          if (typeof value === 'number') {
                            numValue = value
                          } else if (typeof value === 'string') {
                            numValue = parseInt(value, 10)
                          }
                          setFormData({ ...formData, priority: numValue }) 
                        }}
                        value={formData.priority}
                      />
                    </Form.Item>

                    <Form.Item label="Public">
                      <Switch
                        checked={formData.isPublic}
                        labelRight="Make this content publicly visible"
                        onChange={(checked) => { setFormData({ ...formData, isPublic: checked }) }}
                      />
                    </Form.Item>
                  </FormKit.Panel>
                )
              },
              {
                key: 'seo',
                label: 'SEO',
                children: (
                  <FormKit.Panel>
                    <Form.Item label="SEO Title">
                      <Input
                        onChange={(e) => { setFormData({ ...formData, seoTitle: e.target.value }) }}
                        placeholder="Enter SEO optimized title"
                        value={formData.seoTitle}
                      />
                    </Form.Item>
                  </FormKit.Panel>
                )
              }
            ]}
          />
        </FormKit>
      </Content>
    </ContentLayout>
  )
}

export const FormKitAdvancedFeatures: Story = {
  render: () => <FormKitTabsExample />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `Advanced FormKit example demonstrating complex form organization with tabbed navigation:

**Advanced Features Shown:**
- **FormKit.TabPanel**: Multi-section navigation with organized content tabs
- **Complex form organization**: Content, Settings, and SEO sections in separate tabs
- **Full-screen layout**: Complete admin interface with toolbar and content areas
- **Form state management**: Unified state across multiple tab sections

This demonstrates capabilities that would require significant custom implementation with the standard Form component, but are built-in with FormKit for complex admin interfaces.`
      }
    }
  }
}

const FormKitEnhancementsExample = (): React.JSX.Element => {
  const [formData, setFormData] = useState<ComparisonFormData>({
    title: '',
    description: '',
    category: '',
    priority: 1,
    isPublic: false
  })

  return (
    <div>
      <h2>FormKit Enhanced Features Demo</h2>

      <ContentLayout
        renderToolbar={(
          <Toolbar justify="space-between">
            <div>Enhanced Form Layout</div>
            <Space>
              <Button>Cancel</Button>
              <Button type="primary">Save Changes</Button>
            </Space>
          </Toolbar>
        )}
      >
        <Content padded padding={{ x: 'small', y: 'none' }}>
          <FormKit>
            <FormKit.Panel title="Automatic Consistent Styling">
              <Form.Item label="Full Width Field" required>
                <Input
                  onChange={(e) => { setFormData({ ...formData, title: e.target.value }) }}
                  placeholder="Notice the consistent spacing and styling"
                  value={formData.title}
                />
              </Form.Item>

              <Form.Item label="Text Area with Proper Spacing">
                <TextArea
                  onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }}
                  placeholder="All fields maintain consistent gaps and alignment"
                  rows={3}
                  value={formData.description}
                />
              </Form.Item>
            </FormKit.Panel>

            <FormKit.Panel title="Field Width Context & Providers">
              <Form.Item label="Select Field">
                <Select
                  onChange={(value) => { setFormData({ ...formData, category: value }) }}
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' }
                  ]}
                  placeholder="Inherits width from context"
                  value={formData.category}
                />
              </Form.Item>

              <Form.Item label="Number Input">
                <InputNumber
                  onChange={(value) => { 
                    let numValue = 1
                    if (typeof value === 'number') {
                      numValue = value
                    }
                    setFormData({ ...formData, priority: numValue }) 
                  }}
                  placeholder="Consistent sizing"
                  value={formData.priority}
                />
              </Form.Item>
            </FormKit.Panel>

            <FormKit.Panel title="Enhanced Switch Component">
              <Form.Item label="Feature Toggle">
                <Switch
                  checked={formData.isPublic}
                  labelRight="Enable this feature with proper right-aligned label"
                  onChange={(checked) => { setFormData({ ...formData, isPublic: checked }) }}
                />
              </Form.Item>
            </FormKit.Panel>
          </FormKit>
        </Content>
      </ContentLayout>
    </div>
  )
}

export const FormKitEnhancements: Story = {
  render: () => <FormKitEnhancementsExample />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `Detailed demonstration of FormKit's enhanced features built on top of standard Form functionality:

**Enhanced Features Demonstrated:**
- **FieldWidthProvider**: Standardized field width context (small: 200px, medium: 300px, large: 900px)
- **Automatic Form styling**: ConfigProvider with itemMarginBottom: 0 for consistent spacing
- **Panel organization**: Structured sections with automatic styling and proper visual hierarchy
- **Enhanced component integration**: Works seamlessly with enhanced components like Switch with \`labelRight\`
- **Toolbar integration**: Built-in action bar with proper positioning via ContentLayout
- **Admin UI compliance**: Automatic adherence to Pimcore design patterns

This shows FormKit's advanced capabilities for building complex admin interfaces while maintaining all the functionality of the standard Form component.`
      }
    }
  }
}

const ControlsComparisonExample = (): React.JSX.Element => {
  const [formData, setFormData] = useState<ComparisonFormData>({
    title: '',
    description: '',
    category: '',
    priority: 1,
    isPublic: false
  })

  const [formKitData, setFormKitData] = useState<ComparisonFormData>({
    title: '',
    description: '',
    category: '',
    priority: 1,
    isPublic: false
  })

  return (
    <div>
      <h2>Side-by-Side Controls Comparison</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div>
          <h3>Standard Form</h3>
          <Form layout="vertical">
            <Form.Item label="Title" required>
              <Input
                onChange={(e) => { setFormData({ ...formData, title: e.target.value }) }}
                placeholder="Standard input styling"
                value={formData.title}
              />
            </Form.Item>

            <Form.Item label="Description">
              <TextArea
                onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }}
                placeholder="Manual spacing management"
                rows={3}
                value={formData.description}
              />
            </Form.Item>

            <Form.Item label="Category">
              <Select
                onChange={(value) => { setFormData({ ...formData, category: value }) }}
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' }
                ]}
                placeholder="Custom width needed"
                value={formData.category}
              />
            </Form.Item>

            <Form.Item label="Priority">
              <InputNumber
                onChange={(value) => { 
                  let numValue = 1
                  if (typeof value === 'number') {
                    numValue = value
                  }
                  setFormData({ ...formData, priority: numValue }) 
                }}
                placeholder="Manual sizing"
                value={formData.priority}
              />
            </Form.Item>

            <Form.Item label="Public">
              <Switch
                checked={formData.isPublic}
                onChange={(checked) => { setFormData({ ...formData, isPublic: checked }) }}
              />
            </Form.Item>

            <Space>
              <Button>Cancel</Button>
              <Button type="primary">Save</Button>
            </Space>
          </Form>
        </div>

        <div>
          <h3>FormKit</h3>
          <FormKit>
            <FormKit.Panel title="Enhanced Form Controls">
              <Form.Item label="Title" required>
                <Input
                  onChange={(e) => { setFormKitData({ ...formKitData, title: e.target.value }) }}
                  placeholder="Consistent styling automatically"
                  value={formKitData.title}
                />
              </Form.Item>

              <Form.Item label="Description">
                <TextArea
                  onChange={(e) => { setFormKitData({ ...formKitData, description: e.target.value }) }}
                  placeholder="Automatic spacing and alignment"
                  rows={3}
                  value={formKitData.description}
                />
              </Form.Item>

              <Form.Item label="Category">
                <Select
                  onChange={(value) => { setFormKitData({ ...formKitData, category: value }) }}
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' }
                  ]}
                  placeholder="Width from context provider"
                  value={formKitData.category}
                />
              </Form.Item>

              <Form.Item label="Priority">
                <InputNumber
                  onChange={(value) => { 
                    let numValue = 1
                    if (typeof value === 'number') {
                      numValue = value
                    }
                    setFormKitData({ ...formKitData, priority: numValue }) 
                  }}
                  placeholder="Consistent sizing"
                  value={formKitData.priority}
                />
              </Form.Item>

              <Form.Item label="Public">
                <Switch
                  checked={formKitData.isPublic}
                  labelRight="Enhanced switch with right label"
                  onChange={(checked) => { setFormKitData({ ...formKitData, isPublic: checked }) }}
                />
              </Form.Item>

              <Space>
                <Button>Cancel</Button>
                <Button type="primary">Save</Button>
              </Space>
            </FormKit.Panel>
          </FormKit>
        </div>
      </div>
    </div>
  )
}

export const ControlsComparison: Story = {
  render: () => <ControlsComparisonExample />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `Direct side-by-side comparison showing identical controls in both Form and FormKit:

**Visual Differences You'll Notice:**
- **Field spacing**: FormKit provides more consistent vertical spacing between fields
- **Field widths**: FormKit automatically manages field widths through context provider
- **Panel structure**: FormKit organizes content in structured panels with titles
- **Component enhancements**: FormKit version shows Switch with \`labelRight\` capability
- **Overall consistency**: FormKit maintains better visual hierarchy and alignment

**Same Functionality, Enhanced Experience:**
Both forms have identical state management and functionality, but FormKit provides:
- Automatic design system compliance
- Better visual consistency
- Enhanced component variants
- Structured content organization
- Built-in admin UI patterns

This comparison demonstrates FormKit as an enhanced version of Form, not a replacement - you get all the same capabilities with additional polish and structure.`
      }
    }
  }
}

const SimpleFormKitExample = (): React.JSX.Element => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [showFormKit, setShowFormKit] = useState(false)

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <Space size="large">
          <Button
            onClick={() => { setShowFormKit(false) }}
            type={!showFormKit ? 'primary' : 'default'}
          >
            Standard Form
          </Button>
          <Button
            onClick={() => { setShowFormKit(true) }}
            type={showFormKit ? 'primary' : 'default'}
          >
            FormKit (No Panels)
          </Button>
        </Space>
      </div>

      {!showFormKit ? (
        <div>
          <h3>Standard Form (Simple)</h3>
          <Form layout="vertical">
            <Form.Item label="Name">
              <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item label="Email">
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item label="Message">
              <TextArea
                placeholder="Enter your message"
                rows={3}
              />
            </Form.Item>
          </Form>
          <Button type="primary">Submit</Button>
        </div>
      ) : (
        <div>
          <h3>FormKit (No Panels)</h3>
          <FormKit>
            <Form.Item label="Name">
              <Input
                onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }}
                placeholder="Enter your name"
                value={formData.name}
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input
                onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }}
                placeholder="Enter your email"
                value={formData.email}
              />
            </Form.Item>
            <Form.Item label="Message">
              <TextArea
                onChange={(e) => { setFormData({ ...formData, message: e.target.value }) }}
                placeholder="Enter your message"
                rows={3}
                value={formData.message}
              />
            </Form.Item>
          </FormKit>
          <Button type="primary">Submit</Button>
        </div>
      )}
    </div>
  )
}

export const SimpleFormKitComparison: Story = {
  render: () => <SimpleFormKitExample />,
  parameters: {
    docs: {
      description: {
        story: `Toggle between implementations to see FormKit as a simple drop-in replacement for Form:

**Key Points:**
- FormKit works without any panel structure required
- Provides subtle styling improvements (consistent spacing, field width context)
- Same form structure as standard Form but with built-in Pimcore design patterns
- Perfect for upgrading existing forms to get consistent styling automatically

Use the toggle buttons to switch between the two implementations and notice the subtle but important styling differences. This demonstrates that you can use FormKit anywhere you'd use Form, with immediate benefits.`
      }
    }
  }
}

const DecisionGuideComponent = (): React.JSX.Element => {
  return (
    <div>
      <h2>When to Use Form vs FormKit</h2>
      
      <div>
        <div>
          <h3>Use Standard Form When:</h3>
          <ul>
            <li><strong>Inline forms</strong> - Small forms within other components</li>
            <li><strong>Custom styling</strong> - Need complete control over appearance</li>
            <li><strong>External integrations</strong> - Working with third-party form libraries</li>
            <li><strong>Unique layouts</strong> - Complex custom positioning requirements</li>
            <li><strong>Modal dialogs</strong> - Simple forms in popups/modals</li>
            <li><strong>Quick prototypes</strong> - Rapid development and testing</li>
          </ul>
        </div>

        <div>
          <h3>Use FormKit When:</h3>
          <ul>
            <li><strong>Admin interfaces</strong> - Standard Pimcore admin forms</li>
            <li><strong>Content editors</strong> - Document, asset, data object forms</li>
            <li><strong>Settings pages</strong> - Configuration and preference forms</li>
            <li><strong>Consistent styling</strong> - Want predefined Pimcore styling</li>
            <li><strong>Multi-section forms</strong> - Need panels or tabs for organization</li>
            <li><strong>Standard field widths</strong> - Benefit from width context system</li>
          </ul>
        </div>
      </div>

      <div>
        <div>
          <strong>Key Relationship:</strong>
          <br />
          <strong>Form:</strong> Foundation component - pure Ant Design functionality with maximum flexibility
          <br />
          <strong>FormKit:</strong> Enhanced version - includes all Form features + structured layouts, consistent styling, and admin UI patterns
        </div>
      </div>
    </div>
  )
}

export const DecisionGuide: Story = {
  render: () => <DecisionGuideComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Decision guide to help you choose between the standard Form component and FormKit based on your specific use case and requirements.'
      }
    }
  }
}
