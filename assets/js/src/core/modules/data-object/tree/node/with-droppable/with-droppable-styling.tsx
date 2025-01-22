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
import { useStyles } from './with-droppable.styles'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import cn from 'classnames'

export const withDroppableStyling = (Component: typeof TreeNode): typeof TreeNode => {
  const DroppableStyling = (props: TreeNodeProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const { styles } = useStyles()
    const { isOver, isValid } = useDroppable()

    const classNames = cn(
      'with-droppable-styling',
      {
        [styles.withDroppable]: isOver && isValid
      }
    )

    return (
      <div className={ classNames }>
        <Component
          { ...props }
          ref={ ref }
        />
      </div>
    )
  }

  return forwardRef(DroppableStyling)
}
