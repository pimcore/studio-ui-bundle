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
import { useTranslation } from 'react-i18next'
import { createColumnHelper } from '@tanstack/react-table'
import {
  type ClassificationStoreGetKeyGroupRelationsApiArg,
  type ClassificationStoreKeyGroupRelation,
  useClassificationStoreGetKeyGroupRelationsQuery
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
import { ClassificationStoreDataTab } from '../../components/classification-store-data-tab/classification-store-data-tab'
import { TabId } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/types'

interface GroupByKeyTabProps {
  storeId: ClassificationStoreGetKeyGroupRelationsApiArg['storeId']
  objectId: ClassificationStoreGetKeyGroupRelationsApiArg['objectId']
  fieldName: ClassificationStoreGetKeyGroupRelationsApiArg['fieldName']
}

export const GroupByKeyTab = (props: GroupByKeyTabProps): React.JSX.Element => {
  const columnHelper = createColumnHelper<ClassificationStoreKeyGroupRelation>()
  const { t } = useTranslation()

  const columns = [
    columnHelper.accessor(
      row => `${row.groupId}-${row.keyId}`,
      {
        id: 'groupId-keyId',
        header: t('classification-store.column.id')
      }
    ),
    columnHelper.accessor('groupName', { header: t('classification-store.column.group') }),
    columnHelper.accessor('keyName', { header: t('classification-store.column.name') }),
    columnHelper.accessor('keyDescription', { header: t('classification-store.column.description') })
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
      tabId={ TabId.GroupByKey }
    />
  )
}
