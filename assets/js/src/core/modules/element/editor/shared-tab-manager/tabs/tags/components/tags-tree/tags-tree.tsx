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
import { Input, Tree, type TreeProps } from 'antd'
import {
  type Tag,
  type TagAssignToElementApiArg,
  useTagBatchReplaceForElementsByTypeMutation
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import {
  useCreateTreeStructure
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/components/tags-tree/hooks/use-create-tree-structure'
import {
  useOptimisticUpdate
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/hooks/use-optimistic-update'
import { flattenArray } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/utils/flattn-tags-array'
import { Flex } from '@Pimcore/components/flex/flex'

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
  const { Search } = Input
  const { createTreeStructure } = useCreateTreeStructure()
  const [replaceTagsMutation] = useTagBatchReplaceForElementsByTypeMutation()
  const treeData = createTreeStructure({ tags })
  const { updateTagsForElementByTypeAndId } = useOptimisticUpdate()
  const flatTags = flattenArray(tags)

  const applyTagsToElement = async (checkedTags: Key[]): Promise<void> => {
    const cacheUpdate = updateTagsForElementByTypeAndId({
      elementType,
      id: elementId,
      flatTags,
      checkedTags: checkedTags.map(Number)
    })

    setDefaultCheckedTags(checkedTags)

    try {
      void replaceTagsMutation({
        elementType,
        elementTagIdCollection: {
          elementIds: [elementId],
          tagIds: checkedTags.map(Number)
        }
      }).unwrap()
    } catch (error) {
      cacheUpdate.undo()
    }
  }

  const onCheck: TreeProps['onCheck'] = (checkedKeys: { checked: Key[], halfChecked: Key[] }, info) => {
    void applyTagsToElement(checkedKeys.checked)
  }

  return (
    <Flex
      gap={ 'small' }
      vertical
    >
      <Search
        loading={ isLoading }
        onChange={ (e) => {
          const { value } = e.target

          setFilter(value)
        } }
        placeholder="Search"
      />

      <Tree
        checkStrictly
        checkable
        checkedKeys={ { checked: defaultCheckedTags, halfChecked: [] } }
        defaultExpandedKeys={ ['root'] }
        onCheck={ onCheck }
        showIcon
        treeData={ treeData }
      />
    </Flex>
  )
}
