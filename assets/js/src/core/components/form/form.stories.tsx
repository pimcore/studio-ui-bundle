/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { Meta } from '@storybook/react'
import React from 'react'
import { Form } from './form'
import { DatePicker, Input, InputNumber, Select } from 'antd'
import { Button } from '../button/button'

const config: Meta = {
  title: 'Components/Data Entry/Form',
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
            /* // add 100 more fields for testing
            ...Array.from({ length: 100 }, (_, i) => ({
              NumberedInput: `Key ${i + 5}`,
              NumberedInput2: `Key ${i + 6}`
            })) */
          ],
          someNestedList: [
            {
              name: 'Item 1',
              value: {
                subField1: {
                  testInput: 'Value 1'
                }
              }
            },

            {
              name: 'Item 2',
              value: {
                subField1: {
                  testInput: 'Value 2'
                }
              }
            }

            /* // add 100 more fields for testing
            ...Array.from({ length: 100 }, (_, i) => ({
              name: `Item ${i + 3}`,
              value: {
                subField1: {
                  testInput: `Value ${i + 3}`
                }
              }
            })) */
          ]
        } }
        layout='vertical'
        onFieldsChange={ onFieldsChange }
        onFinish={ (values) => { console.log(values) } }
        onValuesChange={ onValuesChange }
        validateTrigger='onSubmit'
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
          name="name"
          rules={ [{ required: true, message: 'Please input your name!' }] }
        >
          <Form.Item
            name={ ['name', 'firstName'] }
            rules={ [{ required: true, message: 'Please input your first name!' }] }
          >
            <Form.Item
              label="First Name"
              name={ ['name', 'firstName', 'first1'] }
              rules={ [{ required: true, message: 'Please input your first name!' }] }
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="second Name"
              name={ ['name', 'firstName', 'first2'] }
              rules={ [{ required: true, message: 'Please input your first name!' }] }
            >
              <Input />
            </Form.Item>
          </Form.Item>

          <Form.Item
            label="Last Name"
            name={ ['name', 'lastName'] }
            rules={ [{ required: true, message: 'Please input your last name!' }] }
          >
            <Input />
          </Form.Item>
        </Form.Item>

        <Form.Item
          name="name2"
          rules={ [{ required: true, message: 'Please input your name!' }] }
        >
          <Form.Group name={ 'name2' }>
            <Form.Item
              name={ 'firstName' }
              rules={ [{ required: true, message: 'Please input your first name!' }] }
            >
              <Form.Group name={ 'firstName' }>
                <Form.Item
                  label="First Name"
                  name={ 'first1' }
                  rules={ [{ required: true, message: 'Please input your first name!' }] }
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="second Name"
                  name={ 'first2' }
                  rules={ [{ required: true, message: 'Please input your last name!' }] }
                >
                  <Input />
                </Form.Item>
              </Form.Group>
            </Form.Item>

            <Form.Item
              label="Last Name"
              name={ 'lastName' }
              rules={ [{ required: true, message: 'Please input your last name!' }] }
            >
              <Input />
            </Form.Item>
          </Form.Group>
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

        <Form.Item name={ 'someNestedList' } >
          <Form.NumberedList>
            <Form.NumberedList.Iterator>
              <Form.Item
                label="Nested Item Name"
                name="name"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Nested Item Value"
                name="value"
              >
                <Form.KeyedList>
                  <Form.KeyedList.Iterator>
                    <Form.Item
                      label="Sub Field 1"
                      name={ ['testInput'] }
                    >
                      <Input />
                    </Form.Item>
                  </Form.KeyedList.Iterator>
                </Form.KeyedList>
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
