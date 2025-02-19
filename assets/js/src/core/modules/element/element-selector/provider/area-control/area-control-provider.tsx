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

import React, { createContext, useMemo, useState } from 'react'
import { elementTypes, type ElementType } from '@Pimcore/types/enums/element/element-type'

export interface AreaControlData {
  activeArea: ElementType
  setActiveArea: (area: ElementType) => void
}

export type AreaControlContextProps = AreaControlData | undefined

export const AreaControlContext = createContext<AreaControlContextProps>(undefined)

export interface AreaControlProviderProps {
  children: React.ReactNode
}

export const AreaControlProvider = ({ children }: AreaControlProviderProps): React.JSX.Element => {
  const [activeArea, setActiveArea] = useState<ElementType>(elementTypes.asset)

  return useMemo(() => (
    <AreaControlContext.Provider value={ { activeArea, setActiveArea } }>
      { children }
    </AreaControlContext.Provider>
  ), [activeArea])
}
