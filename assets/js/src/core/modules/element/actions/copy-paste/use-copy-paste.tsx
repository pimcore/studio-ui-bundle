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

import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import type { TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import type { ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type CloneParameters, useElementApi } from '@Pimcore/modules/element/hooks/use-element-api'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { createJob as createCloneJob } from '@Pimcore/modules/execution-engine/jobs/clone/factory'
import { defaultTopics, topics } from '@Pimcore/modules/execution-engine/topics'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { type Element } from '@Pimcore/modules/element/element-helper'
import { useTreePermission } from '../../tree/provider/tree-permission-provider/use-tree-permission'
import { TreePermission } from '../../../perspectives/enums/tree-permission'
import {
  markNodeDeleting,
  refreshSourceNode,
  refreshTargetNode,
  setNodeFetching
} from '@Pimcore/components/element-tree/element-tree-slice'
import { useAppDispatch } from '@Pimcore/app/store'
import { isUndefined } from 'lodash'
import { useTreeId } from '../../tree/provider/tree-id-provider/use-tree-id'
import { ContextMenuActionName } from '..'

type ElementPartial = Pick<Element, 'id' | 'parentId'>
type StoreNode = TreeNodeProps | Element | undefined

export interface UseCopyPasteHookReturn {
  storedNode: StoreNode
  nodeTask: 'copy' | 'cut' | undefined
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
  pasteCutContextMenuItem: (parentId: number) => ItemType
}

export interface MoveProps {
  currentElement: ElementPartial
  targetElement: ElementPartial
}

export const useCopyPaste = (elementType: ElementType): UseCopyPasteHookReturn => {
  const [storedNode, setStoredNode] = useState<StoreNode>()
  const [nodeTask, setNodeTask] = useState<'copy' | 'cut' | undefined>()
  const { elementPatch, elementClone } = useElementApi(elementType)
  const { t } = useTranslation()
  const { isTreeActionAllowed } = useTreePermission()
  const { addJob } = useJobs()
  const dispatch = useAppDispatch()
  const { treeId } = useTreeId(true)

  const copy = (node: TreeNodeProps | Element): void => {
    setStoredNode(node)
    setNodeTask('copy')
  }

  const cut = (node: TreeNodeProps | Element): void => {
    setStoredNode(node)
    setNodeTask('cut')
  }

  const move = async (props: MoveProps): Promise<void> => {
    const { currentElement, targetElement } = props
    if (currentElement.id === targetElement.id) {
      return
    }

    try {
      dispatch(markNodeDeleting({ nodeId: String(currentElement.id), elementType, isDeleting: true }))

      const success = await elementPatch({
        body: {
          data: [{
            id: currentElement.id,
            parentId: targetElement.id
          }]
        }
      })

      if (success) {
        dispatch(refreshSourceNode({ nodeId: String(currentElement.parentId), elementType }))
        dispatch(refreshTargetNode({ nodeId: String(targetElement.id), elementType }))
      } else {
        dispatch(markNodeDeleting({ nodeId: String(currentElement.id), elementType, isDeleting: false }))
      }
    } catch (error) {
      console.error('Error moving element', error)
    }
  }

  const paste = async (
    parentId: number,
    cloneParameters: CloneParameters = { recursive: true, updateReferences: true },
    node: StoreNode = storedNode
  ): Promise<void> => {
    if (node === undefined) {
      return
    }

    const id = typeof node.id === 'number'
      ? node.id
      : parseInt(node.id)

    const cloneResponse = await elementClone({
      id,
      parentId,
      cloneParameters
    })

    if (cloneResponse.success) {
      if (!isUndefined(cloneResponse.jobRunId)) {
        addJob(createCloneJob({
          title: 'Cloning Folder',
          topics: [topics['cloning-finished'], ...defaultTopics],
          action: async () => {
            return cloneResponse.jobRunId!
          },
          parentFolder: String(parentId),
          elementType
        }))
      } else if (parentId !== undefined) {
        dispatch(refreshTargetNode({ nodeId: String(parentId), elementType }))
      }
    }
  }

  const pasteCut = async (parentId: number): Promise<void> => {
    if (storedNode === undefined) {
      return
    }

    const id = typeof storedNode.id === 'number'
      ? storedNode.id
      : parseInt(storedNode.id)

    try {
      dispatch(markNodeDeleting({ nodeId: String(id), elementType, isDeleting: true }))

      const success = await elementPatch({
        body: {
          data: [{
            id,
            parentId
          }]
        }
      })

      if (success) {
        dispatch(refreshSourceNode({ nodeId: String(storedNode.parentId), elementType }))
        dispatch(refreshTargetNode({ nodeId: String(parentId), elementType }))
        setStoredNode(undefined)
        setNodeTask(undefined)
      } else {
        dispatch(markNodeDeleting({ nodeId: String(id), elementType, isDeleting: false }))
      }
    } catch (error) {
      console.error('Error cloning element', error)
    }
  }

  const copyTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.copy'),
      key: ContextMenuActionName.copy,
      icon: <Icon value={ 'copy' } />,
      hidden: !isTreeActionAllowed(TreePermission.Copy) || !checkElementPermission(node.permissions, 'view'),
      onClick: () => {
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
        copy(node)
        onFinish?.()
      }
    }
  }

  const cutTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.cut'),
      key: ContextMenuActionName.cut,
      icon: <Icon value={ 'cut' } />,
      hidden: !isTreeActionAllowed(TreePermission.Cut) || !checkElementPermission(node.permissions, 'rename') || node.isLocked,
      onClick: () => {
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
        cut(node)
        onFinish?.()
      }
    }
  }

  const pasteTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.paste'),
      key: ContextMenuActionName.paste,
      icon: <Icon value={ 'paste' } />,
      hidden: !isTreeActionAllowed(TreePermission.Paste) || (storedNode === undefined || nodeTask !== 'copy') || !checkElementPermission(node.permissions, 'create'),
      onClick: async () => {
        dispatch(setNodeFetching({ treeId, nodeId: String(node.id), isFetching: true }))
        await paste(parseInt(node.id))
      }
    }
  }

  const pasteCutContextMenuItem = (parentId: number): ItemType => {
    return {
      label: t('element.tree.paste-cut'),
      key: ContextMenuActionName.pasteCut,
      icon: <Icon value={ 'paste' } />,
      hidden: !isTreeActionAllowed(TreePermission.Paste) || (storedNode === undefined || nodeTask !== 'cut'),
      onClick: async () => {
        await pasteCut(parentId)
      }
    }
  }

  return {
    storedNode,
    nodeTask,
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
