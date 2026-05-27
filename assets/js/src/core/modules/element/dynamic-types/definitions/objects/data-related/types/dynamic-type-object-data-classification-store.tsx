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
import { get, isEmpty, isUndefined } from 'lodash'
import { type FormItemProps } from 'antd'
import { DynamicTypeObjectDataAbstract } from '../dynamic-type-object-data-abstract'
import { ClassificationStore, type ClassificationStoreProps } from '../components/classification-store/classification-store'
import { type IExtractLocalizedFieldsProps, type ILocalizedFieldDescriptor } from '@Pimcore/modules/data-object/editor/toolbar/language-comparison-view/helpers/process-layout-data'
import {
  type IFormattedDataStructureData,
  type IProcessVersionFieldDataProps
} from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/types'
import { getBreadcrumbTitle } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/details-functions'
import { type ClassificationStoreGroup } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

export const CLASSIFICATION_STORE_LANGUAGE_COMPARISON_DYNAMIC_LOCALE = 'language-comparison-locale'

export class DynamicTypeObjectDataClassificationStore extends DynamicTypeObjectDataAbstract {
  id: string = 'classificationstore'

  getObjectDataComponent (props: ClassificationStoreProps): React.ReactElement<ClassificationStoreProps> {
    return <ClassificationStore { ...props } />
  }

  getObjectDataFormItemProps (props: ClassificationStoreProps): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      label: null
    }
  }

  async extractLocalizedFields (props: IExtractLocalizedFieldsProps): Promise<ILocalizedFieldDescriptor[] | false> {
    const { item, fieldBreadcrumbTitle, formPath } = props

    if (item?.localized === false) {
      return []
    }

    const normalizeGroups = (value: unknown): any[] => {
      if (Array.isArray(value)) {
        return value
      }

      if (value != null && typeof value === 'object') {
        return Object.values(value)
      }

      return []
    }

    const activeGroupDefinitions = normalizeGroups(item.activeGroupDefinitions)

    if (activeGroupDefinitions.length === 0) return []

    const getTitle: string | undefined = !isEmptyValue(item?.title) ? item?.title : item?.name
    const breadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, getTitle ?? '')

    const processClassificationStoreData = ({
      data,
      updatedFieldBreadcrumbTitle = breadcrumbTitle,
      groupId
    }: {
      data: any[]
      updatedFieldBreadcrumbTitle?: string
      groupId?: number
    }): ILocalizedFieldDescriptor[] => {
      return normalizeGroups(data).flatMap((dataItem: any) => {
        const keys = normalizeGroups(dataItem.keys)

        if (keys.length > 0) {
          const currentTitle: string | undefined = !isEmptyValue(dataItem?.title) ? dataItem?.title : dataItem?.name
          const nextBreadcrumbTitle = getBreadcrumbTitle(updatedFieldBreadcrumbTitle, currentTitle ?? '')

          return processClassificationStoreData({
            data: keys,
            updatedFieldBreadcrumbTitle: nextBreadcrumbTitle,
            groupId: dataItem.id
          })
        }

        if (isEmpty(dataItem.definition) || isUndefined(groupId)) {
          return []
        }

        return [{
          fieldBreadcrumbTitle: updatedFieldBreadcrumbTitle,
          fieldData: { ...dataItem.definition, name: dataItem.id },
          formPath: [...formPath, item.name, String(groupId), CLASSIFICATION_STORE_LANGUAGE_COMPARISON_DYNAMIC_LOCALE, dataItem.id],
          localeInFormPath: true
        }]
      })
    }

    return processClassificationStoreData({ data: activeGroupDefinitions })
  }

  async processVersionFieldData (props: IProcessVersionFieldDataProps): Promise<IFormattedDataStructureData[]> {
    const { item, fieldBreadcrumbTitle, fieldValueByName, fieldPath, versionId, versionCount } = props

    const getFieldData = ({ fieldData, fieldValue, fieldBreadcrumbTitle, fieldPathValue }: { fieldData: any, fieldValue: any, fieldBreadcrumbTitle: string, fieldPathValue: string }): IFormattedDataStructureData => {
      return {
        fieldBreadcrumbTitle,
        versionId,
        versionCount,
        fieldData,
        fieldValue,
        fieldPath: fieldPathValue
      }
    }

    const processClassificationStoreData = ({ data, updatedFieldBreadcrumbTitle = fieldBreadcrumbTitle, groupId, fieldPathValue = fieldPath }: { data: ClassificationStoreGroup[], updatedFieldBreadcrumbTitle?: string, groupId?: number, fieldPathValue?: string }): IFormattedDataStructureData[] => {
      return data.flatMap((dataItem: any) => {
        if (!isEmpty(dataItem.keys)) {
          const breadcrumbField = dataItem.title ?? dataItem.name
          const breadcrumbTitle = getBreadcrumbTitle(updatedFieldBreadcrumbTitle, breadcrumbField as string)

          const getFieldPathValue = isEmptyValue(fieldPathValue) ? `${dataItem.id}` : `${fieldPathValue}.${dataItem.id}`

          return processClassificationStoreData({ data: dataItem.keys, updatedFieldBreadcrumbTitle: breadcrumbTitle, groupId: dataItem.id, fieldPathValue: getFieldPathValue })
        }

        if (!isEmpty(dataItem.definition)) {
          if (isUndefined(groupId)) return []

          const fieldValue: object = get(fieldValueByName, groupId)

          if (isEmpty(fieldValue)) {
            const getFieldPathValue = isEmptyValue(fieldPathValue) ? `${dataItem.id}` : `${fieldPathValue}.${dataItem.id}`

            return getFieldData({ fieldData: { ...dataItem.definition }, fieldValue, fieldBreadcrumbTitle: updatedFieldBreadcrumbTitle, fieldPathValue: getFieldPathValue })
          }

          return Object.entries(fieldValue).map(([key, value]) => {
            const getFieldPathValue = isEmptyValue(fieldPathValue) ? `${key}` : `${fieldPathValue}.${key}.${dataItem.id}`

            return getFieldData({ fieldData: { ...dataItem.definition, locale: key }, fieldValue: value[dataItem.id], fieldBreadcrumbTitle: updatedFieldBreadcrumbTitle, fieldPathValue: getFieldPathValue })
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
