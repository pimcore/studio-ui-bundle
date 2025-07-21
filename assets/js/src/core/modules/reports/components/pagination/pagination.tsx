/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Pagination as BasePagination,
  type PaginationProps as BasePaginationProps
} from '@Pimcore/components/pagination/pagination'

interface PaginationProps {
  page: number
  setPage: (page: number) => void
  pageSize: number
  setPageSize: (pageSize: number) => void
  totalItems: number
}

export const Pagination = ({ page, setPage, pageSize, setPageSize, totalItems }: PaginationProps): React.JSX.Element => {
  const { t } = useTranslation()

  const handleChange: BasePaginationProps['onChange'] = (page, pageSize) => {
    const newPageSize = pageSize as unknown as string

    setPage(page)
    setPageSize(parseInt(newPageSize))
  }

  return (
    <BasePagination
      current={ page }
      defaultPageSize={ pageSize }
      onChange={ handleChange }
      pageSizeOptions={ [10, 20, 50, 100] }
      showSizeChanger
      showTotal={ (total) => t('pagination.show-total', { total }) }
      total={ totalItems }
    />
  )
}
