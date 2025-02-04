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
  useTagGetCollectionQuery,
  useTagUpdateByIdMutation,
  useTagDeleteByIdMutation, useTagCreateMutation, type CreateTagParameters
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice-enhanced'
import { useEffect, useState } from 'react'

interface UseTagConfigReturn {
  tagsWithChildren: Tag[]
  tags: TagGetCollectionApiResponse | undefined
  flattenedTags: Tag[]
  tagsLoading: boolean
  handleTagUpdate: (id: number, parentId: number, newName?: string) => Promise<void>
  handleTagCreation: (name: string, parentId: number) => Promise<void>
  tagDeletion: (tagId: number) => Promise<void>
  getTag: (key: string) => Tag | undefined
  rootTagFolder: Tag
}

export const useTagConfig = (): UseTagConfigReturn => {
  const [tagsWithChildren, setTagsWithChildren] = useState<Tag[]>([])
  const [flattenedTags, setFlattenedTags] = useState<Tag[]>([])
  const rootTagFolder = { id: 0, text: 'All Tags', hasChildren: false, children: [], path: '/All Tags', parentId: 0, iconName: 'folder' }

  const { data: tags, isLoading: tagsLoading } = useTagGetCollectionQuery({
    page: 1,
    pageSize: 9999
  })

  const [updateTag] = useTagUpdateByIdMutation()
  const [deleteTag] = useTagDeleteByIdMutation()
  const [createTag] = useTagCreateMutation()

  const getTag: (key: string) => Tag | undefined = (key: string) => {
    return flattenedTags.find(item => item.id.toString() === key) ?? undefined
  }

  const tagUpdate = async (tagId: number, updateTagParameters: ChangeTagParameters): Promise<void> => {
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

  const handleTagUpdate = async (id: number, parentId: number, newName?: string): Promise<void> => {
    const maybeMovedTag: Tag | undefined = getTag(id.toString())

    if (maybeMovedTag === null || maybeMovedTag === undefined) {
      console.error(`Tag with id ${id} not found`)
    } else {
      const createTagParameter: ChangeTagParameters = {
        parentId,
        name: newName ?? maybeMovedTag.text
      }

      try {
        await tagUpdate(id, createTagParameter)
      } catch (error) {
        console.error('Error moving tag:', error)
      }
    }
  }

  const tagCreation = async (createTagParameters: CreateTagParameters): Promise<void> => {
    const response = (await createTag({ createTagParameters })) as { error?: { data?: { error?: string | null } } }

    if (response.error?.data?.error != null && response.error.data.error !== '') {
      throw new Error(response.error.data.error)
    }

    if (response.error != null) {
      throw new Error('Failed to delete tag')
    }
  }

  const handleTagCreation = async (name: string, parentId: number): Promise<void> => {
    const createTagParameters: CreateTagParameters = {
      parentId,
      name
    }

    try {
      await tagCreation(createTagParameters)
    } catch (error) {
      console.error('Error creating tag:', error)
    }
  }

  const tagDeletion = async (tagId: number): Promise<void> => {
    const response = (await deleteTag({ id: tagId })) as { error?: { data?: { error?: string | null } } }

    if (response.error?.data?.error != null && response.error.data.error !== '') {
      throw new Error(response.error.data.error)
    }

    if (response.error != null) {
      throw new Error('Failed to delete tag')
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

  const flattenTags = (tags: Tag[]): Tag[] => {
    const result: Tag[] = []

    const traverse = (nodeList: Tag[]): void => {
      for (const node of nodeList) {
        result.push(node)
        if (node.children !== null && node.children !== undefined && node.children.length > 0) {
          traverse(node.children)
        }
      }
    }

    traverse(tags)
    return result
  }

  useEffect(() => {
    setTagsWithChildren(getTagsWithChildren(tags?.items ?? []))
    setFlattenedTags(flattenTags(tags?.items ?? []))
  }, [tags])

  return {
    tagsWithChildren, tags, flattenedTags, tagsLoading, handleTagUpdate, handleTagCreation, tagDeletion, getTag, rootTagFolder
  }
}
