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

import { Icon } from '@Pimcore/components/icon/icon'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useStyle as useDependencyTabStyle } from '../../dependencies-container.styles'
import {
  useDependencyGetCollectionByElementTypeQuery
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/dependencies/dependencies-api-slice.gen'
import { Table } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/dependencies/components/table/table'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import {
  Pagination
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/dependencies/components/pagination/pagination'
import {
  ContentHeaderContainer
} from '@Pimcore/components/content-containers/content-header-container'
import { ContentPaddingContainer } from '@Pimcore/components/content-containers/content-padding-container'

export const RequiredByPanel = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles: dependencyTabStyle } = useDependencyTabStyle()
  const { id } = useContext(AssetContext)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)

  const { data, isLoading } = useDependencyGetCollectionByElementTypeQuery({
    elementType: 'asset',
    id: id!,
    page,
    pageSize,
    dependencyMode: 'required_by'
  })

  function onChange (page: number, pageSize: number): void {
    setPage(page)
    setPageSize(pageSize)
  }

  return (
    <div className={ 'pimcore-dependencies__required-by' }>
      <ContentHeaderContainer
        icon={ <Icon name={ 'corner-left-up' } /> }
        text={ t('asset.asset-editor-tabs.dependencies.required-by') }
      />
      <ContentPaddingContainer>
        <Table
          isLoading={ isLoading }
          items={ data?.items ?? [] }
        />
      </ContentPaddingContainer>

      <div className={ ['dependencies__required-by__pagination', dependencyTabStyle.pagination].join(' ') }>
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
