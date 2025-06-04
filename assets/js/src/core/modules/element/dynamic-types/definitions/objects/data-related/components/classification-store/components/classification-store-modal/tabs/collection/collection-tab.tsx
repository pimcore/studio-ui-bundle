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
  type ClassificationStoreGetCollectionsApiArg,
  useClassificationStoreGetCollectionsQuery
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
import { ClassificationStoreDataTab } from '../../components/classification-store-data-tab/classification-store-data-tab'
import { TabId } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/types'

interface CollectionTabProps {
  storeId: ClassificationStoreGetCollectionsApiArg['storeId']
  objectId: ClassificationStoreGetCollectionsApiArg['objectId']
  fieldName: ClassificationStoreGetCollectionsApiArg['fieldName']
}

export const CollectionTab = (props: CollectionTabProps): React.JSX.Element => {
  const columnHelper = createColumnHelper()
  const { t } = useTranslation()

  const columns = [
    columnHelper.accessor('id', { header: t('classification-store.column.id') }),
    columnHelper.accessor('name', { header: t('classification-store.column.name') }),
    columnHelper.accessor('description', { header: t('classification-store.column.description') })
  ]

  return (
    <ClassificationStoreDataTab
      columns={ columns }
      queryArgs={ {
        storeId: props.storeId,
        objectId: props.objectId,
        fieldName: props.fieldName
      } }
      queryHook={ useClassificationStoreGetCollectionsQuery }
      tabId={ TabId.Collection }
    />
  )
}
