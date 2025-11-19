/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Box, Flex, Tooltip } from '@sdk/components'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { type ElementUsageItem } from '../../usage-api-slice.gen'
import { type ElementInfo } from '@sdk/modules/element'
import { useSearchReplaceAssignments } from '../../providers/search-replace-assignments/search-replace-assignments-provider'
import { Icon } from '@Pimcore/components/icon/icon'

interface ElementInfoProps {
  row: {
    original: ElementUsageItem
  }
}

export const Table = (): React.JSX.Element => {
  const { t } = useTranslation()
  const {
    usageItems,
    isFetching,
    selectedRows,
    setSelectedRows
  } = useSearchReplaceAssignments()

  const columnHelper = createColumnHelper<ElementUsageItem>()

  const getIconForType = (type: string): string => {
    switch (type) {
      case 'data-object':
        return 'data-object'
      case 'document':
        return 'document'
      case 'asset':
        return 'asset'
      default:
        return 'file-05'
    }
  }

  const columns = [
    columnHelper.accessor('id', {
      header: t('search-replace-assignments.columns.id'),
      size: 150
    }),
    columnHelper.accessor('type', {
      header: t('search-replace-assignments.columns.type'),
      size: 70,
      cell: ({ row }): React.JSX.Element => {
        const type = row.original.type

        return (
          <Flex
            align="center"
            justify="center"
          >
            <Tooltip title={ t(type) }>
              <Icon
                value={ getIconForType(type) }
              />
            </Tooltip>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('path', {
      header: t('search-replace-assignments.columns.path'),
      size: 400,
      meta: {
        autoWidth: true,
        type: 'element',
        config: {
          getElementInfo: (props: ElementInfoProps): ElementInfo => {
            /* eslint-disable react/prop-types */
            return {
              id: props.row.original.id,
              fullPath: props.row.original.path
            }
            /* eslint-enable react/prop-types */
          }
        }
      }
    })
  ]

  return (
    <Box margin={ { x: 'small', bottom: 'small' } }>
      <Grid
        autoWidth
        columns={ columns }
        data={ usageItems }
        enableMultipleRowSelection
        enableRowSelection
        isLoading={ isFetching }
        onSelectedRowsChange={ setSelectedRows }
        resizable
        selectedRows={ selectedRows }
      />
    </Box>
  )
}
