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

import React, { useEffect, useState } from 'react'
import { Checkbox, Flex, Input } from 'antd'
import { Form, type FormProps } from '@Pimcore/components/form/form'
import { Space } from '@Pimcore/components/space/space'
import { Switch } from '@Pimcore/components/switch/switch'
import { Text } from '@Pimcore/components/text/text'
import { Icon } from '@Pimcore/components/icon/icon'
import { UsersRolesDropdown } from '@Pimcore/components/users-roles-dropdown/users-roles-dropdown'
import { type RoleGetCollectionApiResponse } from '@Pimcore/modules/user/role/role-api-slice.gen'
import { type UserGetCollectionApiResponse } from '@Pimcore/modules/auth/user/user-api-slice.gen'
import { useStyles } from './save-form.styles'

export interface SaveFormProps extends FormProps {
  roleList?: RoleGetCollectionApiResponse
  userList?: UserGetCollectionApiResponse
}

export const defaultValues = {
  name: '',
  description: '',
  shareGlobally: true,
  setAsDefault: false,
  saveFilters: false
}

export const SaveForm = (props: SaveFormProps): React.JSX.Element => {
  const [isSharedGlobally, setIsSharedGlobally] = useState(props.initialValues?.shareGlobally ?? defaultValues.shareGlobally)
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)

  const { styles } = useStyles()

  useEffect(() => {
    props.form?.resetFields()
  }, [])

  const onValuesChange = (changedValues: any, values: any): void => {
    props.onValuesChange?.(changedValues, values)

    if (changedValues.shareGlobally !== undefined) {
      setIsSharedGlobally(changedValues.shareGlobally)
    }
  }

  const renderIcon = (iconName: string, size?: number): React.JSX.Element => (
    <Icon
      options={ { width: size ?? 12, height: size ?? 12 } }
      value={ iconName }
    />
  )

  const renderRightLabelComponent = (): JSX.Element | string | undefined => {
    const renderGlobalView = (): React.JSX.Element => (
      <Text className={ styles.label }>Globally</Text>
    )

    const renderUserView = (): React.JSX.Element => (
      <>
        <Flex gap={ 10 }>
          <Text className={ styles.label }>
            {renderIcon('user')} User | {renderIcon('shield')} Role
          </Text>
          <Flex
            align="center"
            className={ styles.updateButton }
            gap={ 8 }
            onClick={ () => { setIsOpenDropdown(!isOpenDropdown) } }
          >
            {renderIcon('edit', 16)}
            <Text className={ styles.updateButtonText }>Add & Edit</Text>
          </Flex>
        </Flex>
        {isOpenDropdown && (
          <UsersRolesDropdown
            handleClose={ () => { setIsOpenDropdown(false) } }
            roleList={ props?.roleList }
            userList={ props?.userList }
          />
        )}
      </>
    )

    return isSharedGlobally === true ? renderGlobalView() : renderUserView()
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

        {/* @TODO: the logic will be implemented later */}
        {/* <Form.Item */}
        {/*  name="saveFilters" */}
        {/*  valuePropName='checked' */}
        {/* > */}
        {/*  <Checkbox>Save filters</Checkbox> */}
        {/* </Form.Item> */}
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
            labelLeft={ <Text>Shared</Text> }
            labelRight={ renderRightLabelComponent() }
          />
        </Form.Item>
      </Flex>

      { isSharedGlobally === false && (
        <Text>@Todo: Add user and role sharing</Text>
      )}
    </Form>
  )
}
