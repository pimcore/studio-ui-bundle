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

import { Pagination as BasePagination, type PaginationProps as BasePaginationProps } from '@Pimcore/components/pagination/pagination'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const Pagination = (props: BasePaginationProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <BasePagination
      pageSizeOptions={ [10, 20, 50, 100] }
      showSizeChanger
      showTotal={ (total) => t('component.pagination.showing-items', { total }) }
      { ...props }
    />
  )
}
