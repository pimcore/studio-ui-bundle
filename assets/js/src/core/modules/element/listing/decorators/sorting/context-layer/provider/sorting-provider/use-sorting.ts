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
import { SortingContext, type SortingData } from './sorting-provider'

export interface UseSortingReturn extends SortingData {}

export const useSorting = (): UseSortingReturn => {
  const context = useContext(SortingContext)

  if (context === undefined) {
    throw new Error('useSorting must be used within a SortingProvider')
  }

  return context
}
