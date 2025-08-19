/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is availab  return (
    <FormLayoutContainer>
      <ContentLayout
        renderToolbar={(
          <Toolbar justify="space-between">
            <div style={{ fontSize: '14px', fontWeight: 600 }}>
              FormKit Advanced Features: Panels • TabPanels • Regions • Auto Field Widths
            </div>
            <Button type="primary">
              Save Configuration
            </Button>
          </Toolbar>
        )}
      >
        <Content
          padded
          padding={{ x: 'small', y: 'none' }}
        >ontent
          padded
          padding={{ x: 'small', y: 'none' }}
        >
          <div style={{ maxWidth: '1200px' }}>
            <FormKit>SE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Button } from '../button/button'
import { Space } from '../space/space'
import { ContentLayout } from '../content-layout/content-layout'
import { Content } from '../content/content'
import { Toolbar } from '../toolbar/toolbar'
import { FormKit } from './form-kit'
import { Form } from './form'
import { Input } from '../input/input'
import { TextArea } from '../textarea/textarea'
import { Select } from '../select/select'
import { Switch } from '../switch/switch'
import { InputNumber } from '../input-number/input-number'
import { useCssContainer } from '@Pimcore/utils/hooks/use-css-container/use-css-container'
import { cssContainerWidget } from '@Pimcore/modules/widget-manager/widget/widget-view'

// Directly import the story components from the other files
import { AllControlsShowcase as FormAllControlsStory } from './form.stories'
import { AllControlsShowcase as FormKitAllControlsStory } from './form-kit.stories'

// Container wrapper to provide CSS container context for Region responsive behavior
const FormLayoutContainer = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const { styleDefinition } = useCssContainer(cssContainerWidget)

  return (
    <div
      className={ styleDefinition.styles.container }
      style={ { width: '100%' } }
    >
      {children}
    </div>
  )
}

const config: Meta = {
  title: 'Components/Data Entry/Form/Form vs FormKit',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Side-by-side comparison of the standard Form component versus FormKit to help you choose the right approach for your use case.

| **Component** | **When to Use** | **What You Get** |
|---------------|-----------------|------------------|
| **Basic Form** | • Inline forms<br/>• Customized approach needed | • Enhanced Ant Design functionality<br/>• Pimcore-specific implementations<br/>• Full customization control |
| **FormKit** | • All forms except inline forms | • All Basic Form features<br/>• Predefined styling for design consistency<br/>• Default sizes for controls<br/>• Built-in panels, tabs, and layouts |

**📖 Documentation:** [Standard Form](?path=/docs/components-data-entry-form-basic-form--docs) • [FormKit](?path=/docs/components-data-entry-form-formkit--docs)`
      }
    }
  },
  tags: ['autodocs']
}

export default config
type Story = StoryObj<typeof config>

const ComparisonToggleExample = (): React.JSX.Element => {
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

      {showFormKit ? (
        FormKitAllControlsStory.render?.({}, {} as any) as React.ReactElement
      ) : (
        FormAllControlsStory.render?.({}, {} as any) as React.ReactElement
      )}
    </div>
  )
}

export const SideBySideComparison: Story = {
  render: () => <ComparisonToggleExample />,
  parameters: {
    docs: {
      description: {
        story: `Toggle between comprehensive showcases of all controls in both Form and FormKit to see the differences in action.

**Key Differences You'll Notice:**
- **Panel organization**: FormKit structures content in organized sections with titles
- **Consistent styling**: Automatic field spacing and alignment without manual \`style={{ width: '100%' }}\`
- **Enhanced components**: Switch with \`labelRight\` support and better UX patterns
- **Field width context**: Built-in width management system eliminates manual width styling

Use the toggle buttons above to switch between the complete all-controls showcases from both components and compare the styling, organization, and developer experience differences.`
      }
    }
  }
}

