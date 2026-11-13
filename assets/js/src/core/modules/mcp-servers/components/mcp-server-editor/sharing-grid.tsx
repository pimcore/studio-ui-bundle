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
import { Select } from '@Pimcore/components/select/select'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { OperationalGrid } from '@Pimcore/components/operational-grid/operational-grid'
import { type McpServerAccessGrant } from '../../mcp-servers-api-slice.gen'

export interface SharingGridProps {
  /** Names available to add (users or roles), from the share collection. */
  candidateNames: string[]
  value: McpServerAccessGrant[]
  onChange: (value: McpServerAccessGrant[]) => void
  disabled: boolean
  addPlaceholder: string
  /** Owner username (users grid only). The owner always has Config Read + Edit. */
  ownerName?: string | null
  /** Service user grids: only MCP Server Access is offered; new entries carry no config rights. */
  accessOnly?: boolean
  /** Names to mark as inactive (deactivated service users). */
  inactiveNames?: string[]
}

export const SharingGrid = ({
  candidateNames,
  value,
  onChange,
  disabled,
  addPlaceholder,
  ownerName,
  accessOnly = false,
  inactiveNames = []
}: SharingGridProps): React.JSX.Element => {
  const { t } = useTranslation()

  // The owner has implicit Config Read + Config Edit (the backend grants them
  // regardless of the stored flags), so those two are shown locked-on and only
  // MCP Server Access is meaningful to toggle for the owner's own row.
  const isPrivileged = (grant: McpServerAccessGrant): boolean =>
    !isNil(ownerName) && grant.name === ownerName

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<McpServerAccessGrant>()

    return [
      // Accessor (not a custom display cell) so the grid's default cell renderer
      // applies the standard horizontal padding — matching agent-config permissions.
      columnHelper.accessor((row) => row.name, {
        id: 'name',
        header: t('mcp-servers.sharing.name'),
        size: 240,
        meta: { editable: false, autoWidth: true },
        cell: (info) => (
          <Flex
            align="center"
            gap="mini"
            style={ { padding: '0 8px' } }
          >
            <Text>{info.getValue()}</Text>
            {inactiveNames.includes(info.getValue()) && (
              <Text type="secondary">{t('mcp-servers.sharing.inactive')}</Text>
            )}
          </Flex>
        )
      }),
      // Three independent capabilities per grant (issue #1452), in the order the
      // spec lists them. Each is a real boolean field, so the grid writes it
      // straight through onChange. Config Read is forced on (and its box disabled)
      // whenever Edit is set — you cannot edit a config you cannot read.
      ...(accessOnly ? [] : [columnHelper.accessor('canRead', {
        header: t('mcp-servers.sharing.config-read'),
        size: 130,
        meta: {
          type: 'checkbox',
          editable: (row: McpServerAccessGrant) => !disabled && !row.canEdit && !isPrivileged(row),
          config: { align: 'center' }
        }
      }),
      columnHelper.accessor('canEdit', {
        header: t('mcp-servers.sharing.config-edit'),
        size: 130,
        meta: {
          type: 'checkbox',
          editable: (row: McpServerAccessGrant) => !disabled && !isPrivileged(row),
          config: { align: 'center' }
        }
      })]),
      columnHelper.accessor('canAccess', {
        header: t('mcp-servers.sharing.mcp-access'),
        size: 170,
        meta: {
          type: 'checkbox',
          editable: !disabled,
          config: { align: 'center' }
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
            {/* The owner's row is locked like its Read/Edit cells: removing it would drop
                the owner's MCP Server Access; revoking Access is done with its checkbox. */}
            <IconButton
              disabled={ disabled || isPrivileged(info.row.original) }
              icon={ { value: 'trash' } }
              onClick={ () => {
                const next = [...value]
                next.splice(info.row.index, 1)
                onChange(next)
              } }
              title={ t('delete') }
              type="text"
            />
          </Flex>
        )
      })
    ]
  }, [t, disabled, value, onChange, ownerName, accessOnly, inactiveNames])

  const options = useMemo(() => {
    const taken = new Set(value.map((grant) => grant.name))
    return candidateNames
      .filter((name) => !taken.has(name))
      .map((name) => ({ label: name, value: name }))
  }, [candidateNames, value])

  // Keep every row self-consistent: the owner always has Config Read + Edit, and
  // no one may have Edit without Read. Applied to both the rendered rows and every
  // change, so the (disabled) boxes show ticked and never persist a nonsense state.
  const normalize = (grants: McpServerAccessGrant[]): McpServerAccessGrant[] =>
    grants.map((grant) => {
      if (isPrivileged(grant)) {
        return grant.canRead && grant.canEdit ? grant : { ...grant, canRead: true, canEdit: true }
      }
      return grant.canEdit && !grant.canRead ? { ...grant, canRead: true } : grant
    })

  return (
    <OperationalGrid
      autoWidth
      columns={ columns }
      onChange={ (next) => { onChange(normalize(next as McpServerAccessGrant[])) } }
      value={ normalize(value) }
    >
      {!disabled && (
        <OperationalGrid.Operations>
          {(operations) => (
            <Select
              onChange={ (name: string) => {
                if (!isNil(name) && name !== '') {
                  // New grant starts read-only; Edit and Access are opt-in. A service user
                  // can only connect, so it starts with MCP Server Access alone.
                  operations.addRow(accessOnly
                    ? { name, canRead: false, canAccess: true, canEdit: false }
                    : { name, canRead: true, canAccess: false, canEdit: false })
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
