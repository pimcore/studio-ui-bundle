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

export interface ILocalizedFieldsContext {
  locales: string[]
}

export const LocalizedFieldsContext = createContext<ILocalizedFieldsContext | undefined>(undefined)

export interface LocalizedFieldsProviderProps extends ILocalizedFieldsContext {
  children: React.ReactNode
}

export const LocalizedFieldsProvider = ({ locales, children }: LocalizedFieldsProviderProps): React.JSX.Element => {
  return useMemo(() => (
    <LocalizedFieldsContext.Provider value={ { locales } }>
      {children}
    </LocalizedFieldsContext.Provider>
  ), [locales, children])
}
