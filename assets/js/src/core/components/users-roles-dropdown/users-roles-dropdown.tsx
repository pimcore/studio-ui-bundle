/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import { type ITabsProps, Tabs } from '@Pimcore/components/tabs/tabs'
import { Select } from '@Pimcore/components/select/select'
import { Text } from '@Pimcore/components/text/text'
import { Flex } from '@Pimcore/components/flex/flex'
import { Icon } from '@Pimcore/components/icon/icon'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { Button } from '@Pimcore/components/button/button'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import type { RoleGetCollectionApiResponse } from '@Pimcore/modules/user/roles/roles-api-slice.gen'
import type { UserGetCollectionApiResponse } from '@Pimcore/modules/auth/user/user-api-slice.gen'
import { useStyles } from './users-roles-dropdown.styles'

interface IUsersRolesDropdownProps {
  roleList?: RoleGetCollectionApiResponse
  initialSharedRoles: number[]
  userList?: UserGetCollectionApiResponse
  initialSharedUsers: number[]
  handleClose: () => void
  handleApplyChanges: ({ sharedUsers, sharedRoles }: { sharedUsers: number[], sharedRoles: number[] }) => void
  placement: 'top' | 'bottom'
}

interface IRenderSelectProps {
  options?: Array<{ value: number, label: ReactNode, searchValue?: string }>
  placeholder: string
  handleOnChange: any
  selectedOptions: number[]
}

export const UsersRolesDropdown = ({ userList, initialSharedUsers, roleList, initialSharedRoles, handleClose, handleApplyChanges, placement = 'bottom' }: IUsersRolesDropdownProps): React.JSX.Element => {
  const userData = useUser()

  const [sharedUsersList, setSharedUsersList] = useState<number[]>(initialSharedUsers ?? [])
  const [sharedRolesList, setSharedRolesList] = useState<number[]>(initialSharedRoles ?? [])

  const { t } = useTranslation()
  const { styles } = useStyles()

  const handleChangeSharedUsers = (usersIdList: number[]): void => {
    setSharedUsersList(usersIdList)
  }

  const handleChangeSharedRoles = (rolesIdList: number[]): void => {
    setSharedRolesList(rolesIdList)
  }

  const renderLabel = ({ labelName, iconName }: { labelName?: string, iconName: string }): React.JSX.Element => (
    <Flex
      align="center"
      gap="mini"
    >
      <Icon value={ iconName } />
      <Text>{labelName}</Text>
    </Flex>
  )

  const renderSelect = ({ options, selectedOptions, placeholder, handleOnChange }: IRenderSelectProps): React.JSX.Element => (
    <Select
      mode="multiple"
      onChange={ handleOnChange }
      optionFilterProp="searchValue"
      options={ options }
      placeholder={ t(placeholder) }
      showSearch
      value={ selectedOptions }
    />
  )

  const renderUsers = (): React.JSX.Element => {
    const options = userList?.items
      ?.filter(item => userData?.id !== item.id)
      ?.map((item) => ({
        value: item.id,
        label: renderLabel({ labelName: item?.username, iconName: 'user' }),
        searchValue: item?.username
      }))

    return renderSelect({
      options,
      selectedOptions: sharedUsersList,
      placeholder: 'user-management.user.search',
      handleOnChange: handleChangeSharedUsers
    })
  }

  const renderRoles = (): React.JSX.Element => {
    const options = roleList?.items?.map((item) => ({
      value: item.id,
      label: renderLabel({ labelName: item?.name, iconName: 'shield' }),
      searchValue: item?.name
    }))

    return renderSelect({
      options,
      selectedOptions: sharedRolesList,
      placeholder: 'user-management.role.search',
      handleOnChange: handleChangeSharedRoles
    })
  }

  const tabItems: ITabsProps['items'] = [
    {
      key: 'users',
      label: t('user-management.users'),
      children: renderUsers()
    },
    {
      key: 'roles',
      label: t('user-management.roles'),
      children: renderRoles()
    }
  ]

  return (
    <div className={ cn(styles.dropdown, {
      [styles.dropdownBottom]: placement === 'bottom',
      [styles.dropdownTop]: placement === 'top'
    }) }
    >
      <Tabs
        centered
        className={ styles.tabs }
        items={ tabItems }
      />
      <div className={ styles.btnGroupWrapper }>
        <ButtonGroup
          items={ [
            <Button
              key="cancel"
              onClick={ handleClose }
            >
              {t('button.cancel-edits')}
            </Button>,
            <Button
              key="apply"
              onClick={ () => { handleApplyChanges({ sharedUsers: sharedUsersList, sharedRoles: sharedRolesList }) } }
              type="primary"
            >
              {t('button.apply')}
            </Button>
          ] }
        />
      </div>
    </div>
  )
}
