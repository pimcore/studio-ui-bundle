/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
