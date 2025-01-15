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

import React, { type MutableRefObject, createContext, useRef, type ReactNode, useMemo } from 'react'
import { closestCorners, DndContext, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core'
import { type Callback, CallbackRegistry, type ICallbackRegistry } from './callback-registry'
import { DragOverlay as StyledDragOverlay } from './drag-overlay'
import { boundingRectIntersection } from './collision-detection/boundingRectIntersection'

export interface DragAndDropInfo {
  type: string
  icon: string
  title: string
  data: any
  sortable?: any
}

const defaultInfo: DragAndDropInfo = { type: 'unknown', data: null, title: '', icon: 'widget' }

interface IDragAndDropInfoContext extends DragAndDropInfo {
  setInfo: (info: DragAndDropInfo) => void
  removeInfo: () => void
  getInfo: () => DragAndDropInfo
  callbackRegistry?: MutableRefObject<ICallbackRegistry>
}

export const DragAndDropInfoContext = createContext<IDragAndDropInfoContext>({
  ...defaultInfo,
  setInfo: (info: DragAndDropInfo): void => {},
  getInfo: (): DragAndDropInfo => (defaultInfo),
  removeInfo: (): void => {}
})

export const DragAndDropContextProvider = ({ children }: { children: ReactNode }): React.JSX.Element => {
  const [info, setInfo] = React.useState<DragAndDropInfo>(defaultInfo)
  const callbackRegistry = useRef<ICallbackRegistry>(new CallbackRegistry())
  const isSortableInfo = Object.keys(info).includes('sortable')
  const collisionDetection = isSortableInfo ? closestCorners : boundingRectIntersection

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 5 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { distance: 5 } })

  const sensors = useSensors(mouseSensor, touchSensor)

  function setContext (info: DragAndDropInfo): void {
    setInfo(info)
    document.body.classList.add('dnd--dragging')
  }

  function removeContext (): void {
    setInfo(defaultInfo)
    document.body.classList.remove('dnd--dragging')
  }

  function getContext (): DragAndDropInfo {
    return info
  }

  function onDragStart (event: DragStartEvent): void {
    const data = event.active.data.current as DragAndDropInfo
    setContext(data)
  }

  function onDragCancel (): void {
    removeContext()
  }

  function onDragEnd (event: DragEndEvent): void {
    // @ts-expect-error - TS doesn't like the type of the event
    Object.entries(callbackRegistry.current.getCallbacks()).forEach((callback: Callback) => {
      callback[1](event)
    })

    removeContext()
  }

  return useMemo(() => (
    <DndContext
      autoScroll={ false }
      collisionDetection={ collisionDetection }
      onDragCancel={ onDragCancel }
      onDragEnd={ onDragEnd }
      onDragStart={ onDragStart }
      sensors={ sensors }
    >
      { info.sortable === undefined && (
      <DragOverlay
        className='dnd-overlay'
        dropAnimation={ null }
        style={ { width: 'max-content', zIndex: 1001 } }
      >
        <StyledDragOverlay info={ info } />
      </DragOverlay>
      )}

      <DragAndDropInfoContext.Provider value={ { type: info.type, data: info.data, icon: info.icon, title: info.title, setInfo: setContext, removeInfo: removeContext, getInfo: getContext, callbackRegistry } }>
        {children}
      </DragAndDropInfoContext.Provider>
    </DndContext>
  ), [info, children, collisionDetection])
}
