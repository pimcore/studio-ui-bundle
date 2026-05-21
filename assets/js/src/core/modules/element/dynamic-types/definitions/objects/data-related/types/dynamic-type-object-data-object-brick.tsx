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
import { get, isEmpty } from 'lodash'
import { DynamicTypeObjectDataAbstract } from '../dynamic-type-object-data-abstract'
import { ObjectBrick, type ObjectBrickProps } from '../components/object-brick/object-brick'
import { type FormItemProps } from 'antd'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { getBreadcrumbTitle } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/details-functions'
import { type ClassObjectBrickObjectLayoutApiResponse, type ObjectBrickLayoutDefinition } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { processNestedLayoutData, type IExtractLocalizedFieldsProps, type ILocalizedFieldDescriptor } from '@Pimcore/modules/data-object/editor/toolbar/language-comparison-view/helpers/process-layout-data'
import {
  DATATYPE_LIST,
  type IFormattedDataStructureData,
  type IProcessVersionFieldDataProps
} from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/types'
import {
  DynamicTypesList
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/constants/typesList'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

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

  async extractLocalizedFields (props: IExtractLocalizedFieldsProps): Promise<ILocalizedFieldDescriptor[] | false> {
    const {
      objectId,
      item,
      objectData,
      fieldBreadcrumbTitle,
      formPath,
      objectDataRegistry,
      layoutsList,
      setLayoutsList
    } = props

    const brickValues = objectData[item.name]

    if (brickValues == null || typeof brickValues !== 'object') {
      return []
    }

    const loadObjectBrickLayouts = async (): Promise<ObjectBrickLayoutDefinition[]> => {
      const cachedLayouts = layoutsList.find((layout) => layout.type === DynamicTypesList.OBJECT_BRICKS)

      if (cachedLayouts !== undefined) {
        return cachedLayouts.data as ObjectBrickLayoutDefinition[]
      }

      try {
        const response = await fetch(`${getPrefix()}/class/object-brick/${objectId}/object/layout`)
        const data: ClassObjectBrickObjectLayoutApiResponse = await response.json()

        setLayoutsList([...layoutsList, { type: DynamicTypesList.OBJECT_BRICKS, data: data.items }])

        return data.items
      } catch (error) {
        console.error(error)
        return []
      }
    }

    const layoutDefinitions = await loadObjectBrickLayouts()

    if (layoutDefinitions.length === 0) {
      return []
    }

    const descriptors = await Promise.all(layoutDefinitions.map(async (layoutDefinition: any) => {
      const brickType = layoutDefinition.key

      if (isEmpty(brickType) || !(brickType in brickValues) || item?.allowedTypes?.includes(brickType) !== true) {
        return []
      }


      const brickTitle = layoutDefinition.title !== brickType ? `${layoutDefinition.title}/${brickType}` : layoutDefinition.title
      const brickName = !isEmptyValue(layoutDefinition.name) && layoutDefinition.name !== brickType ? `${layoutDefinition.name}/${brickType}` : layoutDefinition.name
      const brickFieldBreadcrumbTitle: string = !isEmptyValue(layoutDefinition.title) ? brickTitle : brickName

      return await processNestedLayoutData({
        objectId,
        data: (layoutDefinition.children as any[]) ?? [],
        objectData: brickValues[brickType] as Record<string, any>,
        objectDataRegistry,
        fieldBreadcrumbTitle: getBreadcrumbTitle(fieldBreadcrumbTitle, brickFieldBreadcrumbTitle),
        formPath: [...formPath, item.name, brickType],
        layoutsList,
        setLayoutsList
      })
    }))

    return descriptors.flatMap(item => item)
  }

  async processVersionFieldData (props: IProcessVersionFieldDataProps): Promise<IFormattedDataStructureData[]> {
    const { objectId, item, fieldBreadcrumbTitle, fieldValueByName, fieldPath, versionId, versionCount, layoutsList, setLayoutsList } = props

    let currentBrickSection: null | string = null

    const processObjectBrickData = ({ data, updatedFieldBreadcrumbTitle = fieldBreadcrumbTitle, fieldPathValue = fieldPath }: { data: ObjectBrickLayoutDefinition[], updatedFieldBreadcrumbTitle?: string, fieldPathValue?: string }): IFormattedDataStructureData[] => {
      return data.flatMap((dataItem: any) => {
        if (!isEmpty(dataItem.key)) currentBrickSection = dataItem.key

        const isItemInAllowedList = !isEmpty(currentBrickSection) ? item?.allowedTypes.includes(currentBrickSection) === true : true

        if (dataItem.datatype === DATATYPE_LIST.LAYOUT && isItemInAllowedList) {
          const breadcrumbField = dataItem.title ?? dataItem.name
          const breadcrumbTitle = getBreadcrumbTitle(updatedFieldBreadcrumbTitle, breadcrumbField as string)

          return processObjectBrickData({ data: dataItem.children, updatedFieldBreadcrumbTitle: breadcrumbTitle, fieldPathValue })
        }

        if (dataItem.datatype === DATATYPE_LIST.DATA) {
          const fieldPath = `${currentBrickSection}.${dataItem?.name}`
          const fieldValue = get(fieldValueByName, fieldPath)

          const getFieldPathValue = isEmptyValue(fieldPathValue) ? fieldPath : `${fieldPathValue}.${fieldPath}`

          return {
            fieldBreadcrumbTitle: updatedFieldBreadcrumbTitle,
            fieldData: { ...dataItem },
            fieldValue,
            fieldPath: getFieldPathValue,
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

    async function handleObjectBrickData (): Promise<IFormattedDataStructureData[] | []> {
      try {
        const bricksLayout = layoutsList.filter((layout) => layout.type === DynamicTypesList.OBJECT_BRICKS)

        if (!isEmpty(bricksLayout)) {
          return processObjectBrickData({ data: bricksLayout[0]?.data as ObjectBrickLayoutDefinition[] })
        }

        const data: ClassObjectBrickObjectLayoutApiResponse | null = await loadLayoutById()

        if (!isEmpty(data)) {
          setLayoutsList([...layoutsList, { type: DynamicTypesList.OBJECT_BRICKS, data: data?.items }])

          return processObjectBrickData({ data: data?.items })
        } else {
          return []
        }
      } catch (e) {
        return []
      }
    }

    return await handleObjectBrickData()
  }
}
