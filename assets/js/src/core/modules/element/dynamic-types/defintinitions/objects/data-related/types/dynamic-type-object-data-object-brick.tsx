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
import { get, isEmpty } from 'lodash'
import { DynamicTypeObjectDataAbstract } from '../dynamic-type-object-data-abstract'
import { ObjectBrick, type ObjectBrickProps } from '../components/object-brick/object-brick'
import { type FormItemProps } from 'antd'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { getBreadcrumbTitle } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/details-functions'
import { type ClassObjectBrickObjectLayoutApiResponse, type ObjectBrickLayoutDefinition } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import {
  DATATYPE_LIST,
  type IFormattedDataStructureData,
  type IProcessVersionFieldDataProps
} from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/types'

export class DynamicTypeObjectDataObjectBrick extends DynamicTypeObjectDataAbstract {
  id: string = 'objectbricks'
  isCollectionType: boolean = false

  getObjectDataComponent (props: ObjectBrickProps): React.ReactElement<ObjectBrickProps> {
    return <ObjectBrick { ...props } />
  }

  getObjectDataFormItemProps (props: ObjectBrickProps): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      label: null
    }
  }

  async processVersionFieldData (props: IProcessVersionFieldDataProps): Promise<any> {
    const { objectId, item, fieldBreadcrumbTitle, fieldValueByName, versionId, versionCount } = props

    let currentBrickSection: null | string = null

    const processObjectBrickData = ({ data, updatedFieldBreadcrumbTitle = fieldBreadcrumbTitle }: { data: ObjectBrickLayoutDefinition[], updatedFieldBreadcrumbTitle?: string }): IFormattedDataStructureData[] => {
      return data.flatMap((dataItem: any) => {
        if (!isEmpty(dataItem.key)) currentBrickSection = dataItem.key

        const isItemInAllowedList = !isEmpty(currentBrickSection) ? item?.allowedTypes.includes(currentBrickSection) === true : true
        if (dataItem.datatype === DATATYPE_LIST.LAYOUT && isItemInAllowedList) {
          const breadcrumbTitle = getBreadcrumbTitle(updatedFieldBreadcrumbTitle, dataItem.title as string)

          return processObjectBrickData({ data: dataItem.children, updatedFieldBreadcrumbTitle: breadcrumbTitle })
        }

        if (dataItem.datatype === DATATYPE_LIST.DATA) {
          const fieldPath = `${currentBrickSection}.${dataItem?.name}`
          const fieldValue = get(fieldValueByName, fieldPath)

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

    const loadLayoutById = async (): Promise<ClassObjectBrickObjectLayoutApiResponse | null> => {
      try {
        const response = await fetch(`${getPrefix()}/class/object-brick/${objectId}/object/layout`)

        return await response.json()
      } catch (error) {
        console.error(error)

        return null
      }
    }

    async function handleObjectBrickData (): Promise<IFormattedDataStructureData[] | null> {
      try {
        const data: ClassObjectBrickObjectLayoutApiResponse | null = await loadLayoutById()

        if (!isEmpty(data)) {
          return processObjectBrickData({ data: data?.items })
        } else {
          return null
        }
      } catch (e) {
        return null
      }
    }

    return await handleObjectBrickData()
  }
}
