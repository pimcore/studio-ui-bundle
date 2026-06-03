/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useMemo, useRef, useState } from 'react'

export interface IUnsavedChangesContext {
  isModified: boolean
  setIsModified: (modified: boolean) => void
  saveFnRef: React.MutableRefObject<(() => Promise<void>) | null>
}

const UnsavedChangesContext = createContext<IUnsavedChangesContext | undefined>(undefined)

export interface UnsavedChangesProviderProps {
  children: React.ReactNode
}

export const UnsavedChangesProvider = (props: UnsavedChangesProviderProps): React.JSX.Element => {
  const [isModified, setIsModified] = useState(false)
  const saveFnRef = useRef<(() => Promise<void>) | null>(null)

  const value = useMemo<IUnsavedChangesContext>(() => ({
    isModified,
    setIsModified,
    saveFnRef
  }), [isModified])

  return (
    <UnsavedChangesContext.Provider value={ value }>
      {props.children}
    </UnsavedChangesContext.Provider>
  )
}

export const useUnsavedChanges = (): IUnsavedChangesContext => {
  const context = useContext(UnsavedChangesContext)

  if (context === undefined) {
    throw new Error('useUnsavedChanges must be used within an UnsavedChangesProvider')
  }

  return context
}

export const useOptionalUnsavedChanges = (): IUnsavedChangesContext | undefined => {
  return useContext(UnsavedChangesContext)
}
