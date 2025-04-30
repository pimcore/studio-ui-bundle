/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import { type PqlFilterData, PqlFilterContext } from './pql-filter-provider'

export type UsePqlFilterReturn = PqlFilterData

export const usePqlFilter = (): UsePqlFilterReturn => {
  const context = useContext(PqlFilterContext)

  if (context === undefined) {
    throw new Error('usePqlFilter must be used within a PqlFilterProvider')
  }

  return context
}
