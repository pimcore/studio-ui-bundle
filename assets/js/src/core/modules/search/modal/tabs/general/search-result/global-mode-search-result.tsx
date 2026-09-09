/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchTerm } from '../provider/use-search-term'
import { type GlobalSearchAdapter } from '@Pimcore/modules/element/listing/decorators/general-filters/search-modes/search-mode-abstract'
import { SearchResultList } from './search-result-list'

export interface GlobalModeSearchResultProps {
  adapter: GlobalSearchAdapter
}

/**
 * Results of a registered search mode on the All tab. Rendered with a key per mode by the
 * container, so the adapter's hook is never swapped within one mounted instance.
 */
export const GlobalModeSearchResult = ({ adapter }: GlobalModeSearchResultProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { searchTerm } = useSearchTerm()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const { data, isLoading, isError } = adapter.useSearch({ query: searchTerm, page, pageSize })

  useEffect(() => {
    setPage(1)
  }, [searchTerm])

  return (
    <SearchResultList
      data={ isError ? { totalItems: 0, items: [] } : data }
      errorText={ isError ? t('listing.search-mode.global-unavailable') : undefined }
      isLoading={ isLoading }
      onPageChange={ (nextPage, nextPageSize) => { setPage(nextPage); setPageSize(nextPageSize) } }
      resetKey={ searchTerm }
    />
  )
}
