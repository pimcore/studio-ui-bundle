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
import { type SelectedColumn } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import { type AccessorColumnDef, type IdentifiedColumnDef } from '@tanstack/react-table'
import { type GridProps as BaseGridProps } from '@Pimcore/types/components/types'
import { useTranslation } from 'react-i18next'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { Alert } from '@Pimcore/components/alert/alert'
import { DefaultCell } from '@Pimcore/components/grid/columns/default-cell'

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
      header: t(column.key) + (column.locale !== undefined && column.locale !== null ? ` (${column.locale})` : ''),
      meta: {
        type: isMainTypeIncluded ? column.type : column.frontendType,
        columnKey: column.key
      }
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

  return {
    transformGridColumn,
    transformGridColumnDefinition,
    getGridProps
  }
}
