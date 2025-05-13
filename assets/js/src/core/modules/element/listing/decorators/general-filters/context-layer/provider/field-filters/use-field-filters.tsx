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
import { type FieldFiltersData, FieldFiltersContext } from './field-filters-provider'

export type UseFieldFiltersReturn = FieldFiltersData

export const useFieldFilters = (): UseFieldFiltersReturn => {
  const context = useContext(FieldFiltersContext)

  if (context === undefined) {
    throw new Error('useFieldFilters must be used within a FieldFiltersProvider')
  }

  return context
}
