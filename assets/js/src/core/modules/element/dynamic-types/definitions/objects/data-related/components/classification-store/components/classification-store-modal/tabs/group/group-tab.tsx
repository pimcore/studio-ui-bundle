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
import { createColumnHelper } from '@tanstack/react-table'
import {
  type ClassificationStoreGetGroupsApiArg,
  useClassificationStoreGetGroupsQuery
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
import { ClassificationStoreDataTab } from '../../components/classification-store-data-tab/classification-store-data-tab'

interface CollectionTabProps {
  storeId: ClassificationStoreGetGroupsApiArg['storeId']
  objectId: ClassificationStoreGetGroupsApiArg['objectId']
  fieldName: ClassificationStoreGetGroupsApiArg['fieldName']
}

export const GroupTab = (props: CollectionTabProps): React.JSX.Element => {
  const columnHelper = createColumnHelper()

  const columns = [
    columnHelper.accessor('id', { header: 'Id' }),
    columnHelper.accessor('name', { header: 'Name' }),
    columnHelper.accessor('description', { header: 'Description' })
  ]

  return (
    <ClassificationStoreDataTab
      columns={ columns }
      queryArgs={ {
        storeId: props.storeId,
        objectId: props.objectId,
        fieldName: props.fieldName
      } }
      queryHook={ useClassificationStoreGetGroupsQuery }
    />
  )
}
