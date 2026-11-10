/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Title } from '@Pimcore/components/title/title'
import { Switch } from '@Pimcore/components/switch/switch'
import { Icon } from '@Pimcore/components/icon/icon'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { useUserGetShareCollectionQuery } from '@Pimcore/modules/user/user-api-slice-enhanced'
import { useServiceUserGetCollectionQuery } from '@Pimcore/modules/user/service-users/service-users-api-slice-enhanced'
import { useRoleGetShareCollectionQuery } from '@Pimcore/modules/user/roles/roles-api-slice-enhanced'
import { type McpServerAccessGrant } from '../../mcp-servers-api-slice.gen'
import { SharingGrid } from './sharing-grid'
import { describeAccess, splitSharedUsers } from '../../utils'

interface SharingFieldsProps {
  shareGlobal: boolean
  onShareGlobalChange: (value: boolean) => void
  sharedUsers: McpServerAccessGrant[]
  onSharedUsersChange: (value: McpServerAccessGrant[]) => void
  sharedRoles: McpServerAccessGrant[]
  onSharedRolesChange: (value: McpServerAccessGrant[]) => void
  disabled: boolean
  /** Owner username, so the owner's own user row shows Read/Edit locked-on. */
  ownerName?: string | null
}

export const SharingFields = ({
  shareGlobal,
  onShareGlobalChange,
  sharedUsers,
  onSharedUsersChange,
  sharedRoles,
  onSharedRolesChange,
  disabled,
  ownerName
}: SharingFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()

  const { data: userList } = useUserGetShareCollectionQuery()
  const { data: roleList } = useRoleGetShareCollectionQuery()

  const userNames = useMemo<string[]>(
    () => (userList?.items ?? []).map((user) => user.username),
    [userList]
  )
  const { data: serviceUserList } = useServiceUserGetCollectionQuery()
  const serviceUsers = serviceUserList?.items
  const serviceUserNames = useMemo<string[]>(
    () => (serviceUsers ?? []).map((serviceUser) => serviceUser.name),
    [serviceUsers]
  )
  const inactiveServiceUserNames = useMemo<string[]>(
    () => (serviceUsers ?? []).filter((serviceUser) => !serviceUser.active).map((serviceUser) => serviceUser.name),
    [serviceUsers]
  )
  const { humanGrants, serviceUserGrants } = useMemo(
    () => splitSharedUsers(sharedUsers, serviceUserNames),
    [sharedUsers, serviceUserNames]
  )
  const roleNames = useMemo<string[]>(
    () => (roleList?.items ?? []).map((role) => role.name),
    [roleList]
  )

  // Who can connect, not who can see the configuration: see describeAccess().
  const summary = describeAccess({ shareGlobal, sharedUsers, sharedRoles }, t, serviceUserNames)

  return (
    <Flex
      gap="small"
      vertical
    >
      <Switch
        checked={ shareGlobal }
        disabled={ disabled }
        labelRight={
          <Flex
            align="center"
            gap="mini"
          >
            <Text>{t('mcp-servers.sharing.share-globally')}</Text>
            <Tooltip title={ t('mcp-servers.sharing.share-globally-tooltip') }>
              <Icon value="info-circle" />
            </Tooltip>
          </Flex>
        }
        onChange={ onShareGlobalChange }
      />

      {!shareGlobal && (
        <>
          <Title level={ 5 }>{t('mcp-servers.sharing.users')}</Title>
          <SharingGrid
            addPlaceholder={ t('mcp-servers.sharing.add-user') }
            candidateNames={ userNames }
            disabled={ disabled }
            onChange={ (next) => { onSharedUsersChange([...next, ...serviceUserGrants]) } }
            ownerName={ ownerName }
            value={ humanGrants }
          />

          <Title level={ 5 }>{t('mcp-servers.sharing.roles')}</Title>
          <SharingGrid
            addPlaceholder={ t('mcp-servers.sharing.add-role') }
            candidateNames={ roleNames }
            disabled={ disabled }
            onChange={ onSharedRolesChange }
            value={ sharedRoles }
          />

          <Title level={ 5 }>{t('mcp-servers.sharing.service-users')}</Title>
          <Text type="secondary">{t('mcp-servers.sharing.service-users-hint')}</Text>
          <SharingGrid
            accessOnly
            addPlaceholder={ t('mcp-servers.sharing.add-service-user') }
            candidateNames={ serviceUserNames }
            disabled={ disabled }
            inactiveNames={ inactiveServiceUserNames }
            onChange={ (next) => { onSharedUsersChange([...humanGrants, ...next]) } }
            value={ serviceUserGrants }
          />
        </>
      )}

      <Text type="secondary">
        {t('mcp-servers.sharing.who-can-access')}: {summary}
      </Text>
    </Flex>
  )
}
