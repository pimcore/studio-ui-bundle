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
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { FocalPointContext } from '@Pimcore/components/focal-point/context/focal-point-context'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { Icon } from '@Pimcore/components/icon/icon'
import { Flex } from '@Pimcore/components/flex/flex'

interface FocalPointProps {
  children: React.ReactNode
}

export const FocalPoint = ({ children }: FocalPointProps): React.JSX.Element | null => {
  const Image = Children.only(children)

  const movingElementRef = useRef<HTMLDivElement>(null)

  const { id } = useContext(AssetContext)
  const focalPointContext = useContext(FocalPointContext)

  const { imageSettings } = useAssetDraft(id)

  const [dragging, setDragging] = useState<boolean>(false)

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

  if (!isValidElement(Image)) {
    trackError(new GeneralError('Children must be a valid react component'))

    return null
  }

  const handleOnLoad = (): void => {
    if (containerRef.current !== null && imageSettings?.focalPoint !== undefined) {
      const focalPoint = imageSettings.focalPoint
      const calcX = containerRef.current.clientWidth * Number(focalPoint.x) / 100
      const calcY = containerRef.current.clientHeight * Number(focalPoint.y) / 100

      setCoordinates({ x: calcX, y: calcY })
      setIsActive(true)
    }
  }

  const handleMouseMove = (evt: MouseEvent): void => {
    if (containerRef.current === null || movingElementRef.current === null || disabled) return

    if (dragging) {
      const containerBounds = containerRef.current.getBoundingClientRect()
      const movingElementBounds = movingElementRef.current.getBoundingClientRect()

      const movingElementWidth = movingElementBounds.width
      const movingElementHeight = movingElementBounds.height

      let x = evt.clientX - containerBounds.left
      let y = evt.clientY - containerBounds.top

      x = Math.max(0, Math.min(x, containerBounds.width - movingElementWidth))
      y = Math.max(0, Math.min(y, containerBounds.height - movingElementHeight))

      setCoordinates({ x, y })
    }
  }

  const handleMouseUp = (): void => { setDragging(false) }

  const handleMouseDown = (): void => { setDragging(true) }

  const ImageComponent = Image.type

  return (
    <Flex align={ 'center' }>
      <div
        onMouseMove={ handleMouseMove }
        onMouseUp={ handleMouseUp }
        ref={ containerRef }
        role="none"
        style={ { height: 'fit-content', position: 'relative' } }
      >
        <ImageComponent
          onLoad={ handleOnLoad }
          { ...Image.props }
        />
        { isActive && containerRef.current !== null && (
        <div
          onMouseDown={ handleMouseDown }
          ref={ movingElementRef }
          role="none"
          style={ {
            position: 'absolute',
            left: `${coordinates.x}px`,
            top: `${coordinates.y}px`
          } }
        >
          <Icon
            options={ { width: '16px', height: '16px' } }
            value={ 'focal-point' }
          />
        </div>
        )}
      </div>
    </Flex>
  )
}
