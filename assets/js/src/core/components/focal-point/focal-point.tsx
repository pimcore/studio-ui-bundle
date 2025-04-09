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

import React, { Children, isValidElement, type MouseEvent, useContext, useState, useRef } from 'react'
import { isNull, isUndefined } from 'lodash'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { FocalPointContext } from '@Pimcore/components/focal-point/context/focal-point-context'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useStyles } from './focal-point.styles'

interface FocalPointProps {
  children: React.ReactNode
  zoom: number
}

export const FocalPoint = ({ children, zoom }: FocalPointProps): React.JSX.Element | null => {
  const Image = Children.only(children)
  const zoomFactor = zoom / 100

  if (!isValidElement(Image)) {
    trackError(new GeneralError('Children must be a valid react component'))

    return null
  }

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

      // Get the full size of the container, not just the visible area
      const fullContainerWidth = container.scrollWidth
      const fullContainerHeight = container.scrollHeight

      // Calculate mouse position considering scroll and zoom
      let x = (evt.clientX - containerBounds.left + scrollLeft) / zoomFactor
      let y = (evt.clientY - containerBounds.top + scrollTop) / zoomFactor

      const movingElementWidth = movingElement.offsetWidth / zoomFactor
      const movingElementHeight = movingElement.offsetHeight / zoomFactor

      x = Math.max(0, Math.min(x, fullContainerWidth / zoomFactor - movingElementWidth))
      y = Math.max(0, Math.min(y, fullContainerHeight / zoomFactor - movingElementHeight))

      setCoordinates({ x, y })
    }
  }

  const handleMouseUp = (): void => { setDragging(false) }

  const handleMouseDown = (): void => { setDragging(true) }

  const ImageComponent = Image.type

  return (
    <Flex align="center">
      <div
        className={ styles.container }
        onMouseMove={ handleMouseMove }
        onMouseUp={ handleMouseUp }
        ref={ containerRef }
        role="none"
      >
        <ImageComponent
          onLoad={ handleOnLoad }
          { ...Image.props }
        />
        { isActive && !isNull(containerRef.current) && (
          <IconButton
            aria-label="Draggable"
            className={ styles.draggableElement }
            data-cypress="draggable-item"
            hidden={ !isActive }
            icon={ { value: 'focal-point' } }
            onMouseDown={ handleMouseDown }
            ref={ movingElementRef }
            style={ {
              left: `${coordinates.x * zoomFactor}px`,
              top: `${coordinates.y * zoomFactor}px`
            } }
            type="dashed"
          />
        )}
      </div>
    </Flex>
  )
}
