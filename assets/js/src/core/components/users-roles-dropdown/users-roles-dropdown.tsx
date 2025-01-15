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
import { type ITabsProps, Tabs } from '@Pimcore/components/tabs/tabs'
import type { RoleGetCollectionApiResponse } from '@Pimcore/modules/user/role/role-api-slice.gen'
import type { UserGetCollectionApiResponse } from '@Pimcore/modules/auth/user/user-api-slice.gen'
import { useStyles } from './users-roles-dropdown.styles'
import { useListGridConfig } from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/hooks/use-list'

interface IUsersRolesDropdownProps {
  roleList?: RoleGetCollectionApiResponse
  userList?: UserGetCollectionApiResponse
}

export const UsersRolesDropdown = ({ userList, roleList }: IUsersRolesDropdownProps): React.JSX.Element => {
  const { gridConfig, setGridConfig } = useListGridConfig()

  const { t } = useTranslation()
  const { styles } = useStyles()

  const handleUpdateSharedUsers = (id: any): void => {
    console.log('------>>>>>> ID: ', id, typeof id)
    console.log('------>>>>>> gridConfig: ', gridConfig)
    const initial = gridConfig?.sharedUsers
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    setGridConfig({ ...gridConfig, sharedUsers: [id, ...initial] })
  }

  const renderUsers = (): React.JSX.Element => (
    <div>
      {userList?.items?.map((item: any) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div
          key={ item?.id }
          onClick={ () => { handleUpdateSharedUsers(item?.id) } }
        >{item?.username}
        </div>
      ))}
    </div>
  )

  const renderRoles = (): React.JSX.Element => (
    <div>
      {roleList?.items?.map((item: any) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div
          key={ item?.id }
        >{item?.name}
        </div>
      ))}
    </div>
  )

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
    </div>
  )
}
