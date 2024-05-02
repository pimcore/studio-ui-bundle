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

import { TreeContext, type TreePagerProps } from '@Pimcore/components/tree/tree'
import { Pagination } from 'antd'
import React, { useContext, useEffect, useState } from 'react'

const PagerContainer = (props: TreePagerProps): React.JSX.Element => {
  const [page, setPage] = useState(1)
  const { maxItemsPerNode } = useContext(TreeContext)
  const total = props.total

  useEffect(() => {
    setPage(1)
  }, [props.total])

  function onChange (page: number): void {
    setPage(page)
    props.mergeAdditionalQueryParams({ page })
  }

  return (
    <Pagination
      current={ page }
      hideOnSinglePage
      onChange={ onChange }
      pageSize={ maxItemsPerNode }
      simple
      total={ total }
    />
  )
}

export { PagerContainer }
