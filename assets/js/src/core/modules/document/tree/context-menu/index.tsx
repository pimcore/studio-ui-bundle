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
import { type TreeContextMenuProps } from '@Pimcore/modules/app/context-menu-registry/context-types'
import { contextMenuConfig } from '@Pimcore/modules/app/context-menu-registry/context-menu-config'
import { useAddFolder } from '@Pimcore/modules/element/actions/add-folder/use-add-folder'
import { useRename } from '@Pimcore/modules/element/actions/rename/use-rename'
import { useDelete } from '@Pimcore/modules/element/actions/delete/use-delete'
import { useRefreshTree } from '@Pimcore/modules/element/actions/refresh-tree/use-refresh-tree'
import { useCopyPaste } from '@Pimcore/modules/element/actions/copy-paste/use-copy-paste'
import { useUnpublish } from '@Pimcore/modules/element/actions/unpublish/use-unpublish'
import { usePublish } from '@Pimcore/modules/element/actions/publish/use-publish'
import { AddDocumentFormType, useAddDocument } from '../../actions/add-page/use-add-document'
import { useOpenInNewWindow } from '@Pimcore/modules/document/actions/open-in-new-window/use-open-in-new-window'
import { ContextMenuActionName } from '@Pimcore/modules/element/actions'
import { getElementActionCacheKey } from '@Pimcore/modules/element/element-helper'
import { useLock } from '@Pimcore/modules/element/actions/lock/use-lock'
import { useConvert } from '@Pimcore/modules/document/actions/convert/use-convert'
import { useSiteActions } from '@Pimcore/modules/document/actions/site/use-site-actions'
import { usePaste } from '@Pimcore/modules/document/actions/paste/use-paste'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { useContextMenuSlot } from '@Pimcore/modules/app/context-menu-registry/use-context-menu-slot'

