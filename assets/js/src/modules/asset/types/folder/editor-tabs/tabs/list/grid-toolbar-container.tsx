import React from 'react'
import { GridToolbarView } from './grid-toolbar-view'
import { Pagination } from 'antd'

interface GridToolbarContainerProps {
  pager: {
    total: number
    pageSize: number
    current: number
    onChange: (page: number, pageSize: number) => void
  }
}

const GridToolbarContainer = (props: GridToolbarContainerProps): React.JSX.Element => {
  const { pager } = props

  return (
    <GridToolbarView
      renderPagination={
        <Pagination
          total={pager.total}
          showTotal={(total) => `Total ${total} items`} // @todo translation
          defaultPageSize={pager.pageSize}
          current={pager.current}
          onChange={pager.onChange}
          pageSizeOptions={['10', '20', '50', '100']}
        />
      }
    />
  )
}

export { GridToolbarContainer }
