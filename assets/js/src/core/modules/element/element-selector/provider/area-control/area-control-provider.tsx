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

export interface AreaControlData {
  activeArea: ElementType | undefined
  setActiveArea: (area: ElementType) => void
}

export type AreaControlContextProps = AreaControlData | undefined

export const AreaControlContext = createContext<AreaControlContextProps>(undefined)

export interface AreaControlProviderProps {
  children: React.ReactNode
}

export const AreaControlProvider = ({ children }: AreaControlProviderProps): React.JSX.Element => {
  const [activeArea, setActiveArea] = useState<ElementType>()

  return useMemo(() => (
    <AreaControlContext.Provider value={ { activeArea, setActiveArea } }>
      { children }
    </AreaControlContext.Provider>
  ), [activeArea])
}
