/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { forwardRef, type Ref, type ReactElement } from 'react'
import { Draggable } from '@Pimcore/components/drag-and-drop/draggable'
import { type DataObject } from '../../data-object-api-slice-enhanced'
import { type TreeNode, type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'

export const withDraggable = (Component: typeof TreeNode): typeof TreeNode => {
  const DraggableNodeContent = (props: TreeNodeProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const metaData: DataObject | undefined = props.metaData.dataObject

    if (props.metaData?.dataObject === undefined) {
      return (
        <Component { ...props } />
      )
    }

    return (
      <Draggable
        info={ { icon: metaData!.icon!.value, title: metaData!.key!, type: 'data-object', data: { ...metaData } } }
      >
        <Component
          { ...props }
          ref={ ref }
        />
      </Draggable>
    )
  }

  return forwardRef(DraggableNodeContent)
}
