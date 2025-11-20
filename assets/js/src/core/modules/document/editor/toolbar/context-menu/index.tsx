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
import { type DocumentEditorContextMenuProps } from '@Pimcore/modules/app/context-menu-registry/context-types'
import { contextMenuConfig } from '@Pimcore/modules/app/context-menu-registry/context-menu-config'
import { useDelete } from '@Pimcore/modules/element/actions/delete/use-delete'
import { useRename } from '@Pimcore/modules/element/actions/rename/use-rename'
import { useUnpublish } from '@Pimcore/modules/element/actions/unpublish/use-unpublish'
import { useOpenInNewWindow } from '@Pimcore/modules/document/actions/open-in-new-window/use-open-in-new-window'
import { useDocumentPreviewUrlProcessor } from '@Pimcore/modules/document/hooks/use-document-url-processor'
import { useTranslations } from '@Pimcore/modules/document/actions/translations/use-translations'

moduleSystem.registerModule({
  onInit: () => {
    const contextMenuRegistry = container.get<ContextMenuRegistry>(serviceIds['App/ContextMenuRegistry/ContextMenuRegistry'])
    const config = contextMenuConfig.documentEditorToolbar

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'unpublish',
      priority: config.priority.unpublish,
      useMenuItem: (context: DocumentEditorContextMenuProps) => {
        const { unpublishContextMenuItem } = useUnpublish('document')
        return unpublishContextMenuItem(context.target, context.onComplete)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'delete',
      priority: config.priority.delete,
      useMenuItem: (context: DocumentEditorContextMenuProps) => {
        const { deleteContextMenuItem } = useDelete('document')
        return deleteContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'rename',
      priority: config.priority.rename,
      useMenuItem: (context: DocumentEditorContextMenuProps) => {
        const { renameContextMenuItem } = useRename('document')
        return renameContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'translations',
      priority: config.priority.translations,
      useMenuItem: (context: DocumentEditorContextMenuProps) => {
        const { translationContextMenuItem } = useTranslations(context.target)
        return translationContextMenuItem(context.onComplete)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'openInNewWindow',
      priority: config.priority.openInNewWindow,
      useMenuItem: (context: DocumentEditorContextMenuProps) => {
        const { openInNewWindowContextMenuItem } = useOpenInNewWindow()
        return openInNewWindowContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'openPreviewInNewWindow',
      priority: config.priority.openPreviewInNewWindow,
      useMenuItem: (context: DocumentEditorContextMenuProps) => {
        const { openPreviewInNewWindowContextMenuItem } = useOpenInNewWindow()
        const previewUrl = useDocumentPreviewUrlProcessor(context.target.id, context.target.fullPath ?? '')
        return openPreviewInNewWindowContextMenuItem(context.target, previewUrl)
      }
    })
  }
})
