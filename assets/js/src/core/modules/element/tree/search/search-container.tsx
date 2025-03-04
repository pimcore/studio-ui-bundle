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

import React, { useContext, useEffect, useState } from 'react'
import { Input } from 'antd'
import { isUndefined } from 'lodash'
import { TreeContext, type TreeSearchProps } from '@Pimcore/components/element-tree/element-tree'
import { useNodeState } from '@Pimcore/components/element-tree/hooks/use-node-state'

const { Search } = Input

export type SearchContainerProps = TreeSearchProps & {
  label: string
}

const SearchContainer = (props: SearchContainerProps): React.JSX.Element => {
  const { total } = props
  const [searchActive, setSearchActive] = useState(false)
  const { maxItemsPerNode } = useContext(TreeContext)
  const { setSearchTerm, setPage } = useNodeState(props.node.id)

  useEffect(() => {
    if (!isUndefined(maxItemsPerNode)) {
      total > maxItemsPerNode && setSearchActive(true)
    }
  }, [total])

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
      loading={ props.isLoading }
      onSearch={ onSearch }
      placeholder={ props.label }
      size='small'
    />
  )
}

export { SearchContainer }
