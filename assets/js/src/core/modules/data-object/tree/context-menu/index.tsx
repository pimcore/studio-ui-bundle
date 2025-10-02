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
import { type ContextMenuRegistry } from '@Pimcore/modules/app/context-menu-registry/context-menu-registry'
import { type DataObjectTreeContextMenuProps } from '@Pimcore/modules/app/context-menu-registry/context-types'
import { contextMenuConfig } from '@Pimcore/modules/app/context-menu-registry/context-menu-config'
import { useAddFolder } from '@Pimcore/modules/element/actions/add-folder/use-add-folder'
import { useRename } from '@Pimcore/modules/element/actions/rename/use-rename'
import { useDelete } from '@Pimcore/modules/element/actions/delete/use-delete'
import { useRefreshTree } from '@Pimcore/modules/element/actions/refresh-tree/use-refresh-tree'
import { useCopyPaste } from '@Pimcore/modules/element/actions/copy-paste/use-copy-paste'
import { useLock } from '@Pimcore/modules/element/actions/lock/use-lock'
import { getElementActionCacheKey } from '@Pimcore/modules/element/element-helper'
import { useUnpublish } from '@Pimcore/modules/element/actions/unpublish/use-unpublish'
import { useAddObject } from '../../actions/add-object/use-add-object'
import { usePaste } from '@Pimcore/modules/data-object/actions/paste/use-paste'
import { usePublish } from '@Pimcore/modules/element/actions/publish/use-publish'
import { useAddVariant } from '../../actions/add-variant/use-add-variant'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import { useTranslation } from 'react-i18next'

moduleSystem.registerModule({
  onInit: () => {
    const contextMenuRegistry = container.get<ContextMenuRegistry>(serviceIds['App/ContextMenuRegistry/ContextMenuRegistry'])
    const config = contextMenuConfig.dataObjectTree

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'addObject',
      priority: config.priority.addObject,
      useMenuItem: (context: DataObjectTreeContextMenuProps) => {
        const { addObjectTreeContextMenuItem } = useAddObject()
        return addObjectTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'addVariant',
      priority: config.priority.addVariant,
      useMenuItem: (context: DataObjectTreeContextMenuProps) => {
        const { addVariantTreeContextMenuItem } = useAddVariant()
        if (context.target.metaData?.dataObject?.allowVariants === true) {
          return addVariantTreeContextMenuItem(context.target)
        }
        return null
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'addFolder',
      priority: config.priority.addFolder,
      useMenuItem: (context: DataObjectTreeContextMenuProps) => {
        const { addFolderTreeContextMenuItem } = useAddFolder('data-object')
        return addFolderTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'rename',
      priority: config.priority.rename,
      useMenuItem: (context: DataObjectTreeContextMenuProps) => {
        const { renameTreeContextMenuItem } = useRename('data-object', getElementActionCacheKey('data-object', 'rename', parseInt(context.target.id)))
        return renameTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'copy',
      priority: config.priority.copy,
      useMenuItem: (context: DataObjectTreeContextMenuProps) => {
        const { copyTreeContextMenuItem } = useCopyPaste('data-object')
        return copyTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'paste',
      priority: config.priority.paste,
      useMenuItem: (context: DataObjectTreeContextMenuProps) => {
        const { t } = useTranslation()
        const {
          pasteAsChildRecursiveTreeContextMenuItem,
          pasteRecursiveUpdatingReferencesTreeContextMenuItem,
          pasteAsChildTreeContextMenuItem,
          pasteOnlyContentsTreeContextMenuItem,
          isPasteMenuHidden
        } = usePaste()

        return {
          label: t('element.tree.paste'),
          key: 'paste',
          icon: <Icon value="paste" />,
          hidden: isPasteMenuHidden(context.target),
          children: [
            pasteAsChildRecursiveTreeContextMenuItem(context.target),
            pasteRecursiveUpdatingReferencesTreeContextMenuItem(context.target),
            pasteAsChildTreeContextMenuItem(context.target),
            pasteOnlyContentsTreeContextMenuItem(context.target)
          ]
        }
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'cut',
      priority: config.priority.cut,
      useMenuItem: (context: DataObjectTreeContextMenuProps) => {
        const { cutTreeContextMenuItem } = useCopyPaste('data-object')
        return cutTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'pasteCut',
      priority: config.priority.pasteCut,
      useMenuItem: (context: DataObjectTreeContextMenuProps) => {
        const { pasteCutContextMenuItem } = useCopyPaste('data-object')
        return pasteCutContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'publish',
      priority: config.priority.publish,
      useMenuItem: (context: DataObjectTreeContextMenuProps) => {
        const { publishTreeContextMenuItem } = usePublish('data-object')
        return publishTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'unpublish',
      priority: config.priority.unpublish,
      useMenuItem: (context: DataObjectTreeContextMenuProps) => {
        const { unpublishTreeContextMenuItem } = useUnpublish('data-object')
        return unpublishTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'delete',
      priority: config.priority.delete,
      useMenuItem: (context: DataObjectTreeContextMenuProps) => {
        const { deleteTreeContextMenuItem } = useDelete('data-object', getElementActionCacheKey('data-object', 'delete', parseInt(context.target.id)))
        return deleteTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'advanced',
      priority: config.priority.advanced,
      useMenuItem: (context: DataObjectTreeContextMenuProps) => {
        const { t } = useTranslation()
        const {
          lockTreeContextMenuItem,
          lockAndPropagateTreeContextMenuItem,
          unlockTreeContextMenuItem,
          unlockAndPropagateTreeContextMenuItem,
          isLockMenuHidden
        } = useLock('data-object')

        return {
          label: t('element.tree.context-menu.advanced'),
          key: 'advanced',
          icon: <Icon value="more" />,
          hidden: isLockMenuHidden(context.target),
          children: [
            {
              label: t('element.lock'),
              key: 'advanced-lock',
              icon: <Icon value="lock" />,
              hidden: isLockMenuHidden(context.target),
              children: [
                lockTreeContextMenuItem(context.target),
                lockAndPropagateTreeContextMenuItem(context.target),
                unlockTreeContextMenuItem(context.target),
                unlockAndPropagateTreeContextMenuItem(context.target)
              ]
            }
          ]
        }
      }
    })

    // Refresh Tree
    contextMenuRegistry.registerToSlot(config.name, {
      name: 'refreshTree',
      priority: config.priority.refreshTree,
      useMenuItem: (context: DataObjectTreeContextMenuProps) => {
        const { refreshTreeContextMenuItem } = useRefreshTree('data-object')
        return refreshTreeContextMenuItem(context.target)
      }
    })
  }
})
