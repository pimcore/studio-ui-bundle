/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import type { TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import type { ItemType } from '@Pimcore/components/dropdown/dropdown'
import type { Element } from '@Pimcore/modules/element/element-helper'
import { useCopyPaste, type UseCopyPasteHookReturn } from '@Pimcore/modules/element/actions/copy-paste/use-copy-paste'
import { Icon } from '@Pimcore/components/icon/icon'
import { TreePermission } from '@Pimcore/modules/perspectives/enums/tree-permission'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { setNodeFetching } from '@Pimcore/components/element-tree/element-tree-slice'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTreePermission } from '@Pimcore/modules/element/tree/provider/tree-permission-provider/use-tree-permission'
import { useAppDispatch } from '@Pimcore/app/store'
import { useTreeId } from '@Pimcore/modules/element/tree/provider/tree-id-provider/use-tree-id'

interface UsePasteHookParams {
  storedNode: UseCopyPasteHookReturn['storedNode']
  nodeTask: UseCopyPasteHookReturn['nodeTask']
}

export interface UsePasteHookReturn {
  pasteAsChildTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  pasteAsChildRecursiveTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  pasteRecursiveUpdatingReferencesTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  pasteOnlyContentsTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  isPasteMenuHidden: (node: Element | TreeNodeProps) => boolean
}

export const usePaste = ({ storedNode, nodeTask }: UsePasteHookParams): UsePasteHookReturn => {
  const { t } = useTranslation()
  const { isTreeActionAllowed } = useTreePermission()
  const dispatch = useAppDispatch()
  const { paste } = useCopyPaste('data-object')
  const { treeId } = useTreeId(true)

  const pasteAsChildRecursiveTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.paste-as-child-recursive'),
      key: 'pasteAsChildRecursive',
      icon: <Icon value={'paste'} />,
      hidden: isPasteOpenHidden(node),
      onClick: async () => {
        dispatch(setNodeFetching({ treeId, nodeId: String(node.id), isFetching: true }))
        await paste(parseInt(node.id), { recursive: true, updateReferences: false }, storedNode)
      }
    }
  }

  const pasteRecursiveUpdatingReferencesTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.paste-recursive-updating-references'),
      key: 'pasteRecursiveUpdatingReferences',
      icon: <Icon value={'paste'} />,
      hidden: isPasteOpenHidden(node),
      onClick: async () => {
        dispatch(setNodeFetching({ treeId, nodeId: String(node.id), isFetching: true }))
        await paste(parseInt(node.id))
      }
    }
  }

  const pasteAsChildTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.paste-as-child'),
      key: 'pasteAsChild',
      icon: <Icon value={'paste'} />,
      hidden: isPasteOpenHidden(node),
      onClick: async () => {
        dispatch(setNodeFetching({ treeId, nodeId: String(node.id), isFetching: true }))
        await paste(parseInt(node.id), { recursive: false, updateReferences: false })
      }
    }
  }

  const pasteOnlyContentsTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.paste-only-contents'),
      key: 'pasteOnlyContents',
      icon: <Icon value={'paste'} />,
      hidden: isPasteOnlyContentsHidden(node),
      onClick: async () => {
        console.log('not implemented!')
      }
    }
  }

  const isPasteOpenHidden = (node: Element | TreeNodeProps): boolean => {
    return !isTreeActionAllowed(TreePermission.Paste) ||
      (storedNode === undefined || nodeTask !== 'copy') ||
      !checkElementPermission(node.permissions, 'create')
  }

  const isPasteOnlyContentsHidden = (node: Element | TreeNodeProps): boolean => {
    return isPasteOpenHidden(node) ||
      node.type === 'folder' ||
      node.isLocked
    // storedNode?.type !== node.type //TODO: i guess we need to compare the className aswell
  }

  const isPasteMenuHidden = (node: Element | TreeNodeProps): boolean => {
    return isPasteOpenHidden(node) &&
      isPasteOnlyContentsHidden(node)
  }

  return {
    pasteAsChildTreeContextMenuItem,
    pasteAsChildRecursiveTreeContextMenuItem,
    pasteRecursiveUpdatingReferencesTreeContextMenuItem,
    pasteOnlyContentsTreeContextMenuItem,
    isPasteMenuHidden
  }
}
