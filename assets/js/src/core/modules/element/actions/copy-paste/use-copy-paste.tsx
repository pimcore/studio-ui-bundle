/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import type { TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import type { ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { type CloneParameters } from '@Pimcore/modules/element/hooks/use-element-api'
import { type MoveProps, useMoveElement } from '../move/use-move-element'
import { useMoveElements } from '../move/use-move-elements'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { type Element } from '@Pimcore/modules/element/element-helper'
import { useTreePermission } from '../../../../components/element-tree/provider/tree-permission-provider/use-tree-permission'
import { TreePermission } from '../../../perspectives/enums/tree-permission'
import {
  markNodeDeleting,
  refreshSourceNode,
  refreshTargetNode
} from '@Pimcore/components/element-tree/element-tree-slice'
import { useAppDispatch } from '@sdk/app'
import { useTreeId } from '../../../../components/element-tree/provider/tree-id-provider/use-tree-id'
import { useElementTreeOptional } from '@Pimcore/components/element-tree/hooks/use-element-tree-optional'
import { resolveActionTargets } from '@Pimcore/components/element-tree/utils/selection-targets'
import { ContextMenuActionName } from '..'
import { type ClipboardEntry, useTreeCopyPasteContext } from './tree-copy-paste-context'
import { useCloseContextMenu } from '@Pimcore/components/context-menu-wrapper/context-menu-wrapper'
import { usePasteVisibility } from './use-paste-visibility'
import { useExecutionEngine } from '@Pimcore/modules/execution-engine/hooks/use-execution-engine'
import { AssetCloneJob } from '@Pimcore/modules/execution-engine/jobs/clone/asset-clone-job'
import { DataObjectCloneJob } from '@Pimcore/modules/execution-engine/jobs/clone/data-object-clone-job'

type StoreNode = TreeNodeProps | Element | undefined

export type { MoveProps }

/** What deciding whether an element may be cut needs from it. */
type CuttableNode = Pick<TreeNodeProps, 'id' | 'permissions' | 'isLocked'> & { parentId?: string | number | null }

export interface UseCopyPasteHookReturn {
  getStoredNode: () => StoreNode
  getNodeTask: () => 'copy' | 'cut' | undefined
  copy: (node: TreeNodeProps) => void
  cut: (node: TreeNodeProps) => void
  paste: (parentId: number, cloneParameters?: CloneParameters, node?: StoreNode) => Promise<void>
  pasteCut: (parentId: number) => Promise<void>
  move: (props: MoveProps) => Promise<void>
  copyTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  copyContextMenuItem: (node: Element, onFinish?: () => void) => ItemType
  cutTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  cutContextMenuItem: (node: Element, onFinish?: () => void) => ItemType
  pasteTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  pasteCutContextMenuItem: (targetNode: TreeNodeProps) => ItemType
}

export const useCopyPaste = (elementType: ElementType): UseCopyPasteHookReturn => {
  const { getStoredNode, getStoredNodes, getNodeTask, copyNode, cutNode, cutNodes, clearCopyPaste } = useTreeCopyPasteContext(elementType)
  const { move } = useMoveElement(elementType)
  const { moveMultiple } = useMoveElements(elementType)
  const { t } = useTranslation()
  const { isTreeActionAllowed } = useTreePermission()
  const dispatch = useAppDispatch()
  const { treeId } = useTreeId(true)
  const closeContextMenu = useCloseContextMenu()
  const { getSelectedNodes: getSelectedTreeNodes } = useElementTreeOptional()
  const { isPasteHidden: isPasteHiddenHook } = usePasteVisibility(elementType)
  const executionEngine = useExecutionEngine()

  const copy = (node: TreeNodeProps | Element): void => {
    copyNode(node, elementType)
  }

  const cut = (node: TreeNodeProps | Element): void => {
    cutNode(node, elementType)
  }

  const paste = async (
    parentId: number,
    cloneParameters: CloneParameters = { recursive: true, updateReferences: true },
    node: StoreNode = getStoredNode()
  ): Promise<void> => {
    if (node === undefined) {
      return
    }

    const id = typeof node.id === 'number'
      ? node.id
      : parseInt(node.id)

    const job = elementType === 'asset'
      ? new AssetCloneJob({ sourceId: id, targetId: parentId, treeId, nodeId: String(parentId) })
      : new DataObjectCloneJob({ sourceId: id, targetId: parentId, parameters: cloneParameters, treeId, nodeId: String(parentId) })

    await executionEngine.runJob(job)
  }

  /**
   * Pastes everything that was cut into the target, as one move.
   */
  const pasteCut = async (parentId: number): Promise<void> => {
    const storedNodes = getStoredNodes()

    if (storedNodes.length === 0) {
      return
    }

    await moveMultiple({ currentElements: storedNodes, targetElement: { id: parentId } })

    clearCopyPaste()
  }

  const copyTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    if (node.isRoot === true) return null

    return {
      label: t('element.tree.copy'),
      key: ContextMenuActionName.copy,
      icon: <Icon value={ 'copy' } />,
      hidden: !isTreeActionAllowed(TreePermission.Copy) || !checkElementPermission(node.permissions, 'view'),
      onClick: () => {
        closeContextMenu?.()
        copy(node)
      }
    }
  }

  const copyContextMenuItem = (node: Element, onFinish?: () => void): ItemType => {
    return {
      label: t('element.tree.copy'),
      key: ContextMenuActionName.copy,
      icon: <Icon value={ 'copy' } />,
      hidden: !checkElementPermission(node.permissions, 'view') || node.isLocked,
      onClick: () => {
        onFinish?.()
        copy(node)
      }
    }
  }

  /**
   * Nodes a cut applies to: the selection when the node is part of it, reduced to
   * the ones that may actually be cut. A locked or unrenamable node in the
   * selection is skipped rather than failing later at paste time.
   */
  const getCuttableNodes = (node: TreeNodeProps): ClipboardEntry[] => {
    const targets = resolveActionTargets<CuttableNode>(node, getSelectedTreeNodes())

    return targets
      .filter(target => checkElementPermission(target.permissions, 'rename') && !(target.isLocked ?? false))
      .map(target => ({ id: target.id, parentId: target.parentId }))
  }

  const cutTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    const cuttableNodes = getCuttableNodes(node)

    return {
      label: cuttableNodes.length > 1
        ? t('element.tree.cut-multiple', { count: cuttableNodes.length })
        : t('element.tree.cut'),
      key: ContextMenuActionName.cut,
      icon: <Icon value={ 'cut' } />,
      hidden: !isTreeActionAllowed(TreePermission.Cut) || !checkElementPermission(node.permissions, 'rename') || node.isLocked,
      onClick: () => {
        closeContextMenu?.()

        if (cuttableNodes.length > 1) {
          cutNodes(cuttableNodes, elementType)
          return
        }

        cut(node)
      }
    }
  }

  const cutContextMenuItem = (node: Element, onFinish?: () => void): ItemType => {
    return {
      label: t('element.tree.cut'),
      key: ContextMenuActionName.cut,
      icon: <Icon value={ 'cut' } />,
      hidden: !checkElementPermission(node.permissions, 'rename') || node.isLocked,
      onClick: () => {
        onFinish?.()
        cut(node)
      }
    }
  }

  const pasteTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.paste'),
      key: ContextMenuActionName.paste,
      icon: <Icon value={ 'paste' } />,
      hidden: isPasteHiddenHook(node, 'copy'),
      onClick: async () => {
        await paste(parseInt(node.id))
      }
    }
  }

  const pasteCutContextMenuItem = (targetNode: TreeNodeProps): ItemType => {
    const storedCount = getStoredNodes().length

    return {
      label: storedCount > 1
        ? t('element.tree.paste-cut-multiple', { count: storedCount })
        : t('element.tree.paste-cut'),
      key: ContextMenuActionName.pasteCut,
      icon: <Icon value={ 'paste' } />,
      hidden: isPasteHiddenHook(targetNode, 'cut'),
      onClick: async () => {
        await pasteCut(parseInt(targetNode.id))
      }
    }
  }

  return {
    getStoredNode,
    getNodeTask,
    copy,
    cut,
    paste,
    pasteCut,
    move,
    copyTreeContextMenuItem,
    copyContextMenuItem,
    cutTreeContextMenuItem,
    cutContextMenuItem,
    pasteTreeContextMenuItem,
    pasteCutContextMenuItem
  }
}
