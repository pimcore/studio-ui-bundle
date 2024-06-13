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

import React, { type MutableRefObject, forwardRef, useContext } from 'react'
import { useStyle } from './dnd-demo-droppable-content.styles'
import { droppableContext } from '../droppable-context-provider'

interface DNDDemoDroppableContentProps {
  value: string
  title: string
}

export const DNDDemoDroppableContent = forwardRef(function DNDDemoDroppableContent (props: DNDDemoDroppableContentProps, ref: MutableRefObject<HTMLDivElement>): React.JSX.Element {
  const { styles } = useStyle()
  const { isOver, isValid, isDragActive } = useContext(droppableContext)
  const classes: string[] = [styles.content]

  if (isDragActive) {
    classes.push('dnd--drag-active')
  }

  if (isOver && isValid) {
    classes.push('dnd--drag-valid')
  }

  if (isOver && !isValid) {
    classes.push('dnd--drag-error')
  }

  return (
    <div
      className={ classes.join(' ') }
      ref={ ref }
    >
      <h4>{props.title}</h4>
      <p>Value: {props.value}</p>
    </div>
  )
})
