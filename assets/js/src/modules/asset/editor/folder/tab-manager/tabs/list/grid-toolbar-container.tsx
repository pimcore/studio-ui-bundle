import React from 'react'
import { GridToolbarView } from './grid-toolbar-view'
import { Pagination } from '@Pimcore/components/pagination/pagination'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  return (
    <GridToolbarView
      renderPagination={
        <Pagination
          current={ pager.current }
          defaultPageSize={ pager.pageSize }
          onChange={ pager.onChange }
          pageSizeOptions={ ['10', '20', '50', '100'] }
          showSizeChanger
          showTotal={ (total) => t('pagination.show-total', { total }) }
          total={ pager.total }
        />
      }
    />
  )
}

export { GridToolbarContainer }
