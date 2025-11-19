import React from 'react'
import { Pagination } from '@Pimcore/modules/element/listing/decorators/paging/pagination/pagination'
import { Split } from '@Pimcore/components/split/split'
import { Refetch } from '@Pimcore/modules/element/listing/abstract/view-layer/components/refetch/refetch'

export const ToolbarRight = (): React.JSX.Element => {
  return (
    <Split size='extra-small'>
      <Refetch />
      <Pagination />
    </Split>
  )
}
