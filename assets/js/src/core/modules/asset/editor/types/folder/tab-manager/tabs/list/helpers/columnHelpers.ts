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

import type { AssetGetGridApiResponse, GridColumnData } from '@Pimcore/modules/asset/asset-api-slice.gen'
import type { IDataPatch } from '../types/dataTypes'

const getPatchedColumns = ({ dataItem, itemId, currentDataPatches }: { dataItem: { columns?: GridColumnData[] }, itemId: any, currentDataPatches: IDataPatch[] }): GridColumnData[] => (
  dataItem.columns!.map((column) => {
    const patch = currentDataPatches.find((_patch) => {
      return _patch.rowIndex === itemId && _patch.columnId === column.key && _patch.locale === column.locale
    })

    if (patch === undefined) {
      return column
    }

    return {
      ...column,
      value: patch.value
    }
  })
)

export const getDataModelList = ({ currentDataModel, currentDataPatches }: { currentDataModel?: AssetGetGridApiResponse, currentDataPatches: IDataPatch[] }): any => (
  currentDataModel?.items.map((item) => {
    const itemId = item.columns!.find((column) => column.key === 'id')?.value
    const hasPatch = currentDataPatches.some((patch) => patch.rowIndex === itemId)

    if (!hasPatch) {
      return item
    }

    const patchedColumns = getPatchedColumns({ dataItem: item, itemId, currentDataPatches })

    return {
      ...item,
      columns: patchedColumns
    }
  })
)
