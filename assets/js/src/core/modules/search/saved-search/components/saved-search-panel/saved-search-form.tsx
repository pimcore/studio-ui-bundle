/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex, Input } from 'antd'
import { isEmpty } from 'lodash'
import { Form } from '@Pimcore/components/form/form'
import { type formInstanceType } from '@Pimcore/components/form/use-form'
import { Switch } from '@Pimcore/components/switch/switch'
import { Text } from '@Pimcore/components/text/text'
import { Icon } from '@Pimcore/components/icon/icon'
import { UsersRolesDropdown } from '@Pimcore/components/users-roles-dropdown/users-roles-dropdown'
import { TagList, type TagListProps } from '@Pimcore/components/tag-list/tag-list'
import { type TagProps } from '@Pimcore/components/tag/tag'
import { useUserGetShareCollectionQuery } from '@Pimcore/modules/user/user-api-slice-enhanced'
import { useRoleGetShareCollectionQuery } from '@Pimcore/modules/user/roles/roles-api-slice-enhanced'
import { useStyles } from './saved-search-panel.styles'

export interface SavedSearchFormValues {
  name: string
  description?: string
  createMenuShortcut?: boolean
  shareGlobally?: boolean
}

export const defaultValues: SavedSearchFormValues = {
  name: '',
  description: '',
  createMenuShortcut: false,
  shareGlobally: true
}

interface SavedSearchFormProps {
  form: formInstanceType
  isSharedGlobally: boolean
  onSharedGloballyChange: (value: boolean) => void
  sharedUsers: number[]
  sharedRoles: number[]
  onUsersRolesChange: (changes: { sharedUsers: number[], sharedRoles: number[] }) => void
}

export const SavedSearchForm = ({
  form,
  isSharedGlobally,
  onSharedGloballyChange,
  sharedUsers,
  sharedRoles,
  onUsersRolesChange
}: SavedSearchFormProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)

  const { data: userList } = useUserGetShareCollectionQuery()
  const { data: roleList } = useRoleGetShareCollectionQuery()

  const handleFormValuesChange = (changedValues: Partial<SavedSearchFormValues>): void => {
    if (changedValues.shareGlobally !== undefined) {
      onSharedGloballyChange(changedValues.shareGlobally)
    }
  }

  const renderIcon = (iconName: string, size?: number): React.JSX.Element => (
    <Icon
      className={ styles.icon }
      options={ { width: size ?? 12, height: size ?? 12 } }
      value={ iconName }
    />
  )

  const renderRightLabelComponent = (): React.JSX.Element => {
    if (isSharedGlobally) {
      return <Text className={ styles.label }>{t('common.globally')}</Text>
    }

    return (
      <>
        <Flex gap={ 10 }>
          <Text className={ styles.label }>
            {renderIcon('user')} {t('user-management.user')} | {renderIcon('shield')} {t('user-management.role')}
          </Text>
          <Flex
            align="center"
            className={ styles.editButton }
            gap={ 8 }
            onClick={ () => { setIsOpenDropdown(!isOpenDropdown) } }
          >
            {renderIcon('edit', 16)}
            <Text className={ styles.editButtonText }>{t('button.add-edit')}</Text>
          </Flex>
        </Flex>
        {isOpenDropdown && (
          <UsersRolesDropdown
            initialSharedRoles={ sharedRoles }
            initialSharedUsers={ sharedUsers }
            onChange={ onUsersRolesChange }
            onClose={ () => { setIsOpenDropdown(false) } }
            renderAsPopup
            roleList={ roleList }
            userList={ userList }
          />
        )}
      </>
    )
  }

  const getSharedUsersRolesList = (): TagListProps['list'] => {
    const usersTagList: TagProps[] = []
    const rolesTagList: TagProps[] = []

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

    userList?.items.forEach((item) => {
      if (sharedUsers.includes(item.id)) {
        usersTagList.push(getTagItem({ label: item?.username, iconName: 'user' }))
      }
    })

    roleList?.items.forEach((item) => {
      if (sharedRoles.includes(item.id)) {
        rolesTagList.push(getTagItem({ label: item?.name, iconName: 'shield' }))
      }
    })

    return [usersTagList, rolesTagList]
  }

  return (
    <Form
      form={ form }
      initialValues={ defaultValues }
      layout="vertical"
      onValuesChange={ handleFormValuesChange }
    >
      <Form.Item
        label={ t('user-management.name') }
        name="name"
        rules={ [{ required: true, message: t('form.validation.provide-name') }] }
      >
        <Input data-testid='saved-search-name-input' />
      </Form.Item>

      <Form.Item
        label={ t('description') }
        name="description"
      >
        <Input.TextArea data-testid='saved-search-description-input' />
      </Form.Item>

      <Form.Item
        name="createMenuShortcut"
        valuePropName='checked'
      >
        <Switch labelRight={ <Text>{t('saved-search.create-menu-shortcut')}</Text> } />
      </Form.Item>

      <Flex
        align='center'
        gap='mini'
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

      { !isSharedGlobally && !isEmpty(getSharedUsersRolesList().flat()) && (
        <TagList
          itemGap="mini"
          list={ getSharedUsersRolesList() }
          tagListItemClassNames={ styles.tag }
        />
      )}
    </Form>
  )
}
