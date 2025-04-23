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
import {
  type DependencyGetCollectionByElementTypeApiResponse
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/dependencies/dependencies-api-slice-enhanced'
import { t } from 'i18next'
import { Pagination as PimPagination } from '@Pimcore/components/pagination/pagination'
import {
  PaginationSkeleton
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/dependencies/components/pagination/skeleton'

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
      defaultPageSize={ 20 }
      onChange={ props.onChange }
      pageSizeOptions={ [10, 20, 50, 100] }
      showSizeChanger
      showTotal={ (total) => t('pagination.show-total', { total }) }
      total={ props.totalItems ?? 0 }
    />
  )
}
