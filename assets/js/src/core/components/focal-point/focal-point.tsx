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

import React, { Children, isValidElement, useContext, useRef, useState } from 'react'
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
import { DraggableItem } from '@Pimcore/components/focal-point/components/draggable-item/draggable-item'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'

const defaultCoordinates = {
  x: 0,
  y: 0
}

interface FocalPointProps {
  activationConstraint?: PointerActivationConstraint
  children: React.ReactNode
}

export const FocalPoint = ({ activationConstraint, children }: FocalPointProps): React.JSX.Element => {
  const Image = Children.only(children)
  const { id } = useContext(AssetContext)
  const { imageSettings } = useAssetDraft(id!)
  const [{ x, y }, setCoordinates] = useState<Coordinates>(defaultCoordinates)
  const mouseSensor = useSensor(MouseSensor, { activationConstraint })
  const touchSensor = useSensor(TouchSensor, { activationConstraint })
  const keyboardSensor = useSensor(KeyboardSensor, {})
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)
  const containerRef = useRef<HTMLDivElement>(null)
  const { addImageSettings } = useAssetDraft(id!)

  if (!isValidElement(Image)) {
    throw new Error('Children must be a valid react component')
  }

  const ImageComponent = Image.type

  const onLoad = (): void => {
    if (containerRef.current !== null &&
      imageSettings?.focalPoint !== undefined) {
      const focalPoint = imageSettings.focalPoint
      const calcX = containerRef.current.clientWidth * Number(focalPoint.x) / 100
      const calcY = containerRef.current.clientHeight * Number(focalPoint.y) / 100

      setCoordinates({ x: calcX, y: calcY })
    }
  }

  return (
    <DndContext
      modifiers={ [restrictToParentElement] }
      onDragEnd={ ({ delta }) => {
        const calcX = x + delta.x
        const calcY = y + delta.y

        setCoordinates({ x: calcX, y: calcY })

        if (containerRef.current !== null) {
          console.log('here')
          addImageSettings({
            focalPoint: {
              x: Number(Number(calcX * 100 / containerRef?.current.clientWidth).toPrecision(8)),
              y: Number(Number(calcY * 100 / containerRef?.current.clientHeight).toPrecision(8))
            }
          })
        }
      } }
      sensors={ sensors }
    >
      <DraggableItem
        containerRef={ containerRef }
        left={ x }
        top={ y }
      >
        <ImageComponent
          onLoad={ onLoad }
          { ...Image.props }
        />
      </DraggableItem>
    </DndContext>
  )
}
