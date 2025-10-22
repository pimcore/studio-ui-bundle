/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type MutableRefObject, forwardRef, useContext } from 'react'
import { useStyle } from './dnd-demo-droppable-content.styles'
import { droppableContext } from '@sdk/components'

interface DNDDemoDroppableContentProps {
  value: string
  title: string
}

export const DNDDemoDroppableContent = forwardRef(function DNDDemoDroppableContent (props: DNDDemoDroppableContentProps, ref: MutableRefObject<HTMLDivElement>): React.JSX.Element {
  const { styles } = useStyle()
  const { isOver, isValid, isDragActive, hasValidDrop } = useContext(droppableContext)
  const classes: string[] = [styles.content]

  if (isDragActive) {
    classes.push('dnd--drag-active')
  }

  if ((isOver) && (isValid)) {
    classes.push('dnd--drag-valid')
  }

  if ((isOver) && (!isValid)) {
    classes.push('dnd--drag-error')
  }

  if (hasValidDrop === true) {
    classes.push('dnd--has-valid-drop')
  }

  return (
    <div
      className={ classes.join(' ') }
      ref={ ref }
    >
      <h4>{props.title}</h4>
      <p>Value: {props.value}</p>
      {(hasValidDrop === true) && <p>✓ Valid drop available</p>}
    </div>
  )
})
