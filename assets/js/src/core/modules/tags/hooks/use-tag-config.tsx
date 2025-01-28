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
  type Tag,
  type TagGetCollectionApiResponse,
  useTagGetCollectionQuery
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice-enhanced'
import { useEffect, useState } from 'react'

interface UseTagConfigReturn {
  tagsWithChildren: Tag[]
  tags: TagGetCollectionApiResponse | undefined
  tagsLoading: boolean
}

export const useTagConfig = (): UseTagConfigReturn => {
  const [tagsWithChildren, setTagsWithChildren] = useState<Tag[]>([])

  const { data: tags, isLoading: tagsLoading } = useTagGetCollectionQuery({
    page: 1,
    pageSize: 9999
  })

  const getTagsWithChildren = (tags: Tag[]): Tag[] =>
    tags.reduce<Tag[]>((acc, tag) => {
      if (tag.hasChildren) {
        acc.push(tag)
      }
      if (Array.isArray(tag.children) && tag.children.length > 0) {
        acc.push(...getTagsWithChildren(tag.children))
      }
      return acc
    }, [])

  useEffect(() => {
    setTagsWithChildren(getTagsWithChildren(tags?.items ?? []))
  }, [tags])

  return {
    tagsWithChildren, tags, tagsLoading
  }
}
