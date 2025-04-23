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
  useTagGetCollectionQuery,
  useTagUpdateByIdMutation,
  useTagDeleteByIdMutation, useTagCreateMutation, type CreateTagParameters
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice-enhanced'
import { useEffect, useState } from 'react'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { t } from 'i18next'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { get, isEmpty, isNil } from 'lodash'

interface UseTagConfigReturn {
  tags: Tag[]
  tagsLoading: boolean
  tagsFetching: boolean
  handleTagUpdate: (id: number, parentId: number, newName?: string) => Promise<void>
  handleTagCreation: (name: string, parentId: number) => Promise<void>
  tagDeletion: (tagId: number) => Promise<void>
  getTag: (key: string) => Tag | undefined
  rootTagFolder: Tag
  setTagFilter: (filter: string) => void
}

export const useTagConfig = (): UseTagConfigReturn => {
  const [flattenedTags, setFlattenedTags] = useState<Tag[]>([])
  const rootTagFolder = { id: 0, text: 'All Tags', hasChildren: false, children: [], path: '/All Tags', parentId: 0, iconName: 'folder' }
  const messageApi = useMessage()
  const [filter, setFilter] = useState<string>('')

  const { data: tags, isFetching: tagsFetching, isLoading: tagsLoading } = useTagGetCollectionQuery({
    page: 1,
    pageSize: 9999,
    filter
  })

  const [updateTag] = useTagUpdateByIdMutation()
  const [deleteTag] = useTagDeleteByIdMutation()
  const [createTag] = useTagCreateMutation()

  const flattenTags = (tags: Tag[]): Tag[] => {
    const result: Tag[] = []

    const traverse = (nodeList: Tag[]): void => {
      for (const node of nodeList) {
        result.push(node)
        if (!isNil(node.children)) {
          traverse(node.children)
        }
      }
    }

    traverse(tags)
    return result
  }

  useEffect(() => {
    setFlattenedTags(flattenTags(tags?.items ?? []))
  }, [tags])

  const getTag: (key: string) => Tag | undefined = (key: string) => {
    return [rootTagFolder, ...flattenedTags].find(item => item.id.toString() === key) ?? undefined
  }

  const tagUpdate = async (tagId: number, updateTagParameters: ChangeTagParameters): Promise<void> => {
    const response = (await updateTag({
      id: tagId,
      updateTagParameters
    })) as { error?: { data?: { error?: string | null } } }
    if ('data' in response) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      messageApi.success({
        content: t('tag-configuration.successful-update'),
        type: 'success',
        duration: 3
      })
    }

    if (!isEmpty(get(response, 'error.data.error'))) {
      trackError(new GeneralError(`Error updating tag: ${get(response, 'error.data.error')}`))
    }

    if (response.error != null) {
      trackError(new GeneralError('Error updating tag'))
    }
  }

  const handleTagUpdate = async (id: number, parentId: number, newName?: string): Promise<void> => {
    const maybeMovedTag: Tag | undefined = getTag(id.toString())

    if (maybeMovedTag === null || maybeMovedTag === undefined) {
      trackError(new GeneralError(`Tag with id ${id} not found`))
    } else {
      const createTagParameter: ChangeTagParameters = {
        parentId,
        name: newName ?? maybeMovedTag.text
      }
      await tagUpdate(id, createTagParameter)
    }
  }

  const tagCreation = async (createTagParameters: CreateTagParameters): Promise<void> => {
    const response = (await createTag({ createTagParameters })) as { error?: { data?: { error?: string | null } } }

    if ('data' in response) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      messageApi.success({
        content: t('tag-configuration.successful-add'),
        type: 'success',
        duration: 3
      })
    }

    if (!isEmpty(get(response, 'error.data.error'))) {
      trackError(new GeneralError(`Error creating tag: ${get(response, 'error.data.error')}`))
    }

    if (response.error != null) {
      trackError(new GeneralError('Error creating tag'))
    }
  }

  const handleTagCreation = async (name: string, parentId: number): Promise<void> => {
    const createTagParameters: CreateTagParameters = {
      parentId,
      name
    }

    await tagCreation(createTagParameters)
  }

  const tagDeletion = async (tagId: number): Promise<void> => {
    const response = (await deleteTag({ id: tagId })) as { error?: { data?: { error?: string | null } } }

    if ('data' in response) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      messageApi.success({
        content: t('tag-configuration.successful-deletion'),
        type: 'success',
        duration: 3
      })
    }

    if (!isEmpty(get(response, 'error.data.error'))) {
      trackError(new GeneralError(`Error deleting tag: ${get(response, 'error.data.error')}`))
    }

    if (response.error != null) {
      trackError(new GeneralError('Error deleting tag'))
    }
  }

  return {
    tags: tags?.items ?? [], setTagFilter: setFilter, tagsFetching, tagsLoading, handleTagUpdate, handleTagCreation, tagDeletion, getTag, rootTagFolder
  }
}
