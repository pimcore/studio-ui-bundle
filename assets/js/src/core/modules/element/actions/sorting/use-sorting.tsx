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
import { useTranslation } from 'react-i18next'
import { useElementApi } from '@Pimcore/modules/element/hooks/use-element-api'
import { type Element } from '@Pimcore/modules/element/element-helper'
import {
  markNodeDeleting,
  refreshSourceNode,
  refreshTargetNode,
  refreshNodeChildren
} from '@Pimcore/components/element-tree/element-tree-slice'
import { useAppDispatch } from '@sdk/app'
import { type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { type ItemType } from '@Pimcore/components/menu/menu'
import { ContextMenuActionName } from '..'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'

type ElementPartial = Pick<Element, 'id' | 'parentId'>

export interface UseSortingHookReturn {
  move: (props: MoveProps) => Promise<void>
  sortingContextMenuItem: (node: TreeNodeProps) => ItemType
}

export interface MoveProps {
  currentElement: ElementPartial
  targetElement: ElementPartial
  newIndex: number
}

const SORTING_MODES = {
  KEY: 'key',
  INDEX: 'index'
}

const SORTING_ORDERS = {
  ASCENDING: 'ASC',
  DESCENDING: 'DESC'
}

export const useSorting = (elementType: ElementType): UseSortingHookReturn => {
  const { elementPatch } = useElementApi(elementType)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

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
            parentId: targetElement.parentId,
            index: props.newIndex
          }]
        }
      })

      if (success) {
        dispatch(refreshSourceNode({ nodeId: String(currentElement.parentId), elementType }))
        dispatch(refreshTargetNode({ nodeId: String(targetElement.parentId), elementType }))
      } else {
        dispatch(markNodeDeleting({ nodeId: String(currentElement.id), elementType, isDeleting: false }))
      }
    } catch (error) {
      console.error('Error moving element', error)
    }
  }

  const updateSorting = async (node: TreeNodeProps, sortBy: keyof typeof SORTING_MODES, sortOrder: keyof typeof SORTING_ORDERS): Promise<void> => {
    try {
      const success = await elementPatch({
        body: {
          data: [{
            id: Number(node.id),
            childrenSortBy: SORTING_MODES[sortBy],
            childrenSortOrder: SORTING_ORDERS[sortOrder]
          }]
        }
      })

      if (success) {
        dispatch(refreshTargetNode({ nodeId: String(node.parentId), elementType }))
        dispatch(refreshNodeChildren({ nodeId: String(node.id), elementType }))
      }
    } catch (error) {
      console.error('Error updating sorting', error)
    }
  }

  const sortingContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.sorting'),
      key: ContextMenuActionName.sorting,
      icon: <Icon value={ 'folder' } />,
      hidden: node.hasChildren !== true,
      children: [
        {
          label: t('element.tree.sorting.keyed-ascending'),
          key: ContextMenuActionName.sortingAscending,
          icon: <Icon value={ 'a-to-z-order' } />,
          onClick: () => {
            void updateSorting(node, 'KEY', 'ASCENDING')
          }
        },

        {
          label: t('element.tree.sorting.keyed-descending'),
          key: ContextMenuActionName.sortingDescending,
          icon: <Icon value={ 'z-to-a-order' } />,
          onClick: () => {
            void updateSorting(node, 'KEY', 'DESCENDING')
          }
        },

        {
          label: t('element.tree.sorting.indexed'),
          key: ContextMenuActionName.sortingIndexed,
          icon: <Icon value={ 'manual-order' } />,
          onClick: () => {
            void updateSorting(node, 'INDEX', 'ASCENDING')
          }
        }
      ]
    }
  }

  return {
    move,
    sortingContextMenuItem
  }
}
