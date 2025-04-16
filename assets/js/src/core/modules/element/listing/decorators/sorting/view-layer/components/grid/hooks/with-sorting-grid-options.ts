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
import { useSorting } from '../../../../context-layer/provider/sorting-provider/use-sorting'
import { type GridProps } from '@Pimcore/modules/element/listing/abstract/view-layer/components/grid/hooks/use-grid-options'

export const withSortingGridOptions = (useBaseHook: AbstractDecoratorProps['useGridOptions']): AbstractDecoratorProps['useGridOptions'] => {
  const useGridOptionsSortingExtension: AbstractDecoratorProps['useGridOptions'] = () => {
    const { getGridProps: baseGetGridProps, transformGridColumn: baseTransformGridColumn, ...baseMethods } = useBaseHook()
    const { sorting, setSorting } = useSorting()

    const setNewSorting: GridProps['onSortingChange'] = (newSorting: GridProps['sorting']) => {
      setSorting(newSorting)
    }

    const getGridProps: typeof baseGetGridProps = () => {
      const baseGripProps = baseGetGridProps()

      const newGridProps: ReturnType<typeof baseGetGridProps> = {
        ...baseGripProps,
        sorting,
        onSortingChange: setNewSorting,
        enableSorting: true,
        manualSorting: true
      }

      return newGridProps
    }

    const transformGridColumn: typeof baseTransformGridColumn = (column) => {
      const baseColumn = baseTransformGridColumn(column)

      return {
        ...baseColumn,
        enableSorting: column.sortable
      }
    }

    return {
      ...baseMethods,
      transformGridColumn,
      getGridProps
    }
  }

  return useGridOptionsSortingExtension
}
