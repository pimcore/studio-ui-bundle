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
import { Pagination as BasePagination, type PaginationProps as BasePaginationProps } from '@Pimcore/components/pagination/pagination'
import { usePaging } from '../context-layer/paging/provider/use-paging'
import { useData } from '../../../abstract/data-layer/provider/data/use-data'
import { t } from 'i18next'

export const Pagination = (): React.JSX.Element => {
  const context = usePaging()
  const { data } = useData()

  if (data === undefined || context === undefined) {
    return <></>
  }

  const onChange: BasePaginationProps['onChange'] = (page, pageSize) => {
    const newPageSize = pageSize as unknown as string

    context.setPage(page)
    context.setPageSize(parseInt(newPageSize))
  }

  return (
    <BasePagination
      current={ context.page }
      defaultPageSize={ context.pageSize }
      onChange={ onChange }
      pageSizeOptions={ [10, 20, 50, 100] }
      showSizeChanger
      showTotal={ (total) => t('pagination.show-total', { total }) }
      total={ data.totalItems }
    />
  )
}
