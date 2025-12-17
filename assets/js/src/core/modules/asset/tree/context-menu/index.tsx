/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type ContextMenuRegistry } from '@Pimcore/modules/app/context-menu-registry/context-menu-registry'
import { contextMenuConfig } from '@Pimcore/modules/app/context-menu-registry/context-menu-config'
import { type AssetTreeContextMenuProps } from '@Pimcore/modules/app/context-menu-registry/context-types'
import { useDownload } from '@Pimcore/modules/asset/actions/download/use-download'
import { useUploadNewVersion } from '@Pimcore/modules/asset/actions/upload-new-version/upload-new-version'
import { useZipDownload } from '@Pimcore/modules/asset/actions/zip-download/use-zip-download'
import { useAddFolder } from '@Pimcore/modules/element/actions/add-folder/use-add-folder'
import { useCopyPaste } from '@Pimcore/modules/element/actions/copy-paste/use-copy-paste'
import { useDelete } from '@Pimcore/modules/element/actions/delete/use-delete'
import { useLock } from '@Pimcore/modules/element/actions/lock/use-lock'
import { useRefreshTree } from '@Pimcore/modules/element/actions/refresh-tree/use-refresh-tree'
import { useRename } from '@Pimcore/modules/element/actions/rename/use-rename'
import { getElementActionCacheKey } from '@Pimcore/modules/element/element-helper'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { TreePermission } from '@Pimcore/modules/perspectives/enums/tree-permission'
import { useTreePermission } from '@Pimcore/components/element-tree/provider/tree-permission-provider/use-tree-permission'
import { useUpload } from '../../actions/upload/use-upload'
import { useTranslation } from 'react-i18next'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'

moduleSystem.registerModule({
  onInit: () => {
    const contextMenuRegistry = container.get<ContextMenuRegistry>(serviceIds['App/ContextMenuRegistry/ContextMenuRegistry'])
    const config = contextMenuConfig.assetTree

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'newAssets',
      priority: config.priority.newAssets,
      useMenuItem: (context: AssetTreeContextMenuProps) => {
        const { t } = useTranslation()
        const { uploadContextMenuItem, zipUploadContextMenuItem } = useUpload()
        const { isTreeActionAllowed } = useTreePermission()

        const isUploadMenuHidden = isTreeActionAllowed(TreePermission.HideAdd) ||
          (!isTreeActionAllowed(TreePermission.AddUpload) && !isTreeActionAllowed(TreePermission.AddUploadZip)) ||
          !checkElementPermission(context.target.permissions, 'create') ||
          context.target?.type !== 'folder'

        if (isUploadMenuHidden) {
          return null
        }

        return {
          label: t('element.tree.context-menu.new-assets'),
          key: 'new-assets',
          icon: <Icon value="asset" />,
          children: [
            uploadContextMenuItem(context.target),
            zipUploadContextMenuItem(context.target)
          ]
        }
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'addFolder',
      priority: config.priority.addFolder,
      useMenuItem: (context: AssetTreeContextMenuProps) => {
        const { addFolderTreeContextMenuItem } = useAddFolder('asset')
        return addFolderTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'rename',
      priority: config.priority.rename,
      useMenuItem: (context: AssetTreeContextMenuProps) => {
        const { renameTreeContextMenuItem } = useRename('asset', getElementActionCacheKey('asset', 'rename', Number.parseInt(context.target.id)))
        return renameTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'copy',
      priority: config.priority.copy,
      useMenuItem: (context: AssetTreeContextMenuProps) => {
        const { copyTreeContextMenuItem } = useCopyPaste('asset')
        return copyTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'paste',
      priority: config.priority.paste,
      useMenuItem: (context: AssetTreeContextMenuProps) => {
        const { pasteTreeContextMenuItem } = useCopyPaste('asset')
        return pasteTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'cut',
      priority: config.priority.cut,
      useMenuItem: (context: AssetTreeContextMenuProps) => {
        const { cutTreeContextMenuItem } = useCopyPaste('asset')
        return cutTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'pasteCut',
      priority: config.priority.pasteCut,
      useMenuItem: (context: AssetTreeContextMenuProps) => {
        const { pasteCutContextMenuItem } = useCopyPaste('asset')
        return pasteCutContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'delete',
      priority: config.priority.delete,
      useMenuItem: (context: AssetTreeContextMenuProps) => {
        const { deleteTreeContextMenuItem } = useDelete('asset', getElementActionCacheKey('asset', 'delete', Number.parseInt(context.target.id)))
        return deleteTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'createZipDownload',
      priority: config.priority.createZipDownload,
      useMenuItem: (context: AssetTreeContextMenuProps) => {
        const { createZipDownloadTreeContextMenuItem } = useZipDownload({ type: 'folder' })
        return createZipDownloadTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'uploadNewVersion',
      priority: config.priority.uploadNewVersion,
      useMenuItem: (context: AssetTreeContextMenuProps) => {
        const { uploadNewVersionTreeContextMenuItem } = useUploadNewVersion()
        return uploadNewVersionTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'download',
      priority: config.priority.download,
      useMenuItem: (context: AssetTreeContextMenuProps) => {
        const { downloadTreeContextMenuItem } = useDownload()
        return downloadTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'advanced',
      priority: config.priority.advanced,
      useMenuItem: (context: AssetTreeContextMenuProps) => {
        const { t } = useTranslation()
        const {
          lockTreeContextMenuItem,
          lockAndPropagateTreeContextMenuItem,
          unlockTreeContextMenuItem,
          unlockAndPropagateTreeContextMenuItem,
          isLockMenuHidden
        } = useLock('asset')

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

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'refreshTree',
      priority: config.priority.refreshTree,
      useMenuItem: (context: AssetTreeContextMenuProps) => {
        const { refreshTreeContextMenuItem } = useRefreshTree('asset')
        return refreshTreeContextMenuItem(context.target)
      }
    })
  }
})
