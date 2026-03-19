/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, useMemo } from 'react'
import { AutoComplete, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { useStyles } from '@Pimcore/components/search-input/search-input.styles'
import { Icon } from '@Pimcore/components/icon/icon'
import type { TreeDataItem } from '@Pimcore/components/tree-element/tree-element'
import { findNodeByKey } from '@Pimcore/modules/select-option/components/tree/tree-helper'

interface ITreeAutocompleteProps {
  treeData: TreeDataItem[]
  onSelect: (key: string) => void
}

const collectLeafItems = (nodes: TreeDataItem[]): Array<{ key: string, title: string }> => {
  const result: Array<{ key: string, title: string }> = []

  for (const node of nodes) {
    if (node.isLeaf === true) {
      result.push({ key: String(node.key), title: String(node.title ?? '') })
    }

    if (node.children !== undefined && node.children !== null) {
      result.push(...collectLeafItems(node.children as TreeDataItem[]))
    }
  }

  return result
}

const TreeAutocomplete = ({ treeData, onSelect }: ITreeAutocompleteProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [searchValue, setSearchValue] = useState<string>('')
  const { styles } = useStyles()

  const allLeafItems = useMemo(() => collectLeafItems(treeData), [treeData])

  const searchOptions = useMemo(() => {
    if (searchValue === '') {
      return []
    }

    const lower = searchValue.toLowerCase()
    return allLeafItems
      .filter((item) => item.title.toLowerCase().includes(lower))
      .map((item) => ({
        value: item.key,
        label: (
          <div>
            <Icon
              options={ { width: 14, height: 14 } }
              value='select-type'
            /> {item.title}
          </div>
        )
      }))
  }, [searchValue, allLeafItems])

  return (
    <AutoComplete
      className={ 'tree--search' }
      onSearch={ (value) => { setSearchValue(value) } }
      onSelect={ (id) => {
        const node = findNodeByKey(treeData, id)
        if (node !== undefined) {
          onSelect(String(id))
        }
        setSearchValue('')
      } }
      options={ searchOptions }
      value={ searchValue }
    >
      <Input.Search
        allowClear={ {
          clearIcon: (
            <Icon
              className={ styles.closeIcon }
              value='close'
            />
          )
        } }
        className={ styles.searchWithoutAddon }
        placeholder={ t('select-option.tree.search') }
        prefix={
          <Icon
            className={ styles.searchIcon }
            options={ { width: 12, height: 12 } }
            value='search'
          />
        }
      />
    </AutoComplete>
  )
}

export { TreeAutocomplete }
