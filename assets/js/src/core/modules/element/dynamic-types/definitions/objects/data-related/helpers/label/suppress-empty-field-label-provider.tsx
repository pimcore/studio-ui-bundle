/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, type ReactNode } from 'react'

const SuppressEmptyFieldLabelContext = createContext<boolean>(false)

export interface SuppressEmptyFieldLabelProviderProps {
  children: ReactNode
}

export const SuppressEmptyFieldLabelProvider = ({ children }: SuppressEmptyFieldLabelProviderProps): React.JSX.Element => {
  return (
    <SuppressEmptyFieldLabelContext.Provider value>
      { children }
    </SuppressEmptyFieldLabelContext.Provider>
  )
}

export const useSuppressEmptyFieldLabel = (): boolean => useContext(SuppressEmptyFieldLabelContext)
