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

import React, { useContext, useEffect, useRef, useState } from 'react'
import { isNull, isUndefined } from 'lodash'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { FocalPointContext } from '@Pimcore/components/focal-point/context/focal-point-context'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useStyles } from './focal-point.styles'
import { PimcoreImage } from '@Pimcore/components/pimcore-image/pimcore-image'

interface FocalPointProps {
  imageSrc: string
  zoom: number
}

const PERCENT_MULTIPLIER = 100

export const FocalPoint = ({ zoom, imageSrc }: FocalPointProps): React.JSX.Element | null => {
  const [dragging, setDragging] = useState<boolean>(false)

  const draggingRef = useRef(dragging)
  const movingElementRef = useRef<HTMLDivElement>(null)

  useEffect(() => { draggingRef.current = dragging }, [dragging])

  const { id } = useContext(AssetContext)
  const focalPointContext = useContext(FocalPointContext)

  const { isLoading, imageSettings, addImageSettings, removeImageSetting } = useAssetDraft(id)
  const { styles } = useStyles()

  if (isUndefined(focalPointContext)) {
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

  console.log('------>>>>>: ', coordinates)

  useEffect(() => {
    if (!isActive && !isLoading && containerRef.current !== null) {
      removeImageSetting('focalPoint')
    }
  }, [isActive])

  const handleOnLoad = (): void => {
    if (!isNull(containerRef.current) && !isUndefined(imageSettings?.focalPoint)) {
      const focalPoint = imageSettings.focalPoint

      setCoordinates({ x: focalPoint.x, y: focalPoint.y })
      setIsActive(true)
    }
  }

  const handleMouseMove = (evt: MouseEvent): void => {
    if (isNull(containerRef.current) || isNull(movingElementRef.current) || disabled) return

    if (draggingRef.current) {
      const container = containerRef.current.firstElementChild!
      const movingElement = movingElementRef.current

      const containerBounds = container.getBoundingClientRect()
      const movingElementBounds = movingElement.getBoundingClientRect()

      const movingElementHalfWidth = movingElementBounds.width / 2
      const movingElementHalfHeight = movingElementBounds.height / 2

      const fullWidth = container.clientWidth ?? 0
      const fullHeight = container.clientHeight ?? 0

      const minX = containerBounds.left + movingElementHalfWidth
      const maxX = containerBounds.left + containerBounds.width - movingElementHalfWidth
      const minY = containerBounds.top + movingElementHalfHeight
      const maxY = containerBounds.top + containerBounds.height - movingElementHalfHeight

      const positionX = Math.min(Math.max(minX, evt.clientX), maxX)
      const positionY = Math.min(Math.max(minY, evt.clientY), maxY)

      const percentX = ((positionX - containerBounds.left) / fullWidth) * PERCENT_MULTIPLIER
      const percentY = ((positionY - containerBounds.top) / fullHeight) * PERCENT_MULTIPLIER

      const updatedCoordinates = { x: percentX, y: percentY }

      setCoordinates(updatedCoordinates)
      addImageSettings({ focalPoint: updatedCoordinates })
    }
  }

  const handleMouseUp = (): void => { setDragging(false) }

  const handleMouseDown = (): void => { setDragging(true) }

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      className={ styles.container }
      style={ {
        width: `${zoom}%`
      } }
    >
      <PimcoreImage
        alt="car"
        onLoad={ handleOnLoad }
        src={ imageSrc }
        wrapperClassName={ styles.imageContainer }
      />
      {isActive && !isNull(containerRef.current) && (
        <IconButton
          aria-label="Draggable"
          className={ styles.draggableElement }
          data-cypress="draggable-item"
          hidden={ !isActive }
          icon={ { value: 'focal-point' } }
          onMouseDown={ handleMouseDown }
          ref={ movingElementRef }
          style={ {
            left: `${coordinates.x}%`,
            top: `${coordinates.y}%`
          } }
          type="dashed"
        />
      )}
    </div>
  )
}
