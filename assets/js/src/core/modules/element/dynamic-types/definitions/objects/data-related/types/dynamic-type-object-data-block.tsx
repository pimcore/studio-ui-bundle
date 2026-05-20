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
import { getBreadcrumbTitle } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/details-functions'
import { processNestedLayoutData, type IExtractLocalizedFieldsProps, type ILocalizedFieldDescriptor } from '@Pimcore/modules/data-object/editor/toolbar/language-comparison-view/helpers/process-layout-data'

import {
  type AbstractObjectDataDefinition,
  DynamicTypeObjectDataAbstract,
  type EditModalSettings,
  type EditMode,
  type GetGridCellDefinitionProps
} from '../dynamic-type-object-data-abstract'
import { Block } from '../components/block/block'
import { FieldLabel } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/field-label'
import { ItemsCount } from '../../grid-cell-preview/items-count/items-count'
import { VersionBlock } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/block/versions/version-block'
import { type FormItemProps } from 'antd'

export class DynamicTypeObjectDataBlock extends DynamicTypeObjectDataAbstract {
  id: string = 'block'
  gridCellEditMode: EditMode = 'edit-modal'
  gridCellEditModalSettings: EditModalSettings = {
    modalSize: 'XL',
    formLayout: 'vertical'
  }

  getObjectDataComponent (props: AbstractObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <Block
        { ...props }
        className={ props.className }
        title={
          <FieldLabel
            label={ props.title }
            name={ props.name }
          />
        }
      />
    )
  }

  getObjectDataFormItemProps (props: AbstractObjectDataDefinition): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      label: null
    }
  }

  getVersionObjectDataComponent (props: AbstractObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <VersionBlock { ...props } />
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

    const blockItems = objectData[item.name]

    if (!Array.isArray(blockItems) || blockItems.length === 0) {
      return []
    }

    const title: string = item?.title ?? ''
    const nextBreadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, title)
    const descriptors = await Promise.all(blockItems.map(async (blockItem, index) => {
      return await processNestedLayoutData({
        objectId,
        data: item.children ?? [],
        objectData: blockItem,
        objectDataRegistry,
        fieldBreadcrumbTitle: nextBreadcrumbTitle,
        formPath: [...formPath, item.name, index],
        layoutsList,
        setLayoutsList
      })
    }))

    return descriptors.flatMap(item => item)
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value: [] | null = props.cellProps.getValue()

    return (
      <ItemsCount count={ value?.length ?? 0 } />
    )
  }
}
