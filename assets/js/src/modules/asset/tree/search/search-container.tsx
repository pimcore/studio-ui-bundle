/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*/

import React, { useContext, useEffect, useState } from 'react'
import { TreeContext, type TreeSearchProps } from '@Pimcore/components/tree/tree'
import { Input } from 'antd'
import { useTranslation } from 'react-i18next'

const { Search } = Input

const SearchContainer = (props: TreeSearchProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { node, mergeAdditionalQueryParams, total } = props
  const [searchActive, setSearchActive] = useState(false)
  const { maxItemsPerNode } = useContext(TreeContext)

  useEffect(() => {
    if (total > maxItemsPerNode) {
      setSearchActive(true)
    }
  }, [total])

  function onSearch (searchTerm: string): void {
    mergeAdditionalQueryParams!({
      idSearchTerm: searchTerm,
      page: 1
    })
  }

  if (!searchActive) {
    return <></>
  }

  return (
    <Search
      aria-label={ t('asset.asset-tree.search', { folderName: node.label }) }
      onSearch={ onSearch }
      placeholder={ t('asset.asset-tree.search', { folderName: node.label }) }
      size='small'
    />
  )
}

export { SearchContainer }
