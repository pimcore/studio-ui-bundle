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
import { type Document } from '@Pimcore/modules/document/document-api-slice-enhanced'
import { isDndSourceAllowed, isDndTargetAllowed } from '@Pimcore/modules/element/tree/node/with-droppable/permission-helper'
import { isUndefined } from 'lodash'

export const withDroppable = (Component: typeof TreeNode): typeof TreeNode => {
  const DroppableNodeContent = (props: TreeNodeProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const { move } = useCopyPaste('document')

    if (props.metaData?.document === undefined) {
      return (
        <Component { ...props } />
      )
    }

    const targetDocument: Document = props.metaData.document

    if (!isDndSourceAllowed(targetDocument)) {
      return (
        <Component { ...props } />
      )
    }

    const onDrop: DroppableProps['onDrop'] = (info) => {
      const sourceDocument: Document = info.data

      if (!isDndSourceAllowed(sourceDocument) || !isDndTargetAllowed(targetDocument)) {
        return
      }

      move({
        currentElement: { id: sourceDocument.id, parentId: sourceDocument.parentId },
        targetElement: { id: targetDocument.id, parentId: targetDocument.parentId }
      }).catch(() => {
        trackError(new GeneralError('Item could not be moved'))
      })
    }

    const checkForValidContext: DroppableProps['isValidContext'] = (context) => {
      return context.type === 'document'
    }

    const checkForValidData: DroppableProps['isValidData'] = (info) => {
      const sourceDocument: Document = info.data
      return info.type === 'document' && isDndSourceAllowed(sourceDocument) && isDndTargetAllowed(targetDocument)
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
