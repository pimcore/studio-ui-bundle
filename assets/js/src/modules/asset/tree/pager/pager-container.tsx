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
    props.setAdditionalQueryParams({ page })
  }

  return (
    <Pagination
      current={ page }
      defaultPageSize={ maxItemsPerNode }
      hideOnSinglePage
      onChange={ onChange }
      showJumpToPage
      showPageJumperAtOnce={ 2 }
      total={ total }
    />
  )
}

export { PagerContainer }
