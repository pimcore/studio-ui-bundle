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
