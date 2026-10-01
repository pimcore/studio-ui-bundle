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
import { type FilterValues } from '../types'

/**
 * Applies the draft, i.e. what the host's "Apply" button does. `committed` carries the value of
 * the filter that triggered it, which is not part of the draft yet - see `commitFilterValues`.
 */
export type FilterCommit = (committed?: FilterValues) => void

const FilterCommitContext = createContext<FilterCommit | undefined>(undefined)

export interface FilterCommitProviderProps {
  children: ReactNode
  onCommit: FilterCommit
}

/**
 * Publishes the host's "Apply" to the filter controls below it. Controls rendered by
 * `FiltersRenderer` get their props from the descriptor, so a host whose apply is more than a
 * write to the applied store - the element listing also resets paging and picks which keys it
 * publishes - has no other way to hand that down.
 */
export const FilterCommitProvider = ({ children, onCommit }: FilterCommitProviderProps): React.JSX.Element => (
  <FilterCommitContext.Provider value={ onCommit }>
    {children}
  </FilterCommitContext.Provider>
)

/**
 * Undefined when the surrounding host does not apply immediately, in which case a control
 * should leave applying to the "Apply" button.
 */
export const useFilterCommitOptional = (): FilterCommit | undefined => useContext(FilterCommitContext)
