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
import { Segmented } from '@Pimcore/components/segmented/segmented'
import { Form } from '../../form'

const config: Meta = {
  title: 'Components/Data Entry/Form/Controls/Segmented',
  component: Segmented
}

export default config

// Form example
const FormExampleComponent = (): React.JSX.Element => {
  const [formValues, setFormValues] = useState({
    viewMode: 'grid',
    userRole: 'editor',
    publishStatus: 'published',
    sortOrder: 'asc',
    theme: 'light',
    language: 'en'
  })

  const onValuesChange = (changedValues: any, allValues: any): void => {
    setFormValues(allValues)
  }

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
              label="View Mode"
              name="viewMode"
              rules={ [
                { required: true, message: 'Please select a view mode!' }
              ] }
            >
              <Segmented
                options={ [
                  { label: 'Grid', value: 'grid' },
                  { label: 'List', value: 'list' },
                  { label: 'Card', value: 'card' }
                ] }
              />
            </Form.Item>

            <Form.Item
              label="User Role"
              name="userRole"
            >
              <Segmented
                options={ [
                  'Admin',
                  'Editor',
                  'Viewer'
                ] }
              />
            </Form.Item>

            <Form.Item
              label="Publish Status"
              name="publishStatus"
            >
              <Segmented
                options={ [
                  { label: 'Draft', value: 'draft' },
                  { label: 'Published', value: 'published' },
                  { label: 'Archived', value: 'archived' }
                ] }
              />
            </Form.Item>

            <Form.Item
              label="Sort Order"
              name="sortOrder"
            >
              <Segmented
                options={ [
                  { label: 'Ascending', value: 'asc' },
                  { label: 'Descending', value: 'desc' }
                ] }
                size="small"
              />
            </Form.Item>

            <Form.Item
              label="Theme Preference"
              name="theme"
            >
              <Segmented
                options={ [
                  { label: 'Light', value: 'light' },
                  { label: 'Dark', value: 'dark' },
                  { label: 'Auto', value: 'auto' }
                ] }
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Language"
              name="language"
            >
              <Segmented
                disabled={ false }
                options={ [
                  { label: 'English', value: 'en' },
                  { label: 'German', value: 'de' },
                  { label: 'French', value: 'fr' },
                  { label: 'Spanish', value: 'es' }
                ] }
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
