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
  type ClassificationStoreGetKeyGroupRelationsApiArg,
  type ClassificationStoreKeyGroupRelation,
  useClassificationStoreGetKeyGroupRelationsQuery
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
import { ClassificationStoreDataTab } from '../../components/classification-store-data-tab/classification-store-data-tab'

interface GroupByKeyTabProps {
  storeId: ClassificationStoreGetKeyGroupRelationsApiArg['storeId']
  objectId: ClassificationStoreGetKeyGroupRelationsApiArg['objectId']
  fieldName: ClassificationStoreGetKeyGroupRelationsApiArg['fieldName']
}

export const GroupByKeyTab = (props: GroupByKeyTabProps): React.JSX.Element => {
  const columnHelper = createColumnHelper<ClassificationStoreKeyGroupRelation>()

  const columns = [
    columnHelper.accessor(
      row => `${row.groupId}-${row.keyId}`,
      {
        id: 'groupId-keyId',
        header: 'Id'
      }
    ),
    columnHelper.accessor('groupName', { header: 'Group' }),
    columnHelper.accessor('keyName', { header: 'Name' }),
    columnHelper.accessor('keyDescription', { header: 'Description' })
  ]

  return (
    <ClassificationStoreDataTab
      columns={ columns }
      queryArgs={ {
        storeId: props.storeId,
        objectId: props.objectId,
        fieldName: props.fieldName
      } }
      queryHook={ useClassificationStoreGetKeyGroupRelationsQuery }
    />
  )
}
