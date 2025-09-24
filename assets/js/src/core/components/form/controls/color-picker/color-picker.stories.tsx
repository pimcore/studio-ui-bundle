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
import { ColorPicker } from '@Pimcore/components/color-picker/color-picker'
import { Form } from '../../form'

const config: Meta = {
  title: 'Components/Data Entry/Form/Controls/ColorPicker',
  component: ColorPicker
}

export default config

// Form example
interface ColorValue {
  toHexString?: () => string
  cleared?: boolean
}

interface FormValues {
  primaryColor: string | null
  backgroundColor: string | null
  accentColor: string | null
  textColor: string | null
  borderColor: string | null
}

const FormExampleComponent = (): React.JSX.Element => {
  const [formValues, setFormValues] = useState<FormValues>({
    primaryColor: '#1677FF',
    backgroundColor: '#FFFFFF',
    accentColor: '#52C41A',
    textColor: '#000000',
    borderColor: '#D9D9D9'
  })

  const onValuesChange = (changedValues: Partial<FormValues | Record<string, ColorValue>>, allValues: Record<string, string | ColorValue | null>): void => {
    // Transform color objects to hex strings
    const transformedValues: Record<string, string | null> = {}
    Object.keys(allValues).forEach(key => {
      const value = allValues[key]
      if (value !== null && value !== undefined && typeof value === 'object' && 'toHexString' in value && typeof value.toHexString === 'function') {
        transformedValues[key] = value.toHexString()
      } else if (value !== null && value !== undefined && typeof value === 'object' && 'cleared' in value && Boolean(value.cleared)) {
        transformedValues[key] = null
      } else if (typeof value === 'string') {
        transformedValues[key] = value
      } else {
        transformedValues[key] = null
      }
    })
    setFormValues(transformedValues as unknown as FormValues)
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
              label="Primary Color"
              name="primaryColor"
            >
              <ColorPicker
                allowClear
                format="hex"
                showText
              />
            </Form.Item>

            <Form.Item
              label="Background Color"
              name="backgroundColor"
            >
              <ColorPicker
                format="hex"
                showText
                size="small"
              />
            </Form.Item>

            <Form.Item
              label="Accent Color"
              name="accentColor"
            >
              <ColorPicker
                format="hex"
                showText={ (color) => `Custom: ${color.toHexString()}` }
              />
            </Form.Item>

            <Form.Item
              label="Text Color"
              name="textColor"
            >
              <ColorPicker
                format="hex"
                presets={ [
                  {
                    label: 'Text Colors',
                    colors: [
                      '#000000',
                      '#333333',
                      '#666666',
                      '#999999',
                      '#CCCCCC',
                      '#FFFFFF'
                    ]
                  }
                ] }
                showText
              />
            </Form.Item>

            <Form.Item
              label="Border Color"
              name="borderColor"
            >
              <ColorPicker
                format="hex"
                size="small"
                trigger="hover"
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

          <div style={ { marginTop: '20px' } }>
            <h4>Color Preview</h4>
            <div style={ {
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              marginTop: '10px'
            } }
            >
              {Object.entries(formValues).map(([key, value]) => {
                const colorValue = typeof value === 'string' ? value : '#CCCCCC'
                const displayValue = value ?? 'null'

                return (
                  <div
                    key={ key }
                    style={ {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '12px'
                    } }
                  >
                    <div
                      style={ {
                        width: '20px',
                        height: '20px',
                        backgroundColor: colorValue,
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                      } }
                    />
                    <span>{key}: {displayValue}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const FormExample = {
  render: () => <FormExampleComponent />
}
