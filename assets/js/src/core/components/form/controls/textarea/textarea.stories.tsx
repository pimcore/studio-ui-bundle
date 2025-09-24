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
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { Form } from '../../form'

const config: Meta = {
  title: 'Components/Data Entry/Form/Controls/Basic/TextArea',
  component: TextArea
}

export default config

// Form example
interface FormValues {
  description: string
  content: string
}

const FormExampleComponent = (): React.JSX.Element => {
  const [formValues, setFormValues] = useState<FormValues>({
    description: '',
    content: ''
  })

  const onValuesChange = (changedValues: Partial<FormValues>, allValues: FormValues): void => {
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
              label="Description"
              name="description"
            >
              <TextArea
                placeholder="Enter description"
                rows={ 3 }
              />
            </Form.Item>

            <Form.Item
              label="Content"
              name="content"
            >
              <TextArea
                autoSize={ { minRows: 2, maxRows: 6 } }
                maxLength={ 200 }
                placeholder="Enter content"
                showCount
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
