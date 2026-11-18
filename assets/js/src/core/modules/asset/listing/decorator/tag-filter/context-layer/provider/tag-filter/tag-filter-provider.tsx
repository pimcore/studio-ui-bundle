/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useMemo, useState } from 'react'
import { type FilterOperator } from '@Pimcore/components/dynamic-filter/filter-operator'

export type SelectedTags = number[]

export const tagFilterType = 'system.tag'

// Full index path: a bare "tags" would first match a standard field (e.g. asset metadata) of that name.
export const tagsIndexField = 'system_fields.tags'

export interface TagFilter {
  type: typeof tagFilterType
  filterValue: {
    considerChildTags: true
    tags: SelectedTags
  }
}

export interface UntaggedFilter {
  key: typeof tagsIndexField
  type: typeof tagFilterType
  operator: Extract<FilterOperator, 'empty'>
  filterValue: null
}

export interface TagFilterData {
  tags: SelectedTags
  setTags: (tags: SelectedTags) => void
  onlyUntagged: boolean
  setOnlyUntagged: (onlyUntagged: boolean) => void
  showOnlyUntaggedFilter: boolean
  getDataQueryArg: () => TagFilter | UntaggedFilter | undefined
}

export type TagFilterContextProps = TagFilterData | undefined

export const TagFilterContext = createContext<TagFilterContextProps>(undefined)

export interface TagFilterProviderProps {
  children: React.ReactNode
  showOnlyUntaggedFilter?: boolean
}

export const TagFilterProvider = (props: TagFilterProviderProps): React.JSX.Element => {
  const [tags, setTags] = useState<TagFilterData['tags']>([])
  const [onlyUntagged, setOnlyUntagged] = useState<boolean>(false)
  const showOnlyUntaggedFilter = props.showOnlyUntaggedFilter === true

  const getDataQueryArg: TagFilterData['getDataQueryArg'] = () => {
    if (onlyUntagged) {
      return { key: tagsIndexField, type: tagFilterType, operator: 'empty', filterValue: null }
    }

    if (tags === undefined || tags.length === 0) {
      return undefined
    }

    return {
      type: 'system.tag',
      filterValue: {
        considerChildTags: true,
        tags
      }
    }
  }

  return useMemo(() => (
    <TagFilterContext.Provider value={ { tags, setTags, onlyUntagged, setOnlyUntagged, showOnlyUntaggedFilter, getDataQueryArg } }>
      {props.children}
    </TagFilterContext.Provider>
  ), [tags, onlyUntagged, showOnlyUntaggedFilter])
}
