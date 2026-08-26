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
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { OperationalGrid } from '@Pimcore/components/operational-grid/operational-grid'
import { useUserGetShareCollectionQuery } from '@Pimcore/modules/user/user-api-slice-enhanced'
import { useRoleGetShareCollectionQuery } from '@Pimcore/modules/user/roles/roles-api-slice-enhanced'
import { type McpServerAccessGrant } from '../../mcp-servers-api-slice.gen'
import { describeAccess } from '../../utils'

interface Candidate {
  id: number
  name: string
}

interface SharingGridProps {
  candidates: Candidate[]
  value: McpServerAccessGrant[]
  onChange: (value: McpServerAccessGrant[]) => void
  disabled: boolean
  addPlaceholder: string
}

const SharingGrid = ({
  candidates,
  value,
  onChange,
  disabled,
  addPlaceholder
}: SharingGridProps): React.JSX.Element => {
  const { t } = useTranslation()

  const nameById = useMemo(() => {
    const map = new Map<number, string>()
    candidates.forEach((candidate) => { map.set(candidate.id, candidate.name) })
    return map
  }, [candidates])

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<McpServerAccessGrant>()

    return [
      columnHelper.display({
        id: 'name',
        header: t('mcp-servers.sharing.name'),
        size: 240,
        meta: { autoWidth: true },
        cell: (info) => {
          const grant = info.row.original
          return <Text>{nameById.get(grant.id) ?? `#${grant.id}`}</Text>
        }
      }),
      columnHelper.accessor('permission', {
        header: t('mcp-servers.sharing.level'),
        size: 160,
        meta: {
          type: 'select',
          editable: !disabled,
          config: {
            options: [
              { label: t('mcp-servers.sharing.read'), value: 'read' },
              { label: t('mcp-servers.sharing.write'), value: 'write' }
            ]
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
  }, [t, disabled, value, onChange, nameById])

  const options = useMemo(() => {
    const takenIds = new Set(value.map((grant) => grant.id))
    return candidates
      .filter((candidate) => !takenIds.has(candidate.id))
      .map((candidate) => ({ label: candidate.name, value: candidate.id }))
  }, [candidates, value])

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
              onChange={ (id: number) => {
                if (!isNil(id)) {
                  operations.addRow({ id, permission: 'read' })
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

  const userCandidates = useMemo<Candidate[]>(
    () => (userList?.items ?? []).map((user) => ({ id: user.id, name: user.username })),
    [userList]
  )
  const roleCandidates = useMemo<Candidate[]>(
    () => (roleList?.items ?? []).map((role) => ({ id: role.id, name: role.name })),
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
      <Title level={ 5 }>{t('mcp-servers.sharing.title')}</Title>

      <Switch
        checked={ shareGlobal }
        disabled={ disabled }
        labelRight={ <Text>{t('mcp-servers.sharing.share-globally')}</Text> }
        onChange={ onShareGlobalChange }
      />

      {!shareGlobal && (
        <>
          <Title level={ 5 }>{t('mcp-servers.sharing.users')}</Title>
          <SharingGrid
            addPlaceholder={ t('mcp-servers.sharing.add-user') }
            candidates={ userCandidates }
            disabled={ disabled }
            onChange={ onSharedUsersChange }
            value={ sharedUsers }
          />

          <Title level={ 5 }>{t('mcp-servers.sharing.roles')}</Title>
          <SharingGrid
            addPlaceholder={ t('mcp-servers.sharing.add-role') }
            candidates={ roleCandidates }
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
