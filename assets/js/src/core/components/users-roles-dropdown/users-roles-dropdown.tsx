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

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useListGridConfig } from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/hooks/use-list'
import { type ITabsProps, Tabs } from '@Pimcore/components/tabs/tabs'
import { Select } from '@Pimcore/components/select/select'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { Button } from '@Pimcore/components/button/button'
import type { RoleGetCollectionApiResponse } from '@Pimcore/modules/user/role/role-api-slice.gen'
import type { UserGetCollectionApiResponse } from '@Pimcore/modules/auth/user/user-api-slice.gen'
import { useStyles } from './users-roles-dropdown.styles'
import { isEmpty } from 'lodash'

interface IUsersRolesDropdownProps {
  roleList?: RoleGetCollectionApiResponse
  userList?: UserGetCollectionApiResponse
  handleClose: () => void
}

export const UsersRolesDropdown = ({ userList, roleList, handleClose }: IUsersRolesDropdownProps): React.JSX.Element => {
  const { gridConfig, setGridConfig } = useListGridConfig()

  const initialSharedUsers = gridConfig?.sharedUsers as number[]
  const initialSharedRoles = gridConfig?.sharedRoles as number[]

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

  const handleApplyChanges = (): void => {
    if (!isEmpty(gridConfig)) {
      setGridConfig({
        ...gridConfig,
        sharedUsers: sharedUsersList as object,
        sharedRoles: sharedRolesList as object
      })

      handleClose()
    }
  }

  const renderSelect = ({ options, selectedOptions, placeholder, handleOnChange }: { options?: Array<{ value: number, label?: string }>, placeholder: string, handleOnChange: any, selectedOptions: number[] }): React.JSX.Element => (
    <Select
      mode="multiple"
      onChange={ handleOnChange }
      options={ options }
      placeholder={ t(placeholder) }
      showSearch
      value={ selectedOptions }
    />
  )

  const renderUsers = (): React.JSX.Element => {
    const options = userList?.items?.map(item => ({
      value: item.id,
      label: item.username
    }))

    return renderSelect({
      options,
      selectedOptions: sharedUsersList,
      placeholder: 'user-management.user.search',
      handleOnChange: handleChangeSharedUsers
    })
  }

  const renderRoles = (): React.JSX.Element => {
    const options = roleList?.items?.map(item => ({
      value: item.id,
      label: item.name
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
      label: t('user-management.key-bindings.users'),
      children: renderUsers()
    },
    {
      key: 'roles',
      label: t('user-management.key-bindings.roles'),
      children: renderRoles()
    }
  ]

  return (
    <div className={ styles.dropdown }>
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
              onClick={ handleApplyChanges }
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
