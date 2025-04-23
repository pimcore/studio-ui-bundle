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

import React, { type Key, useEffect } from 'react'
import {
  type Tag,
  type TagAssignToElementApiArg
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { flattenArray } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/utils/flattn-tags-array'
import { Flex } from '@Pimcore/components/flex/flex'
import { type TreeDataItem, TreeElement } from '@Pimcore/components/tree-element/tree-element'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import {
  createTreeStructure
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/components/tags-tree/create-tree-structure'
import { useHandleCheck } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/hooks/use-handle-check-tags'
import { isNil, isNull } from 'lodash'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
  const flatTags = flattenArray(tags).filter((tag) => tag.id !== undefined)
  const [defaultExpandedKeys, setDefaultExpandedKeys] = React.useState<Key[]>([0, ...defaultCheckedTags])
  const { handleCheck, loadingNodes } = useHandleCheck({
    elementId,
    elementType,
    flatTags,
    setDefaultCheckedTags
  })

  const treeData = createTreeStructure({ tags, loadingNodes })

  const getAllTreeKeys = (treeData: TreeDataItem[]): string[] => {
    const result: string[] = []

    const traverse = (nodes: TreeDataItem[]): void => {
      for (const node of nodes) {
        if (node.key !== undefined) {
          result.push(String(node.key))
        }
        if (!isNull(node.children)) {
          traverse(node.children as TreeDataItem[])
        }
      }
    }

    traverse(treeData)

    return result
  }

  useEffect(() => {
    if (!isNil(filter) && filter.length > 0) {
      setDefaultExpandedKeys([0, ...getAllTreeKeys(treeData)])
    }
  }, [filter])

  return (
    <Flex
      gap="small"
      vertical
    >
      <SearchInput
        loading={ isLoading }
        onSearch={ setFilter }
        placeholder={ t('search') }
      />

      <TreeElement
        checkStrictly
        checkedKeys={ { checked: defaultCheckedTags, halfChecked: [] } }
        defaultExpandedKeys={ defaultExpandedKeys }
        onCheck={ handleCheck }
        treeData={ treeData }
        withCustomSwitcherIcon
      />
    </Flex>
  )
}
