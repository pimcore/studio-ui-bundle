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
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useElementApi } from '@Pimcore/modules/element/hooks/use-element-api'
import { type Element } from '@Pimcore/modules/element/element-helper'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { useTreePermission } from '../../tree/provider/tree-permission-provider/use-tree-permission'
import { TreePermission } from '../../../perspectives/enums/tree-permission'
import { ContextMenuActionName } from '..'
import { useAppDispatch } from '@Pimcore/app/store'
import { setNodeLoadingInAllTree, setNodeLocked } from '@Pimcore/components/element-tree/element-tree-slice'
import { isNil } from 'lodash'

export interface UseLockHookReturn {
  lock: (id: number) => Promise<void>
  lockAndPropagate: (id: number) => Promise<void>
  unlock: (id: number) => Promise<void>
  unlockAndPropagate: (id: number) => Promise<void>
  lockTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  lockContextMenuItem: (node: Element, onFinish?: () => void) => ItemType
  lockAndPropagateTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  lockAndPropagateContextMenuItem: (node: Element, onFinish?: () => void) => ItemType
  unlockTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  unlockContextMenuItem: (node: Element, onFinish?: () => void) => ItemType
  unlockAndPropagateTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  unlockAndPropagateContextMenuItem: (node: Element, onFinish?: () => void) => ItemType
  isLockMenuHidden: (node: Element | TreeNodeProps) => boolean
}

export enum LockType {
  Self = 'self',
  Propagate = 'propagate',
  Unlock = '',
  UnlockPropagate = 'unlockPropagate'
}

