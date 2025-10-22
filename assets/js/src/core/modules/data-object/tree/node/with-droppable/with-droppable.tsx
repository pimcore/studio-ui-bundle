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
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { type DataObject } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { isUndefined } from 'lodash'
import { useDndAllowed } from '@Pimcore/modules/element/tree/node/with-droppable/use-dnd-allowed'
import { HotspotDroppable, type HotspotDroppableProps } from '@Pimcore/components/drag-and-drop/hotspot-droppable'
import { useSorting } from '@Pimcore/modules/element/actions/sorting/use-sorting'
import { useElementTreeNode } from '@Pimcore/components/element-tree/hooks/use-element-tree-node'

interface onSortingDropProps {
  info: DragAndDropInfo
  position?: 'top' | 'bottom'
}

export const withDroppable = (Component: typeof TreeNode): typeof TreeNode => {
  const DroppableNodeContent = (props: TreeNodeProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const { move } = useCopyPaste('data-object')
    const { move: moveByIndex } = useSorting('data-object')
    const { isSourceAllowed, isTargetAllowed } = useDndAllowed()
    const parentNode = useElementTreeNode(props.parentId ?? '-1')
    const hasParent = parentNode !== undefined
    let sortingMode = 'keyed'

    console.log({ parentNode })

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

    const onDrop: DroppableProps['onDrop'] = (info) => {
      const sourceObject: DataObject = info.data

      if (!isSourceAllowed(sourceObject) || !isTargetAllowed(targetObject)) {
        return
      }

      move({
        currentElement: { id: sourceObject.id, parentId: sourceObject.parentId },
        targetElement: { id: targetObject.id, parentId: targetObject.parentId }
      }).catch(() => {
        trackError(new GeneralError('Item could not be moved'))
      })
    }

    const onSortingDrop = (props: onSortingDropProps): void => {
      const { info, position = 'top' } = props
      const sourceObject: DataObject = info.data

      if (!isSourceAllowed(sourceObject) || !isTargetAllowed(targetObject)) {
        return
      }

      moveByIndex({
        currentElement: { id: sourceObject.id, parentId: sourceObject.parentId },
        targetElement: { id: targetObject.id, parentId: targetObject.parentId },
        newIndex: position === 'top' ? targetObject.index - 1 : targetObject.index
      }).catch(() => {
        trackError(new GeneralError('Item could not be moved'))
      })
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
        isValidContext: checkForValidContext,
        isValidData: checkForValidData,
        position: { x: '0', y: '0%', width: '100%', height: '100%' },
        onDrop
      }
    ]

    if (sortingMode === 'index') {
      hotspots = [
        {
          id: 'sorting-top',
          className: 'dnd__sorting dnd__sorting--top',
          isValidContext: checkForValidContext,
          isValidData: checkForValidData,
          position: { x: 0, y: 0, width: '100%', height: '30%' },
          onDrop: (info) => { onSortingDrop({ info, position: 'top' }) }
        },
        {
          id: 'drop-middle',
          isValidContext: checkForValidContext,
          isValidData: checkForValidData,
          position: { x: '0', y: '30%', width: '100%', height: '40%' },
          onDrop
        },
        {
          id: 'sorting-bottom',
          className: 'dnd__sorting dnd__sorting--bottom',
          isValidContext: checkForValidContext,
          isValidData: checkForValidData,
          position: { x: 0, y: '70%', width: '100%', height: '30%' },
          onDrop: (info) => { onSortingDrop({ info, position: 'bottom' }) }
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
