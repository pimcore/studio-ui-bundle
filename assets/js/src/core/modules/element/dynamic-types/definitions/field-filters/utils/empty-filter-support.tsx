/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext } from 'react'

const EmptyFilterSupportContext = createContext<boolean>(false)

export interface EmptyFilterSupportProviderProps {
  supported: boolean
  children: React.ReactNode
}

/**
 * Tells the field filters whether the host sends the empty / not empty operator to a backend that understands it.
 * Only hosts that build their request through the field filter types do; every other host (and anything unaware
 * of this provider) keeps filtering by value only.
 */
export const EmptyFilterSupportProvider = ({ supported, children }: EmptyFilterSupportProviderProps): React.JSX.Element => (
  <EmptyFilterSupportContext.Provider value={ supported }>
    {children}
  </EmptyFilterSupportContext.Provider>
)

export const useEmptyFilterSupport = (): boolean => useContext(EmptyFilterSupportContext)