const FormKitAdvancedFeaturesExample = (): React.JSX.Element => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    priority: 1,
    enabled: false,
    tags: [],
    metaTitle: '',
    metaDescription: '',
    slug: '',
    keywords: '',
    template: '',
    cacheTime: '',
    status: 'draft',
    featured: false,
    notifications: true
  })

  return (
    <FormLayoutContainer>
      <ContentLayout
        renderToolbar={(
          <Toolbar justify="space-between">
            <div style={{ fontSize: '14px', fontWeight: 600 }}>
              FormKit Advanced Features: Panels • TabPanels • Regions • Auto Field Widths
            </div>
            <Button type="primary">
              Save Configuration
            </Button>
          </Toolbar>
        )}
      >
        <Content
          padded
          padding={{ x: 'small', y: 'none' }}
        >
        <FormKit>
          {/* TabPanel: Multi-section navigation */}
          <FormKit.TabPanel
            items={[
              {
                key: 'general',
                label: 'General',
                children: (
                  <div>
                    {/* Panel: Structured content organization */}
                    <FormKit.Panel title="Basic Configuration">
                      {/* Notice: All fields automatically get proper widths without style={{ width: '100%' }} */}
                      <Form.Item
                        label="Name"
                        required
                        tooltip="Display name for this item"
                      >
                        <Input
                          onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }}
                          placeholder="Enter item name"
                          value={formData.name}
                        />
                      </Form.Item>

                      <Form.Item label="Description">
                        <TextArea
                          onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }}
                          placeholder="Enter detailed description"
                          rows={4}
                          value={formData.description}
                        />
                      </Form.Item>

                      <Form.Item label="Type">
                        <Select
                          onChange={(value) => { setFormData({ ...formData, type: value }) }}
                          options={[
                            { value: 'document', label: 'Document' },
                            { value: 'asset', label: 'Asset' },
                            { value: 'object', label: 'Data Object' },
                            { value: 'snippet', label: 'Snippet' }
                          ]}
                          placeholder="Select item type"
                          value={formData.type}
                        />
                      </Form.Item>
                    </FormKit.Panel>

                    {/* Multiple Panels in same tab for better organization */}
                    <FormKit.Panel title="Classification">
                      <Form.Item label="Tags">
                        <Select
                          mode="multiple"
                          onChange={(value) => { setFormData({ ...formData, tags: value }) }}
                          options={[
                            { value: 'system', label: 'System' },
                            { value: 'user', label: 'User' },
                            { value: 'admin', label: 'Admin' },
                            { value: 'temp', label: 'Temporary' }
                          ]}
                          placeholder="Select classification tags"
                          value={formData.tags}
                        />
                      </Form.Item>

                      <Form.Item label="Template">
                        <Input
                          onChange={(e) => { setFormData({ ...formData, template: e.target.value }) }}
                          placeholder="template-name"
                          value={formData.template}
                        />
                      </Form.Item>

                      <Form.Item label="Status">
                        <Select
                          onChange={(value) => { setFormData({ ...formData, status: value }) }}
                          options={[
                            { value: 'draft', label: 'Draft' },
                            { value: 'review', label: 'Under Review' },
                            { value: 'published', label: 'Published' },
                            { value: 'archived', label: 'Archived' }
                          ]}
                          value={formData.status}
                        />
                      </Form.Item>
                    </FormKit.Panel>
                  </div>
                )
              },
              {
                key: 'settings',
                label: 'Settings',
                children: (
                  <div>
                    {/* Region: Left-Right split layout */}
                    <FormKit.Region
                      items={[
                        {
                          region: 'left',
                          component: (
                            <FormKit.Panel title="Display Options">
                              <Form.Item label="Priority Level">
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

                              <Form.Item label="Enabled">
                                <Switch
                                  checked={formData.enabled}
                                  labelRight="Enable this configuration"
                                  onChange={(checked) => { setFormData({ ...formData, enabled: checked }) }}
                                />
                              </Form.Item>

                              <Form.Item label="Featured">
                                <Switch
                                  checked={formData.featured}
                                  labelRight="Show as featured item"
                                  onChange={(checked) => { setFormData({ ...formData, featured: checked }) }}
                                />
                              </Form.Item>
                            </FormKit.Panel>
                          )
                        },
                        {
                          region: 'right',
                          component: (
                            <FormKit.Panel title="System Options">
                              <Form.Item label="Notifications">
                                <Switch
                                  checked={formData.notifications}
                                  labelRight="Send system notifications"
                                  onChange={(checked) => { setFormData({ ...formData, notifications: checked }) }}
                                />
                              </Form.Item>

                              <Form.Item 
                                label="Cache Time"
                                tooltip="Cache duration in seconds"
                              >
                                <Input
                                  onChange={(e) => { setFormData({ ...formData, cacheTime: e.target.value }) }}
                                  placeholder="3600"
                                  value={formData.cacheTime}
                                />
                              </Form.Item>
                            </FormKit.Panel>
                          )
                        }
                      ]}
                      layoutDefinition={['left right']}
                    />
                  </div>
                )
              },
              {
                key: 'metadata',
                label: 'Metadata',
                children: (
                  <FormKit.Panel title="Meta Information">
                    <Form.Item 
                      label="Meta Title"
                      tooltip="Title for search engines and browsers"
                    >
                      <Input
                        onChange={(e) => { setFormData({ ...formData, metaTitle: e.target.value }) }}
                        placeholder="Enter meta title (50-60 characters)"
                        value={formData.metaTitle}
                      />
                    </Form.Item>

                    <Form.Item 
                      label="Meta Description"
                      tooltip="Description for search engines"
                    >
                      <TextArea
                        onChange={(e) => { setFormData({ ...formData, metaDescription: e.target.value }) }}
                        placeholder="Enter meta description (150-160 characters)"
                        rows={3}
                        value={formData.metaDescription}
                      />
                    </Form.Item>

                    <Form.Item label="URL Slug">
                      <Input
                        onChange={(e) => { setFormData({ ...formData, slug: e.target.value }) }}
                        placeholder="url-friendly-slug"
                        value={formData.slug}
                      />
                    </Form.Item>

                    <Form.Item label="Keywords">
                      <Input
                        onChange={(e) => { setFormData({ ...formData, keywords: e.target.value }) }}
                        placeholder="keyword1, keyword2, keyword3"
                        value={formData.keywords}
                      />
                    </Form.Item>
                  </FormKit.Panel>
                )
              }
            ]}
          />
        </FormKit>

        <div style={{
          marginTop: '32px',
          padding: '20px',
          backgroundColor: '#f0f8ff',
          border: '1px solid #d6f7ff',
          borderRadius: '8px'
        }}
        >
          <h4 style={{ margin: '0 0 16px 0', color: '#1677ff', fontSize: '14px', fontWeight: 600 }}>
            🎯 FormKit Advantages Demonstrated Above:
          </h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', lineHeight: '1.6' }}>
            <li><strong>Panels:</strong> Structured content organization with titles and consistent spacing</li>
            <li><strong>TabPanels:</strong> Multi-section navigation for complex forms (General, Settings, Metadata)</li>
            <li><strong>Regions:</strong> Left-right split layouts for related field groupings</li>
            <li><strong>Automated Field Widths:</strong> All inputs automatically sized - no <code>style={`{{ width: '100%' }}`}</code> needed</li>
          </ul>
        </div>
      </Content>
    </ContentLayout>
    </FormLayoutContainer>
  )
}

