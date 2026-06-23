/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect } from 'react'
import { type FilterValues } from '../types'
import { type FiltersStore } from './create-filters-store'

export const useDraftSync = (
  appliedValues: FilterValues,
  draftStore: Pick<FiltersStore, 'setValues'>
): void => {
  const { setValues } = draftStore

  useEffect(() => {
    setValues(appliedValues)
  }, [appliedValues])
}