moduleSystem.registerModule({
  onInit: () => {
    const contextMenuRegistry = container.get<ContextMenuRegistry>(serviceIds['App/ContextMenuRegistry/ContextMenuRegistry'])
    const config = contextMenuConfig.documentTree

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'addFolder',
      priority: config.priority.addFolder,
      useMenuItem: (context: TreeContextMenuProps) => {
        const { addFolderTreeContextMenuItem } = useAddFolder('document')
        return addFolderTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'addPage',
      priority: config.priority.addPage,
      useMenuItem: (context: TreeContextMenuProps) => {
        const { t } = useTranslation()
        const { addDocumentTreeContextMenuItem } = useAddDocument({
          type: 'page',
          iconValue: 'document',
          contextMenuKey: ContextMenuActionName.addPage,
          formType: AddDocumentFormType.FULL,
          modalTitle: t('document.tree.context-menu.add-page')
        })
        return addDocumentTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'addSnippet',
      priority: config.priority.addSnippet,
      useMenuItem: (context: TreeContextMenuProps) => {
        const { t } = useTranslation()
        const { addDocumentTreeContextMenuItem } = useAddDocument({
          type: 'snippet',
          iconValue: 'snippet',
          contextMenuKey: ContextMenuActionName.addSnippet,
          formType: AddDocumentFormType.KEY_ONLY,
          modalTitle: t('document.tree.context-menu.add-snippet')
        })
        return addDocumentTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'addLink',
      priority: config.priority.addLink,
      useMenuItem: (context: TreeContextMenuProps) => {
        const { t } = useTranslation()
        const { addDocumentTreeContextMenuItem } = useAddDocument({
          type: 'link',
          iconValue: 'document-link',
          contextMenuKey: ContextMenuActionName.addLink,
          formType: AddDocumentFormType.KEY_ONLY,
          modalTitle: t('document.tree.context-menu.add-link'),
          hasNoChildren: true
        })
        return addDocumentTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'addHardlink',
      priority: config.priority.addHardlink,
      useMenuItem: (context: TreeContextMenuProps) => {
        const { t } = useTranslation()
        const { addDocumentTreeContextMenuItem } = useAddDocument({
          type: 'hardlink',
          iconValue: 'hardlink',
          contextMenuKey: ContextMenuActionName.addHardlink,
          formType: AddDocumentFormType.KEY_ONLY,
          modalTitle: t('document.tree.context-menu.add-hardlink'),
          hasNoChildren: true
        })
        return addDocumentTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'addEmail',
      priority: config.priority.addEmail,
      useMenuItem: (context: TreeContextMenuProps) => {
        const { t } = useTranslation()
        const { addDocumentTreeContextMenuItem } = useAddDocument({
          type: 'email',
          iconValue: 'mail-02',
          contextMenuKey: ContextMenuActionName.addEmail,
          formType: AddDocumentFormType.KEY_ONLY,
          modalTitle: t('document.tree.context-menu.add-email')
        })
        return addDocumentTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'rename',
      priority: config.priority.rename,
      useMenuItem: (context: TreeContextMenuProps) => {
        const { renameTreeContextMenuItem } = useRename('document', getElementActionCacheKey('document', 'rename', Number.parseInt(context.target.id)))
        return renameTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'copy',
      priority: config.priority.copy,
      useMenuItem: (context: TreeContextMenuProps) => {
        const { copyTreeContextMenuItem } = useCopyPaste('document')
        return copyTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'cut',
      priority: config.priority.cut,
      useMenuItem: (context: TreeContextMenuProps) => {
        const { cutTreeContextMenuItem } = useCopyPaste('document')
        return cutTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'pasteCut',
      priority: config.priority.pasteCut,
      useMenuItem: (context: TreeContextMenuProps) => {
        const { pasteCutContextMenuItem } = useCopyPaste('document')
        return pasteCutContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'publish',
      priority: config.priority.publish,
      useMenuItem: (context: TreeContextMenuProps) => {
        const { publishTreeContextMenuItem } = usePublish('document')
        return publishTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'unpublish',
      priority: config.priority.unpublish,
      useMenuItem: (context: TreeContextMenuProps) => {
        const { unpublishTreeContextMenuItem } = useUnpublish('document')
        return unpublishTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'delete',
      priority: config.priority.delete,
      useMenuItem: (context: TreeContextMenuProps) => {
        const { deleteTreeContextMenuItem } = useDelete('document', getElementActionCacheKey('document', 'delete', Number.parseInt(context.target.id)))
        return deleteTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'openInNewWindow',
      priority: config.priority.openInNewWindow,
      useMenuItem: (context: TreeContextMenuProps) => {
        const { openInNewWindowTreeContextMenuItem } = useOpenInNewWindow()
        return openInNewWindowTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'refreshTree',
      priority: config.priority.refreshTree,
      useMenuItem: (context: TreeContextMenuProps) => {
        const { refreshTreeContextMenuItem } = useRefreshTree('document')
        return refreshTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'paste',
      priority: config.priority.paste,
      useMenuItem: (context: TreeContextMenuProps) => {
        const { pasteMenuTreeContextMenuItem } = usePaste()
        return pasteMenuTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'pasteInheritance',
      priority: config.priority.pasteInheritance,
      useMenuItem: (context: TreeContextMenuProps) => {
        const { pasteInheritanceTreeContextMenuItem } = usePaste()
        return pasteInheritanceTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(config.name, {
      name: 'advanced',
      priority: config.priority.advanced,
      useMenuItem: (context: TreeContextMenuProps) => {
        const { t } = useTranslation()
        const advancedConfig = contextMenuConfig.documentTreeAdvanced

        // Get children items from the advanced sub-slot using our hook
        const children = useContextMenuSlot(advancedConfig.name, context)

        return {
          label: t('element.tree.context-menu.advanced'),
          key: 'advanced',
          icon: <Icon value="more" />,
          children
        }
      }
    })

    const advancedConfig = contextMenuConfig.documentTreeAdvanced

    contextMenuRegistry.registerToSlot(advancedConfig.name, {
      name: 'convertTo',
      priority: advancedConfig.priority.convertTo,
      useMenuItem: (context: TreeContextMenuProps) => {
        const { convertMenuTreeContextMenuItem } = useConvert()
        return convertMenuTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(advancedConfig.name, {
      name: 'lock',
      priority: advancedConfig.priority.lock,
      useMenuItem: (context: TreeContextMenuProps) => {
        const { lockMenuTreeContextMenuItem } = useLock('document')
        return lockMenuTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(advancedConfig.name, {
      name: 'useAsSite',
      priority: advancedConfig.priority.useAsSite,
      useMenuItem: (context: TreeContextMenuProps) => {
        const { useAsSiteTreeContextMenuItem } = useSiteActions()
        return useAsSiteTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(advancedConfig.name, {
      name: 'editSite',
      priority: advancedConfig.priority.editSite,
      useMenuItem: (context: TreeContextMenuProps) => {
        const { editSiteTreeContextMenuItem } = useSiteActions()
        return editSiteTreeContextMenuItem(context.target)
      }
    })

    contextMenuRegistry.registerToSlot(advancedConfig.name, {
      name: 'removeSite',
      priority: advancedConfig.priority.removeSite,
      useMenuItem: (context: TreeContextMenuProps) => {
        const { removeSiteTreeContextMenuItem } = useSiteActions()
        return removeSiteTreeContextMenuItem(context.target)
      }
    })
  }
})
