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

import React, { createContext, useMemo, useState } from 'react'

export type SelectedTags = number[]

export const tagFilterType = 'system.tag'

export interface TagFilter {
  type: typeof tagFilterType
  filterValue: {
    considerChildTags: true
    tags: SelectedTags
  }
}

export interface TagFilterData {
  tags: SelectedTags
  setTags: (tags: SelectedTags) => void
  getDataQueryArg: () => TagFilter | undefined
}

export type TagFilterContextProps = TagFilterData | undefined

export const TagFilterContext = createContext<TagFilterContextProps>(undefined)

export interface TagFilterProviderProps {
  children: React.ReactNode
}

export const TagFilterProvider = (props: TagFilterProviderProps): React.JSX.Element => {
  const [tags, setTags] = useState<TagFilterData['tags']>([])

  const getDataQueryArg: TagFilterData['getDataQueryArg'] = () => {
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
    <TagFilterContext.Provider value={ { tags, setTags, getDataQueryArg } }>
      {props.children}
    </TagFilterContext.Provider>
  ), [tags])
}
