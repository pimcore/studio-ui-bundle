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

import { differenceWith, every, get, isEmpty, isEqual, isObject, isUndefined } from 'lodash'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { type Layout } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import type { DataObjectVersion } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice.gen'
import { type IObjectVersionField } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/types'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { DATATYPE_LIST, type IFormattedDataStructureData, type IGetFormattedDataStructureProps, type IFieldCollectionValue } from './types'
import { DynamicTypesList } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/constants/typesList'

const isFieldValueEmpty = (fieldValue: any): boolean => {
  if (isObject(fieldValue)) {
    return every(fieldValue, isEmptyValue)
  }

  return isEmptyValue(fieldValue)
}

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

  const processLayoutData = async ({ data, objectValuesData = versionData?.objectData, fieldBreadcrumbTitle = '' }: { data: Layout['children'], objectValuesData?: DataObjectVersion['objectData'], fieldBreadcrumbTitle?: string }): Promise<IFormattedDataStructureData[]> => {
    const promises = data.map(async (item: any) => {
      if (item.datatype === DATATYPE_LIST.LAYOUT) {
        const breadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, item.title as string)

        return await processLayoutData({ data: item.children, fieldBreadcrumbTitle: breadcrumbTitle, objectValuesData })
      }

      if (item.datatype === DATATYPE_LIST.DATA) {
        const fieldName = item.name
        const fieldValueByName = get(objectValuesData, fieldName)
        const currentFieldType: string = item.fieldtype

        if (!objectDataRegistry.hasDynamicType(currentFieldType)) {
          return []
        }

        const objectDataType = objectDataRegistry.getDynamicType(currentFieldType)

        const processedDataList = await objectDataType.processVersionFieldData({ objectId, item, fieldBreadcrumbTitle, fieldValueByName, versionId, versionCount, layoutsList, setLayoutsList })
        const processedPromises = processedDataList?.map(async (processedDataItem: IFormattedDataStructureData): Promise<IFormattedDataStructureData[]> => {
          objectValuesData = {}

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          if (!isEmpty(processedDataItem?.fieldData?.children) && !fieldTypesRequiringChildren.includes(processedDataItem?.fieldData?.fieldtype as DynamicTypesList)) {
            const breadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, processedDataItem?.fieldData?.title as string)

            return await processLayoutData({ data: [processedDataItem?.fieldData], objectValuesData: { ...objectValuesData, [processedDataItem?.fieldData?.name]: processedDataItem?.fieldValue }, fieldBreadcrumbTitle: breadcrumbTitle })
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
      result.push({ fieldBreadcrumbTitle: 'systemData', fieldData: { title: key, name: key, fieldtype: 'input' } as any, fieldValue: value, versionId, versionCount })
    })

    return result
  }

  const layoutData = await processLayoutData({ data: layout })
  const generalSystemData = getGeneralSystemData()

  return [...generalSystemData, ...layoutData]
}

export const versionsDataToTableData = ({ data }: { data: IFormattedDataStructureData[][] }): IObjectVersionField[] => {
  const resultList: IObjectVersionField[] = []

  const mainVersionData = data[0] ?? []
  const compareVersionData = data[1] ?? []
  const isComparisonMode = !isEmpty(compareVersionData)

  for (let index = 0; index < mainVersionData.length; index++) {
    const mainVersionItem = mainVersionData[index]
    const compareVersionItem = compareVersionData[index]

    const isEmptyField = isFieldValueEmpty(mainVersionItem?.fieldValue) && isFieldValueEmpty(compareVersionItem?.fieldValue)

    if (isEmptyField) { continue }

    const hasCompareVersion = !isUndefined(compareVersionItem)

    const field: IObjectVersionField = {
      Field: {
        fieldBreadcrumbTitle: mainVersionItem?.fieldBreadcrumbTitle,
        ...mainVersionItem?.fieldData
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

    if (isComparisonMode && !isEqual(mainVersionItem?.fieldValue, compareVersionItem?.fieldValue)) {
      field.isModifiedValue = true

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
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
