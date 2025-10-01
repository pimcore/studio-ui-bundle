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
import { useTranslations } from '@Pimcore/modules/document/actions/translations/use-translations'

moduleSystem.registerModule({
  onInit: () => {
    const contextMenuRegistry = container.get<ContextMenuRegistry>(serviceIds['App/ContextMenuRegistry/ContextMenuRegistry'])
    const config = contextMenuConfig.documentEditorToolbar

    // Register unpublish action
    contextMenuRegistry.registerToSlot(config.name, {
      name: 'unpublish',
      priority: config.priority.unpublish,
      useMenuItem: (context: DocumentEditorContextMenuProps) => {
        return useUnpublish('document').unpublishContextMenuItem(context.target, context.onComplete)
      }
    })

    // Register delete action
    contextMenuRegistry.registerToSlot(config.name, {
      name: 'delete',
      priority: config.priority.delete,
      useMenuItem: (context: DocumentEditorContextMenuProps) => {
        return useDelete('document').deleteContextMenuItem(context.target)
      }
    })

    // Register rename action
    contextMenuRegistry.registerToSlot(config.name, {
      name: 'rename',
      priority: config.priority.rename,
      useMenuItem: (context: DocumentEditorContextMenuProps) => {
        return useRename('document').renameContextMenuItem(context.target)
      }
    })

    // Register translations action
    contextMenuRegistry.registerToSlot(config.name, {
      name: 'translations',
      priority: config.priority.translations,
      useMenuItem: (context: DocumentEditorContextMenuProps) => {
        return useTranslations(context?.target ?? {} as DocumentEditorContextMenuProps['target']).translationContextMenuItem(context.onComplete)
      }
    })

    // Register open in new window actions
    contextMenuRegistry.registerToSlot(config.name, {
      name: 'openInNewWindow',
      priority: config.priority.openInNewWindow,
      useMenuItem: (context: DocumentEditorContextMenuProps) => {
        return useOpenInNewWindow().openInNewWindowContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'openPreviewInNewWindow',
      priority: config.priority.openPreviewInNewWindow,
      useMenuItem: (context: DocumentEditorContextMenuProps) => {
        return useOpenInNewWindow().openPreviewInNewWindowContextMenuItem(context.target)
      }
    })
  }
})
