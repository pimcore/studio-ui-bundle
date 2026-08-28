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
import {
  type DependencyGetCollectionByElementTypeApiResponse
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/dependencies/dependencies-api-slice-enhanced'
import { t } from 'i18next'
import { Pagination as PimPagination } from '@Pimcore/components/pagination/pagination'
import {
  PaginationSkeleton
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/dependencies/components/pagination/skeleton'
import { appConfig } from '@Pimcore/app/config/app-config'

type PaginationProps = Partial<DependencyGetCollectionByElementTypeApiResponse> & {
  page: number
  isLoading: boolean
  onChange: (page: number, pageSize: number) => void
}

export const Pagination = (props: PaginationProps): React.JSX.Element => {
  if (props.isLoading) {
    return <PaginationSkeleton />
  }

  if (!props.isLoading && props.totalItems === 0) {
    return <></>
  }

  return (
    <PimPagination
      current={ props.page }
      defaultPageSize={ appConfig.defaultPageSize }
      onChange={ props.onChange }
      pageSizeOptions={ appConfig.pageSizeOptions }
      showSizeChanger
      showTotal={ (total) => t('pagination.show-total', { total }) }
      total={ props.totalItems ?? 0 }
    />
  )
}
