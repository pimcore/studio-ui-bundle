/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type SimpleSearchResult } from '@Pimcore/modules/search/search-api-slice.gen'
import React, { useMemo } from 'react'
import { SearchResultDetailFound } from './search-result-detail-found'
import { SearchResultDetailEmpty } from './search-result-detail-empty'

export interface SearchResultDetailProps {
  item?: SimpleSearchResult
}

export const SearchResultDetail = (props: SearchResultDetailProps): React.JSX.Element => {
  const { item } = props
  const hasItem = item !== undefined

  return useMemo(() => {
    if (hasItem) {
      return (
        <SearchResultDetailFound item={ item } />
      )
    }

    return (
      <SearchResultDetailEmpty />
    )
  }, [item])
}
