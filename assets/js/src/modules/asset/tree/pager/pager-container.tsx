import { TreeContext, type TreePagerProps } from '@Pimcore/components/tree/tree'
import { Pagination } from '@Pimcore/components/pagination/pagination'
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
      amountOfVisiblePages={ 3 }
      current={ page }
      defaultPageSize={ maxItemsPerNode }
      hideOnSinglePage
      onChange={ onChange }
      total={ total }
    />
  )
}

export { PagerContainer }
