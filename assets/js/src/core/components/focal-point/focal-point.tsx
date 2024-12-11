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

import React, { Children, isValidElement, useContext, useEffect } from 'react'
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  type PointerActivationConstraint,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { DraggableItem } from '@Pimcore/components/focal-point/components/draggable-item/draggable-item'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { FocalPointContext } from '@Pimcore/components/focal-point/context/focal-point-context'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

interface FocalPointProps {
  activationConstraint?: PointerActivationConstraint
  children: React.ReactNode
}

export const FocalPoint = ({ activationConstraint, children }: FocalPointProps): React.JSX.Element | null => {
  const Image = Children.only(children)
  const { id } = useContext(AssetContext)
  const focalPointContext = useContext(FocalPointContext)
  const { imageSettings, isLoading } = useAssetDraft(id)
  const mouseSensor = useSensor(MouseSensor, { activationConstraint })
  const touchSensor = useSensor(TouchSensor, { activationConstraint })
  const keyboardSensor = useSensor(KeyboardSensor, {})
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)
  const { addImageSettings, removeImageSetting } = useAssetDraft(id)

  if (focalPointContext === undefined) {
    trackError(new GeneralError('FocalPoint must be used within the FocalPointProvider'))
  }

  const {
    coordinates,
    setCoordinates,
    isActive,
    setIsActive,
    disabled,
    containerRef
  } = focalPointContext!

  const onLoad = (): void => {
    if (
      containerRef.current !== null &&
      imageSettings?.focalPoint !== undefined
    ) {
      const focalPoint = imageSettings.focalPoint
      const calcX = containerRef.current.clientWidth * Number(focalPoint.x) / 100
      const calcY = containerRef.current.clientHeight * Number(focalPoint.y) / 100

      setCoordinates({ x: calcX, y: calcY })
      setIsActive(true)
    }
  }

  const onToggleOff = (): void => {
    setCoordinates({ x: 0, y: 0 })
    removeImageSetting('focalPoint')
  }

  useEffect(() => {
    if (!isActive && !isLoading && containerRef.current !== null) {
      onToggleOff()
    }
  }, [isActive])

  if (!isValidElement(Image)) {
    trackError(new GeneralError('Children must be a valid react component'))

    return null
  }

  const ImageComponent = Image.type

  return (
    <DndContext
      modifiers={ [restrictToParentElement] }
      onDragEnd={ ({ delta }) => {
        const calcX = coordinates.x + delta.x
        const calcY = coordinates.y + delta.y

        setCoordinates({ x: calcX, y: calcY })

        if (containerRef.current !== null) {
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
        active={ isActive }
        disabled={ disabled }
        left={ coordinates.x }
        top={ coordinates.y }
      >
        <ImageComponent
          onLoad={ onLoad }
          { ...Image.props }
        />
      </DraggableItem>
    </DndContext>
  )
}
