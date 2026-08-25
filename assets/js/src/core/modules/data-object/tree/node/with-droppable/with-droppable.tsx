/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type TreeNode, type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import React, { forwardRef, type ReactElement, type Ref } from 'react'
import { type DragAndDropInfo, type DroppableProps } from '@Pimcore/components/drag-and-drop/droppable'
import { useCopyPaste } from '@Pimcore/modules/element/actions/copy-paste/use-copy-paste'
import { useMoveElements } from '@Pimcore/modules/element/actions/move/use-move-elements'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { type DataObject } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { isUndefined } from 'lodash'
import { useDndAllowed } from '@Pimcore/modules/element/tree/node/with-droppable/use-dnd-allowed'
import { getDraggedElements, isElementDrag, isElementListDragType } from '@Pimcore/components/drag-and-drop/element-drag'
import { toMovableElements } from '@Pimcore/components/element-tree/utils/drop-target-validation'
import { orderForSorting } from '@Pimcore/components/element-tree/utils/sort-order'
import { useElementTree } from '@Pimcore/components/element-tree/hooks/use-element-tree'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import { HotspotDroppable, type HotspotDroppableProps } from '@Pimcore/components/drag-and-drop/hotspot-droppable'
import { useSorting } from '@Pimcore/modules/element/actions/sorting/use-sorting'
import { useElementTreeNode } from '@Pimcore/components/element-tree/hooks/use-element-tree-node'

interface OnSortingDropProps {
  info: DragAndDropInfo
  position?: 'top' | 'bottom'
}

