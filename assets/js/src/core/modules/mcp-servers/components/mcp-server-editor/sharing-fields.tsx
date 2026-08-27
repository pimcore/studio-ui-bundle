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
import { type OnUpdateCellDataEvent } from '@Pimcore/types/components/types'
import { useUserGetShareCollectionQuery } from '@Pimcore/modules/user/user-api-slice-enhanced'
import { useRoleGetShareCollectionQuery } from '@Pimcore/modules/user/roles/roles-api-slice-enhanced'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
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
  // Extra id→name entries not present in the share collection (e.g. the current user).
  extraNames?: Candidate[]
}

const SharingGrid = ({
  candidates,
  value,
  onChange,
  disabled,
  addPlaceholder,
  extraNames = []
}: SharingGridProps): React.JSX.Element => {
  const { t } = useTranslation()

  const nameById = useMemo(() => {
    const map = new Map<number, string>()
    candidates.forEach((candidate) => { map.set(candidate.id, candidate.name) })
    // Fallbacks (current user) fill gaps the share collection omits, without
    // becoming selectable options below.
    extraNames.forEach((entry) => {
      if (!map.has(entry.id)) {
        map.set(entry.id, entry.name)
      }
    })
    return map
  }, [candidates, extraNames])

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<McpServerAccessGrant>()

    return [
      // Accessor (not a custom display cell) so the grid's default cell renderer
      // applies the standard horizontal padding — matching agent-config permissions.
      columnHelper.accessor((row) => nameById.get(row.id) ?? `#${row.id}`, {
        id: 'name',
        header: t('mcp-servers.sharing.name'),
        size: 240,
        meta: { editable: false, autoWidth: true }
      }),
      // A single "Can edit" checkbox: checked = write, unchecked = read.
      // Write implies read; read is the baseline for any grant.
      columnHelper.accessor((row) => row.permission === 'write', {
        id: 'canEdit',
        header: t('mcp-servers.sharing.can-edit'),
        size: 100,
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
  }, [t, disabled, value, onChange, nameById])

  // The checkbox writes a boolean under the synthetic `canEdit` column; translate
  // it back to the grant's read/write permission.
  const handleUpdateCellData = (event: OnUpdateCellDataEvent): void => {
    if (event.columnId !== 'canEdit') {
      return
    }
    const next = value.map((grant, index) =>
      index === event.rowIndex
        ? { ...grant, permission: event.value === true ? 'write' : 'read' } satisfies McpServerAccessGrant
        : grant
    )
    onChange(next)
  }

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
      // Remount when the resolvable-name set grows (the share-collection query
      // resolves after first paint). The grid caches each cell's value by column
      // id and only clears it when `value` changes, so without this the names
      // would stay as `#id` until the user edited a row.
      key={ `grid-${nameById.size}` }
      onChange={ (next) => { onChange(next as McpServerAccessGrant[]) } }
      onUpdateCellData={ handleUpdateCellData }
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
  const currentUser = useUser()

  const userCandidates = useMemo<Candidate[]>(
    () => (userList?.items ?? []).map((user) => ({ id: user.id, name: user.username })),
    [userList]
  )
  const roleCandidates = useMemo<Candidate[]>(
    () => (roleList?.items ?? []).map((role) => ({ id: role.id, name: role.name })),
    [roleList]
  )

  // The share collection excludes the current user, so a grant for them would
  // otherwise render as `#<id>`. Resolve it from the authenticated user.
  const currentUserName = useMemo<Candidate[]>(
    () => (currentUser.id > 0 ? [{ id: currentUser.id, name: currentUser.username }] : []),
    [currentUser]
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
            candidates={ userCandidates }
            disabled={ disabled }
            extraNames={ currentUserName }
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
