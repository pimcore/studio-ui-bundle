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
import { ListGridContextMenu } from '../../context-menu/list-grid-context-menu'

export const withContextMenu = (useBaseHook: AbstractDecoratorProps['useGridOptions']): AbstractDecoratorProps['useGridOptions'] => {
  const useContextMenuExtension: typeof useBaseHook = () => {
    const { getGridProps: baseGetGridProps, ...baseMethods } = useBaseHook()

    const getGridProps: typeof baseGetGridProps = () => {
      const baseGripProps = baseGetGridProps()

      const newGridProps: ReturnType<typeof baseGetGridProps> = {
        ...baseGripProps,
        contextMenu: ListGridContextMenu
      }

      return newGridProps
    }

    return {
      ...baseMethods,
      getGridProps
    }
  }

  return useContextMenuExtension
}
