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

import React, { useState } from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'
import {
  useDependencyGetCollectionByElementTypeQuery
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/dependencies/dependencies-api-slice-enhanced'
import { Table } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/dependencies/components/table/table'
import {
  Pagination
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/dependencies/components/pagination/pagination'
import { Content } from '@Pimcore/components/content/content'
import { Header } from '@Pimcore/components/header/header'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'

export const RequiresPanel = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id, elementType } = useElementContext()
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)

  const { data, isLoading } = useDependencyGetCollectionByElementTypeQuery({
    elementType,
    id,
    page,
    pageSize,
    dependencyMode: 'requires'
  })

  function onChange (page: number, pageSize: number): void {
    setPage(page)
    setPageSize(pageSize)
  }

  return (
    <ContentLayout renderToolbar={
      <Toolbar
        justify='flex-end'
        theme='secondary'
      >
        <Pagination
          { ...data }
          isLoading={ isLoading }
          onChange={ onChange }
          page={ page }
        />
      </Toolbar>
    }
    >
      <Content
        className={ 'pimcore-dependencies__requires' }
        padded
      >
        <Header
          className={ 'p-l-mini' }
          icon={ <Icon value={ 'requires' } /> }
          title={ t('dependencies.requires') }
        />

        <Table
          isLoading={ isLoading }
          items={ data?.items ?? [] }
        />
      </Content>
    </ContentLayout>
  )
}
