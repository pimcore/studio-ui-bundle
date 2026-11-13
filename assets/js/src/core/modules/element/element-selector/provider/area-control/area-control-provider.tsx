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
import { type ElementType } from '@Pimcore/types/enums/element/element-type'

// A built-in area or the key of a caller-supplied tab.
export type ElementSelectorArea = ElementType | string

export interface AreaControlData {
  activeArea: ElementSelectorArea | undefined
  setActiveArea: (area: ElementSelectorArea) => void
}

export type AreaControlContextProps = AreaControlData | undefined

export const AreaControlContext = createContext<AreaControlContextProps>(undefined)

export interface AreaControlProviderProps {
  children: React.ReactNode
}

export const AreaControlProvider = ({ children }: AreaControlProviderProps): React.JSX.Element => {
  const [activeArea, setActiveArea] = useState<ElementSelectorArea>()

  return useMemo(() => (
    <AreaControlContext.Provider value={ { activeArea, setActiveArea } }>
      { children }
    </AreaControlContext.Provider>
  ), [activeArea])
}
