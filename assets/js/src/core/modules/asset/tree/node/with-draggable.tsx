/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactElement, type Ref, type ComponentProps, forwardRef } from 'react'
import { Draggable } from '@Pimcore/components/drag-and-drop/draggable'
import { type Asset } from '../../asset-api-slice-enhanced'
import { type TreeNode } from '@Pimcore/components/element-tree/node/tree-node'

export const withDraggable = (Component: typeof TreeNode): typeof TreeNode => {
  const DraggableNodeContent = (props: ComponentProps<typeof TreeNode>, ref: Ref<HTMLDivElement>): ReactElement => {
    const metaData: Asset | undefined = props.metaData?.asset

    if (props.metaData?.asset === undefined) {
      return (
        <Component
          { ...props }
          ref={ ref }
        />
      )
    }

    return (
      <Draggable
        info={ { icon: metaData!.icon!.value, title: metaData!.filename!, type: 'asset', data: { ...metaData } } }
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
