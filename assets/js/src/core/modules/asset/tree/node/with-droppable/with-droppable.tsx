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

import { type TreeNode, type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import React, { forwardRef, type ReactElement, type Ref } from 'react'
import { Droppable, type DroppableProps } from '@Pimcore/components/drag-and-drop/droppable'
import { type Asset } from '../../../asset-api-slice-enhanced'
import { useCopyPaste } from '@Pimcore/modules/element/actions/copy-paste/use-copy-paste'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { isAllowedToMove } from '@Pimcore/modules/element/tree/node/with-droppable/permission-helper'

export const withDroppable = (Component: typeof TreeNode): typeof TreeNode => {
  const DroppableNodeContent = (props: TreeNodeProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const { move } = useCopyPaste('asset')

    if (props.metaData?.asset === undefined) {
      return (
        <Component { ...props } />
      )
    }

    const currentAsset: Asset = props.metaData.asset

    if (currentAsset.type !== 'folder') {
      return (
        <Component { ...props } />
      )
    }

    const onDrop: DroppableProps['onDrop'] = (info) => {
      const droppedAsset: Asset = info.data

      if (!isAllowedToMove(currentAsset)) {
        return
      }

      move({
        currentElement: { id: droppedAsset.id, parentId: droppedAsset.parentId },
        targetElement: { id: currentAsset.id, parentId: currentAsset.parentId }
      }).catch(() => {
        trackError(new GeneralError('Item could not be moved'))
      })
    }

    const checkForValidContext: DroppableProps['isValidContext'] = (context) => {
      if (context.type === 'asset') {
        return true
      }

      return false
    }

    const checkForValidData: DroppableProps['isValidData'] = (context) => {
      if (isAllowedToMove(currentAsset)) {
        return true
      }

      if (currentAsset.type === 'folder') {
        return true
      }

      return false
    }

    return (
      <Droppable
        isValidContext={ checkForValidContext }
        isValidData={ checkForValidData }
        onDrop={ onDrop }
      >
        <Component
          { ...props }
          ref={ ref }
        />
      </Droppable>
    )
  }

  return forwardRef(DroppableNodeContent)
}
