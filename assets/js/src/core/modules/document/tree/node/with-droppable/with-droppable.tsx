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
import { useMoveElements } from '@Pimcore/modules/element/actions/move/use-move-elements'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { type Document } from '@Pimcore/modules/document/document-api-slice-enhanced'
import { isUndefined } from 'lodash'
import { useDndAllowed } from '@Pimcore/modules/element/tree/node/with-droppable/use-dnd-allowed'
import { HotspotDroppable, type HotspotDroppableProps } from '@Pimcore/components/drag-and-drop/hotspot-droppable'
import { useSorting } from '@Pimcore/modules/element/actions/sorting/use-sorting'
import { getDraggedElements, isElementDrag, isElementListDragType } from '@Pimcore/components/drag-and-drop/element-drag'
import { toMovableElements } from '@Pimcore/components/element-tree/utils/drop-target-validation'
import { orderForSorting } from '@Pimcore/components/element-tree/utils/sort-order'
import { planSetSort } from '@Pimcore/components/element-tree/utils/sort-positions'
import { useTreeFilter } from '@Pimcore/components/element-tree/provider/tree-filter-provider/use-tree-filter'
import { useElementTree } from '@Pimcore/components/element-tree/hooks/use-element-tree'
import { useElementTreeNode } from '@Pimcore/components/element-tree/hooks/use-element-tree-node'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'

interface OnSortingDropProps {
  info: DragAndDropInfo
  position?: 'top' | 'bottom'
}

export const withDroppable = (Component: typeof TreeNode): typeof TreeNode => {
  const DroppableNodeContent = (props: TreeNodeProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const { moveMultiple, sortMultiple } = useMoveElements('document')
    const { move: moveByIndex } = useSorting('document')
    const { isSourceAllowed, isTargetAllowed } = useDndAllowed()
    const { getAncestorIds } = useElementTree()
    const parentNode = useElementTreeNode(props.parentId ?? '-1')
    const { pageSize } = useTreeFilter()

    if (props.metaData?.document === undefined) {
      return (
        <Component { ...props } />
      )
    }

    const targetDocument: Document = props.metaData.document

    if (!isTargetAllowed(targetDocument)) {
      return (
        <Component { ...props } />
      )
    }

    /**
     * The dragged documents this node would accept as children: everything the user
     * may move, reduced to the topmost elements, and nothing at all when the target
     * is part of the drag.
     */
    const acceptableDocuments = (info: DragAndDropInfo): Document[] => {
      if (!isElementDrag(info, [elementTypes.document]) || !isTargetAllowed(targetDocument)) {
        return []
      }

      const documents = getDraggedElements<Document>(info).filter(document => isSourceAllowed(document))

      return toMovableElements(targetDocument.id, documents, getAncestorIds)
    }

    const onDrop: DroppableProps['onDrop'] = (info) => {
      const documents = acceptableDocuments(info)

      if (documents.length === 0) {
        return
      }

      moveMultiple({
        currentElements: documents.map(document => ({ id: document.id, parentId: document.parentId })),
        targetElement: { id: targetDocument.id, parentId: targetDocument.parentId },
        skippedCount: getDraggedElements(info).length - documents.length
      }).catch(() => {
        trackError(new GeneralError('Items could not be moved'))
      })
    }

    const checkForValidMoveContext: DroppableProps['isValidContext'] = (info) => {
      return isElementDrag(info, [elementTypes.document])
    }

    const checkForValidMoveData: DroppableProps['isValidData'] = (info) => {
      return acceptableDocuments(info).length > 0
    }

    const checkForValidData: DroppableProps['isValidData'] = (info) => {
      const sourceDocument: Document = info.data
      return info.type === 'document' && isSourceAllowed(sourceDocument) && isTargetAllowed(targetDocument)
    }

    const onSortingDrop = (props: OnSortingDropProps): void => {
      const { info, position = 'top' } = props
      const sourceDocument: Document = info.data

      if (!isSourceAllowed(sourceDocument) || !isTargetAllowed(targetDocument)) {
        return
      }

      moveByIndex({
        currentElement: { id: sourceDocument.id, parentId: sourceDocument.parentId },
        targetElement: { id: targetDocument.id, parentId: targetDocument.parentId },
        newIndex: position === 'top' ? targetDocument.index : targetDocument.index + 1
      }).catch(() => {
        trackError(new GeneralError('Item could not be moved'))
      })
    }

    /**
     * The dragged documents that may be sorted next to this node. Sorting places them
     * among the target's siblings, so the destination is the target's parent.
     */
    const acceptableSortDocuments = (info: DragAndDropInfo): Document[] => {
      if (!isElementDrag(info, [elementTypes.document])) {
        return []
      }

      const documents = getDraggedElements<Document>(info).filter(document => isSourceAllowed(document))

      // Sorting a set relative to one of its own members has no defined result.
      if (documents.some(document => String(document.id) === String(targetDocument.id))) {
        return []
      }

      return toMovableElements(targetDocument.parentId ?? targetDocument.id, documents, getAncestorIds)
    }

    /**
     * The set with the index each element is sent with, or nothing when the tree
     * cannot tell where it would end up (filtered level, member on another page).
     */
    const planSort = (info: DragAndDropInfo, position: 'top' | 'bottom'): ReturnType<typeof planSetSort<{ id: number, parentId: number }>> => {
      const documents = acceptableSortDocuments(info)

      if (documents.length < 2) {
        return []
      }

      return planSetSort({
        parent: { id: String(props.parentId), childrenIds: parentNode.childrenIds, page: parentNode.page, searchTerm: parentNode.searchTerm },
        pageSize,
        elements: orderForSorting(documents).map(document => ({ id: document.id, parentId: document.parentId })),
        targetId: String(targetDocument.id),
        edge: position
      })
    }

    const onSortingDropMultiple = (info: DragAndDropInfo, position: 'top' | 'bottom'): void => {
      const elements = planSort(info, position)

      if (elements.length === 0) {
        return
      }

      sortMultiple({
        currentElements: elements,
        targetElement: { id: targetDocument.parentId ?? targetDocument.id },
        skippedCount: getDraggedElements(info).length - elements.length
      }).catch(() => {
        trackError(new GeneralError('Items could not be sorted'))
      })
    }

    const checkForValidSortContext: DroppableProps['isValidContext'] = (info) => {
      return isElementDrag(info, [elementTypes.document])
    }

    const checkForValidSortData: DroppableProps['isValidData'] = (info) => {
      return isElementListDragType(info.type)
        ? planSort(info, 'top').length > 1
        : checkForValidData(info)
    }

    const onSortingDropAny = (info: DragAndDropInfo, position: 'top' | 'bottom'): void => {
      if (isElementListDragType(info.type)) {
        onSortingDropMultiple(info, position)

        return
      }

      onSortingDrop({ info, position })
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

    if (props.isRoot !== true) {
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
