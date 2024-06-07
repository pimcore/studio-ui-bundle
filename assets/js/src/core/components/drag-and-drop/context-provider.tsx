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

import React, { type MutableRefObject, createContext, useRef, type ReactNode } from 'react'
import { DndContext, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core'
import { type Callback, CallbackRegistry, type ICallbackRegistry } from './callback-registry'

interface DragAndDropInfo {
  type: string
  data: any
}

interface IDragAndDropInfoContext extends DragAndDropInfo {
  setInfo: (info: DragAndDropInfo) => void
  removeInfo: () => void
  getInfo: () => DragAndDropInfo
  callbackRegistry?: MutableRefObject<ICallbackRegistry>
}

export const DragAndDropInfoContext = createContext<IDragAndDropInfoContext>({
  type: 'unknown',
  data: {},
  setInfo: (info: DragAndDropInfo): void => {},
  getInfo: (): DragAndDropInfo => ({ type: 'unknown', data: null }),
  removeInfo: (): void => {}
})

export const DragAndDropContextProvider = ({ children }: { children: ReactNode }): React.JSX.Element => {
  const [info, setInfo] = React.useState<DragAndDropInfo>({ type: 'unknown', data: null })
  const callbackRegistry = useRef<ICallbackRegistry>(new CallbackRegistry())

  function setContext (info: DragAndDropInfo): void {
    setInfo(info)
  }

  function removeContext (): void {
    setInfo({ type: 'unknown', data: null })
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
    console.log(callbackRegistry.current.getCallbacks())
    // @ts-expect-error - TS doesn't like the type of the event
    Object.entries(callbackRegistry.current.getCallbacks()).forEach((callback: Callback) => {
      callback[1](event)
    })
  }

  return (
    <DndContext
      onDragCancel={ onDragCancel }
      onDragEnd={ onDragEnd }
      onDragStart={ onDragStart }
    >
      <DragAndDropInfoContext.Provider value={ { type: info.type, data: info.data, setInfo: setContext, removeInfo: removeContext, getInfo: getContext, callbackRegistry } }>
        {children}
      </DragAndDropInfoContext.Provider>
    </DndContext>
  )
}
