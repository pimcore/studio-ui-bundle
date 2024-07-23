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
  useGetTagsForElementByTypeAndIdQuery,
  useGetTagsQuery
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { TagsTree } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/components/tags-tree/tags-tree'
import React, { useEffect, useState } from 'react'
import { Result } from 'antd'
import { useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'

export const TagsTreeContainer = (): React.JSX.Element => {
  const [filter, setFilter] = useState<string>('')
  const [defaultCheckedTags, setDefaultCheckedTags] = useState<React.Key[]>([])
  const { context } = useGlobalAssetContext()

  if (context === undefined) {
    return <Result title="No context" />
  }

  const { data: tags, isLoading: tagsLoading } = useGetTagsQuery({
    page: 1,
    pageSize: 9999,
    filter
  })

  const { data: dataDefaultCheckedTags, isLoading: defaultCheckedTagsLoading } = useGetTagsForElementByTypeAndIdQuery({
    elementType: context.type,
    id: context.config.id
  })

  useEffect(() => {
    if (dataDefaultCheckedTags?.items !== undefined && dataDefaultCheckedTags.totalItems > 0) {
      setDefaultCheckedTags(Object.keys(dataDefaultCheckedTags.items))
    }
  }, [dataDefaultCheckedTags])

  if (tagsLoading || defaultCheckedTagsLoading) {
    return <div>Loading...</div>
  }

  if (tags?.items === undefined || dataDefaultCheckedTags?.items === undefined) {
    return <div>Failed to load tags</div>
  }

  return (
    <>
      <TagsTree
        defaultCheckedTags={ defaultCheckedTags }
        elementId={ context.config.id }
        elementType={ context.type as AssignTagForElementApiArg['elementType'] }
        isLoading={ tagsLoading && defaultCheckedTagsLoading }
        setDefaultCheckedTags={ setDefaultCheckedTags }
        setFilter={ setFilter }
        tags={ tags.items }
      />
    </>
  )
}
