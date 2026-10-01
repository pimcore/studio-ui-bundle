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
import { useSearchMode } from '@Pimcore/modules/element/listing/decorators/general-filters/search-modes/use-search-mode'
import { FULLTEXT_SEARCH_MODE_ID } from '@Pimcore/modules/element/listing/decorators/general-filters/search-modes/search-mode-abstract'
import { usePaging } from '@Pimcore/modules/element/listing/decorators/paging/context-layer/paging/provider/use-paging'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'

interface SearchTermTakeoverProps {
  elementType: ElementType
}

// Strictly one-directional (shared term/mode -> listing): mirroring the applied values back into
// the shared context from an effect ping-pongs against this one and floods the API with requests.
// The typed tabs write the shared mode only from their mode dropdown.
export const SearchTermTakeover = ({ elementType }: SearchTermTakeoverProps): null => {
  const { searchTerm, searchMode: sharedSearchMode, pendingRestore, activeKey, isOpen } = useSearch()
  const { values, setValues } = useAppliedFilters()
  const { setPage } = usePaging()
  const { dataLoadingState, setDataLoadingState } = useData()
  const modeState = useSearchMode('applied')

  const isActive = activeKey === elementType
  const applied = readElementFilterValues(values)

  // A shared mode the tab cannot serve falls back to full text.
  const applicableMode = modeState?.modes.find(
    (mode) => mode.id === sharedSearchMode && mode.getAvailability(modeState.modeContext).available
  )
  const targetMode = applicableMode?.id ?? FULLTEXT_SEARCH_MODE_ID

  useEffect(() => {
    if (!isOpen || !isActive || !isNil(pendingRestore)) {
      return
    }

    if (searchTerm !== applied.searchTerm || targetMode !== applied.searchMode) {
      setValues({ searchTerm, searchMode: targetMode })

      if (dataLoadingState !== 'initial') {
        setPage(1)
        setDataLoadingState('filters-applied')
      }
    }
  }, [searchTerm, targetMode, isActive])

  return null
}
