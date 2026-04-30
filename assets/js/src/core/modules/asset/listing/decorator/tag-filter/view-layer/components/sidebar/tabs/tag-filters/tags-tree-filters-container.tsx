/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type Key, useState } from 'react'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { TreeElement } from '@Pimcore/components/tree-element/tree-element'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import {
  createTreeStructure
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/components/tags-tree/create-tree-structure'
import {
  useTagGetCollectionQuery
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice-enhanced'
import { isEmpty, isUndefined } from 'lodash'
import { useTranslation } from 'react-i18next'

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

  const handleSearch = (value: string): void => {
    setFilter(value)

    if (!isEmpty(value)) {
      setExpandedKeys((prevKeys) => {
        const hasRoot = prevKeys.some((key) => String(key) === '0')

        return hasRoot ? prevKeys : [0, ...prevKeys]
      })
    }
  }

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
        onSearch={ handleSearch }
        placeholder={ t('search') }
      />

      <TreeElement
        checkStrictly
        checkedKeys={ { checked: checkedKeys, halfChecked: [] } }
        defaultExpandedKeys={ expandedKeys }
        onCheck={ handleCheck }
        onExpand={ (keys) => { setExpandedKeys(keys) } }
        treeData={ treeData }
        withCustomSwitcherIcon
      />
    </Flex>
  )
}
