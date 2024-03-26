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
      current={page}
      onChange={onChange}
      hideOnSinglePage
      simple
      pageSize={maxItemsPerNode}
      total={total}
    />
  )
}

export { PagerContainer }
