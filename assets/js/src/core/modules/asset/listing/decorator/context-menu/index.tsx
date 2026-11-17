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
import { type AssetListGridContextMenuProps } from '@Pimcore/modules/app/context-menu-registry/context-types'
import { contextMenuConfig } from '@Pimcore/modules/app/context-menu-registry/context-menu-config'
import { useDownload } from '@Pimcore/modules/asset/actions/download/use-download'
import { useDelete } from '@Pimcore/modules/element/actions/delete/use-delete'
import { useLocateInTree } from '@Pimcore/modules/element/actions/locate-in-tree/use-locate-in-tree'
import { useOpen } from '@Pimcore/modules/element/actions/open/open'
import { useRename } from '@Pimcore/modules/element/actions/rename/use-rename'
import { getElementActionCacheKey } from '@Pimcore/modules/element/element-helper'

moduleSystem.registerModule({
  onInit: () => {
    const contextMenuRegistry = container.get<ContextMenuRegistryInterface>(serviceIds['App/ContextMenuRegistry/ContextMenuRegistry'])
    const config = contextMenuConfig.assetListGrid

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'open',
      priority: config.priority.open,
      useMenuItem: (context: AssetListGridContextMenuProps) => {
        const { openGridContextMenuItem } = useOpen('asset')
        return openGridContextMenuItem(context.row) ?? null
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'rename',
      priority: config.priority.rename,
      useMenuItem: (context: AssetListGridContextMenuProps) => {
        const { renameGridContextMenuItem } = useRename('asset', getElementActionCacheKey('asset', 'rename', Number(context.row.id)))
        return renameGridContextMenuItem(context.row) ?? null
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'locateInTree',
      priority: config.priority.locateInTree,
      useMenuItem: (context: AssetListGridContextMenuProps) => {
        const { locateInTreeGridContextMenuItem } = useLocateInTree('asset')
        return locateInTreeGridContextMenuItem(context.row, context.onComplete) ?? null
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'delete',
      priority: config.priority.delete,
      useMenuItem: (context: AssetListGridContextMenuProps) => {
        const { deleteGridContextMenuItem } = useDelete('asset', getElementActionCacheKey('asset', 'delete', Number(context.row.id)))
        return deleteGridContextMenuItem(context.row) ?? null
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'download',
      priority: config.priority.download,
      useMenuItem: (context: AssetListGridContextMenuProps) => {
        const { downloadGridContextMenuItem } = useDownload()
        return downloadGridContextMenuItem(context.row) ?? null
      }
    })
  }
})
