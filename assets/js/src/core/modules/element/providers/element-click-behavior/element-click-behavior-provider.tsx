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

export interface ElementClickBehavior {
  /**
   * Called when an element is clicked inside the provider's subtree, right before it is opened,
   * so the surrounding UI can react to the navigation — a search listing closes its modal.
   */
  onElementClick: () => void
}

const ElementClickBehaviorContext = createContext<ElementClickBehavior>({
  onElementClick: () => {}
})

export interface ElementClickBehaviorProviderProps extends ElementClickBehavior {
  children: ReactNode
}

export const ElementClickBehaviorProvider = ({ children, onElementClick }: ElementClickBehaviorProviderProps): React.JSX.Element => {
  const callbackRef = useRef(onElementClick)
  callbackRef.current = onElementClick

  // Kept stable so a new callback identity does not re-render every consumer in a grid.
  const value = useMemo<ElementClickBehavior>(() => ({
    onElementClick: () => { callbackRef.current() }
  }), [])

  return (
    <ElementClickBehaviorContext.Provider value={ value }>
      { children }
    </ElementClickBehaviorContext.Provider>
  )
}

export const useElementClickBehavior = (): ElementClickBehavior => useContext(ElementClickBehaviorContext)
