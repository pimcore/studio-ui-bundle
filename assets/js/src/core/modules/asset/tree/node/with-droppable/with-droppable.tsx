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
import { Droppable, type DroppableProps } from '@Pimcore/components/drag-and-drop/droppable'
import { type Asset } from '../../../asset-api-slice-enhanced'
import { useCopyPaste } from '@Pimcore/modules/element/actions/copy-paste/use-copy-paste'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { isUndefined } from 'lodash'
import { useDndAllowed } from '@Pimcore/modules/element/tree/node/with-droppable/use-dnd-allowed'

export const withDroppable = (Component: typeof TreeNode): typeof TreeNode => {
  const DroppableNodeContent = (props: TreeNodeProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const { move } = useCopyPaste('asset')
    const { isSourceAllowed, isTargetAllowed } = useDndAllowed()

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

    const onDrop: DroppableProps['onDrop'] = (info) => {
      const sourceAsset: Asset = info.data

      if (!isSourceAllowed(sourceAsset) || !isAssetTargetAllowed(targetAsset)) {
        return
      }
      move({
        currentElement: { id: sourceAsset.id, parentId: sourceAsset.parentId },
        targetElement: { id: targetAsset.id, parentId: targetAsset.parentId }
      }).catch(() => {
        trackError(new GeneralError('Item could not be moved'))
      })
    }

    const checkForValidContext: DroppableProps['isValidContext'] = (info) => {
      return info.type === 'asset'
    }

    const checkForValidData: DroppableProps['isValidData'] = (info) => {
      const sourceAsset: Asset = info.data
      return info.type === 'asset' && isSourceAllowed(sourceAsset) && isAssetTargetAllowed(targetAsset)
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
