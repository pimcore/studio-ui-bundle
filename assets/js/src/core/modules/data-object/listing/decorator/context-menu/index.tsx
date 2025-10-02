/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { container } from '@Pimcore/app/depency-injection'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { type ContextMenuRegistryInterface } from '@Pimcore/modules/app/context-menu-registry/context-menu-registry'
import { type DataObjectListGridContextMenuProps } from '@Pimcore/modules/app/context-menu-registry/context-types'
import { contextMenuConfig } from '@Pimcore/modules/app/context-menu-registry/context-menu-config'
import { useDelete } from '@Pimcore/modules/element/actions/delete/use-delete'
import { useLocateInTree } from '@Pimcore/modules/element/actions/locate-in-tree/use-locate-in-tree'
import { useOpen } from '@Pimcore/modules/element/actions/open/open'
import { getElementActionCacheKey } from '@Pimcore/modules/element/element-helper'

moduleSystem.registerModule({
  onInit: () => {
    const contextMenuRegistry = container.get<ContextMenuRegistryInterface>(serviceIds['App/ContextMenuRegistry/ContextMenuRegistry'])
    const config = contextMenuConfig.dataObjectListGrid

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'open',
      priority: config.priority.open,
      useMenuItem: (context: DataObjectListGridContextMenuProps) => {
        const { openGridContextMenuItem } = useOpen('data-object')
        return openGridContextMenuItem(context.target) ?? null
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'locateInTree',
      priority: config.priority.locateInTree,
      useMenuItem: (context: DataObjectListGridContextMenuProps) => {
        const { locateInTreeGridContextMenuItem } = useLocateInTree('data-object')
        return locateInTreeGridContextMenuItem(context.target, context.onComplete) ?? null
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'delete',
      priority: config.priority.delete,
      useMenuItem: (context: DataObjectListGridContextMenuProps) => {
        const { deleteGridContextMenuItem } = useDelete('data-object', getElementActionCacheKey('data-object', 'delete', Number(context.target.id)))
        return deleteGridContextMenuItem(context.target) ?? null
      }
    })
  }
})
