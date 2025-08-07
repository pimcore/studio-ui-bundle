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
import { InputNumber } from '@Pimcore/components/input-number/input-number'
import { Form } from '../../form'

const config: Meta = {
  title: 'Components/Data Entry/Form/Controls/Basic/InputNumber',
  component: InputNumber
}

export default config

// Form example
const FormExampleComponent = (): React.JSX.Element => {
  const [formValues, setFormValues] = useState({
    quantity: 10,
    price: 99.99,
    percentage: 75,
    temperature: -5
  })

  const onValuesChange = (changedValues: any, allValues: any): void => {
    setFormValues(allValues)
  }

  return (
    <div style={{ maxWidth: '700px', padding: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <Form
            initialValues={formValues}
            layout="vertical"
            onValuesChange={onValuesChange}
          >
            <Form.Item
              label="Quantity"
              name="quantity"
            >
              <InputNumber 
                placeholder="Enter quantity"
                min={0}
                max={100}
              />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
            >
              <InputNumber 
                placeholder="Enter price"
                formatter={(value) => `$ ${value}`}
                parser={(value) => value?.replace(/\$\s?|(,*)/g, '') ?? ''}
                step={0.01}
                precision={2}
                min={0}
              />
            </Form.Item>

            <Form.Item
              label="Percentage"
              name="percentage"
            >
              <InputNumber 
                placeholder="Enter percentage"
                formatter={(value) => `${value}%`}
                parser={(value) => value?.replace('%', '') ?? ''}
                min={0}
                max={100}
                step={5}
              />
            </Form.Item>

            <Form.Item
              label="Temperature (°C)"
              name="temperature"
            >
              <InputNumber 
                placeholder="Enter temperature"
                formatter={(value) => `${value}°C`}
                parser={(value) => value?.replace('°C', '') ?? ''}
                min={-50}
                max={50}
                step={1}
              />
            </Form.Item>
          </Form>
        </div>

        <div>
          <h4>Current Values</h4>
          <div style={{ 
            background: '#f5f5f5', 
            padding: '16px', 
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '12px',
            whiteSpace: 'pre-wrap'
          }}>
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
