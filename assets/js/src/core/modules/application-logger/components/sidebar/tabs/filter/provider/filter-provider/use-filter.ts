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
import { FilterProviderContext, FilterProviderData } from './filter-provider'

export interface UseFilterReturn extends FilterProviderData { }

export const useFilter = (): UseFilterReturn => {
  const context = useContext(FilterProviderContext)

  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider')
  }

  return context
}
