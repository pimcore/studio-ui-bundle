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
