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

import { type ElementType } from 'types/element-type.d'
import type { TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import type { ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useElementApi } from '@Pimcore/modules/element/hooks/use-element-api'

export interface UseLockHookReturn {
  lock: (id: number) => Promise<void>
  lockAndPropagate: (id: number) => Promise<void>
  unlock: (id: number) => Promise<void>
  unlockAndPropagate: (id: number) => Promise<void>
  lockContextMenuItem: (node: TreeNodeProps) => ItemType
  lockAndPropagateContextMenuItem: (node: TreeNodeProps) => ItemType
  unlockContextMenuItem: (node: TreeNodeProps) => ItemType
  unlockAndPropagateContextMenuItem: (node: TreeNodeProps) => ItemType
}

export const useLock = (elementType: ElementType): UseLockHookReturn => {
  const { t } = useTranslation()
  const { elementPatch } = useElementApi(elementType)

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

  const lockContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.lock'),
      key: 'lock',
      icon: <Icon name={ 'lock-01' } />,
      hidden: node.isLocked,
      onClick: async () => {
        await lock(parseInt(node.id))
      }
    }
  }
  const lockAndPropagateContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.lock-and-propagate-to-children'),
      key: 'lock-and-propagate-to-children',
      icon: <Icon name={ 'file-lock-02' } />,
      hidden: node.isLocked,
      onClick: async () => {
        await lockAndPropagate(parseInt(node.id))
      }
    }
  }

  const unlockContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.unlock'),
      key: 'unlock',
      icon: <Icon name={ 'lock-unlock-01' } />,
      hidden: !node.isLocked,
      onClick: async () => {
        await unlock(parseInt(node.id))
      }
    }
  }

  const unlockAndPropagateContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.unlock-and-propagate-to-children'),
      key: 'unlock-and-propagate-to-children',
      icon: <Icon name={ 'lock-unlock-01' } />,
      hidden: !node.isLocked,
      onClick: async () => {
        await unlockAndPropagate(parseInt(node.id))
      }
    }
  }

  return {
    lock,
    lockAndPropagate,
    unlock,
    unlockAndPropagate,
    lockContextMenuItem,
    lockAndPropagateContextMenuItem,
    unlockContextMenuItem,
    unlockAndPropagateContextMenuItem
  }
}
