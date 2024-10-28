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

import React, { type ElementType, type ReactElement } from 'react'
import { Draggable } from '@Pimcore/components/drag-and-drop/draggable'
import { type DataObject } from '../../data-object-api-slice-enhanced'
import { type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'

export const withDraggable = (Component: ElementType<TreeNodeProps>): ElementType<TreeNodeProps> => {
  const DraggableNodeContent = (props: TreeNodeProps): ReactElement => {
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
        <Component { ...props } />
      </Draggable>
    )
  }

  return DraggableNodeContent
}
