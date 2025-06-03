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
  type ClassificationStoreGetCollectionsApiArg,
  useClassificationStoreGetCollectionsQuery
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
import { Content } from '@Pimcore/components/content/content'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'

interface CollectionTabProps {
  storeId: ClassificationStoreGetCollectionsApiArg['storeId']
  objectId: ClassificationStoreGetCollectionsApiArg['objectId']
  fieldName: ClassificationStoreGetCollectionsApiArg['fieldName']
}

export const CollectionTab = (props: CollectionTabProps): React.JSX.Element => {
  const { isLoading, data } = useClassificationStoreGetCollectionsQuery({
    storeId: props.storeId,
    objectId: props.objectId,
    page: 1,
    pageSize: 10,
    fieldName: props.fieldName
  }, { refetchOnMountOrArgChange: true })

  if (isLoading) {
    return <Content loading />
  }

  const columnHelper = createColumnHelper<any>()

  const columnList = [
    columnHelper.accessor('id', {
      header: 'Id',
      size: 100
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      size: 200
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      size: 200
    })
  ]

  return (
    <Content>
      <ContentLayout
        renderToolbar={ <div>Render Bottom</div> }
        renderTopBar={ <div>Render Top</div> }
      >
        <Grid
          columns={ columnList }
          data={ data?.items as any }
        />
      </ContentLayout>
    </Content>
  )
}
