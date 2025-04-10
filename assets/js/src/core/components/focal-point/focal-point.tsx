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

import React, { type MouseEvent, useContext, useState, useRef } from 'react'
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

const HALF_DIVISOR = 2
const PERCENT_MULTIPLIER = 100

export const FocalPoint = ({ zoom, imageSrc }: FocalPointProps): React.JSX.Element | null => {
  const [dragging, setDragging] = useState<boolean>(false)
  const movingElementRef = useRef<HTMLDivElement>(null)

  const { id } = useContext(AssetContext)
  const focalPointContext = useContext(FocalPointContext)

  const { imageSettings } = useAssetDraft(id)
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

  const handleOnLoad = (): void => {
    if (!isNull(containerRef.current) && !isUndefined(imageSettings?.focalPoint)) {
      const focalPoint = imageSettings.focalPoint
      const calcX = containerRef.current.clientWidth * Number(focalPoint.x) / 100
      const calcY = containerRef.current.clientHeight * Number(focalPoint.y) / 100

      setCoordinates({ x: calcX, y: calcY })
      setIsActive(true)
    }
  }

  const handleMouseMove = (evt: MouseEvent): void => {
    if (isNull(containerRef.current) || isNull(movingElementRef.current) || disabled) return

    if (dragging) {
      const container = containerRef.current
      const movingElement = movingElementRef.current

      const containerBounds = container.getBoundingClientRect()

      const scrollLeft = container.scrollLeft
      const scrollTop = container.scrollTop

      const fullWidth = container.scrollWidth
      const fullHeight = container.scrollHeight

      const mouseXPercent = ((evt.clientX - containerBounds.left + scrollLeft) / fullWidth) * PERCENT_MULTIPLIER
      const mouseYPercent = ((evt.clientY - containerBounds.top + scrollTop) / fullHeight) * PERCENT_MULTIPLIER

      const movingElementWidthPercent = (movingElement.offsetWidth / fullWidth) * PERCENT_MULTIPLIER
      const movingElementHeightPercent = (movingElement.offsetHeight / fullHeight) * PERCENT_MULTIPLIER

      const maxXPercent = PERCENT_MULTIPLIER - movingElementWidthPercent
      const maxYPercent = PERCENT_MULTIPLIER - movingElementHeightPercent

      const clampedXPercent = Math.max(0, Math.min(mouseXPercent, maxXPercent))
      const clampedYPercent = Math.max(0, Math.min(mouseYPercent, maxYPercent))

      const percentX = clampedXPercent + movingElementWidthPercent / HALF_DIVISOR
      const percentY = clampedYPercent + movingElementHeightPercent / HALF_DIVISOR

      setCoordinates({ x: percentX, y: percentY })
    }
  }

  const handleMouseUp = (): void => { setDragging(false) }

  const handleMouseDown = (): void => { setDragging(true) }

  return (
    <div
      className={ styles.container }
      onMouseMove={ handleMouseMove }
      onMouseUp={ handleMouseUp }
      role="none"
      style={ {
        width: `${zoom}%`,
        height: zoom > 100 ? 'auto' : '100%'
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
