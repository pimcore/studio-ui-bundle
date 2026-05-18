/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { get, isEmpty, isNil } from 'lodash'
import { type Layout } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import type { DataObjectVersion } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice.gen'
import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'
import {
  DATATYPE_LIST,
  type IFormattedDataStructureData,
  type ILayoutItem
} from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/types'
import { getBreadcrumbTitle } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/details-functions'
import { DynamicTypesList } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/constants/typesList'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

const fieldTypesRequiringChildren = [DynamicTypesList.BLOCK]

export interface IProcessLayoutDataProps {
  objectId: number
  layout: Layout
  objectDataRegistry: DynamicTypeObjectDataRegistry
  layoutsList?: ILayoutItem[]
  setLayoutsList?: (layouts: ILayoutItem[]) => void
}

export const processLayoutData = async ({
  objectId,
  layout,
  objectDataRegistry,
  layoutsList = [],
  setLayoutsList = () => {}
}: IProcessLayoutDataProps): Promise<IFormattedDataStructureData[]> => {
  if (isNil(layout?.children) || isEmpty(layout.children)) {
    return []
  }

  const processData = async ({
    data,
    objectValuesData = {},
    fieldBreadcrumbTitle = '',
    fieldPath = ''
  }: {
    data: Layout['children']
    objectValuesData?: DataObjectVersion['objectData']
    fieldBreadcrumbTitle?: string
    fieldPath?: string
  }): Promise<IFormattedDataStructureData[]> => {
    const promises = data.map(async (item: any) => {
      if (item.datatype === DATATYPE_LIST.LAYOUT) {
        const breadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, item.title as string)
        return await processData({ data: item.children, fieldBreadcrumbTitle: breadcrumbTitle, objectValuesData, fieldPath })
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

        const processedDataList = await objectDataType.processVersionFieldData({
          objectId,
          item,
          fieldBreadcrumbTitle,
          fieldValueByName,
          versionId: 0,
          versionCount: 0,
          layoutsList,
          setLayoutsList,
          fieldPath: getFieldPathValue
        })

        const processedPromises = processedDataList?.map(async (processedDataItem: IFormattedDataStructureData): Promise<IFormattedDataStructureData[]> => {
          objectValuesData = {}

          if (!isEmpty(processedDataItem?.fieldData?.children) && !fieldTypesRequiringChildren.includes(processedDataItem?.fieldData?.fieldtype as DynamicTypesList)) {
            const breadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, processedDataItem?.fieldData?.title ?? '')

            return await processData({
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

  return await processData({ data: layout.children })
}
