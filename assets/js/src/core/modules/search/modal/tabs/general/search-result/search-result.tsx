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
import { useSearchTerm } from '../provider/use-search-term'
import { useSimpleSearchGetQuery } from '@Pimcore/modules/search/search-api-slice-enhanced'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { SearchResultList } from './search-result-list'

/** Full-text results of the All tab (GET /search). */
export const SearchResult = (): React.JSX.Element => {
  const { searchTerm } = useSearchTerm()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const { isLoading, isError, error, data } = useSimpleSearchGetQuery({ searchTerm, page, pageSize })

  useEffect(() => {
    setPage(1)
  }, [searchTerm])

  useEffect(() => {
    if (isError) {
      trackError(new ApiError(error))
    }
  }, [isError])

  return (
    <SearchResultList
      data={ data }
      isLoading={ isLoading }
      onPageChange={ (nextPage, nextPageSize) => { setPage(nextPage); setPageSize(nextPageSize) } }
      resetKey={ searchTerm }
    />
  )
}
