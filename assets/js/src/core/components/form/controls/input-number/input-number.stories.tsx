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
interface FormValues {
  quantity: number
  price: number
  percentage: number
  temperature: number
}

const FormExampleComponent = (): React.JSX.Element => {
  const [formValues, setFormValues] = useState<FormValues>({
    quantity: 5,
    price: 29.99,
    percentage: 85.5,
    temperature: 22.5
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
              label="Quantity"
              name="quantity"
            >
              <InputNumber
                max={ 100 }
                min={ 0 }
                placeholder="Enter quantity"
              />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
            >
              <InputNumber
                formatter={ (value) => `$ ${value}` }
                min={ 0 }
                parser={ (value) => value?.replace(/\$\s?|(,*)/g, '') ?? '' }
                placeholder="Enter price"
                precision={ 2 }
                step={ 0.01 }
              />
            </Form.Item>

            <Form.Item
              label="Percentage"
              name="percentage"
            >
              <InputNumber
                formatter={ (value) => `${value}%` }
                max={ 100 }
                min={ 0 }
                parser={ (value) => value?.replace('%', '') ?? '' }
                placeholder="Enter percentage"
                step={ 5 }
              />
            </Form.Item>

            <Form.Item
              label="Temperature (°C)"
              name="temperature"
            >
              <InputNumber
                formatter={ (value) => `${value}°C` }
                max={ 50 }
                min={ -50 }
                parser={ (value) => value?.replace('°C', '') ?? '' }
                placeholder="Enter temperature"
                step={ 1 }
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
