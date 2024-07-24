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

import {
  type AssignTagForElementApiArg,
  useGetTagsQuery
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import {
  TagsTree,
  type TagsTreeProps
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/components/tags-tree/tags-tree'
import React, { useContext, useEffect, useState } from 'react'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'

type TagsTreeContainerProps = NonNullable<Pick<TagsTreeProps, 'tags' | 'isLoading'>>

export const TagsTreeContainer = (props: TagsTreeContainerProps): React.JSX.Element => {
  const [filter, setFilter] = useState<string>('')
  const [defaultCheckedTags, setDefaultCheckedTags] = useState<React.Key[]>(
    Object.keys(props.tags)
  )
  const { id } = useContext(AssetContext)

  useEffect(() => {
    setDefaultCheckedTags(Object.keys(props.tags))
  }, [props.tags])

  const { data: tags, isLoading: tagsLoading } = useGetTagsQuery({
    page: 1,
    pageSize: 9999,
    filter
  })

  if (tagsLoading || props.isLoading!) {
    return <div>Loading...</div>
  }

  if (tags?.items === undefined) {
    return <div>Failed to load tags</div>
  }

  return (
    <>
      <TagsTree
        defaultCheckedTags={ defaultCheckedTags }
        elementId={ id! }
        elementType={ 'asset' as AssignTagForElementApiArg['elementType'] }
        isLoading={ tagsLoading }
        setDefaultCheckedTags={ setDefaultCheckedTags }
        setFilter={ setFilter }
        tags={ tags.items }
      />
    </>
  )
}
