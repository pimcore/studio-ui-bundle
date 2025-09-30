/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useMemo } from 'react'

interface FocusContextType {
  restoreFocus: () => void
}

const FocusContext = createContext<FocusContextType | undefined>(undefined)

export const useFocusRestore = (): FocusContextType => {
  const context = useContext(FocusContext)
  if (context === undefined) {
    throw new Error('useFocusRestore must be used within a FocusProvider')
  }
  return context
}

export interface FocusProviderProps {
  children: React.ReactNode
  restoreFocus: () => void
}

export const FocusProvider = ({ children, restoreFocus }: FocusProviderProps): React.JSX.Element => {
  const contextValue = useMemo(() => ({ restoreFocus }), [restoreFocus])

  return (
    <FocusContext.Provider value={ contextValue }>
      {children}
    </FocusContext.Provider>
  )
}
