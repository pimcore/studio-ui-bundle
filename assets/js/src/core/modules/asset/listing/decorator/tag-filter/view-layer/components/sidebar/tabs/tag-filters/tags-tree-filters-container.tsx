/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type Key, useEffect, useState } from 'react'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { type TreeDataItem, TreeElement } from '@Pimcore/components/tree-element/tree-element'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import {
  createTreeStructure
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/components/tags-tree/create-tree-structure'
import {
  useTagGetCollectionQuery
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice-enhanced'
import { isEmpty, isNil, isNull, isUndefined } from 'lodash'
import { useTranslation } from 'react-i18next'

const getAllTreeKeys = (treeData: TreeDataItem[]): string[] => {
  const result: string[] = []

  const traverse = (nodes: TreeDataItem[]): void => {
    for (const node of nodes) {
      if (!isUndefined(node.key)) {
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

interface TagsTreeFiltersContainerProps {
  checkedKeys: Key[]
  setCheckedKeys: (keys: Key[]) => void
}

export const TagsTreeFiltersContainer = ({ checkedKeys, setCheckedKeys }: TagsTreeFiltersContainerProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<string>('')
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([0])
  const { data: tags, isLoading: tagsLoading } = useTagGetCollectionQuery({
    page: 1,
    pageSize: 9999,
    filter
  })

  const treeData = !isUndefined(tags?.items)
    ? createTreeStructure({ tags: tags.items, loadingNodes: new Set<string>() })
    : []

  useEffect(() => {
    if (!isNil(filter) && !isEmpty(filter)) {
      setExpandedKeys([0, ...getAllTreeKeys(treeData)])
    }
  }, [filter, tags])

  if (tagsLoading) {
    return <Content loading />
  }

  if (isUndefined(tags?.items)) {
    return <div>Failed to load tags</div>
  }

  const handleCheck = (currentCheckedKeys: { checked: Key[], halfChecked: Key[] }): void => {
    const checkedKeysList = currentCheckedKeys.checked

    // Set state for visualization in the Tree
    setCheckedKeys(checkedKeysList)
  }

  return (
    <Flex
      data-testid="tag-filter-tree"
      gap={ 'small' }
      vertical
    >
      <SearchInput
        loading={ tagsLoading }
        onSearch={ setFilter }
        placeholder={ t('search') }
      />

      <TreeElement
        checkStrictly
        checkedKeys={ { checked: checkedKeys, halfChecked: [] } }
        expandedKeys={ expandedKeys }
        onCheck={ handleCheck }
        onExpand={ (keys) => { setExpandedKeys(keys) } }
        treeData={ treeData }
        withCustomSwitcherIcon
      />
    </Flex>
  )
}
