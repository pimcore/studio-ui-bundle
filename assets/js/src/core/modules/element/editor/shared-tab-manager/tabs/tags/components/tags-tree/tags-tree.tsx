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

import React, { type Key } from 'react'
import {
  type Tag,
  type TagAssignToElementApiArg,
  useTagAssignToElementMutation,
  useTagUnassignFromElementMutation
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import {
  useCreateTreeStructure
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/components/tags-tree/hooks/use-create-tree-structure'
import {
  useOptimisticUpdate
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/hooks/use-optimistic-update'
import { flattenArray } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/utils/flattn-tags-array'
import { Flex } from '@Pimcore/components/flex/flex'
import { TreeElement } from '@Pimcore/components/tree-element/tree-element'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { type TreeProps } from 'antd'

export interface TagsTreeProps {
  elementId: number
  elementType: TagAssignToElementApiArg['elementType']
  tags: Tag[]
  setFilter: (filter: string) => void
  isLoading?: boolean
  defaultCheckedTags: React.Key[]
  setDefaultCheckedTags: (tags: React.Key[]) => void
}

export const TagsTree = ({ elementId, elementType, tags, setFilter, isLoading, defaultCheckedTags, setDefaultCheckedTags }: TagsTreeProps): React.JSX.Element => {
  const { createTreeStructure } = useCreateTreeStructure()
  const treeData = createTreeStructure({ tags })
  // const [treeData, setTreeData] = useState(createTreeStructure({ tags }))
  // const [expandedKeys, setExpandedKeys] = useState<Key[]>([])

  const { updateTagsForElementByTypeAndId } = useOptimisticUpdate()
  const flatTags = flattenArray(tags)
  const [assignTag, { isLoading: tagIsLoading }] = useTagAssignToElementMutation()
  const [unassignTag] = useTagUnassignFromElementMutation()

  console.log('----> tagIsLoading', tagIsLoading)

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

  const handleCheck: TreeProps['onCheck'] = async (checkedKeys: { checked: Key[], halfChecked: Key[] }, info): Promise<void> => {
    const tagId = Number(info.node.key)

    void applyTagsToElement(checkedKeys.checked)

    try {
      info.checked
        ? await assignTagToElement(tagId)
        : await removeTagFromElement(tagId)
    } catch (e) {
      void applyTagsToElement(checkedKeys.checked.filter((key) => key !== tagId))
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
