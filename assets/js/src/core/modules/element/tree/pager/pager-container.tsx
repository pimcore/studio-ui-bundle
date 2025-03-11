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

import { type TreePagerProps } from '@Pimcore/components/element-tree/element-tree'
import { useElementTreeNode } from '@Pimcore/components/element-tree/hooks/use-element-tree-node'
import { Pagination } from '@Pimcore/components/pagination/pagination'
import React from 'react'
import { useTreeFilter } from '../provider/tree-filter-provider/use-tree-filter'

const PagerContainer = (props: TreePagerProps): React.JSX.Element => {
  const { page, setPage } = useElementTreeNode(props.node.id)
  const { pageSize } = useTreeFilter()
  const total = props.total

  function onChange (newPage: number): void {
    if (page !== newPage) {
      setPage(newPage)
    }
  }

  return (
    <Pagination
      amountOfVisiblePages={ 3 }
      current={ page }
      defaultPageSize={ pageSize }
      hideOnSinglePage
      onChange={ onChange }
      total={ total }
    />
  )
}

export { PagerContainer }
