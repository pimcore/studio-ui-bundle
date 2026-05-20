/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isEmpty, isNil } from 'lodash'
import { type Layout } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'
import { DynamicTypesList } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/constants/typesList'
import { DATATYPE_LIST, type ILayoutItem } from '@Pimcore/modules/data-object/editor/toolbar/language-comparison-view/types'

export interface ILocalizedFieldDescriptor {
  fieldBreadcrumbTitle: string
  fieldData: Layout
  formPath: Array<string | number>
  localeInFormPath?: boolean
}

export interface IExtractLocalizedFieldsProps {
  objectId: number
  item: any
  objectData: Record<string, any>
  fieldBreadcrumbTitle: string
  formPath: Array<string | number>
  objectDataRegistry: DynamicTypeObjectDataRegistry
  layoutsList: ILayoutItem[]
  setLayoutsList: (layouts: ILayoutItem[]) => void
}

export interface IProcessLayoutDataProps {
  objectId: number
  layout: Layout
  objectData: Record<string, any>
  objectDataRegistry: DynamicTypeObjectDataRegistry
  layoutsList?: ILayoutItem[]
  setLayoutsList?: (layouts: ILayoutItem[]) => void
}

interface IProcessNestedLayoutDataProps {
  objectId: number
  data: Layout['children']
  objectData: Record<string, any>
  objectDataRegistry: DynamicTypeObjectDataRegistry
  fieldBreadcrumbTitle: string
  formPath: Array<string | number>
  layoutsList: ILayoutItem[]
  setLayoutsList: (layouts: ILayoutItem[]) => void
}

export const getBreadcrumbTitle = (value1: string, value2: string): string => {
  return [value1, value2].filter(Boolean).join('/')
}

export const processNestedLayoutData = async ({
  objectId,
  data,
  objectData,
  objectDataRegistry,
  fieldBreadcrumbTitle,
  formPath,
  layoutsList = [],
  setLayoutsList = () => {}
}: IProcessNestedLayoutDataProps): Promise<ILocalizedFieldDescriptor[]> => {
  if (isNil(data) || isEmpty(data)) {
    return []
  }

  const descriptors = await Promise.all(data.map(async (item: any) => {
    if (item.datatype === DATATYPE_LIST.LAYOUT) {
      return await processNestedLayoutData({
        objectId,
        data: item.children,
        objectData,
        objectDataRegistry,
        fieldBreadcrumbTitle: getBreadcrumbTitle(fieldBreadcrumbTitle, item.title as string ?? ''),
        formPath,
        layoutsList,
        setLayoutsList
      })
    }

    if (item.datatype !== DATATYPE_LIST.DATA) {
      return []
    }

    if (item.fieldtype === DynamicTypesList.LOCALIZED_FIELDS) {
      return (item.children ?? []).map((child: Layout) => ({
        fieldBreadcrumbTitle,
        fieldData: child,
        formPath: [...formPath, item.name, child.name],
        localeInFormPath: false
      }))
    }

    const currentFieldType: string = item.fieldtype

    if (!objectDataRegistry.hasDynamicType(currentFieldType)) {
      return []
    }

    const objectDataType = objectDataRegistry.getDynamicType(currentFieldType)
    const extractedDescriptors = await objectDataType.extractLocalizedFields({
      objectId,
      item,
      objectData,
      fieldBreadcrumbTitle,
      formPath,
      objectDataRegistry,
      layoutsList,
      setLayoutsList
    })

    return extractedDescriptors === false ? [] : extractedDescriptors
  }))

  return descriptors.flatMap(item => item)
}

export const processLayoutData = async ({
  objectId,
  layout,
  objectData,
  objectDataRegistry,
  layoutsList = [],
  setLayoutsList = () => {}
}: IProcessLayoutDataProps): Promise<ILocalizedFieldDescriptor[]> => {
  if (isNil(layout?.children) || isEmpty(layout.children)) {
    return []
  }

  return await processNestedLayoutData({
    objectId,
    data: layout.children,
    objectData,
    objectDataRegistry,
    fieldBreadcrumbTitle: '',
    formPath: [],
    layoutsList,
    setLayoutsList
  })
}
