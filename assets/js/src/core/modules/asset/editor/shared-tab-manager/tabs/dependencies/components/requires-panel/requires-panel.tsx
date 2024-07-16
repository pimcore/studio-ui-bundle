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

import React, { useContext, useState } from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'
import { useStyle as useDependencyTabStyle } from '../../dependencies-container.styles'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import {
  useGetDependenciesQuery
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/dependencies/dependencies-api-slice.gen'
import { Table } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/dependencies/components/table/table'
import {
  Pagination
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/dependencies/components/pagination/pagination'

export const RequiresPanel = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles: dependencyTabStyle } = useDependencyTabStyle()
  const { id } = useContext(AssetContext)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)

  const { data, isLoading } = useGetDependenciesQuery({
    elementType: 'asset',
    id: id!,
    page,
    pageSize,
    dependencyMode: 'requires'
  })

  function onChange (page: number, pageSize: number): void {
    setPage(page)
    setPageSize(pageSize)
  }

  return (
    <div className={ 'pimcore-dependencies__requires' }>
      <div className={ ['dependencies__requires__wrapper', dependencyTabStyle.wrapper].join(' ') }>
        <div className={ ['pimcore-dependencies__requires_toolbar', dependencyTabStyle.toolbar].join(' ') }>
          <Icon name={ 'intersect-circle' } />
          <p>{t('asset.asset-editor-tabs.dependencies.requires')}</p>
        </div>

        <div className={ 'pimcore-dependencies__requires__content' }>
          <Table
            isLoading={ isLoading }
            items={ data?.items ?? [] }
          />
        </div>
      </div>

      <div className={ ['dependencies__requires__pagination', dependencyTabStyle.pagination].join(' ') }>
        <Pagination
          { ...data }
          isLoading={ isLoading }
          onChange={ onChange }
          page={ page }
        />
      </div>
    </div>
  )
}
