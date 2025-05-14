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

export interface IDocumentContext {
  id: number
}

export interface IDocumentProviderProps {
  id: number
  children?: React.ReactNode
}

export const DocumentContext = createContext<IDocumentContext>({ id: 0 })

export const DocumentProvider = ({ id, children }: IDocumentProviderProps): React.JSX.Element => {
  return useMemo(() => (
    <DocumentContext.Provider value={ { id } }>
      {children}
    </DocumentContext.Provider>
  ), [id])
}
