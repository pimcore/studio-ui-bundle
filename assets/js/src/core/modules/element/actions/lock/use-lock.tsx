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

export const useLock = (elementType: ElementType): UseLockHookReturn => {
  const { t } = useTranslation()
  const { elementPatch } = useElementApi(elementType)
  const user = useUser()
  const { isTreeActionAllowed } = useTreePermission()

  const lock = async (id: number): Promise<void> => {
    await patchLock(id, 'self')
  }

  const lockAndPropagate = async (id: number): Promise<void> => {
    await patchLock(id, 'propagate')
  }
  const unlock = async (id: number): Promise<void> => {
    await patchLock(id, '')
  }
  const unlockAndPropagate = async (id: number): Promise<void> => {
    await patchLock(id, 'unlockPropagate')
  }

  const patchLock = async (id: number, lockType: 'self' | 'propagate' | '' | 'unlockPropagate'): Promise<void> => {
    try {
      await elementPatch({
        body: {
          data: [{
            id,
            locked: lockType
          }]
        }
      })
    } catch (error) {
      console.error('Error updating element lock', error)
    }
  }

  const lockTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.lock'),
      key: 'lock',
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
      key: 'lock',
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
      key: 'lock-and-propagate-to-children',
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
      key: 'lock-and-propagate-to-children',
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
      key: 'unlock',
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
      key: 'unlock',
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
      key: 'unlock-and-propagate-to-children',
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
      key: 'unlock-and-propagate-to-children',
      icon: <Icon value={ 'unlocked' } />,
      hidden: isUnlockPropagateHidden(node),
      onClick: async () => {
        await unlockAndPropagate(node.id)
        onFinish?.()
      }
    }
  }

  const isLockHidden = (node: Element | TreeNodeProps): boolean => {
    return !isTreeActionAllowed(TreePermission.Lock) || node.isLocked || !user.isAdmin
  }

  const isLockPropagateHidden = (node: Element | TreeNodeProps): boolean => {
    return !isTreeActionAllowed(TreePermission.LockAndPropagate) || node.isLocked || !user.isAdmin
  }

  const isUnlockHidden = (node: Element | TreeNodeProps): boolean => {
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
