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
import { get, isEmpty } from 'lodash'
import { type FormItemProps } from 'antd'
import { DynamicTypeObjectDataAbstract } from '../dynamic-type-object-data-abstract'
import { ClassificationStore } from '../components/classification-store/classification-store'
import { type ClassificationStoreContentProps } from '../components/classification-store/classification-store-content'
import {
  type IFormattedDataStructureData,
  type IProcessVersionFieldDataProps
} from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/types'
import { getBreadcrumbTitle } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/details-functions'

export class DynamicTypeObjectDataClassificationStore extends DynamicTypeObjectDataAbstract {
  id: string = 'classificationstore'

  getObjectDataComponent (props: ClassificationStoreContentProps): React.ReactElement<ClassificationStoreContentProps> {
    return <ClassificationStore { ...props } />
  }

  getObjectDataFormItemProps (props: ClassificationStoreContentProps): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      label: null
    }
  }

  async processVersionFieldData (props: IProcessVersionFieldDataProps): Promise<any> {
    const { item, fieldBreadcrumbTitle, fieldValueByName, versionId, versionCount } = props

    const getFieldData = ({ fieldData, fieldValue, fieldBreadcrumbTitle }: { fieldData: any, fieldValue: any, fieldBreadcrumbTitle: string }): IFormattedDataStructureData => {
      return {
        fieldBreadcrumbTitle,
        versionId,
        versionCount,
        fieldData,
        fieldValue
      }
    }

    const processClassificationStoreData = ({ data, updatedFieldBreadcrumbTitle = fieldBreadcrumbTitle, groupKey }: { data: any[], updatedFieldBreadcrumbTitle?: string, groupKey?: number }): IFormattedDataStructureData[] => {
      return data.flatMap((dataItem: any) => {
        if (!isEmpty(dataItem.keys)) {
          const breadcrumbField = dataItem.title ?? dataItem.name
          const breadcrumbTitle = getBreadcrumbTitle(updatedFieldBreadcrumbTitle, breadcrumbField as string)

          return processClassificationStoreData({ data: dataItem.keys, updatedFieldBreadcrumbTitle: breadcrumbTitle, groupKey: dataItem.id })
        }

        if (!isEmpty(dataItem.definition)) {
          const fieldValue: object = get(fieldValueByName, groupKey ?? '')

          if (isEmpty(fieldValue)) {
            return getFieldData({ fieldData: { ...dataItem.definition }, fieldValue, fieldBreadcrumbTitle: updatedFieldBreadcrumbTitle })
          }

          return Object.entries(fieldValue).map(([key, value]) => {
            return getFieldData({ fieldData: { ...dataItem.definition, locale: key }, fieldValue: value[dataItem.id], fieldBreadcrumbTitle: updatedFieldBreadcrumbTitle })
          })
        }

        return []
      })
    }

    async function handleClassificationStoreData (): Promise<IFormattedDataStructureData[]> {
      try {
        if (isEmpty(item)) return []

        const breadcrumbField: string = item.title ?? item.name
        const breadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, breadcrumbField)

        return processClassificationStoreData({
          data: item.activeGroupDefinitions,
          updatedFieldBreadcrumbTitle: breadcrumbTitle
        })
      } catch (e) {
        console.error('Error while handling Classification Store data:', e)

        return []
      }
    }

    return await handleClassificationStoreData()
  }
}
