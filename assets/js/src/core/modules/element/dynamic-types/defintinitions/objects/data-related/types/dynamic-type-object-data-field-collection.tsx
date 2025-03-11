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

import React from 'react'
import { filter, isEmpty } from 'lodash'
import { DynamicTypeObjectDataAbstract } from '../dynamic-type-object-data-abstract'
import { FieldCollection, type FieldCollectionProps } from '../components/field-collection/field-collection'
import type {
  ClassFieldCollectionObjectLayoutApiResponse,
  FieldCollectionLayoutDefinition
} from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import {
  DATATYPE_LIST, getBreadcrumbTitle,
  type IFormattedDataStructureData
} from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/details-functions'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'

export class DynamicTypeObjectDataFieldCollection extends DynamicTypeObjectDataAbstract {
  id: string = 'fieldcollections'
  isCollectionType: boolean = true

  getObjectDataComponent (props: FieldCollectionProps): React.ReactElement<FieldCollectionProps> {
    return <FieldCollection { ...props } />
  }

  async processVersionFieldData (props: {
    objectId: number
    item: any
    fieldBreadcrumbTitle: string
    fieldValueByName: any[]
    versionId: number
    versionCount: number
  }): Promise<any> {
    const { objectId, item, fieldBreadcrumbTitle, fieldValueByName, versionId, versionCount } = props

    let currentFieldCollectionSection: null | string = null

    const processFieldCollectionData = ({ data, updatedFieldBreadcrumbTitle = fieldBreadcrumbTitle }: { data: FieldCollectionLayoutDefinition[], updatedFieldBreadcrumbTitle?: string }): IFormattedDataStructureData[] => {
      return data.flatMap((dataItem: any) => {
        if (!isEmpty(dataItem.key)) currentFieldCollectionSection = dataItem.key

        const isItemInAllowedList = !isEmpty(currentFieldCollectionSection) ? item?.allowedTypes.includes(currentFieldCollectionSection) === true : true
        if (dataItem.datatype === DATATYPE_LIST.LAYOUT && isItemInAllowedList) {
          const breadcrumbTitle = getBreadcrumbTitle(updatedFieldBreadcrumbTitle, dataItem.title as string)

          return processFieldCollectionData({ data: dataItem.children, updatedFieldBreadcrumbTitle: breadcrumbTitle })
        }

        if (dataItem.datatype === DATATYPE_LIST.DATA) {
          const filteredObject = filter(fieldValueByName, { type: currentFieldCollectionSection })
          const fieldValue = filteredObject[0]?.data?.[dataItem?.name]

          return {
            fieldBreadcrumbTitle: updatedFieldBreadcrumbTitle,
            fieldData: { ...dataItem },
            fieldValue,
            versionId,
            versionCount
          }
        }

        return []
      })
    }

    const loadLayoutById = async (): Promise<ClassFieldCollectionObjectLayoutApiResponse | null> => {
      try {
        const response = await fetch(`${getPrefix()}/class/field-collection/${objectId}/object/layout`)

        return await response.json()
      } catch (error) {
        console.error(error)

        return null
      }
    }

    async function handleFieldCollectionData (): Promise<IFormattedDataStructureData[] | null> {
      try {
        const data: ClassFieldCollectionObjectLayoutApiResponse | null = await loadLayoutById()

        if (!isEmpty(data)) {
          return processFieldCollectionData({ data: data?.items })
        } else {
          return null
        }
      } catch (e) {
        return null
      }
    }

    return await handleFieldCollectionData()
  }
}
