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
import {
  type AssetEditorContextMenuProps
} from '@Pimcore/modules/app/context-menu-registry/context-types'
import { contextMenuConfig } from '@Pimcore/modules/app/context-menu-registry/context-menu-config'
import { useDownload } from '@Pimcore/modules/asset/actions/download/use-download'
import { useZipDownload } from '@Pimcore/modules/asset/actions/zip-download/use-zip-download'
import { useClearThumbnails } from '@Pimcore/modules/asset/actions/clear-thumbnails/use-clear-thumbnails'
import { useDelete } from '@Pimcore/modules/element/actions/delete/use-delete'
import { useRename } from '@Pimcore/modules/element/actions/rename/use-rename'
import { useElementRefresh } from '@Pimcore/modules/element/actions/refresh-element/use-element-refresh'
import { getElementActionCacheKey } from '@Pimcore/modules/element/element-helper'
import { useUploadNewVersion } from '@Pimcore/modules/asset/actions/upload-new-version/upload-new-version'

moduleSystem.registerModule({
  onInit: () => {
    const contextMenuRegistry = container.get<ContextMenuRegistry>(serviceIds['App/ContextMenuRegistry/ContextMenuRegistry'])
    const config = contextMenuConfig.assetEditorToolbar

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'rename',
      priority: config.priority.rename,
      useMenuItem: (context: AssetEditorContextMenuProps) => {
        const { refreshElement } = useElementRefresh('asset')
        const { renameContextMenuItem } = useRename('asset', getElementActionCacheKey('asset', 'rename', context.target.id))
        return renameContextMenuItem(context.target, () => { refreshElement(context.target.id) })
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'delete',
      priority: config.priority.delete,
      useMenuItem: (context: AssetEditorContextMenuProps) => {
        const { deleteContextMenuItem } = useDelete('asset', getElementActionCacheKey('asset', 'delete', context.target.id))
        return deleteContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'uploadNewVersion',
      priority: config.priority.uploadNewVersion,
      useMenuItem: (context: AssetEditorContextMenuProps) => {
        const { uploadNewVersionContextMenuItem } = useUploadNewVersion()
        const { refreshElement } = useElementRefresh('asset')
        return uploadNewVersionContextMenuItem(context.target, () => { refreshElement(context.target.id) })
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'download',
      priority: config.priority.download,
      useMenuItem: (context: AssetEditorContextMenuProps) => {
        const { downloadContextMenuItem } = useDownload()
        return downloadContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'zipDownload',
      priority: config.priority.zipDownload,
      useMenuItem: (context: AssetEditorContextMenuProps) => {
        const { createZipDownloadContextMenuItem } = useZipDownload({ type: 'folder' })
        return createZipDownloadContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'clearImageThumbnail',
      priority: config.priority.clearImageThumbnail,
      useMenuItem: (context: AssetEditorContextMenuProps) => {
        const { clearImageThumbnailContextMenuItem } = useClearThumbnails()
        return clearImageThumbnailContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'clearVideoThumbnail',
      priority: config.priority.clearVideoThumbnail,
      useMenuItem: (context: AssetEditorContextMenuProps) => {
        const { clearVideoThumbnailContextMenuItem } = useClearThumbnails()
        return clearVideoThumbnailContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'clearPdfThumbnail',
      priority: config.priority.clearPdfThumbnail,
      useMenuItem: (context: AssetEditorContextMenuProps) => {
        const { clearPdfThumbnailContextMenuItem } = useClearThumbnails()
        return clearPdfThumbnailContextMenuItem(context.target)
      }
    })
  }
})
