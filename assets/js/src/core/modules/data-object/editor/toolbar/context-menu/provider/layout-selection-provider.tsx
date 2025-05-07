/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useEffect, useMemo, useState } from 'react'
import { Content } from '@Pimcore/components/content/content'

export interface ILayoutSelectionContext {
  currentLayout: string | null
  setCurrentLayout: (layoutId: string) => void
  hasLocalizedFields: boolean
  setHasLocalizedFields: (hasLocalizedFields: boolean) => void
}

export const LayoutSelectionContext = createContext<ILayoutSelectionContext>({
  currentLayout: null,
  setCurrentLayout: () => {},
  hasLocalizedFields: false,
  setHasLocalizedFields: () => {}
})

export interface LayoutSelectionProviderProps {
  children: React.ReactNode
  defaultLayout: string | null
  isLoading: boolean
}

export const LayoutSelectionProvider = ({ children, defaultLayout, isLoading }: LayoutSelectionProviderProps): React.JSX.Element => {
  const [currentLayout, setCurrentLayout] = useState<string | null>(defaultLayout)
  const [hasLocalizedFields, setHasLocalizedFields] = useState<boolean>(false)

  useEffect(() => {
    if (currentLayout === null && defaultLayout !== null) {
      setCurrentLayout(defaultLayout)
    }
  }, [defaultLayout])

  const value = useMemo(() => ({
    currentLayout,
    setCurrentLayout,
    hasLocalizedFields,
    setHasLocalizedFields
  }), [currentLayout])
  return (
    <LayoutSelectionContext.Provider value={ value }>
      { isLoading ? <Content loading /> : children }
    </LayoutSelectionContext.Provider>
  )
}
