/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useMemo, useRef, type ReactNode } from 'react'

export interface ElementOpenBehavior {
  /**
   * Called right before an element is opened from within the provider's subtree, so the
   * surrounding UI can react to the navigation — a search listing closes its modal, for example.
   */
  onElementOpen: () => void
}

const ElementOpenBehaviorContext = createContext<ElementOpenBehavior>({
  onElementOpen: () => {}
})

export interface ElementOpenBehaviorProviderProps extends ElementOpenBehavior {
  children: ReactNode
}

export const ElementOpenBehaviorProvider = ({ children, onElementOpen }: ElementOpenBehaviorProviderProps): React.JSX.Element => {
  const callbackRef = useRef(onElementOpen)
  callbackRef.current = onElementOpen

  // Kept stable so a new callback identity does not re-render every consumer in a grid.
  const value = useMemo<ElementOpenBehavior>(() => ({
    onElementOpen: () => { callbackRef.current() }
  }), [])

  return (
    <ElementOpenBehaviorContext.Provider value={ value }>
      { children }
    </ElementOpenBehaviorContext.Provider>
  )
}

export const useElementOpenBehavior = (): ElementOpenBehavior => useContext(ElementOpenBehaviorContext)
