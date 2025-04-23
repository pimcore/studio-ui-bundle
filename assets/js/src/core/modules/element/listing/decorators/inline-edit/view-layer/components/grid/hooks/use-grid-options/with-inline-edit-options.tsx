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

import { useState } from 'react'
import { type IInlineEditDecoratorConfig, type IInlineEditDecoratorProps } from '../../../../../inline-edit-decorator'
import { type GridProps } from '@Pimcore/modules/element/listing/abstract/view-layer/components/grid/hooks/use-grid-options'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'

export const WithInlineEdit = (useBaseHook: IInlineEditDecoratorProps['useGridOptions'], config: IInlineEditDecoratorConfig): IInlineEditDecoratorProps['useGridOptions'] => {
  const useInlineEditExtension: IInlineEditDecoratorProps['useGridOptions'] = () => {
    const { getGridProps: baseGetGridProps, transformGridColumn: baseTransformGridColumn, ...baseMethods } = useBaseHook()
    const [modifiedCells, setModifiedCells] = useState<GridProps['modifiedCells']>([])
    const { useInlineEditApiUpdate } = config
    const { updateCache, updateApiData } = useInlineEditApiUpdate()
    const { useDataQueryHelper } = useSettings()
    const { getArgs } = useDataQueryHelper()
    const { decodeColumnIdentifier } = useSelectedColumns()

    const onUpdateCellData: GridProps['onUpdateCellData'] = (event): void => {
      const { rowData, columnId, value } = event
      const column = decodeColumnIdentifier(columnId)

      if (column === undefined) {
        return
      }

      setModifiedCells((modifiedCells) => {
        const hasModifiedCell = modifiedCells?.some((cell) => cell.rowIndex === rowData.id && cell.columnId === columnId)

        if (hasModifiedCell === true) {
          return modifiedCells
        }

        return [
          ...modifiedCells ?? [],
          {
            rowIndex: rowData.id,
            columnId
          }
        ]
      })

      const update = {
        getGetRequestArgs: getArgs(),
        update: {
          id: rowData.id,
          column,
          value
        },
        meta: event.meta
      }

      updateCache(update)
      updateApiData(update).finally(() => {
        setModifiedCells((modifiedCells) => {
          return modifiedCells?.filter((cell) => cell.rowIndex !== rowData.id || cell.columnId !== columnId) ?? []
        })
      }).catch(() => {})
    }

    const getGridProps: typeof baseGetGridProps = () => {
      const baseGridProps = baseGetGridProps()

      return {
        ...baseGridProps,
        onUpdateCellData,
        modifiedCells
      }
    }

    const transformGridColumn: typeof baseTransformGridColumn = (column) => {
      const baseColumn = baseTransformGridColumn(column)

      return {
        ...baseColumn,
        meta: {
          ...baseColumn.meta,
          editable: column.editable
        }
      }
    }

    return {
      ...baseMethods,
      getGridProps,
      transformGridColumn
    }
  }

  return useInlineEditExtension
}
