/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import { type ITabsProps, Tabs } from '@Pimcore/components/tabs/tabs'
import { Select } from '@Pimcore/components/select/select'
import { Text } from '@Pimcore/components/text/text'
import { Flex } from '@Pimcore/components/flex/flex'
import { Icon } from '@Pimcore/components/icon/icon'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import type { RoleGetCollectionApiResponse } from '@Pimcore/modules/user/roles/roles-api-slice.gen'
import type { UserGetCollectionApiResponse } from '@Pimcore/modules/auth/user/user-api-slice.gen'
import { useStyles } from './users-roles-dropdown.styles'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'

type EntityType = 'users' | 'roles'

interface SelectedOption {
  value: number
  label: ReactNode
}

export interface UsersRolesChange {
  sharedUsers: number[]
  sharedRoles: number[]
}

export interface IUsersRolesDropdownProps {
  roleList?: RoleGetCollectionApiResponse
  initialSharedRoles: number[]
  userList?: UserGetCollectionApiResponse
  initialSharedUsers: number[]
  onChange: (change: UsersRolesChange) => void
  placement?: 'top' | 'bottom'
  renderAsPopup?: boolean
}

export const UsersRolesDropdown = ({ userList, initialSharedUsers, roleList, initialSharedRoles, onChange, placement = 'bottom', renderAsPopup = false }: IUsersRolesDropdownProps): React.JSX.Element => {
  const userData = useUser()

  const [sharedUsers, setSharedUsers] = useState<number[]>(initialSharedUsers ?? [])
  const [sharedRoles, setSharedRoles] = useState<number[]>(initialSharedRoles ?? [])
  const [activeTab, setActiveTab] = useState<EntityType>('users')

  const { t } = useTranslation()
  const { styles } = useStyles()

  const userItems = useMemo(
    () => userList?.items?.filter(item => item.id !== userData?.id) ?? [],
    [userList, userData?.id]
  )
  const roleItems = useMemo(() => roleList?.items ?? [], [roleList])

  const userNameById = useMemo(() => new Map(userItems.map(item => [item.id, item.username])), [userItems])
  const roleNameById = useMemo(() => new Map(roleItems.map(item => [item.id, item.name])), [roleItems])

  const renderLabel = (labelName: string | undefined, iconName: string): React.JSX.Element => (
    <Flex
      align="center"
      gap="mini"
    >
      <Icon value={ iconName } />
      <Text>{labelName}</Text>
    </Flex>
  )

  const options = useMemo(() => {
    const source = activeTab === 'users'
      ? userItems.map(item => ({
          value: item.id,
          label: renderLabel(item.username, 'user'),
          searchValue: item.username
        }))
      : roleItems.map(item => ({
          value: item.id,
          label: renderLabel(item.name, 'shield'),
          searchValue: item.name
        }))

    return source.sort((a, b) => (a.searchValue ?? '').localeCompare(b.searchValue ?? ''))
  }, [activeTab, userItems, roleItems])

  const selectValue: SelectedOption[] = useMemo(() => [
    ...sharedUsers.map(id => ({ value: id, label: renderLabel(userNameById.get(id), 'user') })),
    ...sharedRoles.map(id => ({ value: id, label: renderLabel(roleNameById.get(id), 'shield') }))
  ], [sharedUsers, sharedRoles, userNameById, roleNameById])

  const applyChanges = (users: number[], roles: number[]): void => {
    setSharedUsers(users)
    setSharedRoles(roles)

    onChange({ sharedUsers: users, sharedRoles: roles })
  }

  const handleSelectChange = (selected: SelectedOption[]): void => {
    const users: number[] = []
    const roles: number[] = []

    selected.forEach(({ value }) => {
      if (roleNameById.has(value)) {
        roles.push(value)
      } else {
        users.push(value)
      }
    })

    applyChanges(users, roles)
  }

  const handleClear = (): void => {
    if (activeTab === 'users') {
      applyChanges([], sharedRoles)
    } else {
      applyChanges(sharedUsers, [])
    }
  }

  const tabItems: ITabsProps['items'] = [
    {
      key: 'users',
      label: t('user-management.users'),
      children: null
    },
    {
      key: 'roles',
      label: t('user-management.roles'),
      children: null
    }
  ]

  const dropdownRender = (menu: React.ReactNode): React.JSX.Element => (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className={ styles.popupHeader }
        onMouseDown={ (event) => { event.preventDefault() } }
      >
        <Tabs
          activeKey={ activeTab }
          centered
          className={ styles.tabs }
          items={ tabItems }
          onChange={ (key) => { setActiveTab(key as EntityType) } }
        />
        <IconTextButton
          className={ styles.clearOption }
          icon={ { value: 'trash' } }
          onClick={ handleClear }
          type="text"
        >
          {t('common.clear')}
        </IconTextButton>
      </div>
      {menu}
    </>
  )

  const selectElement = (
    <Select
      customArrowIcon={ renderAsPopup ? 'chevron-up' : undefined }
      dropdownRender={ dropdownRender }
      dropdownStyle={ { minWidth: 300 } }
      getPopupContainer={ (triggerNode) => triggerNode.parentElement ?? document.body }
      labelInValue
      minWidth={ 300 }
      mode="multiple"
      onChange={ handleSelectChange }
      open={ renderAsPopup ? true : undefined }
      optionFilterProp="searchValue"
      options={ options }
      placeholder={ t('user-management.users-roles.search') }
      placement={ placement === 'top' ? 'topLeft' : 'bottomLeft' }
      showSearch
      value={ selectValue }
    />
  )

  if (!renderAsPopup) {
    return selectElement
  }

  return (
    <div
      className={ cn(styles.dropdown, {
        [styles.dropdownBottom]: placement === 'bottom',
        [styles.dropdownTop]: placement === 'top'
      }) }
    >
      {selectElement}
    </div>
  )
}
