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

import { useTagGetCollectionQuery } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import {
  TagsTree,
  type TagsTreeProps
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/components/tags-tree/tags-tree'
import React, { useEffect, useState } from 'react'
import { Content } from '@Pimcore/components/content/content'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'

type TagsTreeContainerProps = NonNullable<Pick<TagsTreeProps, 'tags' | 'isLoading'>>

export const TagsTreeContainer = (props: TagsTreeContainerProps): React.JSX.Element => {
  const [filter, setFilter] = useState<string>('')

  const [defaultCheckedTags, setDefaultCheckedTags] = useState<React.Key[]>(
    props.tags.map(tag => tag.id.toString())
  )

  const { id, elementType } = useElementContext()

  useEffect(() => {
    setDefaultCheckedTags(props.tags.map(tag => tag.id.toString()))
  }, [props.tags])

  const { data: tags, isLoading: tagsLoading } = useTagGetCollectionQuery({
    page: 1,
    pageSize: 9999,
    filter
  })

  if (tagsLoading || props.isLoading!) {
    return <Content loading />
  }

  if (tags?.items === undefined) {
    return <div>Failed to load tags</div>
  }

  return (
    <>
      <TagsTree
        defaultCheckedTags={ defaultCheckedTags }
        elementId={ id }
        elementType={ elementType }
        filter={ filter }
        isLoading={ tagsLoading }
        setDefaultCheckedTags={ setDefaultCheckedTags }
        setFilter={ setFilter }
        tags={ tags.items }
      />
    </>
  )
}
