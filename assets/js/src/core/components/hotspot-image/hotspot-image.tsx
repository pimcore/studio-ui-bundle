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

import React, { useState, useRef, useEffect, type MouseEvent } from 'react'
import { useStyle } from './hotspot-image.styles'
import { Icon } from '@Pimcore/components/icon/icon'
import { Popover } from 'antd'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import {
  convertHotspotsToPixel
} from '@Pimcore/components/hotspot-image/utils/calculate-dimensions'
import { dragItem } from '@Pimcore/components/hotspot-image/utils/drag'
import { type Coordinates, type Rectangle } from '@Pimcore/components/hotspot-image/types/types'
import { resizeItem } from '@Pimcore/components/hotspot-image/utils/resize'

export interface IStyleOptions {
  hotspot: {
    width: number
    height: number
    resizeBorderSize: number
    minSize: number
    icon: any
  }
  marker: {
    width: number
    height: number
    icon: any
  }
}

export const defaultStyleOptions = {
  hotspot: {
    width: 100,
    height: 80,
    resizeBorderSize: 10,
    minSize: 24,
    icon: null
  },
  marker: {
    width: 24,
    height: 24,
    icon: 'markerPin02'
  }
}

export interface IHotspot {
  id: number
  x: number
  y: number
  width: number
  height: number
  type: string
}

interface IHotspotImage {
  src: string
  styleOptions?: IStyleOptions
  data?: IHotspot[]
  onRemove: (id: number) => void
  onEdit?: (id: number) => void
  onUpdate: (item: IHotspot) => void
}

export const HotspotImage = ({ src, data, styleOptions = defaultStyleOptions, onRemove, onEdit, onUpdate }: IHotspotImage): JSX.Element => {
  const { styles } = useStyle()
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)
  const imageRef = useRef<HTMLImageElement | null>(null)

  const [items, setItems] = useState<IHotspot[]>(data ?? [])
  useEffect((): void => {
    setItems(data ?? [])
  }, [data?.length])

  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [dragging, setDragging] = useState<boolean>(false)
  const [resizeDirection, setResizeDirection] = useState<string | null>(null)
  const [dragStart, setDragStart] = useState<Coordinates>({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState<Rectangle>({ width: 0, height: 0, x: 0, y: 0 })
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (evt: MouseEvent, hotspot: IHotspot): void => {
    const rect = evt.currentTarget.getBoundingClientRect()
    const mouseX = evt.clientX - rect.left
    const mouseY = evt.clientY - rect.top

    const nearLeftEdge = mouseX < styleOptions[hotspot.type].resizeBorderSize
    const nearRightEdge = mouseX > rect.width - styleOptions[hotspot.type].resizeBorderSize
    const nearTopEdge = mouseY < styleOptions[hotspot.type].resizeBorderSize
    const nearBottomEdge = mouseY > rect.height - styleOptions[hotspot.type].resizeBorderSize

    if (hotspot.type === 'hotspot' && (nearLeftEdge || nearRightEdge || nearTopEdge || nearBottomEdge)) {
      let direction = ''
      if (nearTopEdge) direction += 'n'
      if (nearBottomEdge) direction += 's'
      if (nearLeftEdge) direction += 'w'
      if (nearRightEdge) direction += 'e'

      setResizeDirection(direction)
      setResizeStart({ x: evt.clientX, y: evt.clientY, width: hotspot.width, height: hotspot.height })
    } else {
      setDragging(true)
      setDragStart({ x: mouseX, y: mouseY })
    }

    setPopoverOpen(false)
    setSelectedId(hotspot.id)
    evt.stopPropagation()
  }

  const handleMouseMove = (evt: MouseEvent): void => {
    if (selectedId === null || containerRef.current === null) return
    const containerBounds = containerRef.current.getBoundingClientRect()
    const hotspotIndex = items.findIndex(h => h.id === selectedId)
    const dx = evt.clientX - resizeStart.x
    const dy = evt.clientY - resizeStart.y

    if (dragging) {
      setItems(dragItem(evt, dragStart, containerBounds, items, hotspotIndex))
    } else if (resizeDirection !== null) {
      setItems(resizeItem(evt, resizeStart, resizeDirection, containerBounds, items, hotspotIndex, Number(styleOptions[items[hotspotIndex].type].minSize), dx, dy))
    }
  }

  const handleMouseUp = (): void => {
    setDragging(false)
    setResizeDirection(null)

    const updatedItem = items.find(h => h.id === selectedId)
    if (updatedItem !== undefined) {
      onUpdate(updatedItem)
    }
  }

  return (
    <div
      className={ ['hotspot-image', styles.hotspotImage].join(' ') }
      onMouseMove={ handleMouseMove }
      onMouseUp={ handleMouseUp }
      ref={ containerRef }
      role="none"
    >
      <img
        alt=""
        className={ 'hotspot-image__image' }
        onLoad={ () => {
          if (imageRef.current !== null) {
            setImageLoaded(true)
          }
        } }
        ref={ imageRef }
        src={ src }
      />
      { imageLoaded && containerRef.current !== null && (
        convertHotspotsToPixel(items, containerRef.current.getBoundingClientRect()).map(hotspot => (
          <Popover
            arrow={ false }
            content={
              <>
                {onEdit !== undefined
                  ? (
                    <IconTextButton
                      icon={ { value: 'plus-square' } }
                      onClick={ () => { onEdit(hotspot.id) } }
                      type="default"
                    >Todo edit</IconTextButton>
                    )
                  : null}
                <IconButton
                  icon={ { value: 'open-folder' } }
                  onClick={ () => { console.log('TODO') } }
                  type={ 'link' }
                />
                <IconButton
                  icon={ { value: 'trash-04' } }
                  onClick={ () => { onRemove(hotspot.id) } }
                  type={ 'link' }
                />
                <IconButton
                  icon={ { value: 'dots-horizontal' } }
                  type={ 'link' }
                />
              </>
                      }
            key={ hotspot.id }
            onOpenChange={ (open) => { setPopoverOpen(open) } }
            open={ popoverOpen && selectedId === hotspot.id }
            overlayClassName={ [styles.Popover].join(' ') }
            trigger={ ['contextMenu'] }
          >
            <button
              className={ `hotspot-image__item ${hotspot.type === 'marker' ? 'hotspot-image__item--marker' : ''}` }
              key={ hotspot.id }
              onMouseDown={ evt => { handleMouseDown(evt, hotspot) } }
              style={ {
                position: 'absolute',
                left: `${hotspot.x}px`,
                top: `${hotspot.y}px`,
                width: `${hotspot.width}px`,
                height: `${hotspot.height}px`
              } }
              type={ 'button' }
            >
              {styleOptions[hotspot.type]?.icon !== undefined && styleOptions[hotspot.type]?.icon !== null
                ? (
                  <Icon value={ styleOptions[hotspot.type].icon } />
                  )
                : null}
            </button>
          </Popover>
        ))
      )}
    </div>
  )
}
