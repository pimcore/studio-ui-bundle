/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { type GridProps } from '@Pimcore/modules/element/listing/abstract/view-layer/components/grid/hooks/use-grid-options'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { useRowSelection } from '@Pimcore/modules/element/listing/decorators/row-selection/context-layer/provider/use-row-selection'
import { useElementSelectorHelper } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector-helper'
import { SelectionType } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'
import { getSelectedItemFromGridRow } from '@Pimcore/modules/element/element-selector/utils/selected-items'
import { type ISelectionInteractionConfig } from '../selection-interaction-decorator'

export const withSelectionInteraction = (useBaseHook: AbstractDecoratorProps['useGridOptions'], config: ISelectionInteractionConfig): AbstractDecoratorProps['useGridOptions'] => {
  const useSelectionInteractionExtension: typeof useBaseHook = () => {
    const { getGridProps: baseGetGridProps, ...baseMethods } = useBaseHook()
    const helper = useElementSelectorHelper()
    const { availableColumns } = useAvailableColumns()
    const { selectedRows, setSelectedRows } = useRowSelection()

    const getGridProps: typeof baseGetGridProps = () => {
      const baseGridProps = baseGetGridProps()
      const selectionType = helper.config.selectionType

      if (selectionType === SelectionType.Multiple) {
        const onRowClick: GridProps['onRowClick'] = (row) => {
          const newSelectedRows: NonNullable<GridProps['selectedRows']> = {}

          for (const rowId in selectedRows) {
            if (rowId !== row.id) {
              newSelectedRows[rowId] = selectedRows[rowId]
            }
          }

          if (selectedRows?.[row.id] !== true) {
            newSelectedRows[row.id] = true
          }

          setSelectedRows(newSelectedRows)
        }

        return {
          ...baseGridProps,
          onRowClick
        }
      }

      if (selectionType !== SelectionType.Single) {
        return baseGridProps
      }

      const systemColumnKeys = availableColumns
        .filter(column => Array.isArray(column.group) && column.group.includes('system'))
        .map(column => column.key)

      const onRowClick: GridProps['onRowClick'] = (row) => {
        const isSelected = selectedRows?.[row.id] === true
        setSelectedRows(isSelected ? {} : { [row.id]: true })
      }

      const onRowDoubleClick: GridProps['onRowDoubleClick'] = (row) => {
        helper.config.onFinish?.({ items: [getSelectedItemFromGridRow(row, config.elementType, systemColumnKeys)] })
        helper.close()
      }

      const newGridProps: ReturnType<typeof baseGetGridProps> = {
        ...baseGridProps,
        hideRowSelectionColumn: true,
        onRowClick,
        onRowDoubleClick
      }

      return newGridProps
    }

    return {
      ...baseMethods,
      getGridProps
    }
  }

  return useSelectionInteractionExtension
}
