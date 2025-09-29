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
import { defaultProps, type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { Icon } from '@Pimcore/components/icon/icon'
import { useAddFolder } from '@Pimcore/modules/element/actions/add-folder/use-add-folder'
import { useRename } from '@Pimcore/modules/element/actions/rename/use-rename'
import { useDelete } from '@Pimcore/modules/element/actions/delete/use-delete'
import { useRefreshTree } from '@Pimcore/modules/element/actions/refresh-tree/use-refresh-tree'
import { useCopyPaste } from '@Pimcore/modules/element/actions/copy-paste/use-copy-paste'
import { useLock } from '@Pimcore/modules/element/actions/lock/use-lock'
import { getElementActionCacheKey } from '@Pimcore/modules/element/element-helper'
import { useUnpublish } from '@Pimcore/modules/element/actions/unpublish/use-unpublish'
import { usePublish } from '@Pimcore/modules/element/actions/publish/use-publish'
import { type IMenuProps, Menu } from '@Pimcore/components/menu/menu'
import { AddDocumentFormType, useAddDocument } from '../../actions/add-page/use-add-document'
import { useOpenInNewWindow } from '@Pimcore/modules/document/actions/open-in-new-window/use-open-in-new-window'
import { useConvert } from '@Pimcore/modules/document/actions/convert/use-convert'
import { usePaste } from '@Pimcore/modules/document/actions/paste/use-paste'
import { useSiteActions } from '@Pimcore/modules/document/actions/site/use-site-actions'
import { createContextMenuContainerTestId } from '@Pimcore/utils/test-id-generator'
import { ContextMenuActionName } from '@Pimcore/modules/element/actions'

export interface DocumentTreeContextMenuProps {
  node: TreeNodeProps
}

export const DocumentTreeContextMenu = (props: DocumentTreeContextMenuProps): React.JSX.Element => {
  const { t } = useTranslation()
  const node = props.node ?? defaultProps
  const { addFolderTreeContextMenuItem } = useAddFolder('document')
  const { addDocumentTreeContextMenuItem: addPageTreeContextMenuItem } = useAddDocument({
    type: 'page',
    iconValue: 'document',
    contextMenuKey: ContextMenuActionName.addPage,
    formType: AddDocumentFormType.FULL,
    modalTitle: t('document.tree.context-menu.add-page')
  })
  const { addDocumentTreeContextMenuItem: addSnippetTreeContextMenuItem } = useAddDocument({
    type: 'snippet',
    iconValue: 'snippet',
    contextMenuKey: ContextMenuActionName.addSnippet,
    formType: AddDocumentFormType.KEY_ONLY,
    modalTitle: t('document.tree.context-menu.add-snippet')
  })
  const { addDocumentTreeContextMenuItem: addEmailTreeContextMenuItem } = useAddDocument({
    type: 'email',
    iconValue: 'mail-02',
    contextMenuKey: ContextMenuActionName.addEmail,
    formType: AddDocumentFormType.KEY_ONLY,
    modalTitle: t('document.tree.context-menu.add-email')
  })
  const { addDocumentTreeContextMenuItem: addLinkTreeContextMenuItem } = useAddDocument({
    type: 'link',
    iconValue: 'document-link',
    contextMenuKey: ContextMenuActionName.addLink,
    formType: AddDocumentFormType.KEY_ONLY,
    modalTitle: t('document.tree.context-menu.add-link'),
    hasNoChildren: true
  })
  const { addDocumentTreeContextMenuItem: addHardlinkTreeContextMenuItem } = useAddDocument({
    type: 'hardlink',
    iconValue: 'hardlink',
    contextMenuKey: ContextMenuActionName.addHardlink,
    formType: AddDocumentFormType.KEY_ONLY,
    modalTitle: t('document.tree.context-menu.add-hardlink'),
    hasNoChildren: true
  })
  const { renameTreeContextMenuItem } = useRename('document', getElementActionCacheKey('document', 'rename', parseInt(node.id)))
  const { deleteTreeContextMenuItem } = useDelete('document', getElementActionCacheKey('document', 'delete', parseInt(node.id)))
  const { refreshTreeContextMenuItem } = useRefreshTree('document')
  const { copyTreeContextMenuItem, cutTreeContextMenuItem, pasteCutContextMenuItem } = useCopyPaste('document')
  const { lockTreeContextMenuItem, lockAndPropagateTreeContextMenuItem, unlockTreeContextMenuItem, unlockAndPropagateTreeContextMenuItem, isLockMenuHidden } = useLock('document')
  const { unpublishTreeContextMenuItem } = useUnpublish('document')
  const { publishTreeContextMenuItem } = usePublish('document')
  const { openInNewWindowTreeContextMenuItem } = useOpenInNewWindow()
  const { convertTreeContextMenuItem, canConvert } = useConvert()
  const { removeSiteTreeContextMenuItem, useAsSiteTreeContextMenuItem, editSiteTreeContextMenuItem } = useSiteActions()
  const {
    pasteAsChildRecursiveTreeContextMenuItem,
    pasteRecursiveUpdatingReferencesTreeContextMenuItem,
    pasteAsChildTreeContextMenuItem,
    pasteAsNewLanguageVariantTreeContextMenuItem,
    pasteAsNewLanguageVariantRecursiveTreeContextMenuItem,
    pasteLanguageRecursiveUpdatingReferencesTreeContextMenuItem,
    pasteOnlyContentsTreeContextMenuItem,
    pasteAsChildRecursiveInheritanceTreeContextMenuItem,
    pasteRecursiveUpdatingReferencesInheritanceTreeContextMenuItem,
    pasteAsChildInheritanceTreeContextMenuItem,
    pasteAsNewLanguageVariantInheritanceTreeContextMenuItem,
    pasteAsNewLanguageVariantRecursiveInheritanceTreeContextMenuItem,
    pasteLanguageRecursiveUpdatingReferencesInheritanceTreeContextMenuItem,
    isPasteMenuHidden,
    isPasteInheritanceMenuHidden
  } = usePaste()

  const items: IMenuProps['items'] = [
    addFolderTreeContextMenuItem(node),
    addPageTreeContextMenuItem(node),
    addSnippetTreeContextMenuItem(node),
    addLinkTreeContextMenuItem(node),
    addEmailTreeContextMenuItem(node),
    addHardlinkTreeContextMenuItem(node),
    renameTreeContextMenuItem(node),
    copyTreeContextMenuItem(node),
    {
      label: t('element.tree.paste'),
      key: 'paste',
      icon: <Icon value={ 'paste' } />,
      hidden: isPasteMenuHidden(node),
      children: [
        pasteAsChildRecursiveTreeContextMenuItem(node),
        pasteRecursiveUpdatingReferencesTreeContextMenuItem(node),
        pasteAsChildTreeContextMenuItem(node),
        pasteAsNewLanguageVariantTreeContextMenuItem(node),
        pasteAsNewLanguageVariantRecursiveTreeContextMenuItem(node),
        pasteLanguageRecursiveUpdatingReferencesTreeContextMenuItem(node),
        pasteOnlyContentsTreeContextMenuItem(node)
      ]
    },
    {
      label: t('document.paste-inheritance'),
      key: 'paste-inheritance',
      icon: <Icon value={ 'paste' } />,
      hidden: isPasteInheritanceMenuHidden(node),
      children: [
        pasteAsChildRecursiveInheritanceTreeContextMenuItem(node),
        pasteRecursiveUpdatingReferencesInheritanceTreeContextMenuItem(node),
        pasteAsChildInheritanceTreeContextMenuItem(node),
        pasteAsNewLanguageVariantInheritanceTreeContextMenuItem(node),
        pasteAsNewLanguageVariantRecursiveInheritanceTreeContextMenuItem(node),
        pasteLanguageRecursiveUpdatingReferencesInheritanceTreeContextMenuItem(node)
      ]
    },
    cutTreeContextMenuItem(node),
    pasteCutContextMenuItem(node),
    publishTreeContextMenuItem(node),
    unpublishTreeContextMenuItem(node),
    deleteTreeContextMenuItem(node),
    openInNewWindowTreeContextMenuItem(node),
    {
      label: t('element.tree.context-menu.advanced'),
      key: 'advanced',
      icon: <Icon value={ 'more' } />,
      children: [
        {
          label: t('convert-to'),
          key: 'convert-to',
          icon: <Icon value={ 'flip-forward' } />,
          hidden: !canConvert(node),
          children: [
            convertTreeContextMenuItem(node, 'page'),
            convertTreeContextMenuItem(node, 'snippet'),
            convertTreeContextMenuItem(node, 'email'),
            convertTreeContextMenuItem(node, 'link'),
            convertTreeContextMenuItem(node, 'hardlink')
          ]
        },
        {
          label: t('element.lock'),
          key: 'advanced-lock',
          icon: <Icon value={ 'lock' } />,
          hidden: isLockMenuHidden(node),
          children: [
            lockTreeContextMenuItem(node),
            lockAndPropagateTreeContextMenuItem(node),
            unlockTreeContextMenuItem(node),
            unlockAndPropagateTreeContextMenuItem(node)
          ]
        },
        useAsSiteTreeContextMenuItem(node),
        editSiteTreeContextMenuItem(node),
        removeSiteTreeContextMenuItem(node)
      ]
    },
    refreshTreeContextMenuItem(node)
  ]

  return (
    <Menu
      dataTestId={ createContextMenuContainerTestId('document', node.id) }
      items={ items }
    />
  )
}
