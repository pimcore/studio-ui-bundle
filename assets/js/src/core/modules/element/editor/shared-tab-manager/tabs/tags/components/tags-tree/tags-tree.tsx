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

import React, { type Key, useState } from 'react'
import {
  type Tag,
  type TagAssignToElementApiArg
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import {
  useOptimisticUpdate
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/hooks/use-optimistic-update'
import { flattenArray } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/utils/flattn-tags-array'
import { Flex } from '@Pimcore/components/flex/flex'
import { TreeElement } from '@Pimcore/components/tree-element/tree-element'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { type TreeProps } from 'antd'
import {
  createTreeStructure
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/components/tags-tree/create-tree-structure'
import { t } from 'i18next'
import { useMessage } from '@Pimcore/components/message/useMessage'
import {
  useTagAssignToElementMutation,
  useTagUnassignFromElementMutation
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice-enhanced'

export interface TagsTreeProps {
  elementId: number
  elementType: TagAssignToElementApiArg['elementType']
  tags: Tag[]
  setFilter: (filter: string) => void
  isLoading?: boolean
  defaultCheckedTags: React.Key[]
  setDefaultCheckedTags: (tags: React.Key[]) => void
}

export const TagsTree = ({
  elementId,
  elementType,
  tags,
  setFilter,
  isLoading,
  defaultCheckedTags,
  setDefaultCheckedTags
}: TagsTreeProps): React.JSX.Element => {
  const { updateTagsForElementByTypeAndId } = useOptimisticUpdate()
  const messageApi = useMessage()
  const flatTags = flattenArray(tags)
  const [assignTag] = useTagAssignToElementMutation()
  const [loadingNodes, setLoadingNodes] = useState<Set<string>>(new Set())
  const [unassignTag] = useTagUnassignFromElementMutation()
  const treeData = createTreeStructure({ tags, loadingNodes })

  const applyTagsToElement = async (checkedTags: Key[]): Promise<void> => {
    updateTagsForElementByTypeAndId({
      elementType,
      id: elementId,
      flatTags,
      checkedTags: checkedTags.map(Number)
    })

    setDefaultCheckedTags(checkedTags)
  }

  const assignTagToElement = async (tagId: number): Promise<void> => {
    const assignTask = assignTag({
      elementType,
      id: elementId,
      tagId
    })

    assignTask.catch(() => {
      console.log('Failed to assign tag to element')
    })

    const response = (await assignTask) as any

    if (response.error !== undefined) {
      throw new Error(response.error.data.error as string)
    }
  }

  const removeTagFromElement = async (tagId: number): Promise<void> => {
    const unassignTask = unassignTag({
      elementType,
      id: elementId,
      tagId
    })

    unassignTask.catch(() => {
      console.log('Failed to remove tag from element')
    })

    const response = (await unassignTask) as any

    if (response.error !== undefined) {
      throw new Error(response.error.data.error as string)
    }
  }

  const handleCheck: TreeProps['onCheck'] = async (checkedKeys: {
    checked: Key[]
    halfChecked: Key[]
  }, info): Promise<void> => {
    const tagId = Number(info.node.key)
    setLoadingNodes((prev) => new Set(prev).add(String(tagId)))

    void applyTagsToElement(checkedKeys.checked)

    try {
      info.checked
        ? await assignTagToElement(tagId)
        : await removeTagFromElement(tagId)
    } catch (e) {
      console.log('----> here', (checkedKeys.checked))
      const errorMessage = info.checked
        ? t('failed-to-assign-tag-to-element')
        : t('failed-to-un-assign-tag-to-element')
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      messageApi.error({
        content: errorMessage,
        type: 'error',
        duration: 5
      })

      void applyTagsToElement(checkedKeys.checked.filter((key) => key !== String(tagId)))
    } finally {
      setLoadingNodes((prev) => {
        const newSet = new Set(prev)
        newSet.delete(String(tagId))
        return newSet
      })
    }
  }

  return (
    <Flex
      gap={ 'small' }
      vertical
    >
      <SearchInput
        loading={ isLoading }
        onChange={ (e) => {
          const { value } = e.target

          setFilter(value)
        } }
        placeholder="Search"
      />

      <TreeElement
        checkStrictly
        checkedKeys={ { checked: defaultCheckedTags, halfChecked: [] } }
        defaultExpandedKeys={ ['root'] }
        onCheck={ handleCheck }
        treeData={ treeData }
        withCustomSwitcherIcon
      />
    </Flex>
  )
}
