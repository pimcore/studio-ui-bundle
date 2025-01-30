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
  type ChangeTagParameters,
  type Tag,
  type TagGetCollectionApiResponse,
  useTagGetCollectionQuery
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice-enhanced'

import {
  useTagUpdateByIdMutation
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { useEffect, useState } from 'react'

interface UseTagConfigReturn {
  tagsWithChildren: Tag[]
  tags: TagGetCollectionApiResponse | undefined
  tagsLoading: boolean
  updateATag: (tagId: number, updateTagParameters: ChangeTagParameters) => Promise<void>
  getTagForKey: (key: string) => Tag
  rootTagFolder: Tag
}

export const useTagConfig = (): UseTagConfigReturn => {
  const [tagsWithChildren, setTagsWithChildren] = useState<Tag[]>([])
  const rootTagFolder = { id: 0, text: 'All Tags', hasChildren: false, children: [], path: '/All Tags', parentId: 0, iconName: 'folder' }

  const { data: tags, isLoading: tagsLoading } = useTagGetCollectionQuery({
    page: 1,
    pageSize: 9999
  })

  const [updateTag] = useTagUpdateByIdMutation()

  const getTagForKey = (key: string): Tag => key === 'root'
    ? rootTagFolder
    : tags?.items?.find(item => item.id.toString() === key) ?? rootTagFolder
    // DONT DEFAULT?

  const updateATag = async (tagId: number, updateTagParameters: ChangeTagParameters): Promise<void> => {
    const response = (await updateTag({
      id: tagId,
      updateTagParameters
    })) as { error?: { data?: { error?: string | null } } }

    if (response.error?.data?.error != null && response.error.data.error !== '') {
      throw new Error(response.error.data.error)
    }

    if (response.error != null) {
      throw new Error('Failed to update tag')
    }
  }

  const getTagsWithChildren = (tags: Tag[], isRoot = true): Tag[] => {
    const result = tags.reduce<Tag[]>((acc, tag) => {
      if (tag.hasChildren) {
        acc.push(tag)
      }
      if (Array.isArray(tag.children) && tag.children.length > 0) {
        acc.push(...getTagsWithChildren(tag.children, false))
      }
      return acc
    }, [])

    return isRoot
      ? [rootTagFolder, ...result]
      : result
  }

  useEffect(() => {
    setTagsWithChildren(getTagsWithChildren(tags?.items ?? []))
  }, [tags])

  return {
    tagsWithChildren, tags, tagsLoading, updateATag, getTagForKey, rootTagFolder
  }
}
