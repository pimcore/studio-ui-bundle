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
  type ClassificationStoreGetGroupsApiArg,
  useClassificationStoreGetGroupsQuery
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
import { ClassificationStoreDataTab } from '../../components/classification-store-data-tab/classification-store-data-tab'
import { TabId } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/types'
import { ClassificationStoreCallbackTab } from '../../components/classification-store-data-tab/classification-store-callback-tab'
import { useClassificationStoreModalOptional } from '../../../../provider/classifcation-store-modal-provider'

interface GroupTabProps {
  storeId: ClassificationStoreGetGroupsApiArg['storeId']
  classId: ClassificationStoreGetGroupsApiArg['classId']
  fieldName: ClassificationStoreGetGroupsApiArg['fieldName']
}

export const GroupTab = (props: GroupTabProps): React.JSX.Element => {
  const columnHelper = createColumnHelper()
  const hasModalContext = useClassificationStoreModalOptional({}) !== undefined
  const { t } = useTranslation()

  const columns = [
    columnHelper.accessor('id', { header: t('classification-store.column.id') }),
    columnHelper.accessor('name', { header: t('classification-store.column.name') }),
    columnHelper.accessor('description', { header: t('classification-store.column.description') })
  ]

  return (
    <>
      {hasModalContext === true && (
        <ClassificationStoreCallbackTab
          columns={ columns }
          queryArgs={ {
            storeId: props.storeId,
            classId: props.classId,
            fieldName: props.fieldName
          } }
          queryHook={ useClassificationStoreGetGroupsQuery }
          tabId={ TabId.Group }
        />
      )}

      {hasModalContext === false && (
        <ClassificationStoreDataTab
          columns={ columns }
          queryArgs={ {
            storeId: props.storeId,
            classId: props.classId,
            fieldName: props.fieldName
          } }
          queryHook={ useClassificationStoreGetGroupsQuery }
          tabId={ TabId.Group }
        />
      )}
    </>
  )
}
