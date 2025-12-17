/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useMemo, useState } from 'react'

export interface IDropdownHeightContext {
  height: number
}

export const DropdownHeightContext = createContext<IDropdownHeightContext | undefined>(undefined)

export interface DropdownHeightProviderProps {
  children: React.ReactNode
}

export const DropdownHeightProvider = ({ children }: DropdownHeightProviderProps): React.JSX.Element => {
  const [height, setHeight] = useState<number>(0)

  const onContextMenu = (e: React.MouseEvent<HTMLDivElement>): void => {
    const viewportHeight = window.innerHeight
    const triggerLocation = e.clientY
    const offset = 16
    let newHeight = viewportHeight - triggerLocation

    if (triggerLocation > viewportHeight / 2) {
      newHeight = triggerLocation
    }

    setHeight(newHeight - offset)
  }

  return useMemo(() => (
    <div onContextMenuCapture={ onContextMenu }>
      <DropdownHeightContext.Provider value={ { height } }>
        {children}
      </DropdownHeightContext.Provider>
    </div>
  ), [height, children])
}

export const useDropdownHeightOptional = (): IDropdownHeightContext | undefined => {
  const context = React.useContext(DropdownHeightContext)

  return context
}
