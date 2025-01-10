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

import { type Meta, type StoryObj } from '@storybook/react'
import { FormItemWrapper } from '@Pimcore/components/form-item-wrapper/form-item-wrapper'
import { Switch } from '@Pimcore/components/switch/switch'
import React from 'react'
import { Checkbox, Form } from 'antd'

/* eslint-disable @typescript-eslint/no-floating-promises */

const config: Meta = {
  title: 'Components/layout/FormItemWrapper',
  component: FormItemWrapper,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
}
export default config
export const ValidatedSwitch: StoryObj = {
  render: () => (
    <Form
      onFinish={ (values) => {
        console.log('Form values:', values)
      } }
    >
      <FormItemWrapper
        name="toggle"
        rules={ [{
          required: true,
          transform: value => (value ?? undefined),
          type: 'boolean',
          message: 'You must accept the terms and conditions!'
        }] }
        valuePropName="checked"
      >
        <Switch
          labelLeft={ 'I accept the terms and conditions' }
          onChange={ () => {
            const form = Form.useFormInstance()
            form.validateFields(['acceptTerms'])
          } }
        />
      </FormItemWrapper>
    </Form>
  )
}

const ValidatedCheckboxComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()

  return (
    <Form
      form={ form }
      onFinish={ (values) => {
        console.log('Form values:', values)
      } }
    >
      <FormItemWrapper
        name="acceptTerms"
        rules={ [{
          required: true,
          transform: value => (value ?? undefined),
          type: 'boolean',
          message: 'You must accept the terms and conditions!'
        }] }
        valuePropName="checked"
      >
        <Checkbox>
          I accept the terms and conditions
        </Checkbox>
      </FormItemWrapper>
    </Form>
  )
}

export const ValidatedCheckbox: StoryObj = {
  render: () => <ValidatedCheckboxComponent />
}
