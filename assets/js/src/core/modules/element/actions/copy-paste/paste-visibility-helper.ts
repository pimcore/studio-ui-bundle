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
import { TreePermission } from '../../../perspectives/enums/tree-permission'
import { checkElementPermission } from '../../../element/permissions/permission-helper'
import { type Element } from '../../../element/element-helper'
import { useTreeCopyPasteContext } from './tree-copy-paste-context'
import { useTreePermission } from '../../tree/provider/tree-permission-provider/use-tree-permission'

export interface PasteVisibilityOptions {
  storedNode?: TreeNodeProps | Element
  nodeTask?: 'copy' | 'cut'
  elementType: ElementType
  targetNode?: TreeNodeProps | Element
  allowedTask?: 'copy' | 'cut'
  isTreeActionAllowed: (permission: TreePermission) => boolean
}

export const isPasteHidden = (options: PasteVisibilityOptions): boolean => {
  const { storedNode, nodeTask, elementType, targetNode, allowedTask, isTreeActionAllowed } = options

  if (!isTreeActionAllowed(TreePermission.Paste)) {
    return true
  }

  if (storedNode === undefined || nodeTask === undefined) {
    return true
  }

  if (targetNode !== undefined && !checkElementPermission(targetNode.permissions, 'create')) {
    return true
  }

  if (allowedTask !== undefined && nodeTask !== allowedTask) {
    return true
  }

  if (elementType === 'asset' && targetNode?.type !== 'folder') {
    return true
  }

  if (storedNode !== undefined && nodeTask === 'cut' && targetNode !== undefined && String(targetNode.id) === String(storedNode.id)) {
    return true
  }

  return false
}

export interface UsePasteVisibilityReturn {
  isPasteHidden: (targetNode?: TreeNodeProps | Element, allowedTask?: 'copy' | 'cut') => boolean
}

export const usePasteVisibility = (elementType: ElementType): UsePasteVisibilityReturn => {
  const { getStoredNode, getNodeTask } = useTreeCopyPasteContext(elementType)
  const { isTreeActionAllowed } = useTreePermission()

  const isPasteHiddenHook = (
    targetNode?: TreeNodeProps | Element,
    allowedTask?: 'copy' | 'cut'
  ): boolean => {
    return isPasteHidden({
      storedNode: getStoredNode(),
      nodeTask: getNodeTask(),
      elementType,
      targetNode,
      allowedTask,
      isTreeActionAllowed
    })
  }

  return {
    isPasteHidden: isPasteHiddenHook
  }
}
