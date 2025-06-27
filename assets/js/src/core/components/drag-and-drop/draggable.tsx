/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback } from 'react'
import ReactDOMServer from 'react-dom/server'
import { DragOverlay, type DragAndDropInfo } from '@sdk/components'
import { GlobalStyle } from './draggable.styles'
import { isNull } from 'lodash'
import { getIframeOffset } from '@sdk/utils'

interface DraggableProps {
  children: React.ReactNode
  info: DragAndDropInfo
}

export class DragInfoChangeEvent extends CustomEvent<DragAndDropInfo | null> {
  constructor (detail: DragAndDropInfo | null) {
    super('studioui:draggable:change-drag-info', { detail })
  }
}

const dispatchChangeDragInfoEvent = (info: DragAndDropInfo | null): void => {
  window.dispatchEvent(new DragInfoChangeEvent(info))
}

const getOrCreateGhostElement = (): HTMLDivElement => {
  let ghost = document.getElementById('studio-dnd-ghost') as HTMLDivElement | null
  if (isNull(ghost)) {
    ghost = document.createElement('div')
    ghost.id = 'studio-dnd-ghost'
    ghost.style.width = '1px'
    ghost.style.height = '1px'
    ghost.style.position = 'absolute'
    ghost.style.top = '-9999px'
    document.body.appendChild(ghost)
  }
  return ghost
}

const getOrCreateOverlay = (): HTMLDivElement => {
  let overlay = document.getElementById('studio-dnd-overlay') as HTMLDivElement | null
  if (isNull(overlay)) {
    overlay = document.createElement('div')
    overlay.id = 'studio-dnd-overlay'
    overlay.style.position = 'fixed'
    overlay.style.pointerEvents = 'none'
    overlay.style.zIndex = '9999'
    overlay.style.display = 'none'
    document.getElementById('global-overlay-container')?.appendChild(overlay)
  }
  return overlay
}

function Draggable ({ children, info }: DraggableProps): React.JSX.Element {
  const updateOverlayPosition = useCallback((event: MouseEvent): void => {
    const overlay = document.getElementById('studio-dnd-overlay')
    if (isNull(overlay)) return

    const { screenX, screenY, clientX, clientY } = event
    const iframeOffset = getIframeOffset(event.view ?? window)
    overlay.style.display = screenX === 0 && screenY === 0 ? 'none' : 'block'
    overlay.style.top = `${clientY + iframeOffset.y}px`
    overlay.style.left = `${clientX + iframeOffset.x}px`
  }, [])

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>): void => {
    e.stopPropagation()
    document.body.classList.add('dnd--dragging')

    const ghost = getOrCreateGhostElement()
    e.dataTransfer.setDragImage(ghost, 0, 0)

    const overlay = getOrCreateOverlay()
    overlay.innerHTML = ReactDOMServer.renderToString(<DragOverlay info={ info } />)

    window.addEventListener('drag', updateOverlayPosition)

    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.dropEffect = 'none'
    e.dataTransfer.setData('application/json', JSON.stringify(info))

    setTimeout(() => { dispatchChangeDragInfoEvent(info) }, 50)
  }

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>): void => {
    e.stopPropagation()
    window.removeEventListener('drag', updateOverlayPosition)

    const overlay = document.getElementById('studio-dnd-overlay')
    if (!isNull(overlay)) overlay.style.display = 'none'

    document.body.classList.remove('dnd--dragging')
    dispatchChangeDragInfoEvent(null)
  }

  return (
    <div
      draggable
      onDragEnd={ handleDragEnd }
      onDragStart={ handleDragStart }
      role="none"
    >
      <GlobalStyle />
      {children}
    </div>
  )
}

const DraggableMemo = React.memo(Draggable)

export { DraggableMemo as Draggable }
