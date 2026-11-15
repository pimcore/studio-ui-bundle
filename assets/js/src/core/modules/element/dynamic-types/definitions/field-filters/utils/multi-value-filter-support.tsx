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

const MultiValueFilterSupportContext = createContext<boolean>(false)

export interface MultiValueFilterSupportProviderProps {
  supported: boolean
  children: React.ReactNode
}

/**
 * Tells the string field filter whether the host turns a pasted list into a list filter.
 * Only hosts that build their request through the field filter types do; every other host
 * (and anything unaware of this provider) keeps the single-line input.
 */
export const MultiValueFilterSupportProvider = ({ supported, children }: MultiValueFilterSupportProviderProps): React.JSX.Element => (
  <MultiValueFilterSupportContext.Provider value={ supported }>
    {children}
  </MultiValueFilterSupportContext.Provider>
)

export const useMultiValueFilterSupport = (): boolean => useContext(MultiValueFilterSupportContext)
