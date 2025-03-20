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
import { Input } from 'antd'
import { isEmpty } from 'lodash'
import { type TreeSearchProps } from '@Pimcore/components/element-tree/element-tree'
import { useElementTreeNode } from '@Pimcore/components/element-tree/hooks/use-element-tree-node'
import { useTreeFilter } from '../provider/tree-filter-provider/use-tree-filter'

const { Search } = Input

export type SearchContainerProps = TreeSearchProps & {
  label: string
}

const SearchContainer = (props: SearchContainerProps): React.JSX.Element => {
  const { searchTerm, setSearchTerm, setPage } = useElementTreeNode(props.node.id)
  const { total } = props
  const { pageSize } = useTreeFilter()
  const searchActive = !isEmpty(searchTerm) || total > pageSize

  function onSearch (searchTerm: string): void {
    setSearchTerm(searchTerm === '' ? undefined : searchTerm)
    setPage(1)
  }

  if (!searchActive) {
    return <></>
  }

  return (
    <Search
      aria-label={ props.label }
      defaultValue={ searchTerm }
      loading={ props.isLoading }
      onSearch={ onSearch }
      placeholder={ props.label }
      size='small'
    />
  )
}

export { SearchContainer }
