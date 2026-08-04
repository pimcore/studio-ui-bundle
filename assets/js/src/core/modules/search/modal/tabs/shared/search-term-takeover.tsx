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
import { isNil } from 'lodash'
import { useSearch } from '@Pimcore/modules/search/provider/use-search'
import { useAppliedFilters, readElementFilterValues } from '@Pimcore/modules/element/listing/decorators/general-filters/element-filters'
import { usePaging } from '@Pimcore/modules/element/listing/decorators/paging/context-layer/paging/provider/use-paging'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'

interface SearchTermTakeoverProps {
  elementType: ElementType
}

// Strictly one-directional (shared term -> listing): mirroring the applied term back into the
// shared context from an effect ping-pongs against this one and floods the API with requests.
export const SearchTermTakeover = ({ elementType }: SearchTermTakeoverProps): null => {
  const { searchTerm, pendingRestore, activeKey, isOpen } = useSearch()
  const { values, setValue } = useAppliedFilters()
  const { setPage } = usePaging()
  const { dataLoadingState, setDataLoadingState } = useData()

  const isActive = activeKey === elementType
  const appliedSearchTerm = readElementFilterValues(values).searchTerm

  useEffect(() => {
    if (!isOpen || !isActive || !isNil(pendingRestore)) {
      return
    }

    if (searchTerm !== appliedSearchTerm) {
      setValue('searchTerm', searchTerm)

      if (dataLoadingState !== 'initial') {
        setPage(1)
        setDataLoadingState('filters-applied')
      }
    }
  }, [searchTerm, isActive])

  return null
}
