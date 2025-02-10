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

import { type SelectedColumn } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import { type AccessorColumnDef, type IdentifiedColumnDef } from '@tanstack/react-table'
import { type GridProps as BaseGridProps } from '@Pimcore/types/components/types'
import { useTranslation } from 'react-i18next'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'

export type GridProps = Pick<BaseGridProps, 'contextMenu' | 'enableMultipleRowSelection' | 'enableRowSelection' | 'enableSorting' | 'modifiedCells' | 'onSelectedRowsChange' | 'onSortingChange' | 'onUpdateCellData' | 'selectedRows' | 'sorting'>

export interface UseGridOptionsReturn {
  transformGridColumn: (column: SelectedColumn) => IdentifiedColumnDef<unknown, never>
  transformGridColumnDefinition: (columns: Array<AccessorColumnDef<unknown, never>>) => Array<AccessorColumnDef<unknown, never>>
  getGridProps: () => GridProps
}

export const useGridOptions = (): UseGridOptionsReturn => {
  const { t } = useTranslation()
  const { hasType } = useDynamicTypeResolver()

  const transformGridColumn = (column: SelectedColumn): IdentifiedColumnDef<unknown, never> => {
    return {
      header: t('listing.column.' + column.key) + (column.locale !== undefined && column.locale !== null ? ` (${column.locale})` : ''),
      meta: {
        type: hasType({ target: 'GRID_CELL', dynamicTypeIds: [column.type] }) ? column.type : column.frontendType
      }
    }
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
