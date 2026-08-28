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
import { isNil } from 'lodash'
import { createColumnHelper } from '@tanstack/react-table'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Title } from '@Pimcore/components/title/title'
import { Switch } from '@Pimcore/components/switch/switch'
import { Select } from '@Pimcore/components/select/select'
import { Icon } from '@Pimcore/components/icon/icon'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { OperationalGrid } from '@Pimcore/components/operational-grid/operational-grid'
import { useUserGetShareCollectionQuery } from '@Pimcore/modules/user/user-api-slice-enhanced'
import { useRoleGetShareCollectionQuery } from '@Pimcore/modules/user/roles/roles-api-slice-enhanced'
import { type McpServerAccessGrant } from '../../mcp-servers-api-slice.gen'
import { describeAccess } from '../../utils'

interface SharingGridProps {
  /** Names available to add (users or roles), from the share collection. */
  candidateNames: string[]
  value: McpServerAccessGrant[]
  onChange: (value: McpServerAccessGrant[]) => void
  disabled: boolean
  addPlaceholder: string
}

const SharingGrid = ({
  candidateNames,
  value,
  onChange,
  disabled,
  addPlaceholder
}: SharingGridProps): React.JSX.Element => {
  const { t } = useTranslation()

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<McpServerAccessGrant>()

    return [
      // Accessor (not a custom display cell) so the grid's default cell renderer
      // applies the standard horizontal padding — matching agent-config permissions.
      columnHelper.accessor((row) => row.name, {
        id: 'name',
        header: t('mcp-servers.sharing.name'),
        size: 240,
        meta: { editable: false, autoWidth: true }
      }),
      // Two independent booleans mirroring the Agent bundle's run/update grid:
      // "Can access" lets the grantee connect a client, "Can edit" lets them
      // change the configuration. Both are real fields on the grant, so the
      // grid writes them straight through onChange (no cell-data translation).
      columnHelper.accessor('canAccess', {
        header: t('mcp-servers.sharing.can-access'),
        size: 120,
        meta: {
          type: 'checkbox',
          editable: !disabled,
          config: {
            align: 'center',
            disabled
          }
        }
      }),
      columnHelper.accessor('canEdit', {
        header: t('mcp-servers.sharing.can-edit'),
        size: 120,
        meta: {
          type: 'checkbox',
          editable: !disabled,
          config: {
            align: 'center',
            disabled
          }
        }
      }),
      columnHelper.display({
        id: 'actions',
        header: '',
        size: 60,
        enableResizing: false,
        enableSorting: false,
        cell: (info) => (
          <Flex
            align="center"
            justify="center"
          >
            <IconButton
              disabled={ disabled }
              icon={ { value: 'trash' } }
              onClick={ () => {
                const next = [...value]
                next.splice(info.row.index, 1)
                onChange(next)
              } }
              type="text"
            />
          </Flex>
        )
      })
    ]
  }, [t, disabled, value, onChange])

  const options = useMemo(() => {
    const taken = new Set(value.map((grant) => grant.name))
    return candidateNames
      .filter((name) => !taken.has(name))
      .map((name) => ({ label: name, value: name }))
  }, [candidateNames, value])

  return (
    <OperationalGrid
      autoWidth
      columns={ columns }
      onChange={ (next) => { onChange(next as McpServerAccessGrant[]) } }
      value={ value }
    >
      {!disabled && (
        <OperationalGrid.Operations>
          {(operations) => (
            <Select
              onChange={ (name: string) => {
                if (!isNil(name) && name !== '') {
                  operations.addRow({ name, canAccess: true, canEdit: false })
                }
              } }
              options={ options }
              placeholder={ addPlaceholder }
              showSearch
              style={ { width: 260 } }
              // Always render the placeholder — the picked entry is pushed to the grid, never kept here.
              value={ undefined }
            />
          )}
        </OperationalGrid.Operations>
      )}
      <OperationalGrid.Grid />
    </OperationalGrid>
  )
}

interface SharingFieldsProps {
  shareGlobal: boolean
  onShareGlobalChange: (value: boolean) => void
  sharedUsers: McpServerAccessGrant[]
  onSharedUsersChange: (value: McpServerAccessGrant[]) => void
  sharedRoles: McpServerAccessGrant[]
  onSharedRolesChange: (value: McpServerAccessGrant[]) => void
  disabled: boolean
}

export const SharingFields = ({
  shareGlobal,
  onShareGlobalChange,
  sharedUsers,
  onSharedUsersChange,
  sharedRoles,
  onSharedRolesChange,
  disabled
}: SharingFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()

  const { data: userList } = useUserGetShareCollectionQuery()
  const { data: roleList } = useRoleGetShareCollectionQuery()

  const userNames = useMemo<string[]>(
    () => (userList?.items ?? []).map((user) => user.username),
    [userList]
  )
  const roleNames = useMemo<string[]>(
    () => (roleList?.items ?? []).map((role) => role.name),
    [roleList]
  )

  const base = t('mcp-servers.access.admins-owner')
  const hasGrants = sharedUsers.length > 0 || sharedRoles.length > 0
  const summary = shareGlobal
    ? `${base}, ${t('mcp-servers.access.global-extra')}`
    : hasGrants
      ? `${base}, ${describeAccess({ shareGlobal, sharedUsers, sharedRoles }, t)}`
      : t('mcp-servers.access.admin-owner-only')

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
            onChange={ onSharedUsersChange }
            value={ sharedUsers }
          />

          <Title level={ 5 }>{t('mcp-servers.sharing.roles')}</Title>
          <SharingGrid
            addPlaceholder={ t('mcp-servers.sharing.add-role') }
            candidateNames={ roleNames }
            disabled={ disabled }
            onChange={ onSharedRolesChange }
            value={ sharedRoles }
          />
        </>
      )}

      <Text type="secondary">
        {t('mcp-servers.sharing.who-can-access')}: {summary}
      </Text>
    </Flex>
  )
}