export const withDroppable = (Component: typeof TreeNode): typeof TreeNode => {
  const DroppableNodeContent = (props: TreeNodeProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const { move } = useCopyPaste('data-object')
    const { moveMultiple, sortMultiple } = useMoveElements('data-object')
    const { move: moveByIndex } = useSorting('data-object')
    const { isSourceAllowed, isTargetAllowed } = useDndAllowed()
    const { getAncestorIds } = useElementTree()
    const parentNode = useElementTreeNode(props.parentId ?? '-1')
    const hasParent = parentNode !== undefined
    let sortingMode = 'keyed'

    if (hasParent) {
      sortingMode = parentNode.treeNodeProps?.metaData?.dataObject?.childrenSortBy ?? 'keyed'
    }

    if (props.metaData?.dataObject === undefined) {
      return (
        <Component { ...props } />
      )
    }

    const targetObject: DataObject = props.metaData.dataObject

    if (!isTargetAllowed(targetObject)) {
      return (
        <Component { ...props } />
      )
    }

    /**
     * The dragged objects this node would accept as children: everything the user
     * may move, without variants, reduced to the topmost elements, and nothing at
     * all when the target is part of the drag.
     */
    const acceptableObjects = (info: DragAndDropInfo): DataObject[] => {
      if (!isElementDrag(info, [elementTypes.dataObject]) || !isTargetAllowed(targetObject) || targetObject.type === 'variant') {
        return []
      }

      const objects = getDraggedElements<DataObject>(info)
        .filter(object => object.type !== 'variant' && isSourceAllowed(object))

      return toMovableElements(targetObject.id, objects, getAncestorIds)
    }

    const onDrop: DroppableProps['onDrop'] = (info) => {
      const objects = acceptableObjects(info)

      if (objects.length === 0) {
        return
      }

      moveMultiple({
        currentElements: objects.map(object => ({ id: object.id, parentId: object.parentId })),
        targetElement: { id: targetObject.id, parentId: targetObject.parentId }
      }).catch(() => {
        trackError(new GeneralError('Items could not be moved'))
      })
    }

    const onSortingDrop = (props: OnSortingDropProps): void => {
      const { info, position = 'top' } = props
      const sourceObject: DataObject = info.data

      if (!isSourceAllowed(sourceObject) || !isTargetAllowed(targetObject)) {
        return
      }

      moveByIndex({
        currentElement: { id: sourceObject.id, parentId: sourceObject.parentId },
        targetElement: { id: targetObject.id, parentId: targetObject.parentId },
        newIndex: position === 'top' ? targetObject.index : targetObject.index + 1
      }).catch(() => {
        trackError(new GeneralError('Item could not be moved'))
      })
    }

    /**
     * The dragged objects that may be sorted next to this node. Sorting places them
     * among the target's siblings, so the destination is the target's parent.
     */
    const acceptableSortObjects = (info: DragAndDropInfo): DataObject[] => {
      if (!isElementDrag(info, [elementTypes.dataObject]) || targetObject.type === 'variant') {
        return []
      }

      const objects = getDraggedElements<DataObject>(info)
        .filter(object => object.type !== 'variant' && isSourceAllowed(object))

      // Sorting a set relative to one of its own members has no defined result.
      if (objects.some(object => String(object.id) === String(targetObject.id))) {
        return []
      }

      return toMovableElements(targetObject.parentId ?? targetObject.id, objects, getAncestorIds)
    }

    const onSortingDropMultiple = (info: DragAndDropInfo, position: 'top' | 'bottom'): void => {
      const objects = acceptableSortObjects(info)

      if (objects.length < 2) {
        return
      }

      sortMultiple({
        currentElements: orderForSorting(objects).map(object => ({ id: object.id, parentId: object.parentId })),
        targetElement: { id: targetObject.parentId ?? targetObject.id },
        startIndex: position === 'top' ? targetObject.index : targetObject.index + 1
      }).catch(() => {
        trackError(new GeneralError('Items could not be sorted'))
      })
    }

    const checkForValidSortContext: DroppableProps['isValidContext'] = (info) => {
      return isElementDrag(info, [elementTypes.dataObject])
    }

    const checkForValidSortData: DroppableProps['isValidData'] = (info) => {
      return isElementListDragType(info.type)
        ? acceptableSortObjects(info).length > 1
        : (checkForValidData?.(info) ?? false)
    }

    const onSortingDropAny = (info: DragAndDropInfo, position: 'top' | 'bottom'): void => {
      if (isElementListDragType(info.type)) {
        onSortingDropMultiple(info, position)

        return
      }

      onSortingDrop({ info, position })
    }

    // Only moving into a node handles a set; sorting by index stays single element,
    // so its hotspots keep the validators below and refuse a list drag.
    const checkForValidMoveContext: DroppableProps['isValidContext'] = (info) => {
      return isElementDrag(info, [elementTypes.dataObject])
    }

    const checkForValidMoveData: DroppableProps['isValidData'] = (info) => {
      return acceptableObjects(info).length > 0
    }

    const checkForValidContext: DroppableProps['isValidContext'] = (context) => {
      return context.type === 'data-object' && context.data.type !== 'variant'
    }

    const checkForValidData: DroppableProps['isValidData'] = (info) => {
      const sourceObject: DataObject = info.data
      return info.type === 'data-object' && targetObject.type !== 'variant' && isSourceAllowed(sourceObject) && isTargetAllowed(targetObject)
    }

    let hotspots: HotspotDroppableProps['hotspots'] = [
      {
        id: 'drop-middle',
        isValidContext: checkForValidMoveContext,
        isValidData: checkForValidMoveData,
        position: { x: '0', y: '0%', width: '100%', height: '100%' },
        onDrop
      }
    ]

    if (sortingMode === 'index') {
      hotspots = [
        {
          id: 'sorting-top',
          className: 'dnd__sorting dnd__sorting--top',
          isValidContext: checkForValidSortContext,
          isValidData: checkForValidSortData,
          position: { x: 0, y: 0, width: '100%', height: '30%' },
          onDrop: (info) => { onSortingDropAny(info, 'top') }
        },
        {
          id: 'drop-middle',
          isValidContext: checkForValidMoveContext,
          isValidData: checkForValidMoveData,
          position: { x: '0', y: '30%', width: '100%', height: '40%' },
          onDrop
        },
        {
          id: 'sorting-bottom',
          className: 'dnd__sorting dnd__sorting--bottom',
          isValidContext: checkForValidSortContext,
          isValidData: checkForValidSortData,
          position: { x: 0, y: '70%', width: '100%', height: '30%' },
          onDrop: (info) => { onSortingDropAny(info, 'bottom') }
        }
      ]
    }

    return (
      <Component
        { ...props }
        ref={ ref }
        wrapNode={ (children) => (
          <HotspotDroppable
            disableDndActiveIndicator
            hotspots={ hotspots }
          >
            {!isUndefined(props.wrapNode) ? props.wrapNode(children) : children}
          </HotspotDroppable>
        ) }
      />
    )
  }

  return forwardRef(DroppableNodeContent)
}
