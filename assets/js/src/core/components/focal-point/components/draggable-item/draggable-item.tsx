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

import React, { useContext } from 'react'
import { useDraggable, type UseDraggableArguments } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { useStyle } from './draggable-item.styles'
import { FocalPointContext } from '@Pimcore/components/focal-point/context/focal-point-context'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'

interface DraggableItemProps {
  top?: number
  left?: number
  children: React.ReactNode
  disabled: NonNullable<UseDraggableArguments['disabled']>
  active: boolean
}

export const DraggableItem = ({ top, left, children, disabled, active = false }: DraggableItemProps): React.JSX.Element => {
  const { containerRef } = useContext(FocalPointContext)!
  const { styles } = useStyle()
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: 'draggable',
      disabled
    })

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const craftedStyle = {
    position: 'absolute',
    zIndex: 1000,
    top,
    left,
    transform: CSS.Transform.toString(transform)
  } as React.CSSProperties

  return (
    <div
      className={ styles.draggableContainer }
      ref={ containerRef }
    >
      {active && (
        <IconButton
          hidden={ !active }
          icon={ { value: 'focal-point' } }
          type={ 'dashed' }
          { ...attributes }
          { ...listeners }
          aria-label="Draggable"
          className={ styles.draggableItem }
          data-cypress="draggable-item"
          ref={ setNodeRef }
          style={ { ...craftedStyle } }
        />
      )}

      {children}
    </div>
  )
}
