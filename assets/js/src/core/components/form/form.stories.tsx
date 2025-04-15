/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import type { Meta } from '@storybook/react'
import React from 'react'
import { Form } from './form'
import { DatePicker, Input, InputNumber, Select } from 'antd'
import { Button } from '../button/button'

const config: Meta = {
  title: 'Components/Controls/Form',
  component: () => {
    const [form] = Form.useForm()

    const onFieldsChange = (changedFields, allFields): void => {
      console.log({ changedFields, allFields })
    }

    const onValuesChange = (changedValues, allValues): void => {
      console.log({ changedValues, allValues })
    }

    const reset = (): void => {
      form.resetFields()
    }

    const setKeyedListToRandomValues = (): void => {
      form.setFieldValue('Input', 'test')

      form.setFieldValue('myKeyedList', {
        key1: {
          KeyedInput: Math.random()
        },
        key2: {
          KeyedInput: Math.random()
        },
        key4: {}
      })
    }

    return (
      <Form
        form={ form }
        initialValues={ {
          myKeyedList: {
            key1: {
              KeyedInput: 'Key 1'
            },
            key2: {
              KeyedInput: 'Key 2'
            }
          },
          myNumberedList: [
            {
              NumberedInput: 'Key 1',
              NumberedInput2: 'Key 2'
            },
            {
              NumberedInput: 'Key 3',
              NumberedInput2: 'Key 4'
            }
          ]
        } }
        layout='vertical'
        onFieldsChange={ onFieldsChange }
        onFinish={ (values) => { console.log(values) } }
        onValuesChange={ onValuesChange }
      >
        <Form.Item
          label="Input"
          name="Input"
          rules={ [{ required: true, message: 'Please input!' }] }
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="InputNumber"
          name="InputNumber"
          rules={ [{ required: true, message: 'Please input!' }] }
        >
          <InputNumber style={ { width: '100%' } } />
        </Form.Item>

        <Form.Item
          label="TextArea"
          name="TextArea"
          rules={ [{ required: true, message: 'Please input!' }] }
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Select"
          name="Select"
          rules={ [{ required: true, message: 'Please input!' }] }

        >
          <Select options={ [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' }
          ] }
          />
        </Form.Item>

        <Form.Item
          label="DatePicker"
          name="DatePicker"
          rules={ [{ required: true, message: 'Please input!' }] }
        >
          <DatePicker />
        </Form.Item>

        <Form.Group name='myGroup'>
          <Form.Item
            label="Group Input 1"
            name="GroupInput1"
            rules={ [{ required: true, message: 'Please input!' }] }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Group Input 2"
            name="GroupInput2"
            rules={ [{ required: true, message: 'Please input!' }] }
          >
            <Input />
          </Form.Item>

          <Form.Group name='mySubGroup'>
            <Form.Item
              label="Sub Group Input 1"
              name="SubGroupInput1"
              rules={ [{ required: true, message: 'Please input!' }] }
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Sub Group Input 2"
              name="SubGroupInput2"
              rules={ [{ required: true, message: 'Please input!' }] }
            >
              <Input />
            </Form.Item>
          </Form.Group>
        </Form.Group>

        <Form.List name='myList' >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Form.Item
                  key={ key }
                  label="List Input"
                  name={ [name, 'ListInput'] }
                  rules={ [{ required: true, message: 'Please input!' }] }
                >
                  <Input />
                </Form.Item>
              ))}

              <Form.Item>
                <Button
                  onClick={ () => { add() } }
                >
                  Add
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item name={ 'myKeyedList' } >
          <Form.KeyedList>
            <Form.KeyedList.Iterator>
              <Form.Item
                label="Keyed Input"
                name="KeyedInput"
                rules={ [{ required: true, message: 'Please input!' }] }
              >
                <Input />
              </Form.Item>
            </Form.KeyedList.Iterator>
          </Form.KeyedList>
        </Form.Item>

        <Form.Item name={ 'myNumberedList' } >
          <Form.NumberedList>
            <Form.NumberedList.Iterator>
              <Form.Item
                label="Numbered Input"
                name="NumberedInput"
                rules={ [{ required: true, message: 'Please input!' }] }
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Numbered Input 2"
                name="NumberedInput2"
                rules={ [{ required: true, message: 'Please input!' }] }
              >
                <Input />
              </Form.Item>
            </Form.NumberedList.Iterator>
          </Form.NumberedList>
        </Form.Item>

        <Form.Item>
          <Button onClick={ setKeyedListToRandomValues }>
            modify form values
          </Button>

          <Button onClick={ reset }>
            Reset
          </Button>

          <Button
            htmlType="submit"
            type="primary"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  },
  tags: ['autodocs']
}

export default config

export const _default = {
}
