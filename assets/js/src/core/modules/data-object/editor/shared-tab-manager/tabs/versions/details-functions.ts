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

import { get, isEmpty, every, isObject, isArray, omitBy, isEqual, uniq, isUndefined } from 'lodash'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { type Layout } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import type { DataObjectVersion } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice.gen'
import { type IObjectVersionField } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/types'
import { DynamicTypesList } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/constants/typesList'

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

const getNonNullValues = (obj: object): any => Object.keys(obj).filter(key => obj[key] !== null)

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
        const getFieldValueByName: string | object = get(versionData?.objectData, fieldName)

        const fieldValue = isObject(getFieldValueByName) ? formattedObjectData(getFieldValueByName, item) : getFieldValueByName
        const formattedFieldValue = isObject(fieldValue) ? omitEmptyFields(fieldValue) : fieldValue

        if (!isFieldValueEmpty(formattedFieldValue)) {
          return [{ fieldBreadcrumbTitle, fieldData: item, fieldValue: formattedFieldValue, versionId, versionCount }]
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

export const versionsDataToTableData = ({ data, isComparisonMode = false, isSingleMode = false }: { data: IFormattedDataStructureData[][], isComparisonMode?: boolean, isSingleMode?: boolean }): IObjectVersionField[] => {
  const resultList: IObjectVersionField[] = []

  const mainVersionData = data[0] ?? []
  const compareVersionData = data[1] ?? []
  const maxVersionDataLength = Math.max(mainVersionData.length, compareVersionData.length)

  for (let index = 0; index < maxVersionDataLength; index++) {
    const mainVersionItem = mainVersionData[index]
    const compareVersionItem = compareVersionData[index]

    const hasCompareVersion = !isUndefined(compareVersionItem)

    const field: IObjectVersionField = {
      Field: {
        fieldBreadcrumbTitle: mainVersionItem?.fieldBreadcrumbTitle ?? compareVersionItem?.fieldBreadcrumbTitle,
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

    const handleLocalizedFields = (): void => {
      const allFieldKeys = new Set([
        ...(!isEmpty(mainVersionItem?.fieldValue as object) ? Object.keys(mainVersionItem?.fieldValue as object) : []),
        ...(!isEmpty(compareVersionItem?.fieldValue as object) ? Object.keys(compareVersionItem?.fieldValue as object) : [])
      ])

      const modifiedFieldsList: Array<{ key: string, localesList: string[] }> = []
      const allFieldsList: Array<{ key: string, localesList: string[] }> = []

      allFieldKeys.forEach(key => {
        const getMainVersionWithoutNullValues = isObject(mainVersionItem?.fieldValue?.[key]) ? getNonNullValues((mainVersionItem?.fieldValue?.[key])) : []
        const getCompareVersionWithoutNullValues = isObject(compareVersionItem?.fieldValue?.[key]) ? getNonNullValues((compareVersionItem?.fieldValue?.[key])) : []

        const mergedVersionsData = [...getMainVersionWithoutNullValues, ...getCompareVersionWithoutNullValues]
        const uniqMergedVersionsData = uniq(mergedVersionsData)

        allFieldsList.push({ key, localesList: uniqMergedVersionsData })

        if (JSON.stringify(mainVersionItem?.fieldValue?.[key]) !== JSON.stringify(compareVersionItem?.fieldValue?.[key])) {
          if (isComparisonMode) {
            uniqMergedVersionsData?.forEach((item: string) => {
              if (mainVersionItem?.fieldValue?.[key]?.[item] !== compareVersionItem?.fieldValue?.[key]?.[item]) {
                const existingItem = modifiedFieldsList.find(entry => entry.key === key)

                if (!isEmpty(existingItem)) {
                  existingItem?.localesList.push(item)
                } else {
                  modifiedFieldsList.push({ key, localesList: [item] })
                }
              }
            })

            field.isModifiedValue = true
          }
        }
      })

      field.listModifiedFields = modifiedFieldsList
      field.listAllFieldsWithoutNull = allFieldsList
      field.isSingleVersion = isSingleMode
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if ((mainVersionItem ?? compareVersionItem)?.fieldData?.fieldtype === DynamicTypesList.LOCALIZED_FIELDS) {
      handleLocalizedFields()
    } else if (isComparisonMode && !isEqual(mainVersionItem?.fieldValue, compareVersionItem?.fieldValue)) {
      field.isModifiedValue = true
    }

    resultList.push(field)
  }

  return resultList
}
