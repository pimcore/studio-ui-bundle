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

import { every, get, isEmpty, isEqual, isObject, isUndefined } from 'lodash'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { type Layout } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import type { DataObjectVersion } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice.gen'
import { type IObjectVersionField } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/types'
import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/dynamic-type-object-data-registry'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

enum DATATYPE_LIST {
  LAYOUT = 'layout',
  DATA = 'data'
}

interface IGetFormattedDataStructureProps {
  layout: Layout['children']
  versionData: DataObjectVersion
  versionId: number
  versionCount: number
  objectDataRegistry: DynamicTypeObjectDataRegistry
}

export interface IFormattedDataStructureData {
  fieldBreadcrumbTitle: string
  fieldData: Layout['children']
  fieldValue: any
  versionCount: number
  versionId: number
}

const isFieldValueEmpty = (fieldValue: any): boolean => {
  if (isObject(fieldValue)) {
    return every(fieldValue, isEmptyValue)
  }

  return isEmptyValue(fieldValue)
}

export const getFormattedDataStructure = ({ layout, versionData, versionId, versionCount, objectDataRegistry }: IGetFormattedDataStructureProps): IFormattedDataStructureData[] => {
  const formattedSystemData = {
    fullPath: versionData.fullPath,
    creationDate: formatDateTime({ timestamp: versionData.creationDate ?? null, dateStyle: 'short', timeStyle: 'medium' }),
    modificationDate: formatDateTime({ timestamp: versionData.modificationDate ?? null, dateStyle: 'short', timeStyle: 'medium' })
  }

  const getBreadcrumbTitle = (value1: string, value2: string): string => {
    return [value1, value2].filter(Boolean).join('/')
  }

  const processLayoutData = ({ data, fieldBreadcrumbTitle = '' }: { data: Layout['children'], fieldBreadcrumbTitle?: string }): IFormattedDataStructureData[] => {
    return data.flatMap((item: any) => {
      if (item.datatype === DATATYPE_LIST.LAYOUT) {
        const breadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, item.title as string)

        return processLayoutData({ data: item.children, fieldBreadcrumbTitle: breadcrumbTitle })
      }

      if (item.datatype === DATATYPE_LIST.DATA) {
        const fieldName = item.name
        const fieldValueByName: string | object = get(versionData?.objectData, fieldName)
        const currentFieldType: string = item.fieldtype

        if (!objectDataRegistry.hasDynamicType(currentFieldType)) {
          return []
        }

        const objectDataType = objectDataRegistry.getDynamicType(currentFieldType)

        return objectDataType.processVersionFieldData({ item, fieldBreadcrumbTitle, fieldValueByName, versionId, versionCount })
      }

      return []
    })
  }

  const getGeneralSystemData = (): IFormattedDataStructureData[] => {
    const result: IFormattedDataStructureData[] = []

    Object.entries(formattedSystemData).forEach(([key, value]): void => {
      result.push({ fieldBreadcrumbTitle: 'systemData', fieldData: { title: key, name: key, fieldtype: 'input' } as any, fieldValue: value, versionId, versionCount })
    })

    return result
  }

  const layoutData = processLayoutData({ data: layout })
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
    }

    resultList.push(field)
  }

  return resultList
}
