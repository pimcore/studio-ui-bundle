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

import { type SortingState } from '@tanstack/react-table'
import { encodeColumnIdentifier } from '../grid-container'
import {
  type AssetGetGridApiArg,
  type GridColumnConfiguration,
  type GridFilter
} from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import {
  type FilterOptions
} from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/sidebar/filters/filter-provider'

interface GenerateQueryArgsForGridProps {
  columns: GridColumnConfiguration[]
  availableColumns?: GridColumnConfiguration[]
  sorting: SortingState
  page: number
  pageSize: number
  filterOptions: FilterOptions
  assetId: number
}

export const generateQueryArgsForGrid = ({ columns, availableColumns, sorting, page, pageSize, filterOptions, assetId }: GenerateQueryArgsForGridProps): AssetGetGridApiArg => {
  const columnsToRequest = [...columns]
  const hasIdColumn = columns.some((column) => column.key === 'id')

  if (!hasIdColumn) {
    const idColumn = availableColumns!.find((column) => column.key === 'id')!
    columnsToRequest.push(idColumn)
  }

  let sortFilter: GridFilter['sortFilter'] = {}

  if (sorting.length > 0) {
    const currentSorting = sorting[0]
    const identifier = encodeColumnIdentifier(currentSorting.id)

    sortFilter = {
      key: identifier.key,
      locale: identifier.locale,
      direction: currentSorting.desc ? 'DESC' : 'ASC'
    }
  }

  return {
    body: {
      folderId: assetId,
      columns: columnsToRequest.map((column) => ({
        config: [],
        key: column.key,
        type: column.type,
        locale: column.locale
      })),
      filters: {
        page,
        pageSize: parseInt(pageSize.toString()),
        ...filterOptions,
        sortFilter
      }
    }
  }
}
