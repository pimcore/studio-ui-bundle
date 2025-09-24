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
import { CodeEditor } from '@Pimcore/components/code-editor/code-editor'
import { Form } from '../../form'

const config: Meta = {
  title: 'Components/Data Entry/Form/Controls/Basic/CodeEditor',
  component: CodeEditor
}

export default config

// Form example
interface FormValues {
  notes: string
  config: string
}

const FormExampleComponent = (): React.JSX.Element => {
  const [formValues, setFormValues] = useState<FormValues>({
    notes: 'Enter your notes here...',
    config: '# Enter YAML configuration'
  })

  const onValuesChange = (changedValues: Partial<FormValues>, allValues: FormValues): void => {
    setFormValues(allValues)
  }

  return (
    <div style={ { maxWidth: '900px', padding: '20px' } }>
      <div style={ { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' } }>
        <div>
          <Form
            initialValues={ formValues }
            layout="vertical"
            onValuesChange={ onValuesChange }
          >
            <Form.Item
              label="Project Notes"
              name="notes"
            >
              <CodeEditor
                height="120px"
                placeholder="Enter your project notes..."
                preset="text"
              />
            </Form.Item>

            <Form.Item
              label="Configuration"
              name="config"
            >
              <CodeEditor
                height="150px"
                placeholder="# Enter YAML configuration here..."
                preset="yaml"
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
