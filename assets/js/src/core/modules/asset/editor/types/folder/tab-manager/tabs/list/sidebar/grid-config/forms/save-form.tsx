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

import { Space } from '@Pimcore/components/space/space'
import { Checkbox, Flex, Input } from 'antd'
import { Form, type FormProps } from '@Pimcore/components/form/form'
import { Switch } from '@Pimcore/components/switch/switch'
import React, { useState } from 'react'
import { Text } from '@Pimcore/components/text/text'

export interface SaveFormProps extends FormProps {}

export const defaultValues = {
  name: '',
  description: '',
  shareGlobally: true,
  setAsDefault: false,
  saveFilters: false
}

export const SaveForm = (props: SaveFormProps): React.JSX.Element => {
  const [isSharedGlobally, setIsSharedGlobally] = useState(props.initialValues?.shareGlobally ?? defaultValues.shareGlobally)

  const onValuesChange = (changedValues: any, values: any): void => {
    props.onValuesChange?.(changedValues, values)

    if (changedValues.shareGlobally !== undefined) {
      setIsSharedGlobally(changedValues.shareGlobally)
    }
  }

  return (
    <Form
      layout="vertical"
      onValuesChange={ onValuesChange }
      { ...props }
    >
      <Form.Item
        label="Name"
        name="name"
        rules={ [{ required: true, message: 'Please provide a name' }] }
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={ [{ required: true, message: 'Please provide a description' }] }
      >
        <Input.TextArea />
      </Form.Item>

      <Space size="extra-small">
        <Form.Item
          name="setAsDefault"
          valuePropName='checked'
        >
          <Checkbox>Set as default template</Checkbox>
        </Form.Item>

        <Form.Item
          name="saveFilters"
          valuePropName='checked'
        >
          <Checkbox>Save filters</Checkbox>
        </Form.Item>
      </Space>

      <Flex
        align='center'
        gap={ 'mini' }
      >
        <Form.Item
          name="shareGlobally"
          valuePropName='checked'
        >
          <Switch
            labelLeft='Shared'
            labelRight={ isSharedGlobally === true ? 'Globally' : 'User | Role' }
          />
        </Form.Item>
      </Flex>

      { isSharedGlobally === false && (
        <Text>@Todo: Add user and role sharing</Text>
      )}
    </Form>
  )
}
