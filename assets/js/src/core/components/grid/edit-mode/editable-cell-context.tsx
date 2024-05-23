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

import React, { createContext, useMemo } from 'react'

interface EditableCellContextValue {
  isInEditMode: boolean
  setIsInEditMode: (isInEditMode: boolean) => void
}

export const EditableCellContext = createContext<EditableCellContextValue>({
  isInEditMode: false,
  setIsInEditMode: (isInEditMode: boolean) => {}
})

interface EditableCellContextProviderProps {
  children: React.ReactNode
  value: EditableCellContextValue
}

export const EditableCellContextProvider = ({ children, value }: EditableCellContextProviderProps): React.JSX.Element => {
  return useMemo(() => (
    <EditableCellContext.Provider value={ value }>
      { children }
    </EditableCellContext.Provider>
  ), [children, value])
}
