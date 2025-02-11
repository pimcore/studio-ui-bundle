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

import { get, isEmpty } from 'lodash'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { type Layout } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import type { DataObjectVersion } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice.gen'
import { type IObjectVersionField } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/types'

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
        const fieldValue = get(versionData?.objectData, fieldName)

        if (!isEmptyValue(fieldValue)) {
          return [{ fieldBreadcrumbTitle, fieldData: item, fieldValue, versionId, versionCount }]
        }
      }

      return []
    })
  }

  const getGeneralSystemData = (): IFormattedDataStructureData[] => {
    const result: IFormattedDataStructureData[] = []

    Object.entries(formattedSystemData).forEach(([key, value]): void => {
      result.push({ fieldBreadcrumbTitle: 'systemData', fieldData: { name: key, fieldtype: 'input' } as any, fieldValue: value, versionId, versionCount })
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
  const compareVersionData = data[1]

  mainVersionData.forEach((versionItem, index) => {
    const field = {
      Field: {
        fieldBreadcrumbTitle: versionItem?.fieldBreadcrumbTitle,
        ...versionItem.fieldData
      },
      [`Version ${versionItem.versionCount}`]: versionItem.fieldValue
    }

    const compareVersion = compareVersionData?.[index]
    const hasCompareVersion = !isEmpty(compareVersion)

    if (hasCompareVersion) {
      field[`Version ${compareVersion.versionCount}`] = compareVersion.fieldValue
    }

    resultList.push(field)
  })

  return resultList
}