export const useLock = (elementType: ElementType): UseLockHookReturn => {
  const { t } = useTranslation()
  const { elementPatch } = useElementApi(elementType)
  const user = useUser()
  const { isTreeActionAllowed } = useTreePermission()
  const dispatch = useAppDispatch()

  const lock = async (id: number): Promise<void> => {
    await patchLock(id, LockType.Self)
  }

  const lockAndPropagate = async (id: number): Promise<void> => {
    await patchLock(id, LockType.Propagate)
  }
  const unlock = async (id: number): Promise<void> => {
    await patchLock(id, LockType.Unlock)
  }
  const unlockAndPropagate = async (id: number): Promise<void> => {
    await patchLock(id, LockType.UnlockPropagate)
  }

  const patchLock = async (id: number, lockType: LockType): Promise<void> => {
    const elementLockTask = elementPatch({
      body: {
        data: [{
          id,
          locked: lockType
        }]
      }
    })

    const getLockedFromLockType = (lockType: LockType): boolean => {
      return lockType === 'self' || lockType === 'propagate'
    }

    try {
      dispatch(setNodeLoadingInAllTree({ nodeId: String(id), elementType, loading: true }))
      const success = await elementLockTask

      if (success) {
        dispatch(setNodeLocked({ elementType, nodeId: String(id), isLocked: getLockedFromLockType(lockType), lockType }))
      }

      dispatch(setNodeLoadingInAllTree({ nodeId: String(id), elementType, loading: false }))
    } catch (error) {
      console.error('Error renaming ' + elementType, error)
    }
  }

  const lockTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.lock'),
      key: ContextMenuActionName.lock,
      icon: <Icon value={ 'lock' } />,
      hidden: isLockHidden(node),
      onClick: async () => {
        await lock(parseInt(node.id))
      }
    }
  }

  const lockContextMenuItem = (node: Element, onFinish?: () => void): ItemType => {
    return {
      label: t('element.lock'),
      key: ContextMenuActionName.lock,
      icon: <Icon value={ 'lock' } />,
      hidden: isLockHidden(node),
      onClick: async () => {
        await lock(node.id)
        onFinish?.()
      }
    }
  }

  const lockAndPropagateTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.lock-and-propagate-to-children'),
      key: ContextMenuActionName.lockAndPropagate,
      icon: <Icon value={ 'file-locked' } />,
      hidden: isLockPropagateHidden(node),
      onClick: async () => {
        await lockAndPropagate(parseInt(node.id))
      }
    }
  }

  const lockAndPropagateContextMenuItem = (node: Element, onFinish?: () => void): ItemType => {
    return {
      label: t('element.lock-and-propagate-to-children'),
      key: ContextMenuActionName.lockAndPropagate,
      icon: <Icon value={ 'file-locked' } />,
      hidden: isLockPropagateHidden(node),
      onClick: async () => {
        await lockAndPropagate(node.id)
        onFinish?.()
      }
    }
  }

  const unlockTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.unlock'),
      key: ContextMenuActionName.unlock,
      icon: <Icon value={ 'unlocked' } />,
      hidden: isUnlockHidden(node),
      onClick: async () => {
        await unlock(parseInt(node.id))
      }
    }
  }

  const unlockContextMenuItem = (node: Element, onFinish?: () => void): ItemType => {
    return {
      label: t('element.unlock'),
      key: ContextMenuActionName.unlock,
      icon: <Icon value={ 'unlocked' } />,
      hidden: isUnlockHidden(node),
      onClick: async () => {
        await unlock(node.id)
        onFinish?.()
      }
    }
  }

  const unlockAndPropagateTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.unlock-and-propagate-to-children'),
      key: ContextMenuActionName.unlockAndPropagate,
      icon: <Icon value={ 'unlocked' } />,
      hidden: isUnlockPropagateHidden(node),
      onClick: async () => {
        await unlockAndPropagate(parseInt(node.id))
      }
    }
  }

  const unlockAndPropagateContextMenuItem = (node: Element, onFinish?: () => void): ItemType => {
    return {
      label: t('element.unlock-and-propagate-to-children'),
      key: ContextMenuActionName.unlockAndPropagate,
      icon: <Icon value={ 'unlocked' } />,
      hidden: isUnlockPropagateHidden(node),
      onClick: async () => {
        await unlockAndPropagate(node.id)
        onFinish?.()
      }
    }
  }

  const isNodeDirectlyLocked = (node: Element | TreeNodeProps): boolean => {
    return node.isLocked && !isNil(node.locked)
  }

  const isLockHidden = (node: Element | TreeNodeProps): boolean => {
    if (node.isLocked && isNil(node.locked)) {
      return false
    }

    return !isTreeActionAllowed(TreePermission.Lock) || node.isLocked || !user.isAdmin
  }

  const isLockPropagateHidden = (node: Element | TreeNodeProps): boolean => {
    if (!isNodeDirectlyLocked(node)) {
      return false
    }

    return !isTreeActionAllowed(TreePermission.LockAndPropagate) || node.isLocked || !user.isAdmin
  }

  const isUnlockHidden = (node: Element | TreeNodeProps): boolean => {
    if (!isNodeDirectlyLocked(node)) {
      return true
    }

    return !isTreeActionAllowed(TreePermission.Unlock) || !node.isLocked || !user.isAdmin
  }

  const isUnlockPropagateHidden = (node: Element | TreeNodeProps): boolean => {
    return !isTreeActionAllowed(TreePermission.UnlockAndPropagate) || !node.isLocked || !user.isAdmin
  }

  const isLockMenuHidden = (node: Element | TreeNodeProps): boolean => {
    return isLockHidden(node) && isLockPropagateHidden(node) && isUnlockHidden(node) && isUnlockPropagateHidden(node)
  }

  return {
    lock,
    lockAndPropagate,
    unlock,
    unlockAndPropagate,
    lockTreeContextMenuItem,
    lockContextMenuItem,
    lockAndPropagateTreeContextMenuItem,
    lockAndPropagateContextMenuItem,
    unlockTreeContextMenuItem,
    unlockContextMenuItem,
    unlockAndPropagateTreeContextMenuItem,
    unlockAndPropagateContextMenuItem,
    isLockMenuHidden
  }
}
