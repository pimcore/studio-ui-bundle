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
import { isDndSourceAllowed, isDndTargetAllowed as isDndTargetPermissionAllowed } from '@Pimcore/modules/element/tree/node/with-droppable/permission-helper'
import { isUndefined } from 'lodash'

const isDndTargetAllowed = (asset: Asset): boolean => {
  return isDndTargetPermissionAllowed(asset) && asset.type === 'folder'
}

export const withDroppable = (Component: typeof TreeNode): typeof TreeNode => {
  const DroppableNodeContent = (props: TreeNodeProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const { move } = useCopyPaste('asset')

    if (props.metaData?.asset === undefined) {
      return (
        <Component { ...props } />
      )
    }

    const targetAsset: Asset = props.metaData.asset

    if (targetAsset.type !== 'folder') {
      return (
        <Component { ...props } />
      )
    }

    const onDrop: DroppableProps['onDrop'] = (info) => {
      const sourceAsset: Asset = info.data
      console.log('onDrop?', info, sourceAsset)
      if (!isDndSourceAllowed(sourceAsset) || !isDndTargetAllowed(targetAsset)) {
        return
      }
      console.log('onDrop', info, sourceAsset)
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
      if (targetAsset.id === 287) {
        console.log('checkForValidData', info, targetAsset, info.type === 'asset' && isDndSourceAllowed(sourceAsset) && isDndTargetAllowed(targetAsset))
      }

      return info.type === 'asset' && isDndSourceAllowed(sourceAsset) && isDndTargetAllowed(targetAsset)
    }

    return (
      <Component
        { ...props }
        ref={ ref }
        wrapNode={ (children) => (
          <Droppable
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
