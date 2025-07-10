/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Alert } from '@Pimcore/components/alert/alert'
import { DefaultCell } from '@Pimcore/components/grid/columns/default-cell'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { DEFAULT_COLUMN_WIDTH } from '@Pimcore/modules/element/dynamic-types/utils/column-helper'
import { type SelectedColumn } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import { type GridProps as BaseGridProps } from '@Pimcore/types/components/types'
import { type AccessorColumnDef, type IdentifiedColumnDef } from '@tanstack/react-table'
import React from 'react'
import { useTranslation } from 'react-i18next'

export type GridProps = Pick<BaseGridProps, 'contextMenu' | 'enableMultipleRowSelection' | 'enableRowSelection' | 'enableSorting' | 'modifiedCells' | 'onSelectedRowsChange' | 'onSortingChange' | 'onUpdateCellData' | 'selectedRows' | 'sorting' | 'onRowDoubleClick' | 'manualSorting'>

export interface UseGridOptionsReturn {
  transformGridColumn: (column: SelectedColumn) => IdentifiedColumnDef<unknown, never>
  transformGridColumnDefinition: (columns: Array<AccessorColumnDef<unknown, never>>) => Array<AccessorColumnDef<unknown, never>>
  getGridProps: () => GridProps
}

export const useGridOptions = (): UseGridOptionsReturn => {
  const { t } = useTranslation()
  const { hasType } = useDynamicTypeResolver()

  const transformGridColumn = (column: SelectedColumn): IdentifiedColumnDef<unknown, never> => {
    const isMainTypeIncluded = hasType({ target: 'GRID_CELL', dynamicTypeIds: [column.type] })
    const isSecondaryTypeIncluded = hasType({ target: 'GRID_CELL', dynamicTypeIds: [column.frontendType!] })
    const isTypeIncluded = isMainTypeIncluded || isSecondaryTypeIncluded

    const columnDefinition: IdentifiedColumnDef<unknown, never> = {
      header: t(column?.key ?? '') + (column.locale !== undefined && column.locale !== null ? ` (${column.locale})` : ''),
      meta: {
        type: isMainTypeIncluded ? column.type : column.frontendType,
        columnKey: column.key
      },
      size: getDefaultSystemColumnSize(column) // change if its a system colum
    }

    if (!isTypeIncluded) {
      columnDefinition.cell = (info) => {
        const currentValue = info.getValue()
        if (typeof currentValue === 'string' || typeof currentValue === 'number') {
          const newInfo = {
            ...info,
            meta: {
              type: 'input'
            }
          }

          return <DefaultCell { ...newInfo } />
        }

        return (
          <Alert
            message="Not supported"
            type="warning"
          />
        )
      }
    }

    return columnDefinition
  }

  const transformGridColumnDefinition = (columns: Array<AccessorColumnDef<unknown, never>>): Array<AccessorColumnDef<unknown, never>> => {
    return columns
  }

  const getGridProps = (): GridProps => {
    return {}
  }

  const getDefaultSystemColumnSize = (column: SelectedColumn): number | undefined => {
    if (column.group === 'system') {
      if (
        column.key === 'id' ||
        column.key === 'index' ||
        column.key === 'type'
      ) {
        return 100
      }

      if (
        column.key === 'mimetype' ||
        column.key === 'fileSize'
      ) {
        return DEFAULT_COLUMN_WIDTH
      }

      if (
        column.key === 'key' ||
        column.key === 'classname'
      ) {
        return 200
      }
    }
  }

  return {
    transformGridColumn,
    transformGridColumnDefinition,
    getGridProps
  }
}
