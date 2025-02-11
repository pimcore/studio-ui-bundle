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
import { useTranslation } from 'react-i18next'
import { Checkbox, Flex, Input } from 'antd'
import { Form, type FormProps } from '@Pimcore/components/form/form'
import { Space } from '@Pimcore/components/space/space'
import { Switch } from '@Pimcore/components/switch/switch'
import { Text } from '@Pimcore/components/text/text'
import { Icon } from '@Pimcore/components/icon/icon'
import { UsersRolesDropdown } from '@Pimcore/components/users-roles-dropdown/users-roles-dropdown'
import { TagList, type TagListProps } from '@Pimcore/components/tag-list/tag-list'
import { type TagProps } from '@Pimcore/components/tag/tag'
import { type RoleGetCollectionApiResponse } from '@Pimcore/modules/user/roles/roles-api-slice.gen'
import { type UserGetCollectionApiResponse } from '@Pimcore/modules/auth/user/user-api-slice.gen'
import { useStyles } from './save-form.styles'
import { isEmpty } from 'lodash'
import { useGridConfig } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/grid-config/use-grid-config'

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

  const { gridConfig, setGridConfig } = useGridConfig()

  const { t } = useTranslation()
  const { styles } = useStyles()

  useEffect(() => {
    props.form?.resetFields()
  }, [])

  const handleFormValuesChange = (changedValues: any, values: any): void => {
    props.onValuesChange?.(changedValues, values)

    const isSharedGlobally = changedValues.shareGlobally

    if (isSharedGlobally !== undefined) {
      setIsSharedGlobally(changedValues.shareGlobally)

      if (!isEmpty(gridConfig)) {
        setGridConfig({
          ...gridConfig,
          shareGlobal: isSharedGlobally
        })
      }
    }
  }

  const renderIcon = (iconName: string, size?: number): React.JSX.Element => (
    <Icon
      className={ styles.icon }
      options={ { width: size ?? 12, height: size ?? 12 } }
      value={ iconName }
    />
  )

  const renderRightLabelComponent = (): JSX.Element | string | undefined => {
    const renderGlobalView = (): React.JSX.Element => (
      <Text className={ styles.label }>{t('common.globally')}</Text>
    )

    const renderUserView = (): React.JSX.Element => (
      <>
        <Flex gap={ 10 }>
          <Text className={ styles.label }>
            {renderIcon('user')} {t('user-management.key-bindings.user')} | {renderIcon('shield')} {t('user-management.key-bindings.role')}
          </Text>
          <Flex
            align="center"
            className={ styles.updateButton }
            gap={ 8 }
            onClick={ () => { setIsOpenDropdown(!isOpenDropdown) } }
          >
            {renderIcon('edit', 16)}
            <Text className={ styles.updateButtonText }>{t('button.add-edit')}</Text>
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

  const getSharedUsersRolesList = (): TagListProps['list'] => {
    const usersList: TagProps[] = []
    const rolesList: TagProps[] = []

    const getTagItem = ({ label, iconName }: { label?: string, iconName: string }): TagProps => ({
      children: (
        <Text
          ellipsis
          style={ { maxWidth: '148px' } }
          type="secondary"
        >{label}</Text>
      ),
      icon: renderIcon(iconName),
      bordered: false
    })

    props.userList?.items.forEach((item) => {
      if ((gridConfig?.sharedUsers as number[]).includes(item.id)) {
        usersList.push(getTagItem({ label: item?.username, iconName: 'user' }))
      }
    })

    props.roleList?.items.forEach((item) => {
      if ((gridConfig?.sharedRoles as number[]).includes(item.id)) {
        rolesList.push(getTagItem({ label: item?.name, iconName: 'shield' }))
      }
    })

    return [usersList, rolesList]
  }

  return (
    <Form
      layout="vertical"
      onValuesChange={ handleFormValuesChange }
      { ...props }
    >
      <Form.Item
        label={ t('user-management.name') }
        name="name"
        rules={ [{ required: true, message: t('form.validation.provide-name') }] }
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('description') }
        name="description"
        rules={ [{ required: true, message: t('form.validation.provide-description') }] }
      >
        <Input.TextArea />
      </Form.Item>

      <Space size="extra-small">
        <Form.Item
          name="setAsDefault"
          valuePropName='checked'
        >
          <Checkbox>{t('grid.configuration.set-default-template')}</Checkbox>
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
            labelLeft={ <Text>{t('grid.configuration.shared')}</Text> }
            labelRight={ renderRightLabelComponent() }
          />
        </Form.Item>
      </Flex>

      { isSharedGlobally === false && (
        <TagList
          itemGap="mini"
          list={ getSharedUsersRolesList() }
          tagListItemClassNames={ styles.tag }
        />
      )}
    </Form>
  )
}
