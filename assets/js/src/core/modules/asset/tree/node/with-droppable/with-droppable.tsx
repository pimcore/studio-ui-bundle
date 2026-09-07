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
import { type DragAndDropInfo, Droppable, type DroppableProps } from '@Pimcore/components/drag-and-drop/droppable'
import { type Asset } from '../../../asset-api-slice-enhanced'
import { useCopyPaste } from '@Pimcore/modules/element/actions/copy-paste/use-copy-paste'
import { useMoveElements } from '@Pimcore/modules/element/actions/move/use-move-elements'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { isUndefined } from 'lodash'
import { useDndAllowed } from '@Pimcore/modules/element/tree/node/with-droppable/use-dnd-allowed'
import { getDraggedElements, isElementDrag } from '@Pimcore/components/drag-and-drop/element-drag'
import { toMovableElements } from '@Pimcore/components/element-tree/utils/drop-target-validation'
import { useElementTree } from '@Pimcore/components/element-tree/hooks/use-element-tree'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'

export const withDroppable = (Component: typeof TreeNode): typeof TreeNode => {
  const DroppableNodeContent = (props: TreeNodeProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const { moveMultiple } = useMoveElements('asset')
    const { isSourceAllowed, isTargetAllowed } = useDndAllowed()
    const { getAncestorIds } = useElementTree()

    if (props.metaData?.asset === undefined) {
      return (
        <Component { ...props } />
      )
    }

    const targetAsset: Asset = props.metaData.asset

    const isAssetTargetAllowed = (asset: Asset): boolean => {
      return isTargetAllowed(asset) && asset.type === 'folder'
    }

    if (!isAssetTargetAllowed(targetAsset)) {
      return (
        <Component { ...props } />
      )
    }

    /**
     * The dragged assets this folder would accept: everything the user may move,
     * reduced to the topmost elements, and nothing at all when the folder itself
     * is part of the drag.
     */
    const acceptableAssets = (info: DragAndDropInfo): Asset[] => {
      if (!isElementDrag(info, [elementTypes.asset]) || !isAssetTargetAllowed(targetAsset)) {
        return []
      }

      const assets = getDraggedElements<Asset>(info).filter(asset => isSourceAllowed(asset))

      return toMovableElements(targetAsset.id, assets, getAncestorIds)
    }

    const onDrop: DroppableProps['onDrop'] = (info) => {
      const assets = acceptableAssets(info)

      if (assets.length === 0) {
        return
      }

      moveMultiple({
        currentElements: assets.map(asset => ({ id: asset.id, parentId: asset.parentId })),
        targetElement: { id: targetAsset.id, parentId: targetAsset.parentId },
        skippedCount: getDraggedElements(info).length - assets.length
      }).catch(() => {
        trackError(new GeneralError('Items could not be moved'))
      })
    }

    const checkForValidContext: DroppableProps['isValidContext'] = (info) => {
      return isElementDrag(info, [elementTypes.asset])
    }

    const checkForValidData: DroppableProps['isValidData'] = (info) => {
      return acceptableAssets(info).length > 0
    }

    return (
      <Component
        { ...props }
        ref={ ref }
        wrapNode={ (children) => (
          <Droppable
            disableDndActiveIndicator
            isValidContext={ checkForValidContext }
            isValidData={ checkForValidData }
            onDrop={ onDrop }
          >
            {!isUndefined(props.wrapNode) ? props.wrapNode(children) : children}
          </Droppable>
        ) }
      />
    )
  }

  return forwardRef(DroppableNodeContent)
}
