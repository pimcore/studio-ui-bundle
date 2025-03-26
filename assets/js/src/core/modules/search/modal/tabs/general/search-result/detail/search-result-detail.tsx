/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
