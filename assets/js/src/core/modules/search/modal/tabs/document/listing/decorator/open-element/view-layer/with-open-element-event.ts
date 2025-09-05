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
import { type OpenElementDecoratorConfig } from '../open-element-decorator'
import { type GridProps } from '@Pimcore/modules/element/listing/abstract/view-layer/components/grid/hooks/use-grid-options'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { useSearch } from '@Pimcore/modules/search/provider/use-search'

export const withOpenElementEvent = (useBaseHook: AbstractDecoratorProps['useGridOptions'], config: OpenElementDecoratorConfig): AbstractDecoratorProps['useGridOptions'] => {
  const useOpenElementExtension: typeof useBaseHook = () => {
    const { getGridProps: baseGetGridProps, ...baseMethods } = useBaseHook()
    const { openElement } = useElementHelper()
    const { close } = useSearch()

    const getGridProps: typeof baseGetGridProps = () => {
      const baseGripProps = baseGetGridProps()
      const onRowDoubleClick: GridProps['onRowDoubleClick'] = (row) => {
        const { id } = row.original
        const { elementType } = config

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        openElement({
          id,
          type: elementType!
        })
        close()
      }

      const newGridProps: ReturnType<typeof baseGetGridProps> = {
        ...baseGripProps,
        onRowDoubleClick
      }

      return newGridProps
    }

    return {
      ...baseMethods,
      getGridProps
    }
  }

  return useOpenElementExtension
}
