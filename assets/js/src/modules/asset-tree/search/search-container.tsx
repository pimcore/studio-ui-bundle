import React, { useContext, useEffect, useState } from 'react'
import { TreeContext, type TreeSearchProps } from '@Pimcore/components/tree/tree'
import { Input } from 'antd'

const { Search } = Input

const SearchContainer = (props: TreeSearchProps): React.JSX.Element => {
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
      onSearch={onSearch}
      size='small'
      placeholder={`Search in ${node.label}`}
      aria-label={`Search in ${node.label}`}
    />
  )
}

export { SearchContainer }