export const FormKitAdvancedFeatures: Story = {
  render: () => <FormKitAdvancedFeaturesExample />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `**FormKit's Four Key Advantages for Admin Interface Development:**

## 🎯 **1. Panels** - Structured Content Organization
- **Automatic spacing and padding**: No manual margin/padding calculations needed
- **Consistent visual hierarchy**: Built-in title styling and section separation  
- **Multiple panels per tab**: Organize related fields logically within sections (Basic Configuration + Classification)
- **Zero custom CSS required**: Professional admin interface styling out-of-the-box

## 🎯 **2. TabPanels** - Multi-Section Navigation
- **Complex form organization**: Split large forms into manageable sections (General, Settings, Metadata)
- **Unified state management**: Single form state across all tabs with automatic synchronization
- **Tab-specific validation**: Validate individual sections or entire form as needed
- **Standard navigation patterns**: Common admin interface navigation without custom implementation

## 🎯 **3. Regions** - Advanced Layout Control  
- **Left-right split layouts**: Perfect for related field groupings (Display Options | System Options)
- **Responsive behavior**: Automatic responsive breakpoints and mobile adaptation
- **Nested organization**: Combine with Panels for sophisticated information architecture
- **Professional layouts**: Enterprise-grade layouts that would require significant custom development

## 🎯 **4. Automated Field Widths** - Zero Width Management
- **No manual width styling**: Every field automatically gets proper width without \`style={{ width: '100%' }}\`
- **Consistent field sizing**: All inputs, selects, and textareas automatically sized consistently
- **Built-in context system**: FormKit provides width context that all child components inherit
- **Developer experience**: Eliminate repetitive width management and focus on business logic

**🚀 Result:** What takes 100+ lines of custom CSS and layout code with standard Form is built-in with FormKit, providing enterprise-ready admin interfaces with minimal development overhead.`
      }
    }
  }
}
