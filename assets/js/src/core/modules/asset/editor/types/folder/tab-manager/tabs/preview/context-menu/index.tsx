/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { container } from '@Pimcore/app/depency-injection'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { type ContextMenuRegistryInterface } from '@Pimcore/modules/app/context-menu-registry/context-menu-registry'
import { type AssetPreviewCardContextMenuProps } from '@Pimcore/modules/app/context-menu-registry/context-types'
import { contextMenuConfig } from '@Pimcore/modules/app/context-menu-registry/context-menu-config'
import { useRename } from '@Pimcore/modules/element/actions/rename/use-rename'
import { useDelete } from '@Pimcore/modules/element/actions/delete/use-delete'
import { useDownload } from '@Pimcore/modules/asset/actions/download/use-download'
import { useUploadNewVersion } from '@Pimcore/modules/asset/actions/upload-new-version/upload-new-version'
import { useOpen } from '@Pimcore/modules/element/actions/open/open'
import { useLocateInTree } from '@Pimcore/modules/element/actions/locate-in-tree/use-locate-in-tree'
import { getElementActionCacheKey } from '@Pimcore/modules/element/element-helper'
import { Icon } from '@Pimcore/components/icon/icon'
import { useElementActionsMenu } from '@Pimcore/components/hooks/use-element-actions-menu'
import { type IElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'

moduleSystem.registerModule({
  onInit: () => {
    const contextMenuRegistry = container.get<ContextMenuRegistryInterface>(serviceIds['App/ContextMenuRegistry/ContextMenuRegistry'])
    const config = contextMenuConfig.assetPreviewCard

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'open',
      priority: config.priority.open,
      useMenuItem: (context: AssetPreviewCardContextMenuProps) => {
        const { openContextMenuItem } = useOpen(elementTypes.asset)
        return openContextMenuItem(context.asset) ?? null
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'info',
      priority: config.priority.info,
      useMenuItem: (context: AssetPreviewCardContextMenuProps) => {
        const { t } = useTranslation()
        const { actionMenuItems } = useElementActionsMenu({ element: context.asset as unknown as IElementDraft, elementType: elementTypes.asset })

        return {
          key: 'info',
          icon: <Icon value="info-circle" />,
          label: t('asset.copy-info'),
          children: actionMenuItems
        }
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'rename',
      priority: config.priority.rename,
      useMenuItem: (context: AssetPreviewCardContextMenuProps) => {
        const { renameContextMenuItem } = useRename(elementTypes.asset, getElementActionCacheKey(elementTypes.asset, 'rename', context.asset.id))
        return renameContextMenuItem(context.asset) ?? null
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'locateInTree',
      priority: config.priority.locateInTree,
      useMenuItem: (context: AssetPreviewCardContextMenuProps) => {
        const { t } = useTranslation()
        const { locateInTree } = useLocateInTree(elementTypes.asset)

        return {
          label: t('element.locate-in-tree'),
          key: 'locate-in-tree',
          icon: <Icon value="target" />,
          onClick: () => {
            locateInTree(context.asset.id, context.onComplete)
          }
        }
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'uploadNewVersion',
      priority: config.priority.uploadNewVersion,
      useMenuItem: (context: AssetPreviewCardContextMenuProps) => {
        const { uploadNewVersionContextMenuItem } = useUploadNewVersion()
        return uploadNewVersionContextMenuItem(context.asset, context.onComplete) ?? null
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'download',
      priority: config.priority.download,
      useMenuItem: (context: AssetPreviewCardContextMenuProps) => {
        const { downloadContextMenuItem } = useDownload()
        return downloadContextMenuItem(context.asset) ?? null
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'delete',
      priority: config.priority.delete,
      useMenuItem: (context: AssetPreviewCardContextMenuProps) => {
        const { deleteContextMenuItem } = useDelete(elementTypes.asset, getElementActionCacheKey(elementTypes.asset, 'delete', context.asset.id))
        return deleteContextMenuItem(context.asset) ?? null
      }
    })
  }
})
