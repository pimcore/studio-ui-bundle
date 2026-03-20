/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { differenceWith, get, isEmpty, isEqual, isUndefined } from 'lodash'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { type Layout } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import type { DataObjectVersion } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice.gen'
import { type IObjectVersionField } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/types'
import { DATATYPE_LIST, type IFormattedDataStructureData, type IGetFormattedDataStructureProps, type IFieldCollectionValue } from './types'
import { DynamicTypesList } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/constants/typesList'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

export const getBreadcrumbTitle = (value1: string, value2: string): string => {
  return [value1, value2].filter(Boolean).join('/')
}

const fieldTypesRequiringChildren = [DynamicTypesList.BLOCK]

export const getFormattedDataStructure = async ({ objectId, layout, versionData, versionId, versionCount, objectDataRegistry, layoutsList, setLayoutsList }: IGetFormattedDataStructureProps): Promise<IFormattedDataStructureData[]> => {
  const formattedSystemData = {
    fullPath: versionData.fullPath,
    creationDate: formatDateTime({ timestamp: versionData.creationDate ?? null, dateStyle: 'short', timeStyle: 'medium' }),
    modificationDate: formatDateTime({ timestamp: versionData.modificationDate ?? null, dateStyle: 'short', timeStyle: 'medium' })
  }

  const processLayoutData = async ({ data, objectValuesData = versionData?.objectData, fieldBreadcrumbTitle = '', fieldPath = '' }: { data: Layout['children'], objectValuesData?: DataObjectVersion['objectData'], fieldBreadcrumbTitle?: string, fieldPath?: string }): Promise<IFormattedDataStructureData[]> => {
    const promises = data.map(async (item: any) => {
      if (item.datatype === DATATYPE_LIST.LAYOUT) {
        const breadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, item.title as string)

        return await processLayoutData({ data: item.children, fieldBreadcrumbTitle: breadcrumbTitle, objectValuesData, fieldPath })
      }

      if (item.datatype === DATATYPE_LIST.DATA) {
        const fieldName = item.name
        const fieldValueByName = get(objectValuesData, fieldName)
        const currentFieldType: string = item.fieldtype

        const getFieldPathValue = isEmptyValue(fieldPath) ? fieldName : `${fieldPath}.${fieldName}`

        if (!objectDataRegistry.hasDynamicType(currentFieldType)) {
          return []
        }

        const objectDataType = objectDataRegistry.getDynamicType(currentFieldType)

        const processedDataList = await objectDataType.processVersionFieldData({ objectId, item, fieldBreadcrumbTitle, fieldValueByName, versionId, versionCount, layoutsList, setLayoutsList, fieldPath: getFieldPathValue })
        const processedPromises = processedDataList?.map(async (processedDataItem: IFormattedDataStructureData): Promise<IFormattedDataStructureData[]> => {
          objectValuesData = {}

          if (!isEmpty(processedDataItem?.fieldData?.children) && !fieldTypesRequiringChildren.includes(processedDataItem?.fieldData?.fieldtype as DynamicTypesList)) {
            const breadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, processedDataItem?.fieldData?.title ?? '')

            return await processLayoutData({
              data: [processedDataItem?.fieldData],
              objectValuesData: {
                ...objectValuesData,
                [processedDataItem?.fieldData?.name]: processedDataItem?.fieldValue
              },
              fieldBreadcrumbTitle: breadcrumbTitle,
              fieldPath: processedDataItem?.fieldPath ?? ''
            })
          }

          return [processedDataItem]
        })

        return (await Promise.all(processedPromises)).flatMap(item => item)
      }

      return []
    })

    return (await Promise.all(promises)).flatMap(item => item)
  }

  const getGeneralSystemData = (): IFormattedDataStructureData[] => {
    const result: IFormattedDataStructureData[] = []

    Object.entries(formattedSystemData).forEach(([key, value]): void => {
      result.push({ fieldBreadcrumbTitle: 'systemData', fieldData: { title: key, name: key, fieldtype: 'input' } as any, fieldValue: value, versionId, versionCount, fieldPath: '' })
    })

    return result
  }

  const layoutData = await processLayoutData({ data: layout })
  const generalSystemData = getGeneralSystemData()

  return [...generalSystemData, ...layoutData]
}

const getUniqFieldKey = (item: any): string => {
  const path = item.fieldBreadcrumbTitle ?? ''
  const name = item.fieldData?.name ?? ''
  const locale = item.fieldData?.locale ?? 'default'

  return `${path}-${name}-${locale}`
}

export const versionsDataToTableData = ({ data }: { data: IFormattedDataStructureData[][] }): IObjectVersionField[] => {
  const resultList: IObjectVersionField[] = []

  const mainVersionData = data[0] ?? []
  const mainVersionMap = new Map(mainVersionData.map(item => [getUniqFieldKey(item), item]))

  const compareVersionData = data[1] ?? []
  const compareVersionMap = new Map(compareVersionData.map(item => [getUniqFieldKey(item), item]))

  const isComparisonMode = !isEmpty(compareVersionData)
  const allKeys = new Set([...mainVersionMap.keys(), ...compareVersionMap.keys()])

  for (const key of allKeys) {
    const mainVersionItem = mainVersionMap.get(key)
    const compareVersionItem = compareVersionMap.get(key)

    const hasCompareVersion = !isUndefined(compareVersionItem)

    const field: IObjectVersionField = {
      Field: {
        fieldBreadcrumbTitle: (mainVersionItem?.fieldBreadcrumbTitle ?? compareVersionItem?.fieldBreadcrumbTitle)!,
        ...(mainVersionItem?.fieldData ?? compareVersionItem?.fieldData)
      }
    }

    // Set the field for the main version count
    if (!isEmpty(mainVersionItem)) {
      field[`Version ${mainVersionItem.versionCount}`] = mainVersionItem.fieldValue
    } else if (hasCompareVersion) {
      field[`Version ${compareVersionItem.versionCount}`] = null
    }

    // Set the field for the compare version count
    if (hasCompareVersion) {
      field[`Version ${compareVersionItem.versionCount}`] = compareVersionItem.fieldValue ?? null
    }

    if (isComparisonMode && !isEqual(mainVersionItem?.fieldValue ?? null, compareVersionItem?.fieldValue ?? null)) {
      field.isModifiedValue = true

      if (mainVersionItem?.fieldData?.fieldtype === DynamicTypesList.FIELD_COLLECTIONS) {
        const mainVersionLength = mainVersionItem?.fieldValue?.length
        const compareVersionLength = compareVersionItem?.fieldValue?.length

        const mainList = compareVersionLength > mainVersionLength ? compareVersionItem : mainVersionItem
        const compareList = mainVersionLength < compareVersionLength ? mainVersionItem : compareVersionItem

        const differences = differenceWith(mainList?.fieldValue as IFieldCollectionValue[], compareList?.fieldValue as IFieldCollectionValue[], (item1, item2) => {
          return item1?.type === item2?.type && isEqual(item1?.data, item2?.data)
        })

        field.fieldCollectionModifiedList = differences.map(item => item.type)
      }
    }

    resultList.push(field)
  }

  return resultList
}
