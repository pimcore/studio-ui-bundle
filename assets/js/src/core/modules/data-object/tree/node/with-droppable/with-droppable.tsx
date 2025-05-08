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
import { useCopyPaste } from '@Pimcore/modules/element/actions/copy-paste/use-copy-paste'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { type DataObject } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { isAllowedToMove } from '@Pimcore/modules/element/tree/node/with-droppable/permission-helper'
import { isUndefined } from 'lodash'

export const withDroppable = (Component: typeof TreeNode): typeof TreeNode => {
  const DroppableNodeContent = (props: TreeNodeProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const { move } = useCopyPaste('data-object')

    if (props.metaData?.dataObject === undefined) {
      return (
        <Component { ...props } />
      )
    }

    const currentObject: DataObject = props.metaData.dataObject

    if (!isAllowedToMove(currentObject)) {
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
      return context.type === 'data-object'
    }

    const checkForValidData: DroppableProps['isValidData'] = (context) => {
      return isAllowedToMove(currentObject)
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
