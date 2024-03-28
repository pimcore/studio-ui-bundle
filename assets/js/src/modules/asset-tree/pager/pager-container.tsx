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
    props.setAdditionalQueryParams({ page })
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
