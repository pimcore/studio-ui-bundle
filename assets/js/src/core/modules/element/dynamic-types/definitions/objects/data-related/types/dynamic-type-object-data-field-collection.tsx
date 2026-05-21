/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactElement } from 'react'
import { DynamicTypeObjectDataAbstract, type GetGridCellDefinitionProps, type EditModalSettings, type EditMode } from '../dynamic-type-object-data-abstract'
import { FieldCollection, type FieldCollectionProps } from '../components/field-collection/field-collection'
import { ItemsCount } from '../../grid-cell-preview/items-count/items-count'
import {
  VersionFieldCollection,
  type VersionFieldCollectionProps
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/field-collection/versions/version-field-collection'
import { type FormItemProps } from 'antd'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { getBreadcrumbTitle } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/details-functions'
import { DynamicTypesList } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/constants/typesList'
import { processNestedLayoutData, type IExtractLocalizedFieldsProps, type ILocalizedFieldDescriptor } from '@Pimcore/modules/data-object/editor/toolbar/language-comparison-view/helpers/process-layout-data'
import { type ClassFieldCollectionObjectLayoutApiResponse, type FieldCollectionLayoutDefinition } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

export class DynamicTypeObjectDataFieldCollection extends DynamicTypeObjectDataAbstract {
  id: string = 'fieldcollections'
  isCollectionType: boolean = false
  gridCellEditMode: EditMode = 'edit-modal'
  gridCellEditModalSettings: EditModalSettings = {
    modalSize: 'XL',
    formLayout: 'vertical'
  }

  isAllowedInBatchEdit: boolean = false

  getObjectDataComponent (props: FieldCollectionProps): React.ReactElement<FieldCollectionProps> {
    return <FieldCollection { ...props } />
  }

  getVersionObjectDataComponent (props: VersionFieldCollectionProps): React.ReactElement<FieldCollectionProps> {
    return <VersionFieldCollection { ...props } />
  }

  getObjectDataFormItemProps (props: FieldCollectionProps): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      label: null
    }
  }

  getGridCellEditComponent (props: GetGridCellDefinitionProps): ReactElement {
    return this.getObjectDataComponent(props.objectProps as unknown as FieldCollectionProps)
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value: [] | null = props.cellProps.getValue()

    return (
      <ItemsCount count={ value?.length ?? 0 } />
    )
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

    const collectionItems = objectData[item.name]

    if (!Array.isArray(collectionItems) || collectionItems.length === 0) {
      return []
    }

    const loadFieldCollectionLayouts = async (): Promise<FieldCollectionLayoutDefinition[]> => {
      const cachedLayouts = layoutsList.find((layout) => layout.type === DynamicTypesList.FIELD_COLLECTIONS)

      if (cachedLayouts !== undefined) {
        return cachedLayouts.data as FieldCollectionLayoutDefinition[]
      }

      try {
        const response = await fetch(`${getPrefix()}/class/field-collection/${objectId}/object/layout`)
        const data: ClassFieldCollectionObjectLayoutApiResponse = await response.json()

        setLayoutsList([...layoutsList, { type: DynamicTypesList.FIELD_COLLECTIONS, data: data.items }])

        return data.items
      } catch (error) {
        console.error(error)
        return []
      }
    }

    const layoutDefinitions = await loadFieldCollectionLayouts()

    if (layoutDefinitions.length === 0) {
      return []
    }

    const nextBreadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, (item?.title ?? '') as string)
    const descriptors = await Promise.all(collectionItems.map(async (collectionItem, index) => {
      const layoutDefinition = layoutDefinitions.find(layout => layout.key === collectionItem?.type)

      if (layoutDefinition === undefined) {
        return []
      }

      const currentBreadcrumbTitle: string | undefined = !isEmptyValue(layoutDefinition?.title) && layoutDefinition?.title !== collectionItem?.type ? `${layoutDefinition.title}/${collectionItem?.type}` : collectionItem?.type ?? layoutDefinition?.title

      return await processNestedLayoutData({
        objectId,
        data: (layoutDefinition.children as any[]) ?? [],
        objectData: (collectionItem?.data ?? {}) as Record<string, any>,
        objectDataRegistry,
        fieldBreadcrumbTitle: getBreadcrumbTitle(nextBreadcrumbTitle, currentBreadcrumbTitle ?? ''),
        formPath: [...formPath, item.name, index, 'data'],
        layoutsList,
        setLayoutsList
      })
    }))

    return descriptors.flatMap(item => item)
  }
}
