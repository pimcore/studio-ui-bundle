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
