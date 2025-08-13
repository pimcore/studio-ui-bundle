/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Meta } from '@storybook/react'
import React, { useState } from 'react'
import { Select } from '@Pimcore/components/select/select'
import { Form } from '../../form'

const config: Meta = {
  title: 'Components/Data Entry/Form/Controls/Basic/Select',
  component: Select
}

export default config

// Form example
const FormExampleComponent = (): React.JSX.Element => {
  const [formValues, setFormValues] = useState({
    category: 'technology',
    tags: ['react', 'typescript']
  })

  const onValuesChange = (changedValues: any, allValues: any): void => {
    setFormValues(allValues)
  }

  const categoryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'business', label: 'Business' }
  ]

  const tagOptions = [
    { value: 'react', label: 'React' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'css', label: 'CSS' },
    { value: 'html', label: 'HTML' },
    { value: 'nodejs', label: 'Node.js' }
  ]

  return (
    <div style={ { maxWidth: '700px', padding: '20px' } }>
      <div style={ { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' } }>
        <div>
          <Form
            initialValues={ formValues }
            layout="vertical"
            onValuesChange={ onValuesChange }
          >
            <Form.Item
              label="Category"
              name="category"
            >
              <Select
                allowClear
                options={ categoryOptions }
                placeholder="Select a category"
              />
            </Form.Item>

            <Form.Item
              label="Tags"
              name="tags"
            >
              <Select
                filterOption={ (input, option) =>
                  String(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                mode="multiple"
                options={ tagOptions }
                placeholder="Select tags"
                showSearch
              />
            </Form.Item>
          </Form>
        </div>

        <div>
          <h4>Current Values</h4>
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

export const FormExample = {
  render: () => <FormExampleComponent />
}
