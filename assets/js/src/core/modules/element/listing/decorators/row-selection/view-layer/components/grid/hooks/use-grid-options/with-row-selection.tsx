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

import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { type IRowSelectionDecoratorConfig, type IRowSelectionDecoratorProps } from '../../../../../row-selection-decorator'
import { useRowSelection } from '../../../../../context-layer/provider/use-row-selection'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'
import { useEffect } from 'react'
import { type RowSelectionData } from '../../../../../context-layer/provider/row-selection-provider'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'

export const WithRowSelection = (useBaseHook: IRowSelectionDecoratorProps['useGridOptions'], config: IRowSelectionDecoratorConfig): IRowSelectionDecoratorProps['useGridOptions'] => {
  const useRowSelectionExtension: AbstractDecoratorProps['useGridOptions'] = () => {
    const { getGridProps: baseGetGridProps, ...baseMethods } = useBaseHook()
    const { data } = useData()
    const { selectedRows, setSelectedRows, selectedRowsData, setSelectedRowsData } = useRowSelection()
    const { availableColumns } = useAvailableColumns()

    useEffect(() => {
      const newSelectedRowsData: RowSelectionData['selectedRowsData'] = {}
      const systemColumns = availableColumns.filter(column => column.group === 'system')
      const systemColumnKeys = systemColumns.map(column => column.key)

      for (const key in selectedRows) {
        const currentKey = parseInt(key)

        for (const item of data.items) {
          const idColumn = item.columns.find((column) => column.key === 'id')

          if (idColumn === undefined || idColumn.value !== currentKey) {
            continue
          }

          for (const column of item.columns) {
            if (systemColumnKeys.includes(column.key as string)) {
              newSelectedRowsData[currentKey] = {
                ...newSelectedRowsData[currentKey],
                [column.key]: column.value
              }
            }
          }
        }
      }

      setSelectedRowsData({
        ...selectedRowsData,
        ...newSelectedRowsData
      })
    }, [selectedRows])

    const getGridProps: typeof baseGetGridProps = () => {
      const baseGridProps = baseGetGridProps()

      return {
        ...baseGridProps,
        enableRowSelection: config.rowSelectionMode === 'single',
        enableMultipleRowSelection: config.rowSelectionMode === 'multiple',
        selectedRows,
        onSelectedRowsChange: setSelectedRows
      }
    }

    return {
      ...baseMethods,
      getGridProps
    }
  }

  return useRowSelectionExtension
}
