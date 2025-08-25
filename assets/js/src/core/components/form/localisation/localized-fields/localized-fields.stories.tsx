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
import React from 'react'
import { LocalizedFields } from './localized-fields'
import { LanguageSelectionProvider } from '@Pimcore/components/language-selection/provider/language-selection-provider'
import { LanguageSelection } from '@Pimcore/components/language-selection/language-selection'
import { useLanguageSelection } from '@Pimcore/components/language-selection/provider/use-language-selection'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { Button } from '@Pimcore/components/button/button'
import { Space } from '@Pimcore/components/space/space'
import { Select } from '@Pimcore/components/select/select'

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

  // Use the language selection context
  const { currentLanguage, setCurrentLanguage } = useLanguageSelection()

  // Mock language data for the demo
  const availableLanguages = ['EN', 'DE', 'FR', 'IT', 'ES']

  const onFinish = (values: any): void => {
    console.log('Localized form submitted:', values)
  }

  const handleLanguageChange = (language: string): void => {
    // Update the language selection context instead of local state
    setCurrentLanguage(language.toLowerCase()) // Convert to lowercase as expected by the provider
  }

  return (
    <div style={ { maxWidth: '600px' } }>
      <FormKit
        formProps={{
          form,
          onFinish
        }}
      >
        <FormKit.Panel
          extra={
            <LanguageSelection
              languages={availableLanguages}
              selectedLanguage={currentLanguage.toUpperCase()} // Convert back to uppercase for display
              onSelectLanguage={handleLanguageChange}
            />
          }
          theme="card-with-highlight"
          title="Localized Content Fields"
        >
          <LocalizedFields>
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
        </FormKit.Panel>
      </FormKit>
    </div>
  )
}

export const _default: Story = {
  render: () => <BasicUsageComponent />,
  parameters: {
    docs: {
      description: {
        story: 'LocalizedFields component with React children syntax using FormKit and integrated language selection. The language selection component is placed in the panel\'s extra content area, providing easy access to language switching while working with localized form fields. FormKit provides enhanced form layout with built-in panel styling and field width management.'
      }
    }
  }
}
