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
import { useCopyPaste } from '@Pimcore/modules/element/actions/copy-paste/use-copy-paste'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { type DataObject } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { isAllowedToMove } from '@Pimcore/modules/element/tree/node/with-droppable/permission-helper'

export const withDroppable = (Component: typeof TreeNode): typeof TreeNode => {
  const DroppableNodeContent = (props: TreeNodeProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const { move } = useCopyPaste('data-object')

    if (props.metaData?.dataObject === undefined) {
      return (
        <Component { ...props } />
      )
    }

    const currentObject: DataObject = props.metaData.dataObject

    if (currentObject.type !== 'folder') {
      return (
        <Component { ...props } />
      )
    }

    const onDrop: DroppableProps['onDrop'] = (info) => {
      const droppedObject: DataObject = info.data

      if (!isAllowedToMove(currentObject)) {
        return
      }

      move({
        currentElement: { id: droppedObject.id, parentId: droppedObject.parentId },
        targetElement: { id: currentObject.id, parentId: currentObject.parentId }
      }).catch(() => {
        trackError(new GeneralError('Item could not be moved'))
      })
    }

    const checkForValidContext: DroppableProps['isValidContext'] = (context) => {
      if (isAllowedToMove(currentObject)) {
        return true
      }

      if (context.type === 'data-object') {
        return true
      }

      return false
    }

    const checkForValidData: DroppableProps['isValidData'] = (context) => {
      if (currentObject.type === 'folder') {
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
