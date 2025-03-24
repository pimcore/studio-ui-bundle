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

import React from 'react'
import {
  type Tag,
  type TagAssignToElementApiArg
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { flattenArray } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/utils/flattn-tags-array'
import { Flex } from '@Pimcore/components/flex/flex'
import { TreeElement } from '@Pimcore/components/tree-element/tree-element'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import {
  createTreeStructure
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/components/tags-tree/create-tree-structure'
import { useHandleCheck } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/hooks/use-handle-check-tags'

export interface TagsTreeProps {
  elementId: number
  elementType: TagAssignToElementApiArg['elementType']
  tags: Tag[]
  filter: string
  setFilter: (filter: string) => void
  isLoading?: boolean
  defaultCheckedTags: React.Key[]
  setDefaultCheckedTags: (tags: React.Key[]) => void
}

export const TagsTree = ({
  elementId,
  elementType,
  tags,
  filter,
  setFilter,
  isLoading,
  defaultCheckedTags,
  setDefaultCheckedTags
}: TagsTreeProps): React.JSX.Element => {
  const flatTags = flattenArray(tags).filter((tag) => tag.id !== undefined)

  const { handleCheck, loadingNodes } = useHandleCheck({
    elementId,
    elementType,
    flatTags,
    setDefaultCheckedTags
  })

  const treeData = createTreeStructure({ tags, loadingNodes })

  return (
    <Flex
      gap="small"
      vertical
    >
      <SearchInput
        loading={ isLoading }
        onSearch={ (value) => {
          setFilter(value)
        } }
        placeholder="Search"
      />

      <TreeElement
        checkStrictly
        checkedKeys={ { checked: defaultCheckedTags, halfChecked: [] } }
        filter={ filter }
        onCheck={ handleCheck }
        treeData={ treeData }
        withCustomSwitcherIcon
      />
    </Flex>
  )
}
