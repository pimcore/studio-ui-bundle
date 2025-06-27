/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { DragOverlay, type DragAndDropInfo } from '@sdk/components'
import { GlobalStyle } from './draggable.styles'
import ReactDOMServer from 'react-dom/server'
import { isNull } from 'lodash'

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
  const customEvent = new DragInfoChangeEvent(info)
  window.dispatchEvent(customEvent)
}

function Draggable (props: DraggableProps): React.JSX.Element {
  const updateOverlayPosition = (event: MouseEvent): void => {
    const overlay = document.getElementById('studio-dnd-overlay')
    if (isNull(overlay)) return

    if (event.screenX === 0 && event.screenY === 0) {
      overlay.style.setProperty('display', 'none')
      return
    }

    overlay.style.setProperty('display', 'block')
    overlay.style.setProperty('top', `${event.clientY}px`)
    overlay.style.setProperty('left', `${event.clientX}px`)
  }

  return useMemo(
    () => (
      <div
        draggable
        onDragEnd={ (e) => {
          e.stopPropagation()
          window.removeEventListener('drag', updateOverlayPosition)
          const overlay = document.getElementById('studio-dnd-overlay')
          if (!isNull(overlay)) {
            overlay.style.display = 'none'
          }
          document.body.classList.remove('dnd--dragging')

          dispatchChangeDragInfoEvent(null)
        } }
        onDragStart={ (e) => {
          e.stopPropagation()
          document.body.classList.add('dnd--dragging')

          const ghost = document.createElement('div')
          ghost.style.width = '1px'
          ghost.style.height = '1px'
          ghost.style.position = 'absolute'
          ghost.style.top = '-9999px'
          document.body.appendChild(ghost)
          e.dataTransfer.setDragImage(ghost, 0, 0)

          let overlay = document.getElementById('studio-dnd-overlay')
          if (isNull(overlay)) {
            overlay = document.createElement('div')
            overlay.id = 'studio-dnd-overlay'
            overlay.style.position = 'fixed'
            overlay.style.pointerEvents = 'none'
            overlay.style.zIndex = '9999'
            document.getElementById('global-overlay-container')?.appendChild(overlay)
          }
          overlay.style.display = 'none'
          overlay.innerHTML = ReactDOMServer.renderToString(<DragOverlay info={ props.info } />)

          window.addEventListener('drag', updateOverlayPosition)

          e.dataTransfer.effectAllowed = 'move'
          e.dataTransfer.dropEffect = 'none'
          e.dataTransfer.setData('application/json', JSON.stringify(props.info))

          setTimeout(() => {
            dispatchChangeDragInfoEvent(props.info)
          }, 200)
        } }
      >
        <GlobalStyle />
        {props.children}
      </div>
    ),
    [props.children]
  )
}

const DraggableMemo = React.memo(Draggable)

export { DraggableMemo as Draggable }
