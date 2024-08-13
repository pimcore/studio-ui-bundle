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

import React, { useState } from 'react'
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  type PointerActivationConstraint,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import type { Coordinates } from '@dnd-kit/utilities'
import { DraggableItem } from '@Pimcore/components/focal-point/draggable-item'

const defaultCoordinates = {
  x: 0,
  y: 0
}

interface FocalPointProps {
  activationConstraint?: PointerActivationConstraint
  children: React.ReactNode
}

export const FocalPoint = ({ activationConstraint, children }: FocalPointProps): React.JSX.Element => {
  const [{ x, y }, setCoordinates] = useState<Coordinates>(defaultCoordinates)
  const mouseSensor = useSensor(MouseSensor, { activationConstraint })
  const touchSensor = useSensor(TouchSensor, { activationConstraint })
  const keyboardSensor = useSensor(KeyboardSensor, {})
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)
  return (
    <DndContext
      onDragEnd={ ({ delta }) => {
        setCoordinates(({ x, y }) => {
          return {
            x: x + delta.x,
            y: y + delta.y
          }
        })
      } }
      sensors={ sensors }
    >
      <DraggableItem
        left={ x }
        top={ y }
      >
        {children}
      </DraggableItem>
    </DndContext>
  )
}
