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
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Pagination } from '@Pimcore/modules/reports/components/pagination/pagination'

interface IReportToolbarProps {
  page: number
  setPage: (page: number) => void
  pageSize: number
  setPageSize: (pageSize: number) => void
  totalItems: number
}

export const ReportToolbar = ({ page, setPage, pageSize, setPageSize, totalItems }: IReportToolbarProps): React.JSX.Element | null => {
  return (
    <Toolbar
      justify="flex-end"
      theme="secondary"
    >
      <Pagination
        page={ page }
        pageSize={ pageSize }
        setPage={ setPage }
        setPageSize={ setPageSize }
        totalItems={ totalItems }
      />
    </Toolbar>
  )
}
