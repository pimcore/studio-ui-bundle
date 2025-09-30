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
import { useDelete, type UseDeleteHookReturn } from '@Pimcore/modules/element/actions/delete/use-delete'
import { useRename, type UseRenameHookReturn } from '@Pimcore/modules/element/actions/rename/use-rename'
import { useUnpublish, type UseUnpublishHookReturn } from '@Pimcore/modules/element/actions/unpublish/use-unpublish'
import { useOpenInNewWindow, type UseOpenInNewWindowHookReturn } from '@Pimcore/modules/document/actions/open-in-new-window/use-open-in-new-window'
import { useTranslations, type UseTranslationsHookReturn } from '@Pimcore/modules/document/actions/translations/use-translations'

moduleSystem.registerModule({
  onInit: () => {
    const contextMenuRegistry = container.get<ContextMenuRegistry>(serviceIds['App/ContextMenuRegistry/ContextMenuRegistry'])
    const config = contextMenuConfig.documentEditorToolbar

    // Register unpublish action
    contextMenuRegistry.registerToSlot(config.name, {
      name: 'unpublish',
      priority: config.priority.unpublish,
      useHook: () => useUnpublish('document'),
      getMenuItem: (context: DocumentEditorContextMenuProps, hookResult: UseUnpublishHookReturn) => 
        hookResult.unpublishContextMenuItem(context.target, context.onComplete)
    })

    // Register delete action
    contextMenuRegistry.registerToSlot(config.name, {
      name: 'delete',
      priority: config.priority.delete,
      useHook: () => useDelete('document'),
      getMenuItem: (context: DocumentEditorContextMenuProps, hookResult: UseDeleteHookReturn) => hookResult.deleteContextMenuItem(context.target)
    })

    // Register rename action
    contextMenuRegistry.registerToSlot(config.name, {
      name: 'rename',
      priority: config.priority.rename,
      useHook: () => useRename('document'),
      getMenuItem: (context: DocumentEditorContextMenuProps, hookResult: UseRenameHookReturn) => hookResult.renameContextMenuItem(context.target)
    })

    // Register translations action
    contextMenuRegistry.registerToSlot(config.name, {
      name: 'translations',
      priority: config.priority.translations,
      useHook: (context: DocumentEditorContextMenuProps) => useTranslations(context?.target ?? {} as DocumentEditorContextMenuProps['target']),
      getMenuItem: (context: DocumentEditorContextMenuProps, hookResult: UseTranslationsHookReturn) => 
        hookResult.translationContextMenuItem(context.onComplete)
    })

    // Register open in new window actions
    contextMenuRegistry.registerToSlot(config.name, {
      name: 'openInNewWindow',
      priority: config.priority.openInNewWindow,
      useHook: () => useOpenInNewWindow(),
      getMenuItem: (context: DocumentEditorContextMenuProps, hookResult: UseOpenInNewWindowHookReturn) => hookResult.openInNewWindowContextMenuItem(context.target)
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'openPreviewInNewWindow',
      priority: config.priority.openPreviewInNewWindow,
      useHook: () => useOpenInNewWindow(),
      getMenuItem: (context: DocumentEditorContextMenuProps, hookResult: UseOpenInNewWindowHookReturn) => hookResult.openPreviewInNewWindowContextMenuItem(context.target)
    })
  }
})