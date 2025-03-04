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

import React, { type ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { type DragAndDropInfo, DragAndDropInfoContext } from './context-provider'
import { type UniqueIdentifier, useDroppable } from '@dnd-kit/core'
import { uuid } from '@Pimcore/utils/uuid'
import { BaseDroppable } from '@Pimcore/components/drag-and-drop/droppable/base-droppable'

export interface DroppableProps {
  className?: string
  children: ReactNode
  variant?: 'default' | 'outline'
  shape?: 'round' | 'angular'
  isValidContext: boolean | ((info: DragAndDropInfo) => boolean)
  isValidData?: ((info: DragAndDropInfo) => boolean)
  onDrop: (info: DragAndDropInfo) => void
  onSort?: (info: DragAndDropInfo, dragId: UniqueIdentifier, dropId: UniqueIdentifier) => void
}

export const Droppable = (props: DroppableProps): React.JSX.Element | null => {
  const context = useContext(DragAndDropInfoContext)
  const [isValidContext, setIsValidContext] = useState(false)
  const [id] = useState(uuid())
  let isValidData = true

  const info = useMemo(() => context.getInfo(), [context])

  if (typeof props.isValidData === 'function') {
    isValidData = props.isValidData(info)
  }

  const { isOver, setNodeRef } = useDroppable({
    id,
    disabled: context.getInfo().sortable !== undefined
  })

  if (isValidContext && isOver && !isValidData) {
    document.body.classList.add('dnd--invalid')
  } else {
    document.body.classList.remove('dnd--invalid')
  }

  useEffect(() => {
    if (typeof props.isValidContext !== 'boolean') {
      setIsValidContext(props.isValidContext(info))
    } else {
      setIsValidContext(props.isValidContext as boolean)
    }

    context.callbackRegistry!.current.register(id, (event) => {
      if (isValidContext && isValidData && info.sortable !== undefined) {
        if (event.over === null) {
          return
        }

        props.onSort?.(info, event.active.id, event.over.id)
        return
      }
      if (!isValidData || !isValidContext || !isOver) return

      props.onDrop(info)
    })

    return () => {
      context.callbackRegistry!.current.unregister(id)
    }
  }, [context, isOver])

  return (
    <BaseDroppable
      className={ props.className }
      isOver={ isOver }
      isValidContext={ isValidContext }
      isValidData={ isValidData }
      setNodeRef={ setNodeRef }
      shape={ props.shape }
      variant={ props.variant }
    >
      { props.children }
    </BaseDroppable>
  )
}
