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
import { LocalizedFields, LocalizedFieldsProvider } from './localized-fields'
import { LanguageSelectionProvider } from '@Pimcore/modules/data-object/editor/toolbar/language-selection/provider/language-selection-provider'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { Button } from '@Pimcore/components/button/button'
import { Space } from '@Pimcore/components/space/space'
import { Panel } from '@Pimcore/components/panel/panel'
import { Select } from '@Pimcore/components/select/select'
import { defaultFieldWidthValues } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider'

// Mock provider to wrap stories for context
const LocalizedFieldsStoryWrapper = ({ children }: { children: React.ReactNode }): React.JSX.Element => (
  <LanguageSelectionProvider>
    {children}
  </LanguageSelectionProvider>
)

const meta: Meta<typeof LocalizedFields> = {
  title: 'Components/Data Entry/Form/Localization/LocalizedFields',
  component: LocalizedFields,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `LocalizedFields component provides a wrapper for form fields that need localization support. It integrates with the language selection system to provide locale-specific field management.

**Key Features:**
- **Locale Context**: Provides localization context to child components
- **Language Selection Integration**: Works with the language selection toolbar
- **Form Integration**: Seamlessly integrates with Pimcore's Form components
- **React Children Support**: Supports both React children and legacy object definition arrays

**Usage:**
LocalizedFields is typically used in data object editors where fields need to support multiple languages. It wraps form fields and provides the necessary context for localization.`
      }
    }
  },
  decorators: [
    (Story) => (
      <LocalizedFieldsStoryWrapper>
        <Story />
      </LocalizedFieldsStoryWrapper>
    )
  ],
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

// Basic usage story with React children
const BasicUsageComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState({
    localizedfields: {
      title: '',
      content: '',
      category: 'blog'
    }
  })

  const onFinish = (values: any): void => {
    console.log('Localized form submitted:', values)
  }

  const onValuesChange = (changedValues: any, allValues: any): void => {
    setFormValues(allValues)
  }

  return (
    <div style={ { maxWidth: '600px' } }>
      <Panel
        theme="card-with-highlight"
        title="Localized Content Fields"
      >
        <Form
          form={ form }
          initialValues={ formValues }
          layout='vertical'
          onFinish={ onFinish }
          onValuesChange={ onValuesChange }
        >
          <LocalizedFields
            datatype="data"
            fieldType="localizedfields"
            name="localizedfields"
            noteditable={false}
            defaultFieldWidth={defaultFieldWidthValues}
          >
            <Form.Item
              label="Title"
              name="title"
            >
              <Input placeholder="Enter title..." />
            </Form.Item>

            <Form.Item
              label="Content"
              name="content"
            >
              <TextArea
                placeholder="Enter content..."
                rows={4}
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
                placeholder="Select category..."
              />
            </Form.Item>
          </LocalizedFields>

          <Form.Item style={ { marginTop: '20px' } }>
            <Space>
              <Button
                htmlType="submit"
                type="primary"
              >
                Save Content
              </Button>
              <Button
                onClick={ () => { form.resetFields() } }
              >
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>

        <div style={ { 
          marginTop: '20px', 
          padding: '16px', 
          backgroundColor: '#f0fdf4', 
          border: '1px solid #bbf7d0',
          borderRadius: '6px',
          fontSize: '12px'
        } }>
          <h4 style={ { margin: '0 0 10px 0', color: '#15803d' } }>React Children Pattern:</h4>
          <p style={ { margin: '0 0 10px 0', fontSize: '11px', color: '#374151' } }>
            LocalizedFields component now supports React children syntax for better flexibility and TypeScript support.
          </p>
          
          <h4 style={ { margin: '10px 0 5px 0', color: '#15803d' } }>Form Values:</h4>
          <pre style={ { margin: 0, whiteSpace: 'pre-wrap', fontSize: '10px' } }>
            {JSON.stringify(formValues, null, 2)}
          </pre>
        </div>
      </Panel>
    </div>
  )
}

export const _default: Story = {
  render: () => <BasicUsageComponent />,
  parameters: {
    docs: {
      description: {
        story: 'LocalizedFields component with React children syntax. Provides localization context and integrates with the language selection system.'
      }
    }
  }
}
