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

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useListGridConfig } from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/hooks/use-list'
import { type ITabsProps, Tabs } from '@Pimcore/components/tabs/tabs'
import { Select } from '@Pimcore/components/select/select'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { Button } from '@Pimcore/components/button/button'
import type { RoleGetCollectionApiResponse } from '@Pimcore/modules/user/role/role-api-slice.gen'
import type { UserGetCollectionApiResponse } from '@Pimcore/modules/auth/user/user-api-slice.gen'
import { useStyles } from './users-roles-dropdown.styles'

interface IUsersRolesDropdownProps {
  roleList?: RoleGetCollectionApiResponse
  userList?: UserGetCollectionApiResponse
}

export const UsersRolesDropdown = ({ userList, roleList }: IUsersRolesDropdownProps): React.JSX.Element => {
  const { gridConfig, setGridConfig } = useListGridConfig()

  const { t } = useTranslation()
  const { styles } = useStyles()

  console.log('------>>>>> gridConfig: ', gridConfig)
  console.log('------>>>>> userList: ', userList)

  const handleUpdateSharedUsers = (id: any): void => {
    console.log('------>>>>>> ID: ', id, typeof id)
    console.log('------>>>>>> gridConfig: ', gridConfig)
    const initial = gridConfig?.sharedUsers
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    setGridConfig({ ...gridConfig, sharedUsers: [id, ...initial] })
  }
  console.log('------>>>> handleUpdateSharedUsers: ', handleUpdateSharedUsers)

  const renderSelect = ({ options, placeholder }: { options?: Array<{ value: number, label?: string }>, placeholder: string }): React.JSX.Element => (
    <Select
      mode="multiple"
      options={ options }
      placeholder={ t(placeholder) }
      showSearch
    />
  )

  const renderUsers = (): React.JSX.Element => {
    const options = userList?.items?.map(item => ({
      value: item.id,
      label: item.username
    }))

    return renderSelect({ options, placeholder: 'user-management.user.search' })
  }

  const renderRoles = (): React.JSX.Element => {
    const options = roleList?.items?.map(item => ({
      value: item.id,
      label: item.name
    }))

    return renderSelect({ options, placeholder: 'user-management.role.search' })
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
            <Button key="cancel">{t('button.cancel-edits')}</Button>,
            <Button
              key="apply"
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
