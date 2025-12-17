/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useEffect, useMemo, useRef, useState } from 'react'
import { Content } from '@Pimcore/components/content/content'

export interface ILayoutSelectionContext {
  currentLayout: string | null
  setCurrentLayout: (layoutId: string | null) => void
}

export const LayoutSelectionContext = createContext<ILayoutSelectionContext>({
  currentLayout: null,
  setCurrentLayout: () => {}
})

export interface LayoutSelectionProviderProps {
  children: React.ReactNode
  defaultLayout: string | null
  isLoading: boolean
}

export const LayoutSelectionProvider = ({ children, defaultLayout, isLoading }: LayoutSelectionProviderProps): React.JSX.Element => {
  const [currentLayout, setCurrentLayout] = useState<string | null>(null)
  const isInitializedRef = useRef<boolean>(false)

  useEffect(() => {
    if (!isInitializedRef.current && !isLoading && defaultLayout !== null) {
      setCurrentLayout(defaultLayout)
      isInitializedRef.current = true
    }
  }, [defaultLayout, isLoading])

  const value = useMemo(() => ({
    currentLayout,
    setCurrentLayout
  }), [currentLayout])
  return (
    <LayoutSelectionContext.Provider value={ value }>
      { isLoading ? <Content loading /> : children }
    </LayoutSelectionContext.Provider>
  )
}
