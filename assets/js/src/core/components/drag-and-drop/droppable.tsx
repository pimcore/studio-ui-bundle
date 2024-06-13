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

import React, { Children, type ReactNode, isValidElement, useContext, useEffect, useState } from 'react'
import { type DragAndDropInfo, DragAndDropInfoContext } from './context-provider'
import { useDroppable } from '@dnd-kit/core'
import { useStyle } from './droppable.styles'
import { DroppableContextProvider } from './droppable-context-provider'
import { uuid } from '@Pimcore/utils/uuid'

export interface DroppableContentProps {
  isDragActive: boolean
  isOver: boolean
  isValid: boolean
}

export interface DroppableProps {
  className?: string
  children: ReactNode
  isValidContext: boolean | ((info: DragAndDropInfo) => boolean)
  isValidData?: ((info: DragAndDropInfo) => boolean)
  onDrop: (info: DragAndDropInfo) => void
}

export const Droppable = (props: DroppableProps): React.JSX.Element => {
  const { styles } = useStyle()
  const context = useContext(DragAndDropInfoContext)
  const [isValidContext, setIsValidContext] = useState(false)
  const [id] = useState(uuid())
  let isValidData = true

  if (typeof props.isValidData === 'function') {
    isValidData = props.isValidData(context.getInfo())
  }

  const { isOver, setNodeRef } = useDroppable({
    id
  })

  if (isValidContext && isOver && !isValidData) {
    document.body.classList.add('dnd--invalid')
  } else {
    document.body.classList.remove('dnd--invalid')
  }

  useEffect(() => {
    if (typeof props.isValidContext !== 'boolean') {
      setIsValidContext(props.isValidContext(context.getInfo()))
    } else {
      setIsValidContext(props.isValidContext as boolean)
    }

    context.callbackRegistry!.current.register(id, () => {
      if (!isValidData || !isValidContext || !isOver) return

      props.onDrop(context.getInfo())
    })

    return () => {
      context.callbackRegistry!.current.unregister(id)
    }
  }, [context, isOver])

  const Child = Children.only(props.children)

  if (!isValidElement(Child)) {
    throw new Error('Children must be a valid react component')
  }

  const Component = Child.type

  return (
    <div className={ [props.className, styles.droppable].join(' ') }>
      <DroppableContextProvider value={ { isDragActive: isValidContext, isOver: isOver && isValidContext, isValid: isValidData && isValidContext } }>
        <Component
          { ...Child.props }
          ref={ setNodeRef }
        />
      </DroppableContextProvider>
    </div>
  )
}
