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

import { get, isEmpty, every, isObject, isArray, omitBy, isEqual, uniq } from 'lodash'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { type Layout } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import type { DataObjectVersion } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice.gen'
import { type IObjectVersionField } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/types'
import {
  COMPLEX_DATA_OBJECT_TYPES,
  type DynamicTypesList
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/constants/typesList'

enum DATATYPE_LIST {
  LAYOUT = 'layout',
  DATA = 'data'
}

interface IGetFormattedDataStructureProps {
  layout: Layout['children']
  versionData: DataObjectVersion
  versionId: number
  versionCount: number
}

export interface IFormattedDataStructureData {
  fieldBreadcrumbTitle: string
  fieldData: Layout['children']
  fieldValue: any
  versionCount: number
  versionId: number
}

const isEmptyObject = (value: object): boolean => {
  if (isObject(value) && !isArray(value)) {
    return every(value, isEmptyObject)
  }

  return isEmpty(value)
}

export const omitEmptyFields = (data: Record<string, any>): object => {
  return omitBy(data, (value) => isObject(value) && every(value, isEmptyObject))
}

const isFieldValueEmpty = (fieldValue: string | object): boolean => {
  if (isObject(fieldValue)) {
    return every(fieldValue, isEmptyObject)
  }

  return isEmptyValue(fieldValue)
}

export const formattedObjectData = (fieldValue: object, item: any): object => {
  return item?.children?.reduce((accumulator: any, child: any) => {
    const value = get(fieldValue, child.name)

    if (!isFieldValueEmpty(value as object)) {
      accumulator[child.name] = value
    }

    return accumulator
  }, {})
}

export const getFormattedDataStructure = ({ layout, versionData, versionId, versionCount }: IGetFormattedDataStructureProps): IFormattedDataStructureData[] => {
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

        const getFieldValue: string | object = get(versionData?.objectData, fieldName)
        const fieldValue = isObject(getFieldValue) ? formattedObjectData(getFieldValue, item) : getFieldValue
        const resultFieldValue = isObject(fieldValue) ? omitEmptyFields(fieldValue) : fieldValue

        if (!isFieldValueEmpty(resultFieldValue)) {
          return [{ fieldBreadcrumbTitle, fieldData: item, fieldValue: resultFieldValue, versionId, versionCount }]
        }
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

export const versionsDataToTableData = (data: IFormattedDataStructureData[][]): IObjectVersionField[] => {
  const resultList: IObjectVersionField[] = []

  const mainVersionData = data[0]
  const compareVersionData = data[1] ?? []

  const maxLength = Math.max(mainVersionData?.length, compareVersionData?.length)

  for (let index = 0; index < maxLength; index++) {
    const versionItem = mainVersionData[index]
    const compareVersionItem = compareVersionData[index]

    const hasCompareVersion = !isEmpty(compareVersionItem)

    const field: IObjectVersionField = {
      Field: {
        fieldBreadcrumbTitle: versionItem?.fieldBreadcrumbTitle ?? compareVersionItem?.fieldBreadcrumbTitle,
        ...versionItem?.fieldData ?? compareVersionItem?.fieldData
      }
    }

    if (!isEmpty(versionItem)) {
      field[`Version ${versionItem.versionCount}`] = versionItem.fieldValue
    } else if (hasCompareVersion) {
      field[`Version ${compareVersionItem.versionCount}`] = null
    }

    if (hasCompareVersion) {
      field[`Version ${compareVersionItem.versionCount}`] = compareVersionItem.fieldValue ?? null

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (COMPLEX_DATA_OBJECT_TYPES.includes(versionItem.fieldData.fieldtype as DynamicTypesList)) {
        const allFieldKeys = new Set([
          ...Object.keys(versionItem?.fieldValue as object),
          ...(!isEmpty(compareVersionItem?.fieldValue as object) ? Object.keys(compareVersionItem?.fieldValue as object) : [])
        ])

        const list: Array<{ key: string, localesList: string[] }> = []
        const list2: Array<{ key: string, localesList: string[] }> = []

        allFieldKeys.forEach(key => {
          if (JSON.stringify(versionItem.fieldValue?.[key]) !== JSON.stringify(compareVersionItem.fieldValue?.[key])) {
            if (!isEmpty(compareVersionItem.fieldValue?.[key])) {
              const getNonNullValues = (obj: object): any => Object.keys(obj).filter(key => obj[key] !== null)

              const result1 = isObject(versionItem.fieldValue?.[key]) ? getNonNullValues((versionItem.fieldValue?.[key])) : []
              const result2 = isObject(compareVersionItem.fieldValue?.[key]) ? getNonNullValues((compareVersionItem.fieldValue?.[key])) : []

              const mergedResult = [...result1, ...result2]

              uniq(mergedResult)?.forEach((item: string) => {
                if (versionItem.fieldValue?.[key]?.[item] !== compareVersionItem.fieldValue?.[key]?.[item]) {
                  const existingItem = list.find(entry => entry.key === key)

                  if (!isEmpty(existingItem)) {
                    existingItem?.localesList.push(...existingItem.localesList, item)
                  } else {
                    list.push({ key, localesList: [item] })
                  }
                }
              })

              list2.push({ key, localesList: uniq(mergedResult) })
              field.isModifiedValue = true
            }
          }
        })

        field.listModifiedFields = list
        field.listAllFieldsWithoutNull = list2
      } else {
        if (!isEqual(versionItem.fieldValue, compareVersionItem.fieldValue)) {
          field.isModifiedValue = true
        }
      }
    }

    resultList.push(field)
  }

  return resultList
}
