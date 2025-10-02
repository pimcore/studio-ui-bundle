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
import { useRename } from '@Pimcore/modules/element/actions/rename/use-rename'
import { useDelete } from '@Pimcore/modules/element/actions/delete/use-delete'
import { useLocateInTree } from '@Pimcore/modules/element/actions/locate-in-tree/use-locate-in-tree'
import { usePublish } from '@Pimcore/modules/element/actions/publish/use-publish'
import { useUnpublish } from '@Pimcore/modules/element/actions/unpublish/use-unpublish'
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
        // Handle both row.original structure and direct row structure
        const rowData = context.target.original ?? context.target
        return openGridContextMenuItem({ original: rowData }) ?? null
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'rename',
      priority: config.priority.rename,
      useMenuItem: (context: DataObjectListGridContextMenuProps) => {
        const rowData = context.target.original ?? context.target
        const { renameGridContextMenuItem } = useRename('data-object', getElementActionCacheKey('data-object', 'rename', Number(rowData.id)))
        return renameGridContextMenuItem({ original: rowData }) ?? null
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'locateInTree',
      priority: config.priority.locateInTree,
      useMenuItem: (context: DataObjectListGridContextMenuProps) => {
        const rowData = context.target.original ?? context.target
        const { locateInTreeGridContextMenuItem } = useLocateInTree('data-object')
        return locateInTreeGridContextMenuItem({ original: rowData }, context.onComplete) ?? null
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'publish',
      priority: config.priority.publish,
      useMenuItem: (context: DataObjectListGridContextMenuProps) => {
        const rowData = context.target.original ?? context.target
        const { publishTreeContextMenuItem } = usePublish('data-object')
        return publishTreeContextMenuItem(rowData) ?? null
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'unpublish',
      priority: config.priority.unpublish,
      useMenuItem: (context: DataObjectListGridContextMenuProps) => {
        const rowData = context.target.original ?? context.target
        const { unpublishContextMenuItem } = useUnpublish('data-object')
        return unpublishContextMenuItem(rowData, context.onComplete) ?? null
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'delete',
      priority: config.priority.delete,
      useMenuItem: (context: DataObjectListGridContextMenuProps) => {
        const rowData = context.target.original ?? context.target
        const { deleteGridContextMenuItem } = useDelete('data-object', getElementActionCacheKey('data-object', 'delete', Number(rowData.id)))
        return deleteGridContextMenuItem({ original: rowData }) ?? null
      }
    })
  }
})
