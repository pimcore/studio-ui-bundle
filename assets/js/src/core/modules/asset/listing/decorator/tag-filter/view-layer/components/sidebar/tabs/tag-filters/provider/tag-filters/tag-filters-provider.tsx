/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type TagFilterData } from '@Pimcore/modules/asset/listing/decorator/tag-filter/context-layer/provider/tag-filter/tag-filter-provider'
import { useTagFilter as useListingTagFilter } from '@Pimcore/modules/asset/listing/decorator/tag-filter/context-layer/provider/tag-filter/use-tag-filter'
import React, { createContext, useEffect, useMemo, useState } from 'react'

export interface ITagFiltersContext {
  tags: TagFilterData['tags']
  setTags: TagFilterData['setTags']
}

export const TagFiltersContext = createContext<ITagFiltersContext>({
  tags: [],
  setTags: () => {}
})

interface FilterProviderProps {
  children: React.ReactNode
}

export const TagFiltersProvider = ({ children }: FilterProviderProps): React.JSX.Element => {
  const { tags: ListingTags } = useListingTagFilter()
  const [tags, setTags] = useState<TagFilterData['tags']>(ListingTags)

  useEffect(() => {
    setTags(ListingTags)
  }, [ListingTags])

  return useMemo(() => (
    <TagFiltersContext.Provider value={ { tags, setTags } }>
      {children}
    </TagFiltersContext.Provider>
  ), [tags])
}
