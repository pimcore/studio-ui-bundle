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

import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { Button } from 'antd'

interface DraggableItemProps {
  style?: React.CSSProperties
  top?: number
  left?: number
  children: React.ReactNode
}

export const DraggableItem = ({ style, top, left, children }: DraggableItemProps): React.JSX.Element => {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: 'draggable'
    })

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const craftedStyle = {
    ...style,
    // position: 'relative',
    zIndex: 1000,
    top,
    left,
    transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`,
    '--translate-x': `${transform?.x ?? 0}px`,
    '--translate-y': `${transform?.y ?? 0}px`
  } as React.CSSProperties

  return (
    <div>
      <Button
        { ...attributes }
        { ...listeners }
        aria-label="Draggable"
        data-cypress="draggable-item"
        ref={ setNodeRef }
        style={ { ...craftedStyle } }
      >
        Drag me
      </Button>

      {children}
    </div>
  )
}
