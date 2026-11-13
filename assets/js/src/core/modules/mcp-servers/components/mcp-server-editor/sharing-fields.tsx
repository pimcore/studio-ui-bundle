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

  const { data: userList, isLoading: loadingUsers } = useUserGetShareCollectionQuery()
  const { data: roleList } = useRoleGetShareCollectionQuery()

  const shareListNames = useMemo<string[]>(
    () => (userList?.items ?? []).map((user) => user.username),
    [userList]
  )
  const {
    data: serviceUserList,
    isLoading: loadingServiceUsers,
    isError: serviceUsersUnavailable
  } = useServiceUserGetCollectionQuery()
  const serviceUsers = serviceUserList?.items
  // Listing service users needs the user management permission, sharing does not. Without the
  // list, every grant that is not for a human user from the share list is kept as a service-user
  // grant: it is passed through unchanged on every write and counted as such in the summary.
  const serviceUserNames = useMemo<string[]>(
    () => serviceUsersUnavailable
      ? sharedUsers.map((grant) => grant.name).filter((name) => !shareListNames.includes(name))
      : (serviceUsers ?? []).map((serviceUser) => serviceUser.name),
    [serviceUsersUnavailable, sharedUsers, shareListNames, serviceUsers]
  )
  // Until it is known which grants are service users, a write from either grid would drop them.
  const grantsDisabled = disabled || loadingServiceUsers || (serviceUsersUnavailable && loadingUsers)
  const userNames = useMemo<string[]>(
    () => shareListNames.filter((name) => !serviceUserNames.includes(name)),
    [shareListNames, serviceUserNames]
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
            disabled={ grantsDisabled }
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
          {serviceUsersUnavailable
            ? <Text type="secondary">{t('mcp-servers.sharing.service-users-unavailable')}</Text>
            : (
              <>
                <Text type="secondary">{t('mcp-servers.sharing.service-users-hint')}</Text>
                <SharingGrid
                  accessOnly
                  addPlaceholder={ t('mcp-servers.sharing.add-service-user') }
                  candidateNames={ serviceUserNames }
                  disabled={ grantsDisabled }
                  inactiveNames={ inactiveServiceUserNames }
                  onChange={ (next) => { onSharedUsersChange([...humanGrants, ...next]) } }
                  value={ serviceUserGrants }
                />
              </>
              )}
        </>
      )}

      <Text type="secondary">
        {t('mcp-servers.sharing.who-can-access')}: {summary}
      </Text>
    </Flex>
  )
}
