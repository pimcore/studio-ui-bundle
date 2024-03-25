import React from 'react'
import { type TreeSearchProps } from '@Pimcore/components/tree/tree'
import { Input } from 'antd'

const { Search } = Input

const SearchContainer = (props: TreeSearchProps): React.JSX.Element => {
  const { setAdditionalQueryParams } = props

  function onSearch (searchTerm: string): void {
    setAdditionalQueryParams!({
      idSearchTerm: searchTerm
    })
  }

  return (
    <Search onSearch={onSearch} size='small' />
  )
}

export { SearchContainer }
